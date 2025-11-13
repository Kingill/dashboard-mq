export const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    fontFamily: 'system-ui, sans-serif'
  },
  pageCenter: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'system-ui, sans-serif'
  },
  sidebar: {
    width: '250px',
    background: 'rgba(255,255,255,0.95)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: '30px',
    textAlign: 'center'
  },
  menuItem: {
    padding: '12px 16px',
    marginBottom: '8px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: '#4a5568',
    transition: 'all 0.2s'
  },
  menuItemActive: {
    padding: '12px 16px',
    marginBottom: '8px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    background: '#667eea',
    color: 'white',
    fontWeight: '600'
  },
  uaSelectorButton: {
    width: '100%',
    padding: '12px 16px',
    marginBottom: '20px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#f7fafc',
    border: '2px solid #e2e8f0',
    color: '#1a202c',
    fontWeight: '600',
    fontSize: '14px'
  },
  uaDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    marginTop: '4px',
    maxHeight: '300px',
    overflowY: 'auto',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    zIndex: 1000
  },
  uaDropdownItem: {
    padding: '12px 16px',
    cursor: 'pointer',
    borderBottom: '1px solid #f7fafc',
    transition: 'background 0.2s'
  },
  userInfo: {
    marginTop: 'auto',
    paddingTop: '20px',
    borderTop: '1px solid #e2e8f0'
  },
  userInfoText: {
    fontSize: '12px',
    color: '#718096',
    marginBottom: '4px'
  },
  userInfoValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: '12px'
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    padding: '40px',
    width: '100%',
    maxWidth: '480px'
  },
  cardLarge: {
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '30px',
    marginBottom: '20px'
  },
  dashboardHeader: {
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '30px',
    marginBottom: '30px',
    position: 'relative'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  metricCard: {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  metricIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  metricContent: {
    flex: 1,
    marginLeft: '16px'
  },
  metricLabel: {
    fontSize: '14px',
    color: '#718096',
    marginBottom: '4px'
  },
  metricValue: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a202c'
  },
  metricChange: {
    fontSize: '12px',
    color: '#48bb78',
    marginTop: '4px'
  },
  icon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: '#667eea',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px'
  },
  iconWarning: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: '#ed8936',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: '10px'
  },
  titleCenter: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a202c',
    textAlign: 'center',
    marginBottom: '10px'
  },
  subtitle: {
    color: '#718096',
    marginBottom: '8px',
    fontSize: '16px',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.6'
  },
  subtitleCenter: {
    color: '#718096',
    textAlign: 'center',
    marginBottom: '30px'
  },
  error: {
    background: '#fed7d7',
    border: '1px solid #fc8181',
    borderRadius: '10px',
    padding: '12px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    color: '#c53030',
    fontSize: '14px'
  },
  info: {
    background: '#bee3f8',
    border: '1px solid #4299e1',
    borderRadius: '10px',
    padding: '16px',
    marginBottom: '20px',
    color: '#2c5282',
    fontSize: '14px',
    lineHeight: '1.6'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: '8px',
    marginTop: '15px'
  },
  inputBox: {
    position: 'relative'
  },
  input: {
    width: '100%',
    padding: '12px 40px',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '16px',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '16px',
    boxSizing: 'border-box',
    minHeight: '250px',
    fontFamily: 'system-ui, sans-serif',
    resize: 'vertical'
  },
  iconInput: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#cbd5e0'
  },
  eyeBtn: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0
  },
  button: {
    padding: '12px 24px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px'
  },
  buttonFull: {
    width: '100%',
    padding: '14px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonDisabled: {
    background: '#a0aec0',
    cursor: 'not-allowed'
  },
  buttonSecondary: {
    padding: '12px 24px',
    background: '#718096',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px'
  },
  buttonDanger: {
    padding: '8px 16px',
    background: '#f56565',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonOutline: {
    width: '100%',
    padding: '14px',
    background: 'white',
    color: '#718096',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px'
  },
  buttonSmall: {
    width: '100%',
    padding: '8px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px'
  },
  timer: {
    background: '#e6fffa',
    border: '1px solid #81e6d9',
    borderRadius: '10px',
    padding: '12px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#234e52',
    fontSize: '14px',
    fontWeight: '600'
  },
  confirmText: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#4a5568',
    marginBottom: '20px',
    lineHeight: '1.6'
  },
  currentUser: {
    background: '#fef5e7',
    border: '1px solid #f9ca24',
    borderRadius: '10px',
    padding: '12px',
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#7f6a00'
  },
  uaBadge: {
    display: 'inline-block',
    background: '#667eea',
    color: 'white',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '16px'
  },
  adminBadge: {
    display: 'inline-block',
    background: '#f56565',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    marginLeft: '10px'
  },
  editOverlay: {
    background: 'rgba(102, 126, 234, 0.1)',
    border: '3px dashed #667eea',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '20px'
  },
  checkbox: {
    marginRight: '8px',
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#4a5568',
    cursor: 'pointer'
  },
  editModeBar: {
    background: '#667eea',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '10px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
};
