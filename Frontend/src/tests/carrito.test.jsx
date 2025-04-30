import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from '../components/CartPage';
import { CartContext } from '../context/cartcontext';
import { AuthContext } from '../context/authcontext';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockLogout = vi.fn();

const mockCart = [
    {
        id: 1,
        nombre_producto: 'Licencia A',
        descripcion: 'Descripción de Licencia A',
        precio: 10.0,
        cantidad: 2,
    },
    {
        id: 2,
        nombre_producto: 'Licencia B',
        descripcion: 'Descripción de Licencia B',
        precio: 20.0,
        cantidad: 1,
    },
];

const testUser = {
    id: 52,
    email: 'testuser20@gmail.com',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTIsImVtYWlsIjoidGVzdHVzZXIyMEBnbWFpbC5jb20iLCJpYXQiOjE3NDU5NzQyMzUsImV4cCI6MTc0NTk3NzgzNX0.O8TSKP4soyFtrfJFebZStfuBxz1s2D8yZrtpk64_anM',
};

const renderWithContexts = (component) => {
    return render(
        <AuthContext.Provider value={{ user: testUser, logout: mockLogout }}>
            <CartContext.Provider value={{ carrito: mockCart, vaciarCarrito: vi.fn(), comprarCarrito: vi.fn() }}>
                {component}
            </CartContext.Provider>
        </AuthContext.Provider>
    );
};

describe('CartPage Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders cart items with description, quantity and correct details', () => {
        renderWithContexts(<CartPage />);
        expect(screen.getByText('Licencia A')).toBeInTheDocument();
        expect(screen.getByText('Descripción de Licencia A')).toBeInTheDocument();
        expect(screen.getByText('Cantidad: 2')).toBeInTheDocument();
        expect(screen.getByText('Licencia B')).toBeInTheDocument();
        expect(screen.getByText('Descripción de Licencia B')).toBeInTheDocument();
        expect(screen.getByText('Cantidad: 1')).toBeInTheDocument();
    });

    it('calls vaciarCarrito and comprarCarrito on button clicks', () => {
        const vaciarCarritoMock = vi.fn();
        const comprarCarritoMock = vi.fn();

        render(
            <AuthContext.Provider value={{ user: testUser, logout: mockLogout }}>
                <CartContext.Provider value={{ carrito: mockCart, vaciarCarrito: vaciarCarritoMock, comprarCarrito: comprarCarritoMock }}>
                    <CartPage />
                </CartContext.Provider>
            </AuthContext.Provider>
        );

        fireEvent.click(screen.getByText('Vaciar Carrito'));
        expect(vaciarCarritoMock).toHaveBeenCalled();

        fireEvent.click(screen.getByText('Comprar Carrito'));
        expect(comprarCarritoMock).toHaveBeenCalled();
    });

    it('allows user to logout', () => {
        renderWithContexts(<CartPage />);
        const logoutButton = screen.getByText('Cerrar sesión');
        fireEvent.click(logoutButton);
        expect(mockLogout).toHaveBeenCalled();
    });
});
