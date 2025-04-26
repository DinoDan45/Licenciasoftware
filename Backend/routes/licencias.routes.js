const express = require('express');
const router = express.Router();
const controller = require('../controllers/licencias.controller');
const auth = require('../seguridad/verifyToken');

router.get('/', controller.listar);
router.post('/', auth, controller.crear);

module.exports = router;