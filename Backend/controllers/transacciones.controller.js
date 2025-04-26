const Transaccion = require('../models/transaccion.model');

const TransaccionesController = {
    async listar(req, res) {
        const transacciones = await Transaccion.getAll();
        res.json(transacciones);
    },
    
    async crear(req, res) {
        const id = await Transaccion.create(req.body);
        res.status(201).json({ id, mensaje: 'Transacción registrada' });
    }
};

module.exports = TransaccionesController;