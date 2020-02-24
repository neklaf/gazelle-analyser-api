const mongoose = require('mongoose');
const sorting = require('../functions/sorting.js')
const calculating = require('../functions/calculating.js')
const Instrument = mongoose.model('Instrument');

const _buildOpportunityList = function(req, res, results) {
  let opportunities = [];
  results.forEach((doc) => {
    doc.Recommendations.forEach((val, key, rec) => {
      if (Object.is(rec.length -1, key)) {
        // Calculating Rating
        let rating = 0;
        if (val.weeklyMacd12_26_action === "Buy") {
          rating = val.weeklyMacd12_26_value * 10 + 100 - val.dailyStochRsi14_value;
        } else {
          rating = -val.weeklyMacd12_26_value * 10 + val.dailyStochRsi14_value;
        }
        // + For days in the list
        switch (rec.length) {
          case 2:
            rating = rating +=20;
            break;
          case 3:
            rating += 30;
            break;
          case 4:
            rating += 40;
            break;
          case 5:
            rating += 50;
            break;
          default:
        }
        // Pushing date to list
        opportunities.push({
          _id: doc._id,
          rating: rating,
          market: doc.market,
          sector: doc.sector,
          fullname: doc.fullname,
          isin: doc.isin,
          profile: doc.profile,
          symbolUrl: val.symbolUrl,
          weeklyMacd12_26_action: val.weeklyMacd12_26_action,
          weeklyMacd12_26_value: val.weeklyMacd12_26_value,
          dailyStochRsi14_value: val.dailyStochRsi14_value,
          dailyStochRsi14_action: val.dailyStochRsi14_action,
          updated: val.updated
        });
      }
    });
  });
  // Sorting by rating desc
  return opportunities.sort(sorting.sortRatingDesc);
};

const opportunityList = function(req, res) {
  const fromTime = calculating.hoursToQuery();
  console.log(fromTime);
    Instrument
    .find(
      { Recommendations:
        {
          $elemMatch:
            {
              $and: [
                {"updated": {$gt: new Date((Date.now() - (fromTime * 60 * 60 * 1000)))}},
                {
                  $or: [
                    {$and: [{"weeklyMacd12_26_action": "Buy"}, {"dailyStochRsi14_action": "Oversold"}]},
                    {$and: [{"weeklyMacd12_26_action": "Sell"}, {"dailyStochRsi14_action": "Overbought"}]}
                  ]
                }
              ]
            }
        }
      }
    )
    .exec(function(err, results) {
      if (!err) {
        const opportunities = _buildOpportunityList(req, res, results);
        res
          .status(200)
          .json(opportunities);
      } else {
        res
          .status(404)
          .json(err);
      }
    });
};

const opportunityById = function (req, res) {
  Instrument
    .find(
      { "_id" : req.params._id}
    )
    .exec(function (err, results) {
      if (!err) {
        const opportunities = _buildOpportunityList(req, res, results);
        res
          .status(200)
          .json(opportunities);
      } else {
        res
          .status(404)
          .json(err);
      }
    });
};

module.exports = {
  opportunityList,
  opportunityById
};
