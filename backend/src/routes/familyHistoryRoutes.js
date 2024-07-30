const express = require('express');
const familyHistoryController = require('../controllers/familyHistoryController');
const router = express.Router();

router.post('/insert', familyHistoryController.insertFamilyHistory);

router.get('/fetch', familyHistoryController.fetchFamilyHistory);

module.exports = router;
