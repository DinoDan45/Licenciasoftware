import db from '../config/db.js';

const Usuario = {
    async getAll() {
        const [rows] = await db.query('SELECT id, correo FROM usuarios');
        return rows;
    },
    async create(usuario) {
        const [result] = await db.query(
            'INSERT INTO usuarios (correo, contrasena) VALUES (?, ?)',
            [usuario.correo, usuario.contrasena]
        );
        return result.insertId;
    }
};

export default Usuario;
