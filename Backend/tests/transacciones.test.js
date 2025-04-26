describe('Crear Transacción', () => {
    it('Debe registrar una transacción de compra', (done) => {
        chai
        .request(app)
        .post('/api/transacciones')
        .set('Authorization', token)
        .send({
            usuario_id: 2,
            licencia_id: 1,
            metodo_pago: 'Tarjeta',
            monto: 149.99
        })
        .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('mensaje');
            done();
        });
    });
});
