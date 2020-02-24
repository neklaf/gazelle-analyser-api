const mongoose = require('mongoose');
const functions = require('../functions/sorting.js')
const calculating = require('../functions/calculating.js')
const Brokerlog = mongoose.model('Brokerlog');

const _buildBrokerlogsList = function(req, res, results) {
  let brokerlogs = [];
  results.forEach((doc) => {
    brokerlogs.push({
      portfolio: doc.portfolio,
      date: doc.date,
      balance: doc.balance,
      equity: doc.equity,
      freeMargin: doc.freeMargin,
      openPL: doc.openPL
    });
  });
  return brokerlogs.sort(functions.sortDateAscending);
};

const brokerlogByPortfolio = function(req, res) {
  let portfolio = req.params.portfolio.toUpperCase();
  if (portfolio === 'GLOBAL_DEMOS') {
    portfolio = { $ne: 'REAL' };
  }
  Brokerlog
    .aggregate([
      {
        $match: {
          portfolio: portfolio
        }
      },
      {
        $group: {
          _id: {
            $dayOfYear: {
              $dateFromString: {
                dateString: "$date"
              }
            }
          },
          portfolio: {
            $last: "$portfolio"
          },
          date: {
            $last: "$date"
          },
          balance: {
            $last: "$balance"
          },
          equity: {
            $last: "$equity"
          },
          freeMargin: {
            $last: "$freeMargin"
          },
          openPL: {
            $last: "$openPL"
          }
        }
      }
    ])
    .exec(function(err, results) {
      if (!err) {
        const brokerlogs = _buildBrokerlogsList(req, res, results);
        res
          .status(200)
          .json(brokerlogs);
      } else {
        res
          .status(404)
          .json(err);
      }
    });
};

const brokerlog30dByPortfolio = function(req, res) {
  const fromTime = new Date((Date.now() - 30 * 24 * 60 * 60 * 1000)).toISOString();
  let portfolio = req.params.portfolio.toUpperCase();
  if (portfolio === 'GLOBAL_DEMOS') {
    portfolio = { $ne: 'REAL' };
  }
  Brokerlog
    .aggregate([
      {
        $match: { $and: [
            { portfolio: portfolio },
            { date: {$gte: fromTime}}
          ]}
      },
      {
        $group: {
          _id: {
            $dayOfYear: {
              $dateFromString: {
                dateString: "$date"
              }
            }
          },
          portfolio: {
            $last: "$portfolio"
          },
          date: {
            $last: "$date"
          },
          balance: {
            $last: "$balance"
          },
          equity: {
            $last: "$equity"
          },
          freeMargin: {
            $last: "$freeMargin"
          },
          openPL: {
            $last: "$openPL"
          }
        }
      }
    ])
    .exec(function(err, results) {
      if (!err) {
        const brokerlogs = _buildBrokerlogsList(req, res, results);
        res
          .status(200)
          .json(brokerlogs);
      } else {
        res
          .status(404)
          .json(err);
      }
    });
};

const brokerlog7dByPortfolio = function(req, res) {
  const fromTime = new Date((Date.now() - 7 * 24 * 60 * 60 * 1000)).toISOString();
  let portfolio = req.params.portfolio.toUpperCase();
  if (portfolio === 'GLOBAL_DEMOS') {
    portfolio = { $ne: 'REAL' };
  }
  Brokerlog
    .aggregate([
      {
        $match: { $and: [
            { portfolio: portfolio },
            { date: {$gte: fromTime}}
          ]}
      },
      {
        $group: {
          _id: {
            $dayOfYear: {
              $dateFromString: {
                dateString: "$date"
              }
            }
          },
          portfolio: {
            $last: "$portfolio"
          },
          date: {
            $last: "$date"
          },
          balance: {
            $last: "$balance"
          },
          equity: {
            $last: "$equity"
          },
          freeMargin: {
            $last: "$freeMargin"
          },
          openPL: {
            $last: "$openPL"
          }
        }
      }
    ])
    .exec(function(err, results) {
      if (!err) {
        const brokerlogs = _buildBrokerlogsList(req, res, results);
        res
          .status(200)
          .json(brokerlogs);
      } else {
        res
          .status(404)
          .json(err);
      }
    });
};

const brokerlog24hByPortfolio = function(req, res) {
  const fromTime = new Date((Date.now() - calculating.hoursToQuery() * 60 * 60 * 1000)).toISOString();
  let portfolio = req.params.portfolio.toUpperCase();
  if (portfolio === 'GLOBAL_DEMOS') {
    portfolio = { $ne: 'REAL' };
  }
  Brokerlog
    .aggregate([
      {
        $match: { $and: [
            { portfolio: portfolio },
            { date: {$gte: fromTime}}
        ]}
      }
    ])
    .exec(function(err, results) {
      if (!err) {
        const brokerlogs = _buildBrokerlogsList(req, res, results);
        res
          .status(200)
          .json(brokerlogs);
      } else {
        res
          .status(404)
          .json(err);
      }
    });
};

module.exports = {
  brokerlogByPortfolio,
  brokerlog30dByPortfolio,
  brokerlog7dByPortfolio,
  brokerlog24hByPortfolio
};
