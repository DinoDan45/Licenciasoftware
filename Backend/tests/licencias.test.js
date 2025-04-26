const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);

const token = '$2a$10$Q9P1vgkNZXkY6MNdG0s3f.KOsz3vGfKtrTQXlAjJtUq7hGm9h1R2q'; // reemplázalo con un token real de prueba

describe('Crear Licencia', () => {
    it('Debe crear una nueva licencia', (done) => {
        chai
        .request(app)
        .post('/api/licencias')
        .set('Authorization', token)
        .send({
            nombre: 'Visual Studio Pro',
            descripcion: 'Entorno de desarrollo para .NET',
            precio: 199.99,
        })
        .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('mensaje');
            done();
        });
    });
});
