const db = require('./db');
const chai = require('chai');
const chaiHttp = require('chai-http');
const init = require('./initialize');
chai.should();
chai.use(chaiHttp);

describe('Testovi', function () {

    before(function (done) {
        Promise.all([]).then(async function () {
            await init;
        }).then(() => done(), done);
    });

    describe('#GET zahtjev', function () {
        beforeEach('ista duzina', function (done) {
            chai.request('http://localhost:8080').get('/gradovi').end((err, res) => {
                if (err) throw err;
                res.body.length.should.be.eq(7);
                done();
            });
        })

        it('Duzina treba bit 7', function (done) {
            chai.request('http://localhost:8080').get('/gradovi').end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.be.eq(7);
                done();
            });
        });
        it('Treba bit Beograd', function (done) {
            chai.request('http://localhost:8080')
                .get('/grad/' + 3).end((res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('NAZIV').eq('Beograd');
                    done();
                });
        });
        it('Treba bit London', function (done) {
            chai.request('http://localhost:8080')
                .get('/grad/' + 7).end((res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('NAZIV').eq('London');
                    done();
                });
        });
    });

    describe('#DELETE zahtjev', function () {
        it('treba obrisati grad sa id:1', function (done) {
            chai.request('http://localhost:8080')
                .delete('/gradovi/' + 1).end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('deleted').eql('1');
                    done();
                });
        });
        afterEach('velicina poslije brisanja treba bit 6', function (done) {
            chai.request('http://localhost:8080')
                .get('/gradovi').end((err, res) => {
                    res.body.length.should.be.eq(6);
                    done();
                });
        });
    });

    describe('#PUT zahtjev', function () {
        before(function (done) {
            chai.request('http://localhost:8080')
                .get('/gradovi/' + 4)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('broj_stanovnika').eq(150000);
                    done();
                });
        });

        it('treba updejtovat br_stanovnika', function (done) {
            chai.request('http://localhost:8080')
                .put('/gradovi/' + 4).send({ BROJ_STANOVNIKA: 1000000 }).end((res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('BROJ_STANOVNIKA').eql(1000000);
                    done();
                });
        });
        before(function (done) {
            chai.request('http://localhost:8080')
                .get('/gradovi/' + 5)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('naziv').eq('Zagreb');
                    done();
                });
        });

        it('treba updejtovat naziv', function (done) {
            chai.request('http://localhost:8080')
                .put('/gradovi/' + 5).send({ naziv: 'Hamburg' }).end((res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('naziv').eql('Haumburg');
                    done();
                });
        });

    });

    describe('#POST request', function () {
        it('treba dodati grad', function (done) {
            let grad = { naziv: 'Moskva', broj_stanovnika: 5000000 };
            chai.request('http://localhost:8080').post('/gradovi').send(grad).end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('naziv').eql('Moskva');
                done();
            });
        });
    });

    after(function (done) {
        Promise.all([]).then(async function () {
            await db.grad.destroy({
                where: {},
                truncate: true
            });
        }).then(() => done(), done);
    });
});