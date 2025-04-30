import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useauth';
import { getLicencias } from '../api/licencias';
import { crearTransaccion } from '../api/transacciones';
import './licenciaslist.css';

export default function LicenciasList() {
    const { user, logout } = useAuth();
    const [licencias, setLicencias] = useState([]);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const cargar = async () => {
            try {
                console.log('User token:', user);
                const data = await getLicencias(user);
                console.log('Licencias data:', data);
                if (data && Array.isArray(data)) {
                    setLicencias(data);
                } else {
                    setLicencias([]);
                }
            } catch (error) {
                console.error('Error loading licenses:', error);
                alert('Error al cargar licencias');
            }
        };
        cargar();
    }, [user]);

    const agregarAlCarrito = (lic) => {
        setCarrito((prevCarrito) => {
            const existingIndex = prevCarrito.findIndex(item => item.id === lic.id);
            if (existingIndex !== -1) {
                const updatedCarrito = [...prevCarrito];
                updatedCarrito[existingIndex].cantidad += 1;
                return updatedCarrito;
            } else {
                return [...prevCarrito, { ...lic, cantidad: 1 }];
            }
        });
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const totalCompra = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    const comprarCarrito = async () => {
        try {
            // Extract user id from token if possible, else fallback to 1
            // For now, fallback to 1 as user id extraction is not implemented
            const usuario_id = 1;
            for (const item of carrito) {
                await crearTransaccion({
                    usuario_id,
                    licencia_id: item.id,
                    cantidad: item.cantidad,
                    total: item.precio * item.cantidad,
                    metodo_pago: 'Tarjeta'
                }, user);
            }
            alert('Compra realizada exitosamente');
            setCarrito([]);
        } catch {
            alert('Error al realizar la compra');
        }
    };

    return (
        <div className="licencias-container">
            <header className="licencias-header">
                <h2>Licencias disponibles</h2>
                <button onClick={logout} className="logout-button">Cerrar sesión</button>
            </header>
            <div className="licencias-grid">
                {licencias.map((lic) => (
                    <div key={lic.id} className="licencia-card">
                        <img src={lic.imagen_url || '/placeholder.png'} alt={lic.nombre_producto} className="licencia-image" />
                        <div className="licencia-info">
                            <h3>{lic.nombre_producto}</h3>
                            <p>${parseFloat(lic.precio).toFixed(2)}</p>
                            <button onClick={() => agregarAlCarrito(lic)} className="add-button">Agregar</button>
                        </div>
                    </div>
                ))}
            </div>
            <aside className="carrito">
                <h3>Carrito</h3>
                <ul>
                    {carrito.map((item, index) => (
                        <li key={index}>
                            {item.nombre_producto} - Cantidad: {item.cantidad} - Precio unitario: ${parseFloat(item.precio).toFixed(2)} - Total: ${(item.precio * item.cantidad).toFixed(2)}
                        </li>
                    ))}
                </ul>
                <p><strong>Total: ${totalCompra.toFixed(2)}</strong></p>
                <button onClick={vaciarCarrito} className="empty-button">Vaciar Carrito</button>
                {carrito.length > 0 && <button onClick={comprarCarrito} className="buy-button">Comprar Carrito</button>}
            </aside>
        </div>
    );
}
