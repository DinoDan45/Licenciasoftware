const express = require('express');
const router = express.Router();
const controller = require('../controllers/transacciones.controller');
const auth = require('../seguridad/verifyToken');

router.get('/', auth, controller.listar);
router.post('/', auth, controller.crear);

module.exports = router;