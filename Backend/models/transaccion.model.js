import db from '../config/db.js';

const Transaccion = {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM transacciones');
        return rows;
    },
    async create(transaccion) {
        const [result] = await db.query(
            'INSERT INTO transacciones (usuario_id, licencia_id, cantidad, total) VALUES (?, ?, ?, ?)',
            [transaccion.usuario_id, transaccion.licencia_id, transaccion.cantidad, transaccion.total]
        );
        return result.insertId;
    }
};

export default Transaccion;
