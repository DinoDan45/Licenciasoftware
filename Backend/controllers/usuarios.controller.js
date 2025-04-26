const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UsuariosController = {
    async registrar(req, res) {
        try {
            const { nombre, email, password, tipo_usuario } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const id = await Usuario.create({ nombre, email, password: hashedPassword, tipo_usuario });
            res.status(201).json({ id, mensaje: 'Usuario registrado exitosamente' });
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al registrar usuario', error });
        }
    },
    
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const usuario = await Usuario.findByEmail(email);
            if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

            const match = await bcrypt.compare(password, usuario.password);
            if (!match) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
            
            const token = jwt.sign(
                { id: usuario.id_usuario, tipo_usuario: usuario.tipo_usuario },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            
            res.json({ token });
        } catch (error) {
            res.status(500).json({ mensaje: 'Error en login', error });
        }
    }
};

module.exports = UsuariosController;