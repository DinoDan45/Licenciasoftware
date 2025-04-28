import { render, screen } from '@testing-library/react';
import LicenciasList from '../components/licenciaslist';
import { AuthContext } from '../context/authcontext';
import * as api from '../api/licencias';
import { describe, test, expect, vi } from 'vitest';

vi.mock('../api/licencias', () => ({
    getLicencias: vi.fn(() =>
        Promise.resolve([
            { id: 1, nombre: 'Microsoft Office 365', precio: '99.99' },
        ])
    ),
}));

    describe('LicenciasList', () => {
        test('Debe mostrar las licencias disponibles', async () => {
            render(
                <AuthContext.Provider value={{ user: 'fakeToken', logout: () => {} }}>
                    <LicenciasList />
                </AuthContext.Provider>
            );
            expect(await screen.findByText('Microsoft Office 365 - $99.99')).toBeDefined();
        });
    });