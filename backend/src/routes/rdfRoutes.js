const express = require('express');
const router = express.Router();
const rdfController = require('../controllers/rdfController');

router.get('/', rdfController.getRDFData);
router.post('/', rdfController.createRDFData);

module.exports = router;
