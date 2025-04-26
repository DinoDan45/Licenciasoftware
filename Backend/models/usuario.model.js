const db = require('../config/db');

const Usuario = {
async create(usuario) {
    const [result] = await db.query(
    'INSERT INTO usuarios (nombre, email, password, tipo_usuario) VALUES (?, ?, ?, ?)',
    [usuario.nombre, usuario.email, usuario.password, usuario.tipo_usuario]
    );
    return result.insertId;
},

async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
}
};
