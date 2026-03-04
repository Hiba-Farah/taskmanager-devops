const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];
let nextId = 1;

// Lire toutes les tâches
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Créer une tâche
app.post('/tasks', (req, res) => {
  const task = { id: nextId++, ...req.body, status: 'pending' };
  tasks.push(task);
  res.status(201).json(task);
});

// Modifier une tâche
app.put('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Tâche non trouvée' });
  tasks[index] = { ...tasks[index], ...req.body };
  res.json(tasks[index]);
});

// Supprimer une tâche
app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.json({ message: 'Tâche supprimée' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'task-service' });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`task-service démarré sur le port ${PORT}`));
