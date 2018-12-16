const supertest = require('supertest'),
    {server} = require('./../index'),
    {assert} = require('chai');

describe('test functions', () => {
    it('answers / with proper response', (done) => {
        supertest(server)
            .get('/')
            .set('Accept', 'application/json')
            .end((err, res) => {
                console.log(res.statusb, res.body)
                assert.strictEqual(res.body.message, 'Welcome to employee management');
                done();
            })
    });

    it('answers /employee with proper req payload', (done) => {
        supertest(server)
            .post('/employee')
            .send({})
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {
                assert.deepEqual(res.body, {message: 'Bad request'});
                done();
            })
    });

    after((done)=> {
        server.close();
        done();
    })

})




   
   
