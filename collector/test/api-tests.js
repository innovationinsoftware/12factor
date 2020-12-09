'use strict';
const envConfig = require('dotenv').config();
const supertest = require('supertest');
const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const faker = require('faker');

const {server,shutdown} = require('../index');

describe('HTTP Tests: ', () => {
    after(async () => {
        await server.close()
        console.log('Collector Testing Complete');
    });

    it('Can POST message', async function(){
        const obj = {prop1: faker.lorem.words(4), prop2: faker.lorem.words(4)};
        //Go get all the lists
        const res =  await supertest(server)
            .post('/')
            .set('Accept', 'application/json')
            .send(obj)
            .expect(200)
            .catch(e => {
                console.log(e)
            })
        const result = JSON.parse(res.text);
        expect(result).to.be.an('object');
        console.log(result);
    });

    it('Can GET message', async function(){
        const obj = {prop1: faker.lorem.words(4), prop2: faker.lorem.words(4)};
        //Go get all the lists
        const postResult =  await supertest(server)
            .post('/')
            .set('Accept', 'application/json')
            .send(obj)
            .expect(200)
            .catch(e => {
                console.log(e)
            })
        let result = JSON.parse(postResult.text);
        expect(result).to.be.an('object');

        const key = result.key;

        const getResult =  await supertest(server)
            .get(`/?key=${key}`)
            .set('Accept', 'application/json')
            .expect(200)
            .catch(e => {
                console.log(e)
            })
        result = JSON.parse(getResult.text);
        expect(result.key).to.equal(key);
        expect(result.prop1).to.equal(obj.prop1);
        expect(result.prop2).to.equal(obj.prop2);
        console.log(result);
    });
});