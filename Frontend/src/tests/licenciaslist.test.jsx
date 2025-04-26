import { render, screen } from '@testing-library/react';
import LicenciasList from '../components/licenciaslist';
import { AuthContext } from '../context/authcontext';
import * as api from '../api/licencias';
import { vi } from 'vitest';

vi.mock('../api/licencias');

const mockLicencias = [
    { id: 1, nombre: 'Windows 11 Pro', precio: 149.99, imagen_url: '' },
    { id: 2, nombre: 'Office 365', precio: 99.99, imagen_url: '' }
];

test('Debe mostrar las licencias disponibles', async () => {
    api.getLicencias.mockResolvedValueOnce(mockLicencias);

    render(
    <AuthContext.Provider value={{ user: 'fakeToken', logout: vi.fn() }}>
        <LicenciasList />
    </AuthContext.Provider>
    );

    await waitFor(() => {
        expect(screen.getByText(/Windows 11 Pro/i)).toBeInTheDocument();
        expect(screen.getByText(/Office 365/i)).toBeInTheDocument();
    });
});
