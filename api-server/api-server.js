import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Chemin vers le dossier des pages UA
const UA_PAGES_DIR = path.join(__dirname, '../public/ua-pages');

// Middleware
app.use(cors());
app.use(express.json());

// Créer le dossier ua-pages s'il n'existe pas
async function ensureUAPagesDir() {
  try {
    await fs.access(UA_PAGES_DIR);
  } catch {
    await fs.mkdir(UA_PAGES_DIR, { recursive: true });
    console.log('✅ Dossier ua-pages créé');
  }
}

// GET - Récupérer la liste des UAs disponibles
app.get('/api/ua-pages', async (req, res) => {
  try {
    const files = await fs.readdir(UA_PAGES_DIR);
    const uaFiles = files.filter(f => f.endsWith('.json') && f !== 'index.json');
    const uas = uaFiles.map(f => f.replace('.json', ''));
    
    res.json({ uas, count: uas.length });
  } catch (error) {
    console.error('Erreur lecture dossier:', error);
    res.status(500).json({ error: 'Erreur lecture des pages UA' });
  }
});

// GET - Récupérer une page UA spécifique
app.get('/api/ua-pages/:uaCode', async (req, res) => {
  try {
    const { uaCode } = req.params;
    const filePath = path.join(UA_PAGES_DIR, `${uaCode}.json`);
    
    const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content);
    
    res.json(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: 'Page UA non trouvée' });
    } else {
      console.error('Erreur lecture page UA:', error);
      res.status(500).json({ error: 'Erreur lecture de la page' });
    }
  }
});

// POST - Créer ou mettre à jour une page UA
app.post('/api/ua-pages/:uaCode', async (req, res) => {
  try {
    const { uaCode } = req.params;
    const { title, content, metrics } = req.body;
    
    // Validation
    if (!title || !content) {
      return res.status(400).json({ error: 'Titre et contenu requis' });
    }
    
    const pageData = {
      title,
      content,
      metrics: metrics !== undefined ? metrics : true
    };
    
    const filePath = path.join(UA_PAGES_DIR, `${uaCode}.json`);
    await fs.writeFile(filePath, JSON.stringify(pageData, null, 2), 'utf-8');
    
    // Mettre à jour l'index
    await updateIndex();
    
    console.log(`✅ Page ${uaCode} sauvegardée`);
    res.json({ success: true, message: `Page ${uaCode} sauvegardée`, data: pageData });
  } catch (error) {
    console.error('Erreur sauvegarde page UA:', error);
    res.status(500).json({ error: 'Erreur sauvegarde de la page' });
  }
});

// DELETE - Supprimer une page UA
app.delete('/api/ua-pages/:uaCode', async (req, res) => {
  try {
    const { uaCode } = req.params;
    const filePath = path.join(UA_PAGES_DIR, `${uaCode}.json`);
    
    await fs.unlink(filePath);
    await updateIndex();
    
    console.log(`✅ Page ${uaCode} supprimée`);
    res.json({ success: true, message: `Page ${uaCode} supprimée` });
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: 'Page UA non trouvée' });
    } else {
      console.error('Erreur suppression page UA:', error);
      res.status(500).json({ error: 'Erreur suppression de la page' });
    }
  }
});

// GET - Récupérer l'index des UAs
app.get('/api/ua-pages-index', async (req, res) => {
  try {
    const indexPath = path.join(UA_PAGES_DIR, 'index.json');
    const content = await fs.readFile(indexPath, 'utf-8');
    const data = JSON.parse(content);
    
    res.json(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Créer l'index s'il n'existe pas
      await updateIndex();
      res.json({ uas: [], lastUpdate: new Date().toISOString() });
    } else {
      console.error('Erreur lecture index:', error);
      res.status(500).json({ error: 'Erreur lecture de l\'index' });
    }
  }
});

// Fonction pour mettre à jour l'index
async function updateIndex() {
  try {
    const files = await fs.readdir(UA_PAGES_DIR);
    const uaFiles = files.filter(f => f.endsWith('.json') && f !== 'index.json');
    const uas = uaFiles.map(f => f.replace('.json', ''));
    
    const indexData = {
      uas,
      lastUpdate: new Date().toISOString()
    };
    
    const indexPath = path.join(UA_PAGES_DIR, 'index.json');
    await fs.writeFile(indexPath, JSON.stringify(indexData, null, 2), 'utf-8');
    
    console.log('✅ Index mis à jour');
  } catch (error) {
    console.error('Erreur mise à jour index:', error);
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API UA Pages en ligne' });
});

// Démarrage du serveur
async function start() {
  await ensureUAPagesDir();
  
  app.listen(PORT, () => {
    console.log(`🚀 API UA Pages démarrée sur http://localhost:${PORT}`);
    console.log(`📁 Dossier pages UA: ${UA_PAGES_DIR}`);
    console.log(`\nEndpoints disponibles:`);
    console.log(`  GET    /api/health`);
    console.log(`  GET    /api/ua-pages`);
    console.log(`  GET    /api/ua-pages/:uaCode`);
    console.log(`  POST   /api/ua-pages/:uaCode`);
    console.log(`  DELETE /api/ua-pages/:uaCode`);
    console.log(`  GET    /api/ua-pages-index`);
  });
}

start();
