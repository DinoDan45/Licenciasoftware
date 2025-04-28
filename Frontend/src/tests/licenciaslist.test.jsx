/* global jest, describe, beforeEach, test, expect */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LicenciasList from '../componentes/licenciaslist';
import { AuthContext } from '../context/authcontext';

const mockLogout = jest.fn();

const renderWithAuth = (component) => {
    return render(
    <AuthContext.Provider value={{ user: 'token123', logout: mockLogout }}>
        {component}
    </AuthContext.Provider>
    );
};

describe('LicenciasList Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

test('Renders licencias list and allows adding to cart', () => {
    renderWithAuth(<LicenciasList />);
    // This test would require mocking API calls to getLicencias
    // Placeholder for actual implementation
    });

test('Allows user to logout', () => {
    renderWithAuth(<LicenciasList />);
    const logoutButton = screen.getByText('Cerrar sesión');
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
    });
});
