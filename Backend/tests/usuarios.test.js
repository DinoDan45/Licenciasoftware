const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // exporta tu app en index.js con module.exports = app
const expect = chai.expect;

chai.use(chaiHttp);

describe('Pruebas de Login de Usuario', () => {
    it('Debe iniciar sesión correctamente', (done) => {
        chai
        .request(app)
        .post('/api/usuarios/login')
        .send({ correo: 'cliente1@example.com', contrasena: 'admin123' }) // asegúrate que este user exista
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('token');
            done();
        });
    });
});
