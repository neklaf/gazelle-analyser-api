const mongoose = require('mongoose');

const operationSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  closePrice: {
    type: Number,
    required: true
  },
  closeTime: {
    type: Date,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  lots: {
    type: Number,
    required: true
  },
  netProfit: {
    type: Number,
    required: true
  },
  openPrice: {
    type: Number,
    required: true
  },
  openTime: {
    type: Date,
    required: true
  },
  profit: {
    type: Number,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  updated: {
    type: Date,
    required: true
  },
  portfolio: {
    type: String,
    required: true
  }
});

mongoose.model('Operation', operationSchema, 'closedpositions');
