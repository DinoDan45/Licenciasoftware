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

describe('Carrito de compras', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Cierra sesión', () => {
    renderWithAuth(<LicenciasList />);
    const logoutButton = screen.getByText('Cerrar sesión');
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });
});
