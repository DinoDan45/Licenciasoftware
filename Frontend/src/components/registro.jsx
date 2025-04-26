import { useState } from 'react';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Registro() {
    const [form, setForm] = useState({ nombre: '', correo: '', contrasena: '', tipo_usuario: 'cliente' });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await registerUser(form);
        alert('Usuario registrado');
        navigate('/login');
    } catch (err) {
        alert('Error al registrar');
        }
    };

    return (
    <form onSubmit={handleSubmit}>
        <h2>Registro</h2>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input name="correo" placeholder="Correo" onChange={handleChange} />
        <input type="password" name="contrasena" placeholder="Contraseña" onChange={handleChange} />
        <button type="submit">Registrarse</button>
    </form>
    );
}