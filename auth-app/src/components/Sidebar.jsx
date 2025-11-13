import React from 'react';
import { BarChart3, User, Settings, ChevronDown } from 'lucide-react';
import { styles } from '../styles/styles';

export default function Sidebar({ 
  currentPage, 
  onPageChange, 
  isAdmin, 
  userName, 
  userCodeUA,
  onChangeUser,
  remainingTime,
  selectedUA,
  availableUAs,
  showUASelector,
  onToggleUASelector,
  onSelectUA,
  uaPages
}) {
  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>Dashboard MQ</div>

      {/* Sélecteur d'UA (visible uniquement pour admin) */}
      {isAdmin && (
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <button
            style={styles.uaSelectorButton}
            onClick={onToggleUASelector}
          >
            <span>📊 {selectedUA}</span>
            <ChevronDown size={20} />
          </button>
          
          {showUASelector && (
            <div style={styles.uaDropdown}>
              {availableUAs.map((uaCode) => (
                <div
                  key={uaCode}
                  style={styles.uaDropdownItem}
                  onClick={() => onSelectUA(uaCode)}
                  onMouseEnter={(e) => e.target.style.background = '#f7fafc'}
                  onMouseLeave={(e) => e.target.style.background = 'white'}
                >
                  <div style={{ fontWeight: '600' }}>{uaCode}</div>
                  <div style={{ fontSize: '12px', color: '#718096' }}>
                    {uaPages[uaCode]?.title || 'Chargement...'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Menu items */}
      <div
        style={currentPage === 'dashboard' ? styles.menuItemActive : styles.menuItem}
        onClick={() => onPageChange('dashboard')}
      >
        <BarChart3 size={20} style={{ marginRight: '12px' }} />
        Dashboard
      </div>

      <div
        style={currentPage === 'profile' ? styles.menuItemActive : styles.menuItem}
        onClick={() => onPageChange('profile')}
      >
        <User size={20} style={{ marginRight: '12px' }} />
        Mon profil
      </div>

      {isAdmin && (
        <div
          style={currentPage === 'admin' ? styles.menuItemActive : styles.menuItem}
          onClick={() => onPageChange('admin')}
        >
          <Settings size={20} style={{ marginRight: '12px' }} />
          Administration
        </div>
      )}

      {/* User info */}
      <div style={styles.userInfo}>
        <p style={styles.userInfoText}>Connecté en tant que</p>
        <p style={styles.userInfoValue}>{userName}</p>
        
        <p style={styles.userInfoText}>Mon Code UA</p>
        <p style={styles.userInfoValue}>{userCodeUA}</p>

        {remainingTime && (
          <>
            <p style={styles.userInfoText}>Session expire dans</p>
            <p style={{ ...styles.userInfoValue, color: '#48bb78' }}>{remainingTime}</p>
          </>
        )}

        <button style={styles.buttonSmall} onClick={onChangeUser}>
          Changer d'utilisateur
        </button>
      </div>
    </div>
  );
}
