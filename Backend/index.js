const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const userRoutes = require('./routes/usuarios.routes');
const licenciaRoutes = require('./routes/licencias.routes');
const transaccionRoutes = require('./routes/transacciones.routes');
const db = require('./config/db');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/usuarios', userRoutes);
app.use('/api/licencias', licenciaRoutes);
app.use('/api/transacciones', transaccionRoutes);

app.get('/', (req, res) => {
    res.send('API de gestión de licencias de software');
});

const PORT = process.env.PORT || 3000;
db.getConnection()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en puerto ${PORT}`);
    });
})
.catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
});
