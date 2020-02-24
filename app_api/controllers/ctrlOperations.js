const mongoose = require('mongoose');
const sorting = require('../functions/sorting.js');
const Operation = mongoose.model('Operation');

const _buildOperationList = function(req, res, results) {
  let operations = [];
  results.forEach((doc) => {
    operations.push({
      _id: doc._id,
      closePrice: doc.closePrice,
      closeTime: doc.closeTime,
      comment: doc.comment,
      lots: doc.lots,
      netProfit: doc.netProfit,
      openPrice: doc.openPrice,
      openTime: doc.openTime,
      profit: doc.profit,
      symbol: doc.symbol,
      type: doc.type,
      updated: doc.updated,
      portfolio: doc.portfolio
    });
  });
  return operations.sort(sorting.sortCloseTimeAsc);
};

const operationList = function(req, res) {
  let portfolio = req.params.portfolio.toUpperCase();
  if (portfolio === 'GLOBAL_DEMOS') {
    portfolio = { $ne: 'REAL' };
  }
  Operation
    .find(
      {
        $and: [
          {"portfolio": portfolio},
          {"closeTime": {$gt: "2019-06-24T00:00:00Z"}}
        ]
      }
    )
    .exec(function(err, results) {
      if (!err) {
        const operations = _buildOperationList(req, res, results);
        res
          .status(200)
          .json(operations);
      } else {
        res
          .status(404)
          .json(err);
      }
  });
};

const operationListByPeriod = function(req, res) {
  let daysToQuery = 0;
  switch (req.params.period) {
    case '30d':
      daysToQuery = 30;
      break;
    case '7d':
      daysToQuery = 7;
      break;
    case '1d':
      daysToQuery = 1;
      break;
    default:
      daysToQuery = 0;
  }
  let portfolio = req.params.portfolio.toUpperCase();
  if (portfolio === 'GLOBAL_DEMOS') {
    portfolio = { $ne: 'REAL' };
  }
  Operation
    .find(
      {
        $and: [
          {"portfolio": portfolio},
          {"closeTime": {$gt: new Date((Date.now() - daysToQuery * 24 * 60 * 60 * 1000))}}
        ]
      }
    )
    .exec(function(err, results) {
      if (!err) {
        const operations = _buildOperationList(req, res, results);
        res
          .status(200)
          .json(operations);
      } else {
        res
          .status(404)
          .json(err);
      }
    })
};

module.exports = {
  operationList,
  operationListByPeriod
};
