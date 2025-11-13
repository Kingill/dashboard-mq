# Dashboard MQ - Application Multi-UA

## 📁 Structure du projet

```
dashboard-mq/
├── api-server/                # 🔌 Backend API (Express)
│   ├── api-server.js         # Serveur API REST
│   ├── package.json          # Dépendances API
│   └── node_modules/         # Modules npm
│
├── auth-app/                  # ⚛️ Frontend React (Vite)
│   ├── src/                  # Code source React
│   │   ├── App.jsx           # Navigation principale
│   │   ├── main.jsx          # Point d'entrée
│   │   ├── components/       # Composants UI
│   │   │   ├── LoginPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── hooks/            # Hooks personnalisés
│   │   │   ├── useAuth.js    # Authentification + SessionStorage
│   │   │   └── useUAPages.js # Gestion pages UA (API)
│   │   └── styles/
│   │       └── styles.js     # Tous les styles
│   ├── index.html            # Template HTML
│   ├── vite.config.js        # Configuration Vite
│   ├── package.json          # Dépendances React
│   └── node_modules/         # Modules npm
│
└── public/
    └── ua-pages/              # 📄 Stockage pages UA (JSON)
        ├── index.json        # Liste des UAs disponibles
        ├── TestUA.json       # Exemple de page UA
        └── 2164.json         # Exemple de page UA
```

---

## 🚀 Installation & Démarrage

### 1️⃣ Backend API (Express)

```bash
cd api-server
npm install
npm start
```

**✅ API démarre sur** : `http://localhost:3001`

**Endpoints disponibles** :
```
GET    /api/health              # Health check
GET    /api/ua-pages            # Liste des UAs
GET    /api/ua-pages/:uaCode    # Page UA spécifique
POST   /api/ua-pages/:uaCode    # Créer/Modifier
DELETE /api/ua-pages/:uaCode    # Supprimer
```

### 2️⃣ Frontend React (Vite)

```bash
cd auth-app
npm install
npm run dev
```

**✅ Application démarre sur** : `http://localhost:3000`

### 3️⃣ Serveur OAuth (requis)

L'application nécessite un serveur OAuth sur `http://localhost:8000/oauth/token`

**Format de requête** :
```
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=password
username=<login>
password=<password>
client_id=FBI-Appli-Demo
```

**Réponse attendue** :
```json
{
  "access_token": "eyJhbGci...",
  "expires_in": 3600
}
```

**JWT Payload requis** :
```json
{
  "uid": "user123",
  "firstName": "Jean",
  "lastName": "Dupont",
  "CodeUA": "2164",
  "roles": "USER:ADMIN",
  "exp": 1234567890
}
```

---

## 🎯 Fonctionnalités

### Pour tous les utilisateurs

- ✅ **Connexion OAuth** avec JWT
- ✅ **Dashboard personnalisé** par code UA
- ✅ **Métriques en temps réel** (configurable)
- ✅ **Profil utilisateur** avec rôles
- ✅ **Session persistante** au refresh (sessionStorage)
- ✅ **Renouvellement automatique** si actif
- ✅ **Déconnexion par inactivité** (30min)

### Pour les administrateurs (rôle `ADMIN`)

- ✅ **Sélecteur d'UA** - Visualiser toutes les UAs
- ✅ **Créer des pages UA** - Nouvelles unités
- ✅ **Modifier le contenu** - Titre, texte, métriques
- ✅ **Supprimer des pages** - Gestion complète
- ✅ **Sauvegarde serveur** - Persistance automatique

---

## 🔐 Authentification & Session

### SessionStorage (pas localStorage)

**Avantages** :
- ✅ Persiste au refresh (F5)
- ✅ Compatible artifacts Claude.ai
- ✅ Sécurisé (nettoyage auto à la fermeture)
- ✅ Session par onglet (isolation)

### Renouvellement automatique

**Comportement** :
1. **Token expire dans < 10 minutes** ET **utilisateur actif** → Renouvellement auto +1h
2. **Inactivité > 30 minutes** → Déconnexion automatique
3. **Activité détectée** : clics, touches clavier, scroll, tactile

**Paramètres** (modifiables dans `auth-app/src/hooks/useAuth.js`) :
```javascript
// Ligne ~113 dans le useEffect de vérification
const RENEW_THRESHOLD = 10 * 60 * 1000;     // 10 minutes
const INACTIVITY_TIMEOUT = 30 * 60 * 1000;  // 30 minutes
```

---

## 📊 Gestion des pages UA

### Stockage

Les pages UA sont stockées dans `/public/ua-pages/` :
- `index.json` - Liste des UAs disponibles
- `{CodeUA}.json` - Données de chaque page UA

**Format d'une page UA** :
```json
{
  "title": "Dashboard Groupe 2164",
  "content": "Description et informations...",
  "metrics": true
}
```

### API CRUD

