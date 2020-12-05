'use strict';
const envConfig = require('dotenv').config();
const supertest = require('supertest');
const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

const {server,shutdown} = require('../server');

describe('HTTP Tests: ', () => {
    after(function () {
        shutdown();
    });

    it('Can access GET basic information', function(done){
        supertest(server)
            .get('/')
            .set('Accept', 'application/json')
            .then((res) => {
                expect(res.body).to.be.an('object');
                console.log('Object check OK')
                expect(res.body.appName).equals('Pinger');
                console.log('appName check OK')
                expect(res.body.currentTime).to.be.an('string');
                console.log('currentTime check OK')
                const dt = new Date(res.body.currentTime);
                const now = new Date();
                expect(now.getDay()).equals(dt.getDay());
                console.log('Date equality check OK')
                done();
            })
            .catch(done);
    });

    it('Random message works', async function(){
        let message1;
        let message2;
        message1 = await supertest(server)
            .get('/')
            .set('Accept', 'application/json')
            .then((res) => {
                expect(res.body.randomMessage).to.be.a('string');
                return res.body.randomMessage
            });
        message2 = await supertest(server)
            .get('/')
            .set('Accept', 'application/json')
            .then((res) => {
                expect(res.body.randomMessage).to.be.a('string');
                return res.body.randomMessage
            });
        expect(message1).to.not.equals(message2);
    });

    it('Runtime ports match', function(done){

        supertest(server)
            .get('/')
            .set('Accept', 'application/json')
            .then((res) => {
                expect(envConfig.parsed.PINGER_PORT).equals(res.body.PINGER_PORT);
                console.log(`Runtime PINGER_PORT env OK on ${envConfig.parsed.PINGER_PORT}`)
                done();
            })
            .catch(done);
    });

    it('CorrelationId property exists', function(done){

        supertest(server)
            .get('/')
            .set('Accept', 'application/json')
            .then((res) => {
                expect(res.body.correlationId).to.be.a('string');
                console.log(`The correlationId is present with a value of: ${res.body.correlationId}`)
                done();
            })
            .catch(done);
    });
});