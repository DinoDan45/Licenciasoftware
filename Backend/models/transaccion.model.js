const db = require('../config/db');

const Transaccion = {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM transacciones');
        return rows;
    },

    async create(transaccion) {
        const [result] = await db.query(
            'INSERT INTO transacciones (id_usuario, id_licencia, fecha_compra) VALUES (?, ?, ?)',
            [transaccion.id_usuario, transaccion.id_licencia, new Date()]
        );
        return result.insertId;
    }
};

module.exports = Transaccion;