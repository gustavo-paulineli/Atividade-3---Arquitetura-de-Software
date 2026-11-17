const express = require('express');
const path = require('path');
const tarefaRoutes = require('./routes/tarefaRoutes');

const app = express();
const PORT = 3000;

// Configuração do motor de visualização EJS (Camada View)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares para interpretar formulários e arquivos estáticos
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Redirecionar raiz para /tarefas
app.get('/', (req, res) => {
  res.redirect('/tarefas');
});

// Rotas de tarefas
app.use('/tarefas', tarefaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
