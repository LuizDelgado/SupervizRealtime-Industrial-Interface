// backend-2/server.js
const express = require('express');
const cors = require('cors'); // Importa o middleware CORS
const connectDB = require('./db');
const connectToChannel = require('./supervizChannel');
const ProductionData = require('./models/production_data'); // Importa o modelo ProductionData
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Configuração do CORS para permitir apenas o frontend do Vercel
const corsOptions = {
  origin: 'https://superviz-frontend.vercel.app', // URL do seu app do Vercel
  optionsSuccessStatus: 200, // Para navegadores antigos compatíveis com HTTP 200
};
app.use(cors(corsOptions)); // Aplica o middleware CORS com as opções configuradas

// Conectar ao MongoDB
connectDB();

// Conectar ao canal SuperViz
connectToChannel();

// Rota para ver os dados de produção salvos
app.get('/api/production-data', async (req, res) => {
  try {
    const data = await ProductionData.find(); // Busca todos os documentos na coleção ProductionData
    res.json(data); // Retorna os dados em formato JSON
  } catch (error) {
    console.error('Erro ao buscar dados:', error.message);
    res.status(500).send('Erro no servidor');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
