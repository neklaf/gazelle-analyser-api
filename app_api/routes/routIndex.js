const express = require('express');
const router = express.Router();
const ctrlOpportunities = require('../controllers/ctrlOpportunities');
const ctrlInstruments = require('../controllers/ctrlInstruments');
const ctrlBrokerlog = require('../controllers/ctrlBrokerlog');
const ctrlOperations = require('../controllers/ctrlOperations');

// Opportunity list
router
  .route('/opportunities')
  .get(ctrlOpportunities.opportunityList);

// Opportunity detail
router
  .route('/opportunity/:_id')
  .get(ctrlOpportunities.opportunityById);

// Instrument list
router
  .route('/instruments')
  .get(ctrlInstruments.instrumentList);

// Instrument detail
router
  .route('/instruments/instrument/:_id')
  .get(ctrlInstruments.instrumentById);

// Brokerlog overall history
router
  .route('/brokerlog/:portfolio')
  .get(ctrlBrokerlog.brokerlogByPortfolio);

// Brokerlog last 30 days
router
  .route('/brokerlog30d/:portfolio')
  .get(ctrlBrokerlog.brokerlog30dByPortfolio);

// Brokerlog last 7 days
router
  .route('/brokerlog7d/:portfolio')
  .get(ctrlBrokerlog.brokerlog7dByPortfolio);

// Brokerlog last 24 hours
router
  .route('/brokerlog24h/:portfolio')
  .get(ctrlBrokerlog.brokerlog24hByPortfolio);

// Closed Operations
router
  .route('/operations/:portfolio')
  .get(ctrlOperations.operationList);
router
  .route('/operations/:portfolio/:period')
  .get(ctrlOperations.operationListByPeriod);

module.exports = router;
