// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { connectToFrontendChannel, disconnectFromFrontendChannel, processPayloadData } from '../services/supervizService';
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [productionData, setProductionData] = useState({
    silverCount: 0,
    redCount: 0,
    blackCount: 0,
    productionTimes: [],
    lastPieceInfo: null,
    avgProductionTime: 0,
  });
  const navigate = useNavigate();
  const participantName = localStorage.getItem('participantName');
  const participantId = localStorage.getItem('participantId');

  useEffect(() => {
    if (!participantId) return;

    const initializeChannel = async () => {
      try {
        const channel = await connectToFrontendChannel(participantId);
        channel.subscribe('producao.atualizacao', (data) => {
          const updatedData = processPayloadData(data);
          setProductionData(updatedData);
        });

        console.log('Conexão ao canal de frontend estabelecida com sucesso.');
      } catch (error) {
        console.error('Erro ao conectar ao canal:', error.message);
      }
    };

    initializeChannel();

    return () => {
      disconnectFromFrontendChannel();
      console.log('Desconectado do canal de frontend.');
    };
  }, [participantId]);

  const handleLogout = () => {
    disconnectFromFrontendChannel();
    localStorage.removeItem('participantName');
    localStorage.removeItem('participantId');
    navigate('/login');
  };

  const { silverCount, redCount, blackCount, productionTimes, avgProductionTime, lastPieceInfo } = productionData;

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 p-4" style={{ backgroundColor: '#5A2DFF', color: 'white' }}>
        <h1 className="text-xl font-bold">Production Dashboard</h1>
        {participantName && (
          <div className="flex items-center space-x-4">
            <p>Welcome, {participantName}!</p>
            <button
              onClick={handleLogout}
              className="bg-white text-[#5A2DFF] px-4 py-2 rounded"
              style={{ borderColor: '#5A2DFF', borderWidth: 1 }}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow-md p-2 text-center">
          <h2 className="text-lg font-bold">Silver Pieces</h2>
          <p className="text-xl">{silverCount}</p>
        </div>
        <div className="bg-white shadow-md p-2 text-center">
          <h2 className="text-lg font-bold">Red Pieces</h2>
          <p className="text-xl">{redCount}</p>
        </div>
        <div className="bg-white shadow-md p-2 text-center">
          <h2 className="text-lg font-bold">Black Pieces</h2>
          <p className="text-xl">{blackCount}</p>
        </div>
      </div>

      {/* Compact Grid for Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white shadow-md p-4">
          <h2 className="text-lg font-bold mb-2">Piece Distribution</h2>
          <PieChart data={[silverCount, redCount, blackCount]} width={200} height={200} />
        </div>
        <div className="bg-white shadow-md p-4">
          <h2 className="text-lg font-bold mb-2">Production by Color</h2>
          <BarChart data={{ Silver: silverCount, Red: redCount, Black: blackCount }} width={200} height={200} />
        </div>
      </div>

      {/* Last Produced Piece */}
      <div className="bg-white shadow-md p-4 mb-6">
        <h2 className="text-lg font-bold mb-2">Last Produced Piece</h2>
        {lastPieceInfo ? (
          <div>
            <p><strong>Piece:</strong> {lastPieceInfo.peca}</p>
            <p><strong>Production Time:</strong> {lastPieceInfo.tempo_producao.toFixed(2)} seconds</p>
            <p><strong>Insights from Gemini AI's:</strong> {lastPieceInfo.insights}</p>
          </div>
        ) : (
          <p>No recent pieces produced.</p>
        )}
      </div>

      {/* Line Chart for Production Time */}
      <div className="bg-white shadow-md p-4">
        <h2 className="text-lg font-bold mb-2">Production Time Over Time</h2>
        <LineChart data={productionTimes} avgTime={avgProductionTime} width={400} height={150} />
      </div>
    </div>
  );
};

export default Dashboard;
