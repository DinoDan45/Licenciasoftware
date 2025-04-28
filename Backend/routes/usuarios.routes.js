import express from 'express';
import controller from '../controllers/usuarios.controller.js';
import auth from '../seguridad/verifyToken.js';

const router = express.Router();

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/', auth, controller.list);

export default router;
