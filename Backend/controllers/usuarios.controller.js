import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config, { jwtSecret } from '../config.js';

const UsuariosController = {
    async login(req, res) {
        const { correo, contrasena } = req.body;
        try {
            const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [correo]);
            if (rows.length === 0) {
                return res.status(401).json({ mensaje: 'Usuario no encontrado' });
            }
            const user = rows[0];
            const validPassword = await bcrypt.compare(contrasena, user.password);
            if (!validPassword) {
                return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
            }
            const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });
            console.log('Generated JWT token:', token);
            res.json({ token });
        } catch (error) {
            res.status(500).json({ mensaje: 'Error en el servidor' });
        }
    },

    async register(req, res) {
        const { nombre, correo, contrasena } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            const [result] = await db.query('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)', [nombre, correo, hashedPassword]);
            res.status(201).json({ id: result.insertId, mensaje: 'Usuario registrado' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error en el servidor' });
        }
    },

    async list(req, res) {
        try {
            const [rows] = await db.query('SELECT id, email FROM usuarios');
            res.json(rows);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error en el servidor' });
        }
    }
};

export default UsuariosController;
