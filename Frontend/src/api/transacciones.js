import axios from 'axios';
const API = '/api/transacciones';

export const crearTransaccion = async (datos, token) => {
    const res = await axios.post(API, datos, {
        headers: {
            Authorization: token
        }
    });
    return res.data;
};
