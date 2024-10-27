// frontend/src/services/supervizService.js
import { Realtime } from '@superviz/realtime';

let channelInstance = null; // Variável global para armazenar a instância do canal
let isSubscribed = false; // Controle de inscrição única

// Função para traduzir a cor da peça
const translatePieceColor = (piece) => {
  const colors = {
    'Prata': 'Silver',
    'Vermelha': 'Red',
    'Preta': 'Black',
  };
  return colors[piece] || piece; // Retorna a cor traduzida ou a original, se não encontrada
};

// Conecta ao canal do frontend
export const connectToFrontendChannel = async (participantId) => {
  const CHANNEL_NAME = 'RealtimePlant4Frontend';

  // Retorna o canal existente se já estiver conectado e inscrito
  if (channelInstance && isSubscribed) {
    console.log('Já conectado e inscrito no canal.');
    return channelInstance;
  }

  const realtime = new Realtime('zerm0x1519m5gaqjotr4tfs4myafsg', {
    participant: {
      id: participantId,
    },
  });

  try {
    const channel = await realtime.connect(CHANNEL_NAME);
    channelInstance = channel; // Armazena a instância do canal
    console.log('Conectado ao canal de frontend com sucesso.');

    // Inscreve-se no evento uma vez
    if (!isSubscribed) {
      channelInstance.subscribe('producao.atualizacao', (data) => {
        if (data?.data?.message) {
          processPayloadData(data); // Chama o processamento de dados diretamente
        }
      });
      isSubscribed = true; // Marca como inscrito
      console.log('Inscrito no canal de frontend.');
    }

    // Adiciona listener para desconectar ao recarregar ou fechar a página
    window.addEventListener('beforeunload', disconnectFromFrontendChannel);

    return channelInstance;
  } catch (error) {
    console.error('Erro ao conectar ao canal de frontend:', error.message);
    throw error;
  }
};

// Desconecta do canal do frontend
export const disconnectFromFrontendChannel = async () => {
  if (channelInstance) {
    await channelInstance.disconnect(); // Espera a desconexão completa
    channelInstance = null;
    isSubscribed = false; // Redefine inscrição
    console.log('Desconectado do canal de frontend.');

    // Remove listener ao desconectar
    window.removeEventListener('beforeunload', disconnectFromFrontendChannel);
  }
};

export const processPayloadData = (event) => {
  const messages = event.data?.message;
  if (!messages || !Array.isArray(messages)) {
    console.warn('Mensagem de produção inválida recebida:', event);
    return {
      silverCount: 0,
      redCount: 0,
      blackCount: 0,
      productionTimes: [],
      lastPieceInfo: null,
      avgProductionTime: 0,
    };
  }

  // Estrutura para armazenar dados processados
  const data = {
    silverCount: 0,
    redCount: 0,
    blackCount: 0,
    productionTimes: [],
    lastPieceInfo: null,
    avgProductionTime: 0,
  };

  // Processa cada peça na lista de mensagens
  messages.forEach(({ piece, productionTime, insights }, index) => {
    const translatedPiece = translatePieceColor(piece); // Traduz a cor da peça para o inglês

    if (translatedPiece === 'Silver') data.silverCount += 1;
    if (translatedPiece === 'Red') data.redCount += 1;
    if (translatedPiece === 'Black') data.blackCount += 1;

    // Armazena o tempo de produção
    data.productionTimes.push(productionTime);

    // Define a última peça produzida como o último item da lista
    if (index === messages.length - 1) {
      data.lastPieceInfo = {
        peca: translatedPiece,
        tempo_producao: productionTime,
        insights: insights || 'Nenhum insight gerado.',
      };
    }
  });

  // Calcula o tempo médio de produção
  if (data.productionTimes.length > 0) {
    data.avgProductionTime =
      data.productionTimes.reduce((sum, time) => sum + time, 0) / data.productionTimes.length;
  }

  console.log('Dados formatados retornados para o Dashboard:', data);
  return data;
};
