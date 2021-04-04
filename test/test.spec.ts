
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Sequelize } from 'sequelize';
//import { SequelizeMock } from 'sequelize-mock';
import { ItemsModel } from '../db/Item/item.schema';
import { ItemDataManipulation } from '../db/Item/item.action';
import sinon from 'sinon';
import { ExpressConfig } from '../src/config/express';
import { Container } from 'typedi';
import  ItemsServer  from '../src';
import * as CreateConnection  from '../src/config/connection';
console.log(SequelizeMock, 'SequelizeMock');
const sequelize = new Sequelize("sqlite::memory:");
let itemModel:any;
const itemsServer = ItemsServer.getServer();
chai.use(chaiHttp);

const expect = chai.expect;

describe('perishable_inventory_manager test api', function(){
    let startDate:any;
    // let stubExpressConfig:any;
    // let stubDataManipulation:any;
    // // let dcFake = sinon.fake();

    before(async ()=>{
        itemModel = ItemsModel(sequelize);
        await sequelize.sync();
    	Container.reset('sequelize');
        Container.set('sequelize', itemModel);
        startDate = new Date().getTime(); 
    })
	it('1: expect post to /foo/add request be successful', async()=>{
        const response = await chai.request(itemsServer).post('/foo/add').send({expiry:startDate + 10000, quantity:10});
        expect(response).to.have.status(200);
        expect(response.body).to.be.empty;
        
    })
    it('2: expect get to /foo/quantity request be successful', function(done){
       setTimeout(async ()=>{
            const response = await chai.request(itemsServer).get('/foo/quantity')
            expect(response.body).to.have.property('quantity', 10);
            expect(response.body).to.have.property('validTill', startDate+10000);
            done()
       }, 5000) 
    })
    it('3: expect post to /foo/add request be successful', function(done){
        setTimeout(async ()=>{
            const response = await chai.request(itemsServer).post('/foo/add')
                                .send({expiry:startDate + 20000, quantity:5});
            expect(response).to.have.status(200);
            expect(response.body).to.be.empty;
            done()
        }, 2000)
    });
    it('4: expect get to /foo/quantity request be successful', function(done){
        setTimeout(async ()=>{
            const response = await chai.request(itemsServer).get('/foo/quantity')
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('quantity', 15);
            expect(response.body).to.have.property('validTill', startDate+10000);
            done()
        }, 1000)
    });
    it('5: expect get to /foo/quantity request be successful', function(done){
        setTimeout(async ()=>{
            const response = await chai.request(itemsServer).get('/foo/quantity')
            expect(response.body).to.have.property('quantity', 5);
            expect(response.body).to.have.property('validTill', startDate+20000);
            done()
        }, 2000) 
    });
    it('6: expect post to /foo/sell request be successful', function(done){
        setTimeout(async ()=>{
            const response = await chai.request(itemsServer).post('/foo/sell')
                            .send({quantity:3});
            expect(response).to.have.status(200);
            expect(response.body).to.be.empty;
            done()
        }, 2000)
    });
    it('7: expect get to /foo/quantity request be successful', function(done){
        setTimeout(async ()=>{
            const response = await chai.request(itemsServer).get('/foo/quantity');
            expect(response.body).to.have.property('quantity', 2);
            expect(response.body).to.have.property('validTill', startDate+20000);
            done()
        }, 1000)
    });
    it('8: expect get to /foo/quantity request be successful', function(done){
        setTimeout(async ()=>{
            const response = await chai.request(itemsServer).get('/foo/quantity')
            expect(response.body).to.have.property('quantity', 0);
            expect(response.body).to.have.property('validTill', null);
            done()
        }, 7000)
    });
    it('9: expect erorr 404 on wrong route', async function(){
        const response = await chai.request(itemsServer).get('/foo/unavailableroute');
        expect(response.body).to.be.empty;
        expect(response).to.have.status(404);
        expect(response.text).to.be('not found');
    });
    it('10: expect root / acess to be unautorized', async function(){
        const response = await chai.request(itemsServer).get('/');
        expect(response.body).to.be.empty;
        expect(response).to.have.status(401);
        expect(response.text).to.be('Unauthorized: you cant access this route');
    })
     after(async ()=>{
        Container.reset('sequelize');
        await itemModel.drop();  
    })
})

