const express = require('express');
const fracturesController = require('../controllers/fracturesController');
const router = express.Router();

router.post('/insert', fracturesController.insertFractures);

router.post('/fetch', fracturesController.fetchFractures);

module.exports = router;
