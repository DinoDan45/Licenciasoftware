import request from 'supertest';
import app from '../index.js';
import { strict as assert } from 'assert';

const testUser = {
    nombre: 'Test User14',
    correo: 'testuser14@gmail.com',
    contrasena: 'testpassword14'
};

let token;

before(async () => {
    // Register test user before login
    await request(app)
        .post('/api/usuarios/register')
        .send(testUser);

    // Login to get token
    const res = await request(app)
        .post('/api/usuarios/login')
        .send({ correo: testUser.correo, contrasena: testUser.contrasena });
    assert.equal(res.status, 200);
    token = res.body.token;
});

describe('Crear Transacción', () => {
    it('Debe registrar una transacción de compra', async () => {
        const res = await request(app)
            .post('/api/transacciones')
            .set('Authorization', `Bearer ${token}`)
            .send({
                usuario_id: 2,
                licencia_id: 2,
                cantidad: 1,
                total: 149.99
            });

        assert.equal(res.status, 201);
        assert.ok(res.body.mensaje);
    });
});
