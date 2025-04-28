import express from 'express';
import controller from '../controllers/transacciones.controller.js';
import auth from '../seguridad/verifyToken.js';

const router = express.Router();

router.get('/', controller.listar);
router.post('/', auth, controller.crear);

export default router;
