import React, { useState } from 'react';
import { Plus, FileText, Eye, Trash2, Download } from 'lucide-react';
import { styles } from '../styles/styles';

export default function AdminPanel({ 
  availableUAs, 
  uaPages, 
  onCreateUA, 
  onDeleteUA, 
  onViewUA 
}) {
  const [newUACode, setNewUACode] = useState('');
  const [creating, setCreating] = useState(false);

  const handleCreateUA = async () => {
    if (!newUACode.trim()) {
      alert('⚠️ Veuillez saisir un code UA');
      return;
    }

    setCreating(true);
    const result = await onCreateUA(newUACode.trim());
    setCreating(false);

    if (result.success) {
      alert(`✅ Page UA "${newUACode}" créée avec succès !`);
      setNewUACode('');
    } else {
      alert(`❌ Erreur: ${result.error}`);
    }
  };

  const handleDeleteUA = async (uaCode) => {
    if (!confirm(`❌ Supprimer la page du groupe ${uaCode} ?\n\nCette action est irréversible.`)) {
      return;
    }

    const result = await onDeleteUA(uaCode);
    
    if (result.success) {
      alert(`✅ Page "${uaCode}" supprimée avec succès`);
    } else {
      alert(`❌ Erreur: ${result.error}`);
    }
  };

  return (
    <div style={styles.mainContent}>
      <div style={styles.dashboardHeader}>
        <h1 style={styles.title}>
          Administration
          <span style={styles.adminBadge}>ADMIN</span>
        </h1>
        <p style={{...styles.subtitle, whiteSpace: 'normal'}}>
          Gérez les pages personnalisées pour chaque groupe UA
        </p>
      </div>

      <div style={styles.info}>
        🔄 <strong>API Backend</strong><br/>
        Les pages UA sont gérées par l'API sur <code>http://localhost:3001/api</code><br/>
        • Les données sont stockées dans <code>/public/ua-pages/</code><br/>
        • Les modifications sont automatiquement sauvegardées sur le serveur<br/>
        • Support multi-utilisateurs (⚠️ dernière sauvegarde écrase les précédentes)
      </div>

      {/* Créer une nouvelle page UA */}
      <div style={styles.cardLarge}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
          <Plus size={24} style={{ marginRight: '8px' }} />
          Créer une nouvelle page UA
        </h2>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Code UA</label>
            <input
              type="text"
              value={newUACode}
              onChange={(e) => setNewUACode(e.target.value)}
              placeholder="Ex: UA3456"
              style={{ ...styles.input, padding: '12px' }}
              disabled={creating}
            />
          </div>
          <button 
            style={creating ? { ...styles.button, ...styles.buttonDisabled } : styles.button} 
            onClick={handleCreateUA}
            disabled={creating}
          >
            <Plus size={20} style={{ marginRight: '8px' }} />
            {creating ? 'Création...' : 'Créer'}
          </button>
        </div>
      </div>

      {/* Liste des pages UA existantes */}
      <div style={styles.cardLarge}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
          <FileText size={24} style={{ marginRight: '8px' }} />
          Pages UA existantes ({availableUAs.length})
        </h2>
        
        {availableUAs.length === 0 ? (
          <div style={{
            background: '#f7fafc',
            borderRadius: '10px',
            padding: '40px 20px',
            textAlign: 'center',
            color: '#a0aec0'
          }}>
            <FileText size={48} style={{ margin: '0 auto 16px' }} />
            <p>Aucune page UA créée</p>
            <p style={{ fontSize: '14px', marginTop: '8px' }}>
              Créez votre première page UA ci-dessus
            </p>
          </div>
        ) : (
          availableUAs.map((uaCode) => (
            <div
              key={uaCode}
              style={{
                background: '#f7fafc',
                borderRadius: '10px',
                padding: '16px',
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '4px' }}>
                  📄 {uaCode}
                </div>
                <div style={{ fontSize: '14px', color: '#718096' }}>
                  {uaPages[uaCode]?.title || 'Non chargé'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  style={styles.button}
                  onClick={() => onViewUA(uaCode)}
                >
                  <Eye size={16} style={{ marginRight: '6px' }} />
                  Voir
                </button>
                <button
                  style={styles.buttonDanger}
                  onClick={() => handleDeleteUA(uaCode)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
