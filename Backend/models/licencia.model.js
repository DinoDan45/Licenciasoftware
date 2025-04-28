import db from '../config/db.js';

const Licencia = {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM licencias');
        return rows;
    },
    async create(licencia) {
        const [result] = await db.query(
            'INSERT INTO licencias (nombre_producto, descripcion, precio, cantidad_disponible) VALUES (?, ?, ?, ?)',
            [licencia.nombre_producto, licencia.descripcion, licencia.precio, licencia.cantidad_disponible]
        );
        return result.insertId;
    }
};

export default Licencia;
