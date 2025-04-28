import jwt from 'jsonwebtoken';
import config from '../config.js';
import { jwtSecret } from '../config.js';

export function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ mensaje: 'No token provided' });
    }
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
    jwt.verify(tokenWithoutBearer, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensaje: 'Unauthorized' });
        }
        req.userId = decoded.id;
        next();
    });
}
