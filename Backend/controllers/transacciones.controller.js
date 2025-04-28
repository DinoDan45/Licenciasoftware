import Transaccion from '../models/transaccion.model.js';

const TransaccionesController = {
    async listar(req, res) {
        const transacciones = await Transaccion.getAll();
        res.json(transacciones);
    },
    
    async crear(req, res) {
        const id = await Transaccion.create(req.body);
        res.status(201).json({ id, mensaje: 'Transacción creada' });
    }
};

export default TransaccionesController;
