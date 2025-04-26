import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { useAuth } from '../hooks/useauth';

export default function Login() {
    const [form, setForm] = useState({ correo: '', contrasena: '' });
    const navigate = useNavigate();
    const { login } = useAuth();
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await loginUser(form);
        login(res.token);
        navigate('/licencias');
    } catch (err) {
        alert('Credenciales incorrectas');
        }   
    };

return (
    <form onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <input name="correo" placeholder="Correo" onChange={handleChange} />
        <input type="password" name="contrasena" placeholder="Contraseña" onChange={handleChange} />
        <button type="submit">Entrar</button>
    </form>
    );
}