import { config as dotenvConfig } from 'dotenv';
export const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key';

dotenvConfig();

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER || 'root',
    dbPassword: process.env.DB_PASSWORD || 'root',
    dbHost: process.env.DB_HOST || 'localhost',
    dbName: process.env.DB_NAME || 'licencias_software',
    dbPort: process.env.DB_PORT || 3306,
    
};
export default config;
