import React from 'react';
import { Clock, User as UserIcon } from 'lucide-react';
import { styles } from '../styles/styles';

export default function ProfilePage({ userData, remainingTime, roles }) {
  return (
    <div style={styles.mainContent}>
      <div style={styles.cardLarge}>
        <h1 style={styles.title}>Mon profil</h1>
        
        {remainingTime && (
          <div style={styles.timer}>
            <Clock size={18} style={{ marginRight: '8px' }} />
            Session expire dans : {remainingTime}
          </div>
        )}

        <div style={{ marginTop: '30px' }}>
          <div style={{ 
            background: '#f7fafc', 
            borderRadius: '12px', 
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <UserIcon size={20} style={{ marginRight: '8px' }} />
              Informations personnelles
            </h3>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              {userData?.lastName && (
                <div>
                  <span style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>NOM</span>
                  <p style={{ fontSize: '16px', color: '#1a202c', marginTop: '4px' }}>{userData.lastName}</p>
                </div>
              )}
              
              {userData?.firstName && (
                <div>
                  <span style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>PRÉNOM</span>
                  <p style={{ fontSize: '16px', color: '#1a202c', marginTop: '4px' }}>{userData.firstName}</p>
                </div>
              )}
              
              {userData?.uid && (
                <div>
                  <span style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>IDENTIFIANT</span>
                  <p style={{ fontSize: '16px', color: '#1a202c', marginTop: '4px' }}>{userData.uid}</p>
                </div>
              )}
              
              {userData?.CodeUA && (
                <div>
                  <span style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>CODE UA</span>
                  <p style={{ fontSize: '16px', color: '#1a202c', marginTop: '4px' }}>{userData.CodeUA}</p>
                </div>
              )}
              
              {userData?.principal && (
                <div>
                  <span style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>PRINCIPAL</span>
                  <p style={{ fontSize: '16px', color: '#1a202c', marginTop: '4px' }}>{userData.principal}</p>
                </div>
              )}
            </div>
          </div>

          <div style={{ 
            background: '#f7fafc', 
            borderRadius: '12px', 
            padding: '20px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
              Rôles et permissions
            </h3>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {roles.length > 0 ? (
                roles.map((role, index) => (
                  <span
                    key={index}
                    style={{
                      background: role === 'ADMIN' ? '#667eea' : '#e2e8f0',
                      color: role === 'ADMIN' ? 'white' : '#4a5568',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    {role}
                  </span>
                ))
              ) : (
                <span style={{ color: '#718096', fontSize: '14px' }}>Aucun rôle défini</span>
              )}
            </div>
          </div>

          {userData && (
            <div style={{ 
              background: '#e6fffa', 
              border: '1px solid #81e6d9',
              borderRadius: '12px', 
              padding: '20px',
              marginTop: '20px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#234e52' }}>
                Données JWT complètes
              </h3>
              <pre style={{ 
                background: 'white', 
                padding: '16px', 
                borderRadius: '8px',
                overflow: 'auto',
                fontSize: '12px',
                color: '#1a202c',
                border: '1px solid #81e6d9'
              }}>
                {JSON.stringify(userData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
