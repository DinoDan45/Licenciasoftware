import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useauth';
import { getLicencias } from '../api/licencias';
import { crearTransaccion } from '../api/transacciones';
import './licenciaslist.css';

export default function LicenciasList() {
    const { user, logout } = useAuth();
    const [licencias, setLicencias] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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
        setCarrito([...carrito, lic]);
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const totalCompra = carrito.reduce((acc, item) => acc + parseFloat(item.precio), 0);

    const comprarCarrito = async () => {
        try {
            for (const item of carrito) {
                await crearTransaccion({ usuario_id: 1, licencia_id: item.id, metodo_pago: 'Tarjeta', total: item.precio }, user);
            }
            alert('Compra realizada exitosamente');
            setCarrito([]);
        } catch {
            alert('Error al realizar la compra');
        }
    };

    const filteredLicencias = licencias.filter((lic) =>
        lic.nombre && lic.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );    

    return (
        <div className="licencias-container">
            <header className="licencias-header">
                <h2>Licencias disponibles</h2>
                <button onClick={logout} className="logout-button">Cerrar sesión</button>
            </header>
            <input
                type="text"
                placeholder="Buscar licencias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <div className="licencias-grid">
                {filteredLicencias.map((lic) => (
                    <div key={lic.id} className="licencia-card">
                        <img src={lic.imagen_url} alt={lic.nombre} className="licencia-image" />
                        <div className="licencia-info">
                            <h3>{lic.nombre}</h3>
                            <p>${lic.precio.toFixed(2)}</p>
                            <button onClick={() => agregarAlCarrito(lic)} className="add-button">Agregar</button>
                        </div>
                    </div>
                ))}
            </div>
            <aside className="carrito">
                <h3>Carrito</h3>
                <ul>
                    {carrito.map((item, index) => (
                        <li key={index}>{item.nombre} - ${item.precio.toFixed(2)}</li>
                    ))}
                </ul>
                <p><strong>Total: ${totalCompra.toFixed(2)}</strong></p>
                <button onClick={vaciarCarrito} className="empty-button">Vaciar Carrito</button>
                {carrito.length > 0 && <button onClick={comprarCarrito} className="buy-button">Comprar Carrito</button>}
            </aside>
        </div>
    );
}
