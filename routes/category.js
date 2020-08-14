const express = require('express');
const router = express.Router();

const { list, create } = require('../controllers/categoryController');

router.get('/categories', list);
router.post('/create', create);

module.exports = router;