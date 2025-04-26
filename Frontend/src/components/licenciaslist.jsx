import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useauth';
import { getLicencias } from '../api/licencias';
import { crearTransaccion } from '../api/transacciones';

export default function LicenciasList() {
    const { user, logout } = useAuth();
    const [licencias, setLicencias] = useState([]);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const cargar = async () => {
            try {
                const data = await getLicencias(user);
                setLicencias(data);
            } catch (e) {
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
                await crearTransaccion({ usuario_id: 1, licencia_id: item.id, metodo_pago: 'Tarjeta', monto: item.precio }, user);
            }
            alert('Compra realizada exitosamente');
            setCarrito([]);
        } catch (e) {
            alert('Error al realizar la compra');
        }
    };

    return (
        <div>
            <h2>Licencias disponibles</h2>
            <button onClick={logout}>Cerrar sesión</button>
            <ul>
                {licencias.map((lic) => (
                    <li key={lic.id}>
                        <img src={lic.imagen_url} alt={lic.nombre} width="50" />
                        {lic.nombre} - ${lic.precio} 
                        <button onClick={() => agregarAlCarrito(lic)}>Agregar</button>
                    </li>
                ))}
            </ul>
            <h3>Carrito</h3>
            <ul>
                {carrito.map((item, index) => (
                    <li key={index}>{item.nombre} - ${item.precio}</li>
                ))}
            </ul>
            <p><strong>Total: ${totalCompra.toFixed(2)}</strong></p>
            <button onClick={vaciarCarrito}>Vaciar Carrito</button>
            {carrito.length > 0 && <button onClick={comprarCarrito}>Comprar Carrito</button>}
        </div>
    );
}