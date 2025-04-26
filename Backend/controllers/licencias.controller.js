const Licencia = require('../models/licencia.model');

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

module.exports = LicenciasController;