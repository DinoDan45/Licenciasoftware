import axios from 'axios';
const API = 'http://localhost:3000/api/transacciones';

export const crearTransaccion = async (datos, token) => {
    const res = await axios.post(API, datos, {
        headers: {
            Authorization: token
        }
    });
    return res.data;
};
