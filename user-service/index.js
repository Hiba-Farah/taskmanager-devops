const express = require('express');
const app = express();
app.use(express.json());

let users = [];
let nextId = 1;

// Lire tous les utilisateurs
app.get('/users', (req, res) => {
  res.json(users);
});

// Créer un utilisateur
app.post('/users', (req, res) => {
  const user = { id: nextId++, ...req.body };
  users.push(user);
  res.status(201).json(user);
});

// Modifier un utilisateur
app.put('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
});

// Supprimer un utilisateur
app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: 'Utilisateur supprimé' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'user-service' });
});

const PORT = 3002;
app.listen(PORT, () => console.log(`user-service démarré sur le port ${PORT}`));
