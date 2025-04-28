import request from 'supertest';
import app from '../index.js';
import { strict as assert } from 'assert';

const testUser = {
    nombre: 'Test User19',
    correo: 'testuser19@gmail.com',
    contrasena: 'testpassword19'
};

before(async () => {
    await request(app)
        .post('/api/usuarios/register')
        .send(testUser);
});

describe('Pruebas de Login de Usuario', () => {
    it('Debe iniciar sesión correctamente', async () => {
        const res = await request(app)
            .post('/api/usuarios/login')
            .send(testUser);

        assert.equal(res.status, 200);
        assert.ok(res.body.token);
    });
});
