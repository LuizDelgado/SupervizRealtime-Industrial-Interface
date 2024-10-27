// backend-2/models/ProductionData.js
const mongoose = require('mongoose');

const productionDataSchema = new mongoose.Schema({
  piece: { type: String, required: true },
  productionTime: { type: Number, required: true },
  insights: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProductionData', productionDataSchema, 'production_data');
