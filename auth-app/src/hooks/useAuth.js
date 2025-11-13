import { useState, useEffect, useCallback } from 'react';

const AUTH_KEY = 'dashboard_mq_auth';

export function useAuth() {
  const [authState, setAuthState] = useState({
    token: null,
    userData: null,
    tokenExpiry: null,
    isAuthenticated: false
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Décodage JWT
  const decodeJWT = useCallback((token) => {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    } catch {
      return null;
    }
  }, []);

  // Sauvegarder dans sessionStorage
  const saveToSession = useCallback((state) => {
    try {
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(state));
    } catch (err) {
      console.error('Erreur sauvegarde session:', err);
    }
  }, []);

  // Charger depuis sessionStorage
  const loadFromSession = useCallback(() => {
    try {
      const saved = sessionStorage.getItem(AUTH_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.tokenExpiry && Date.now() < data.tokenExpiry) {
          return data;
        } else {
          sessionStorage.removeItem(AUTH_KEY);
        }
      }
    } catch (err) {
      console.error('Erreur chargement session:', err);
      sessionStorage.removeItem(AUTH_KEY);
    }
    return null;
  }, []);

  // Déconnexion
  const logout = useCallback(() => {
    setAuthState({
      token: null,
      userData: null,
      tokenExpiry: null,
      isAuthenticated: false
    });
    setError('');
    sessionStorage.removeItem(AUTH_KEY);
  }, []);

  // Renouveler le token (côté client uniquement - prolonge la session)
  const renewToken = useCallback(() => {
    setAuthState(prev => {
      if (!prev.isAuthenticated) return prev;
      
      const newExpiryTime = Date.now() + (3600 * 1000); // +1h
      const updatedState = {
        ...prev,
        tokenExpiry: newExpiryTime
      };
      
      saveToSession(updatedState);
      console.log('✅ Token renouvelé automatiquement');
      return updatedState;
    });
  }, [saveToSession]);

  // Restaurer la session au chargement
  useEffect(() => {
    const savedAuth = loadFromSession();
    if (savedAuth) {
      setAuthState(savedAuth);
    }
  }, [loadFromSession]);

  // Calcul du temps restant
  const getRemainingTime = useCallback(() => {
    if (!authState.tokenExpiry) return '';
    
    const remaining = Math.max(0, authState.tokenExpiry - Date.now());
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    
    if (minutes > 0) {
      return `${minutes}min ${seconds}s`;
    }
    return `${seconds}s`;
  }, [authState.tokenExpiry]);

  // Vérification expiration + inactivité + renouvellement
  useEffect(() => {
    if (!authState.tokenExpiry || !authState.isAuthenticated) return;

    const RENEW_THRESHOLD = 10 * 60 * 1000; // 10min
    const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30min

    const checkExpiry = () => {
      const now = Date.now();
      const timeSinceActivity = now - lastActivity;
      const timeUntilExpiry = authState.tokenExpiry - now;

      // 1. Déconnexion si inactivité > 30min
      if (timeSinceActivity > INACTIVITY_TIMEOUT) {
        logout();
        setError('Session expirée après inactivité.');
        return;
      }

      // 2. Déconnexion si token expiré
      if (timeUntilExpiry <= 0) {
        logout();
        setError('Votre session a expiré. Veuillez vous reconnecter.');
        return;
      }

      // 3. Renouvellement si < 10min ET actif récemment
      if (timeUntilExpiry < RENEW_THRESHOLD && timeSinceActivity < 60000) {
        renewToken();
      }
    };

    const interval = setInterval(checkExpiry, 1000);
    return () => clearInterval(interval);
  }, [authState.tokenExpiry, authState.isAuthenticated, lastActivity, logout, renewToken]);

  // Sauvegarder dans sessionStorage à chaque changement
  useEffect(() => {
    if (authState.isAuthenticated) {
      saveToSession(authState);
    }
  }, [authState, saveToSession]);

  // Détection activité utilisateur
  useEffect(() => {
    if (!authState.isAuthenticated) return;

    const handleActivity = () => {
      setLastActivity(Date.now());
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [authState.isAuthenticated]);

  // Connexion
  const login = async (username, password) => {
    setError('');
    setLoading(true);

    try {
      const params = new URLSearchParams({
        grant_type: 'password',
        username,
        password,
        client_id: 'FBI-Appli-Demo'
      });

      const response = await fetch('http://localhost:8000/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.access_token || data.token;
        const decoded = decodeJWT(token);

        if (!decoded) {
          throw new Error('Token invalide');
        }

        let expiryTime;
        if (data.expires_in) {
          expiryTime = Date.now() + (data.expires_in * 1000);
        } else if (decoded.exp) {
          expiryTime = decoded.exp * 1000;
        } else {
          expiryTime = Date.now() + (3600 * 1000);
        }

        setAuthState({
          token,
          userData: decoded,
          tokenExpiry: expiryTime,
          isAuthenticated: true
        });

        setLastActivity(Date.now());
        return { success: true };
      } else {
        setError('Identifiants incorrects');
        return { success: false, error: 'Identifiants incorrects' };
      }
    } catch (err) {
      const errorMsg = 'Erreur de connexion au serveur';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Helpers
  const getRoles = useCallback(() => {
    const rolesStr = authState.userData?.roles || authState.userData?.rolesApplicatifs || '';
    return rolesStr ? rolesStr.split(':') : [];
  }, [authState.userData]);

  const isAdmin = useCallback(() => {
    return getRoles().includes('ADMIN');
  }, [getRoles]);

  const getName = useCallback(() => {
    if (authState.userData?.firstName && authState.userData?.lastName) {
      return `${authState.userData.lastName} ${authState.userData.firstName}`;
    }
    return authState.userData?.displayname || authState.userData?.principal || authState.userData?.uid || '';
  }, [authState.userData]);

  const getCodeUA = useCallback(() => {
    return authState.userData?.CodeUA || '';
  }, [authState.userData]);

  return {
    isAuthenticated: authState.isAuthenticated,
    userData: authState.userData,
    tokenExpiry: authState.tokenExpiry,
    loading,
    error,
    login,
    logout,
    getRemainingTime,
    getRoles,
    isAdmin,
    getName,
    getCodeUA,
    setError
  };
}
