import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config.js';
import userRoutes from './routes/usuarios.routes.js';
import licenciaRoutes from './routes/licencias.routes.js';
import transaccionRoutes from './routes/transacciones.routes.js';
import db from './config/db.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/usuarios', userRoutes);
app.use('/api/licencias', licenciaRoutes);
app.use('/api/transacciones', transaccionRoutes);

app.get('/', (req, res) => {
    res.send('API de gestión de licencias de software');
});

if (process.env.NODE_ENV !== 'test') {
    db.getConnection()
        .then(connection => {
            connection.release();
            app.listen(config.port, () => {
                console.log(`Servidor ejecutándose en puerto ${config.port}`);
            });
        })
        .catch((err) => {
            console.error('Error al conectar a la base de datos:', err);
        });
}

export default app;
