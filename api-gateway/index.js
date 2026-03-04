const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const proxy = httpProxy.createProxyServer({ ignorePath: false });

proxy.on('error', (err, req, res) => {
  res.writeHead(500);
  res.end('Erreur proxy');
});

const TASK_SERVICE = process.env.TASK_SERVICE_URL || 'http://localhost:3001';
const USER_SERVICE = process.env.USER_SERVICE_URL || 'http://localhost:3002';

app.use('/tasks', (req, res) => {
  req.url = '/tasks' + (req.url === '/' ? '' : req.url);
  proxy.web(req, res, { target: TASK_SERVICE });
});

app.use('/users', (req, res) => {
  req.url = '/users' + (req.url === '/' ? '' : req.url);
  proxy.web(req, res, { target: USER_SERVICE });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'api-gateway' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('api-gateway démarrée sur le port 3000');
});
