import { createContext, useState, useEffect } from 'react';
import { loginUser as apiLoginUser, registerUser as apiRegisterUser } from '../api/auth.js';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('token');
        if (storedUser) setUser(storedUser);
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setUser(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const loginUser = async (data) => {
        const response = await apiLoginUser(data);
        if (!response.token) {
            throw new Error('Token not received');
        }
        login(response.token);
        return response;
    };

    const registerUser = async (data) => {
        const response = await apiRegisterUser(data);
        login(response.token);
        return response;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loginUser, registerUser }}>
            {children}
        </AuthContext.Provider>
    );
};
