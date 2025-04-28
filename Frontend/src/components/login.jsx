import React, { useState } from 'react';
import { useAuth } from '../hooks/useauth';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login() {
    const { loginUser, registerUser } = useAuth();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
            try {
                if (isRegistering) {
                    await registerUser({ nombre, correo, contrasena });
                    setIsRegistering(false); // Switch to login tab after successful registration
                    setNombre('');
                    setCorreo('');
                    setContrasena('');
                } else {
                    await loginUser({ correo, contrasena });
                    navigate('/licencias'); // Redirect to licenses page after login
                }
            } catch {
                setError('Correo o contraseña incorrectos');
            }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>{isRegistering ? 'Registrarse' : 'Iniciar sesión'}</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    {isRegistering && (
                        <>
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Tu nombre"
                                required
                            />
                        </>
                    )}
                    <label htmlFor="correo">Correo electrónico</label>
                    <input
                        type="email"
                        id="correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        placeholder="correo@ejemplo.com"
                        required
                    />
                    <label htmlFor="contrasena">Contraseña</label>
                    <input
                        type="password"
                        id="contrasena"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        placeholder="Contraseña"
                        required
                    />
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="login-button">
                        {isRegistering ? 'Registrarse' : 'Iniciar sesión'}
                    </button>
                </form>
                <div
                    className="toggle-register"
                    onClick={() => {
                        setError('');
                        setIsRegistering(!isRegistering);
                    }}
                    style={{ cursor: 'pointer', marginTop: '1rem', color: '#0078d7', textDecoration: 'underline' }}
                >
                    {isRegistering ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                </div>
            </div>
        </div>
    );
}
