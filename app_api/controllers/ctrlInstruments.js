const mongoose = require('mongoose');
const sorting = require('../functions/sorting.js');
const Instrument = mongoose.model('Instrument');

const _buildInstrumentList = function(req, res, results) {
  let instruments = [];
  results.forEach((doc) => {
    instruments.push({
      _id: doc._id,
      fullname: doc.fullname,
      isin: doc.isin,
      market: doc.market,
      profile: doc.profile,
      sector: doc.sector,
      updated: doc.updated
    });
  });
  // Sorting by name asc
  return instruments.sort(sorting.sortIdAscending);
};

const instrumentList = function(req, res) {
  Instrument
    .find({})
    .exec(function(err, results) {
      if (!err) {
        const instruments = _buildInstrumentList(req, res, results);
        res
          .status(200)
          .json(instruments);
      } else {
        res
          .status(404)
          .json(err);
      }
    });
};

const instrumentById = function (req, res) {
  Instrument
    .find(
      { "_id" : req.params._id }
    )
    .exec(function (err, results) {
      if (!err) {
        const instruments = _buildInstrumentList(req, res, results);
        res
          .status(200)
          .json(instruments);
      } else {
        res
          .status(404)
          .json(err);
      }
    });
};

module.exports = {
  instrumentList,
  instrumentById
};
