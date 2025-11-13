import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useUAPages } from './hooks/useUAPages';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';
import AdminPanel from './components/AdminPanel';
import Sidebar from './components/Sidebar';
import { styles } from './styles/styles';

export default function App() {
  // Auth
  const { 
    isAuthenticated, 
    userData, 
    loading, 
    error, 
    login, 
    logout, 
    getRemainingTime, 
    getRoles, 
    isAdmin, 
    getName, 
    getCodeUA 
  } = useAuth();

  // UA Pages
  const {
    uaPages,
    availableUAs,
    loadingUA,
    loadUAPage,
    saveUAPage,
    createNewUAPage,
    deleteUAPage
  } = useUAPages();

  // Navigation
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedUA, setSelectedUA] = useState('');
  const [showUASelector, setShowUASelector] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Initialiser selectedUA avec le CodeUA de l'utilisateur
  useEffect(() => {
    if (userData && !selectedUA) {
      setSelectedUA(getCodeUA());
    }
  }, [userData, selectedUA, getCodeUA]);

  // Handlers
  const handleLogin = async (username, password) => {
    const result = await login(username, password);
    if (result.success) {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    setCurrentPage('dashboard');
    setSelectedUA('');
  };

  const handleChangeUser = () => {
    setShowLogoutConfirm(true);
  };

  const handleSelectUA = (uaCode) => {
    setSelectedUA(uaCode);
    setShowUASelector(false);
    setCurrentPage('dashboard');
  };

  const handleViewUA = (uaCode) => {
    setSelectedUA(uaCode);
    setCurrentPage('dashboard');
  };

  // Page de confirmation de déconnexion
  if (showLogoutConfirm && isAuthenticated) {
    return (
      <div style={styles.pageCenter}>
        <div style={styles.card}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={styles.iconWarning}>
              <LogOut size={40} color="white" />
            </div>
            <h2 style={styles.titleCenter}>Changer d'utilisateur</h2>
          </div>

          <div style={styles.currentUser}>
            <strong>Utilisateur actuel :</strong><br />
            {getName()}
          </div>

          <p style={styles.confirmText}>
            Êtes-vous sûr de vouloir vous déconnecter ?<br />
            Vous pourrez vous reconnecter avec un autre compte.
          </p>

          <button style={{ ...styles.buttonFull, background: '#f56565' }} onClick={handleLogout}>
            <LogOut size={20} style={{ marginRight: '8px' }} />
            Oui, me déconnecter
          </button>

          <button style={styles.buttonOutline} onClick={() => setShowLogoutConfirm(false)}>
            Annuler
          </button>
        </div>
      </div>
    );
  }

  // Page de connexion
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} loading={loading} error={error} />;
  }

  // Application principale avec sidebar
  return (
    <div style={styles.page}>
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isAdmin={isAdmin()}
        userName={getName()}
        userCodeUA={getCodeUA()}
        onChangeUser={handleChangeUser}
        remainingTime={getRemainingTime()}
        selectedUA={selectedUA || getCodeUA()}
        availableUAs={availableUAs}
        showUASelector={showUASelector}
        onToggleUASelector={() => setShowUASelector(!showUASelector)}
        onSelectUA={handleSelectUA}
        uaPages={uaPages}
      />

      {currentPage === 'dashboard' && (
        <Dashboard
          selectedUA={selectedUA || getCodeUA()}
          uaPage={uaPages[selectedUA || getCodeUA()]}
          isAdmin={isAdmin()}
          userCodeUA={getCodeUA()}
          loadingUA={loadingUA}
          onSavePage={saveUAPage}
          onLoadPage={loadUAPage}
        />
      )}

      {currentPage === 'profile' && (
        <ProfilePage
          userData={userData}
          remainingTime={getRemainingTime()}
          roles={getRoles()}
        />
      )}

      {currentPage === 'admin' && isAdmin() && (
        <AdminPanel
          availableUAs={availableUAs}
          uaPages={uaPages}
          onCreateUA={createNewUAPage}
          onDeleteUA={deleteUAPage}
          onViewUA={handleViewUA}
        />
      )}
    </div>
  );
}
