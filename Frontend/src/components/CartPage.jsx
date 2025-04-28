import React from 'react';
import { useCart } from '../context/cartcontext';
import { useAuth } from '../hooks/useauth';
import { crearTransaccion } from '../api/transacciones';
import { useNavigate } from 'react-router-dom';
import './cartpage.css';

export default function CartPage() {
    const { cart, removeFromCart, clearCart, totalAmount } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleRemove = (id) => {
        removeFromCart(id);
    };

    const handleClear = () => {
        clearCart();
    };

    const handlePurchase = async () => {
        try {
            for (const item of cart) {
                await crearTransaccion({ usuario_id: 1, licencia_id: item.id, metodo_pago: 'Tarjeta', total: item.precio }, user);
            }
            alert('Compra realizada exitosamente');
            clearCart();
            navigate('/licencias');
        } catch {
            alert('Error al realizar la compra');
        }
    };

    return (
        <div className="cart-container">
            <header className="cart-header">
                <h2>Carrito de Compras</h2>
                <button onClick={() => navigate('/licencias')} className="back-button">Volver a Licencias</button>
                <button onClick={logout} className="logout-button">Cerrar sesión</button>
            </header>
            {cart.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <>
                    <ul className="cart-list">
                        {cart.map((item) => (
                            <li key={item.id} className="cart-item">
                                <img src={item.imagen_url} alt={item.nombre} className="cart-item-image" />
                                <div className="cart-item-info">
                                    <h3>{item.nombre}</h3>
                                    <p>${item.precio.toFixed(2)}</p>
                                </div>
                                <button onClick={() => handleRemove(item.id)} className="remove-button">Eliminar</button>
                            </li>
                        ))}
                    </ul>
                    <p className="total-amount">Total: ${totalAmount.toFixed(2)}</p>
                    <div className="cart-actions">
                        <button onClick={handleClear} className="clear-button">Vaciar Carrito</button>
                        <button onClick={handlePurchase} className="purchase-button">Comprar</button>
                    </div>
                </>
            )}
        </div>
    );
}
