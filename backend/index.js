// Importando o módulo express
const express = require('express');
const cors = require('cors');

// Inicializando o aplicativo Express
const app = express();


// Definindo a porta onde a aplicação será executada
const PORT = 3000;

// Importando as rotas
const routes = require('./src/routes/routes');

// Usando as rotas
app.use(express.json());
app.use(cors());
app.use('/api', routes);

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
