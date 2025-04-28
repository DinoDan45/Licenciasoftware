import Licencia from '../models/licencia.model.js';

const LicenciasController = {
    async listar(req, res) {
        const licencias = await Licencia.getAll();
        res.json(licencias);
    },
    
    async crear(req, res) {
        const id = await Licencia.create(req.body);
        res.status(201).json({ id, mensaje: 'Licencia creada' });
    }
};

export default LicenciasController;
