const db = require('../config/db');

const Licencia = {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM licencias');
        return rows;
    },
    async create(licencia) {
        const [result] = await db.query(
            'INSERT INTO licencias (nombre, descripcion, precio, duracion_dias) VALUES (?, ?, ?, ?)',
            [licencia.nombre, licencia.descripcion, licencia.precio, licencia.duracion_dias]
        );
        return result.insertId;
    }
};

module.exports = Licencia;