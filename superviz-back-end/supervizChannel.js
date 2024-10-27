// backend-2/supervizChannel.js
const { Realtime } = require('@superviz/realtime');
const ProductionData = require('./models/production_data');
require('dotenv').config();

const realtime = new Realtime({
  clientId: process.env.SUPERVIZ_CLIENT_ID,
  secret: process.env.SUPERVIZ_SECRET_KEY,
}, {
  participant: {
    id: 'backend-2-publisher',
  },
});

async function connectToFrontendChannel() {
  try {
    const channel = await realtime.connect('RealtimePlant4Frontend');
    console.log('Conectado ao canal: RealtimePlant4Frontend');

    // Função para enviar dados acumulados ao frontend
    const sendProductionDataToChannel = async () => {
      try {
        const allData = await ProductionData.find().sort({ timestamp: -1 });

        // Formata o payload para incluir todos os dados de produção
        const payload = allData.map((entry) => ({
          piece: entry.piece,
          productionTime: entry.productionTime,
          insights: entry.insights,
        }));

        // Envia o payload completo para o frontend via SuperViz
        channel.publish('producao.atualizacao', { message: payload });
      } catch (error) {
        console.error('Erro ao enviar dados para o canal:', error.message);
      }
    };

    // Função para verificar novos participantes e enviar dados quando necessário
    const checkForNewParticipants = async () => {
      try {
        const activeParticipants = await channel.participant.getAll();
        let actualparticipantnumber = activeParticipants.length
        // Envia dados para novos participantes
        if (activeParticipants.length > 0) {
          await sendProductionDataToChannel();
        }
      } catch (error) {
        console.error('Erro ao verificar participantes ativos:', error.message);
      }
    };

    // Escuta eventos de produção e os armazena no MongoDB
    channel.subscribe('producao.concluida', async (event) => {
      try {
        const { peca, tempo_producao, insights } = event.data || {};

        if (peca && typeof tempo_producao === 'number') {
          const productionData = new ProductionData({
            piece: peca,
            productionTime: tempo_producao,
            insights: insights || 'Nenhum insight gerado.',
          });

          await productionData.save();
          await sendProductionDataToChannel();
        }
      } catch (error) {
        console.error('Erro ao salvar dados no MongoDB:', error);
      }
    });

    // Checa continuamente por novos participantes a cada 3 segundos
    setInterval(checkForNewParticipants, 5000);
  } catch (error) {
    console.error('Erro ao conectar ao canal SuperViz:', error.message);
  }
}

module.exports = connectToFrontendChannel;