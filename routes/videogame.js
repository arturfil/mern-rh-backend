const express = require('express');
const router = express.Router();
const { test } = require('../controllers/videogameController')
const { list, create, image, videogameById } = require('../controllers/videogameController');

router.get('/', test);
router.get('/videogames', list);
router.get('/image/:videogameId', image);
router.post('/create', create);

router.param("videogameId", videogameById);

module.exports = router;