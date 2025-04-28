import request from 'supertest';
import app from '../index.js';
import { strict as assert } from 'assert';

const testUser = {
    nombre: 'Test User13',
    correo: 'testuser13@gmail.com',
    contrasena: 'testpassword13'
};

let token;

before(async () => {
    // Register test user before running tests
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

describe('Crear Licencia', () => {
    it('Debe crear una nueva licencia', async () => {
        const res = await request(app)
            .post('/api/licencias')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nombre_producto: 'Visual Studio Pro',
                descripcion: 'Entorno de desarrollo para .NET',
                precio: 189.99,
                cantidad_disponible: 55,
            });

        assert.equal(res.status, 201);
        assert.ok(res.body.mensaje);
    });
});
