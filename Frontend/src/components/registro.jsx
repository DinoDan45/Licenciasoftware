import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

export default function Registro() {
    const [form, setForm] = useState({ correo: '', contrasena: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(form);
            alert('Registro exitoso, por favor inicia sesión');
            navigate('/login');
        } catch {
            alert('Error en el registro');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registro de Usuario</h2>
            <input name="correo" placeholder="Correo" onChange={handleChange} />
            <input type="password" name="contrasena" placeholder="Contraseña" onChange={handleChange} />
            <button type="submit">Registrar</button>
        </form>
    );
}
