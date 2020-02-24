const mongoose = require('mongoose');

const brokerlogSchema = new mongoose.Schema({
  portfolio: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  balance: {
    type: Number,
    required: true
  },
  equity: {
    type: Number,
    required: true
  },
  freeMargin: {
    type: Number,
    required: true
  },
  openPL: {
    type: Number,
    required: true
  }
});

mongoose.model('Brokerlog', brokerlogSchema, 'brokerlog');
