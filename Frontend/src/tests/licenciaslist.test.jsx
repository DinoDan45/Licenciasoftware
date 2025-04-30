import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import LicenciasList from '../components/licenciaslist';
import { AuthContext } from '../context/authcontext';
import * as apiLicencias from '../api/licencias';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockLogout = vi.fn();

const mockLicencias = [
    {
        id: 1,
        nombre_producto: 'Licencia A',
        descripcion: 'Descripción de Licencia A',
        precio: 10.0,
        cantidad_disponible: 5,
        imagen_url: 'imgA.jpg',
    },
    {
        id: 2,
        nombre_producto: 'Licencia B',
        descripcion: 'Descripción de Licencia B',
        precio: 20.0,
        cantidad_disponible: 3,
        imagen_url: 'imgB.jpg',
    },
];

const testUser = {
    id: 52,
    email: 'testuser20@gmail.com',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTIsImVtYWlsIjoidGVzdHVzZXIyMEBnbWFpbC5jb20iLCJpYXQiOjE3NDU5NzQyMzUsImV4cCI6MTc0NTk3NzgzNX0.O8TSKP4soyFtrfJFebZStfuBxz1s2D8yZrtpk64_anM',
};

const renderWithAuth = (component) => {
    return render(
        <AuthContext.Provider value={{ user: testUser, logout: mockLogout }}>
            {component}
        </AuthContext.Provider>
    );
};

describe('LicenciasList Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(apiLicencias, 'getLicencias').mockImplementation(async (user) => {
            expect(user.token).toBe(testUser.token);
            return mockLicencias;
        });
    });

    it('renders licenses with description, quantity and allows adding to cart', async () => {
        await act(async () => {
            renderWithAuth(<LicenciasList />);
        });
        // Wait for licenses to load
        await waitFor(() => {
            expect(screen.getByText('Licencia A')).toBeInTheDocument();
            expect(screen.getByText('Descripción de Licencia A')).toBeInTheDocument();
            expect(screen.getByText('Cantidad disponible: 5')).toBeInTheDocument();
            expect(screen.getByText('Licencia B')).toBeInTheDocument();
            expect(screen.getByText('Descripción de Licencia B')).toBeInTheDocument();
            expect(screen.getByText('Cantidad disponible: 3')).toBeInTheDocument();
        });

        // Add first license to cart
        const addButtons = screen.getAllByText('Agregar');
        await act(async () => {
            fireEvent.click(addButtons[0]);
        });

        // Check cart updates
        expect(screen.getByText(/Licencia A - Cantidad: 1/i)).toBeInTheDocument();
    });

    it('allows user to logout', async () => {
        await act(async () => {
            renderWithAuth(<LicenciasList />);
        });
        const logoutButton = screen.getByText('Cerrar sesión');
        await act(async () => {
            fireEvent.click(logoutButton);
        });
        expect(mockLogout).toHaveBeenCalled();
    });

    // Additional test ideas:
    // - Test removing items from cart
    // - Test emptying the cart
    // - Test purchasing the cart (mock crearTransaccion)
    // - Test UI behavior when no licenses are returned
    // - Test search functionality if re-added
});
