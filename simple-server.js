const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8080;

// Serve static files
app.use(express.static('.'));

// Serve the complete app at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'complete-app.html'));
});

// API endpoint to get app structure
app.get('/api/app-structure', (req, res) => {
  const structure = {
    components: fs.readdirSync('./components').filter(f => f.endsWith('.tsx')),
    contexts: fs.readdirSync('./contexts').filter(f => f.endsWith('.tsx')),
    utils: fs.readdirSync('./utils').filter(f => f.endsWith('.ts')),
    i18n: fs.readdirSync('./i18n/locales'),
    app: fs.readdirSync('./app/(tabs)').filter(f => f.endsWith('.tsx'))
  };
  res.json(structure);
});

// API endpoint to get file content
app.get('/api/file/:type/:filename', (req, res) => {
  const { type, filename } = req.params;
  const filePath = path.join(__dirname, type, filename);
  
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    res.json({ content, filename, type });
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Your real app code is now accessible!');
});