**Créer/Modifier** :
```bash
curl -X POST http://localhost:3001/api/ua-pages/TestUA \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mon Dashboard",
    "content": "Description...",
    "metrics": true
  }'
```

**Lire** :
```bash
curl http://localhost:3001/api/ua-pages/TestUA
```

**Supprimer** :
```bash
curl -X DELETE http://localhost:3001/api/ua-pages/TestUA
```

---

## 🔄 Multi-utilisateurs

### ✅ Ce qui fonctionne

| Scénario | Résultat |
|----------|----------|
| User A lit une page pendant que User B la modifie | ✅ Fonctionne (User A voit l'ancienne version jusqu'au refresh) |
| 10 utilisateurs lisent des pages différentes | ✅ Pas de problème |
| 5 admins créent des pages différentes | ✅ Pas de problème |

### ⚠️ Limitations

| Scénario | Problème | Solution future |
|----------|----------|----------------|
| Admin 1 et Admin 2 modifient la même page | Le dernier qui sauvegarde écrase l'autre | WebSocket ou versioning |

---

## 🛠️ Configuration

### Frontend (auth-app/vite.config.js)

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
});
```

### Backend (api-server/api-server.js)

```javascript
const PORT = 3001;
const UA_PAGES_DIR = path.join(__dirname, '../public/ua-pages');
```

---

## 🧪 Tests

### Test 1 : Session persistante
```
1. Se connecter
2. Naviguer dans l'application
3. Appuyer sur F5
✅ Résultat : Toujours connecté, même page
```

### Test 2 : Renouvellement automatique
```
1. Se connecter
2. Bouger la souris régulièrement
3. Attendre que le timer descende sous 10min
✅ Résultat : Timer remonte à 60min automatiquement
   Console : "✅ Token renouvelé automatiquement"
```

### Test 3 : Inactivité
```
1. Se connecter
2. Ne plus toucher l'ordinateur pendant 30min
✅ Résultat : Déconnexion avec message "Session expirée après inactivité"
```

### Test 4 : CRUD pages UA (Admin)
```
1. Se connecter en tant qu'admin
2. Aller dans Administration
3. Créer une nouvelle page UA
4. La modifier
5. La supprimer
✅ Résultat : Toutes les opérations fonctionnent
```

---

## 🐛 Dépannage

### Frontend ne démarre pas

```bash
cd auth-app
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### API ne démarre pas

```bash
cd api-server
rm -rf node_modules package-lock.json
npm install
npm start
```

### Erreur de connexion OAuth

Vérifier :
- ✅ Serveur OAuth actif sur `http://localhost:8000`
- ✅ Format JWT correct
- ✅ CORS activé sur le serveur OAuth

### Pages UA non sauvegardées

Vérifier :
- ✅ API active sur port 3001
- ✅ Dossier `/public/ua-pages/` existe
- ✅ Permissions d'écriture sur le dossier

### Écran blanc

Ouvrir la console (F12) et vérifier les erreurs :
```
Erreurs courantes :
- "Cannot read property of undefined" → Vérifier useAuth.js
- "Network error" → Vérifier que l'API tourne
- Dépendances circulaires → Vérifier l'ordre des hooks
```

---

## 📝 Scripts disponibles

### Frontend (auth-app/)

```bash
npm run dev      # Démarrage développement (port 3000)
npm run build    # Build production
npm run preview  # Prévisualisation build
```

### Backend (api-server/)

```bash
npm start        # Démarrage production
```

---

## 🔒 Sécurité

### Améliorations implémentées

- ✅ **SessionStorage** au lieu de localStorage (moins vulnérable)
- ✅ **Expiration automatique** des tokens
- ✅ **Déconnexion par inactivité** 
- ✅ **Validation JWT** côté client
- ✅ **Nettoyage automatique** des sessions expirées

### Recommandations pour la production

1. **HTTPS obligatoire** - Chiffrer les communications
2. **Cookies httpOnly** - Plus sûr que sessionStorage
3. **Refresh tokens** - Renouvellement côté serveur
4. **Rate limiting** - Limiter les tentatives de connexion
5. **CSRF tokens** - Protection contre CSRF

---

## 📈 Évolutions possibles

- [ ] **Graphiques Prometheus** - Intégration vraies données
- [ ] **WebSocket** - Synchronisation temps réel
- [ ] **Versioning** - Historique des modifications
- [ ] **React Router** - Navigation URL-based
- [ ] **Tests unitaires** - Jest + React Testing Library
- [ ] **TypeScript** - Typage fort

---

## 📚 Technologies

| Technologie | Version | Usage |
|-------------|---------|-------|
| **React** | 18.2.0 | UI Framework |
| **Vite** | 4.3.9 | Build tool |
| **Express** | 4.18.2 | API Backend |
| **Lucide React** | 0.263.1 | Icons |

---

## 📄 Licence

MIT

---

**Bon développement ! 🚀**
