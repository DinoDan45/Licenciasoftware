import axios from 'axios';
const API = '/api/licencias';

export const getLicencias = async (token) => {
    const res = await axios.get(API, {
        headers: {
            Authorization: token
        }
    });
    return res.data;
};
