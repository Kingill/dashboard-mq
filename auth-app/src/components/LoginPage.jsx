import React, { useState } from 'react';
import { AlertCircle, Lock, User, Eye, EyeOff } from 'lucide-react';
import { styles } from '../styles/styles';

export default function LoginPage({ onLogin, loading, error }) {
  const [formData, setFormData] = useState({ login: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onLogin(formData.login, formData.password);
  };

  return (
    <div style={styles.pageCenter}>
      <div style={styles.card}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={styles.icon}>
            <Lock size={40} color="white" />
          </div>
          <h1 style={styles.titleCenter}>Connexion</h1>
          <p style={styles.subtitleCenter}>Accédez à votre espace professionnel</p>
        </div>

        {error && (
          <div style={styles.error}>
            <AlertCircle size={20} style={{ marginRight: '8px' }} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Identifiant</label>
          <div style={styles.inputBox}>
            <div style={styles.iconInput}><User size={20} /></div>
            <input
              type="text"
              name="login"
              value={formData.login}
              onChange={(e) => setFormData({ ...formData, login: e.target.value })}
              style={styles.input}
              placeholder="Votre identifiant"
              required
            />
          </div>

          <label style={styles.label}>Mot de passe</label>
          <div style={styles.inputBox}>
            <div style={styles.iconInput}><Lock size={20} /></div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={styles.input}
              placeholder="Votre mot de passe"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}
            >
              {showPassword ? <EyeOff size={20} color="#cbd5e0" /> : <Eye size={20} color="#cbd5e0" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={loading ? { ...styles.buttonFull, ...styles.buttonDisabled } : styles.buttonFull}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
