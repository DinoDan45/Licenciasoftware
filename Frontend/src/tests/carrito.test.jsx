import { render, screen, fireEvent } from '@testing-library/react';
import LicenciasList from '../components/licenciaslist';
import { AuthContext } from '../context/authcontext';

const mockLicencias = [
    { id: 1, nombre: 'Windows 11 Pro', precio: 149.99 },
];

test('Agrega licencia al carrito', () => {
    render(
    <AuthContext.Provider value={{ user: 'fakeToken', logout: vi.fn() }}>
        <LicenciasList />
    </AuthContext.Provider>
    );

    const btn = screen.getByText(/Agregar/i);
    fireEvent.click(btn);

    expect(screen.getByText(/Total/)).toBeInTheDocument();
}); 