const mongoose = require('mongoose');

const instrumentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  isin: {
    type: String,
    required: true
  },
  market: {
    type: String,
    required: true
  },
  profile: {
    type: String,
    required: true
  },
  sector: {
    type: String,
    required: true
  },
  updated: {
    type: Date,
    required: true
  },
  Recommendations: [{
    symbolUrl: {
      type: String,
      required: true
    },
    weeklyMacd12_26_action: {
      type: String,
      required: true
    },
    weeklyMacd12_26_value: {
      type: Number,
      required: true
    },
    dailyStochRsi14_value: {
      type: Number,
      required: true
    },
    dailyStochRsi14_action: {
      type: String,
      required: true
    },
    market: {
      type: String,
      required: true
    },
    sector: {
      type: String,
      required: true
    },
    updated: {
      type: Date,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    }
  }]
});

mongoose.model('Instrument', instrumentSchema, 'watchlist');
