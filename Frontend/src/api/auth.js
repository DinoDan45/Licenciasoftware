import axios from 'axios';
const API = 'http://localhost:3000/api/usuarios';

export const loginUser = async (data) => {
    const res = await axios.post(`${API}/login`, data);
    return res.data;
};

export const registerUser = async (data) => {
    const res = await axios.post(`${API}/registro`, data);
    return res.data;
};