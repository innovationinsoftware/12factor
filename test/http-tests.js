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
        //Go get all the lists
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

    it('Runtime ports match', function(done){
        //Go get all the lists
        supertest(server)
            .get('/')
            .set('Accept', 'application/json')
            .then((res) => {
                expect(envConfig.parsed.PINGER_PORT).equals(res.body.PINGER_PORT);
                console.log(`Runtine PINGER_PORT env OK on ${envConfig.parsed.PINGER_PORT}`)
                done();
            })
            .catch(done);
    });
});