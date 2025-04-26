import mysql from 'mysql2/promise';
import config from '../config.js';

const getConnection = async () => {
    return mysql.createConnection({
        host: config.dbHost,
        user: 'root',
        password: 'root',
        database: 'licencias_software',
        port: config.dbPort,
    });
};

export default getConnection;