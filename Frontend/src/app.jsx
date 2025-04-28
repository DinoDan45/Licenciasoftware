import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Registro from './components/registro';
import LicenciasList from './components/licenciaslist';
import CartPage from './components/CartPage';
import { useAuth } from './hooks/useauth';

export default function App() {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route
                path="/licencias"
                element={user ? <LicenciasList /> : <Navigate to="/login" />}
            />
            <Route
                path="/carrito"
                element={user ? <CartPage /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}
