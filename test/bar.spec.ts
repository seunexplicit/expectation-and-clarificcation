
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Sequelize } from 'sequelize';
import { ItemsModel } from '../db/Item/item.schema';
import { ItemDataManipulation } from '../db/Item/item.action';
import sinon from 'sinon';
import { ExpressConfig } from '../src/config/express'; 
import  ItemsServer  from '../src';
import * as CreateConnection  from '../src/config/connection';

const sequelize = new Sequelize("sqlite::memory:");
sequelize.sync();
const itemModel = ItemsModel(sequelize);
chai.use(chaiHttp);

let itemsServer = ItemsServer.getServer();

const expect = chai.expect;

describe('perishable_inventory_manager test api', function(){
    let startDate:any;
    let stubExpressConfig:any;
    let stubDataManipulation:any;

    beforeEach(async ()=>{
        console.log(CreateConnection, typeof CreateConnection.CreateConnection);
        //let dcFake = sinon.fake({temsModel:itemModel});
        // let fakeconnection = sinon.fake(()=>{
        //     return {itemsModl:itemModel}
        // });

        // sinon.replace(CreateConnection, 'CreateConnection', fakeconnection);
        // sinon.stub(CreateConnection, 'CreateConnection').callsFake(()=>{return {itemsModel:itemModel}});
        // let fakeDatabaseConnection = sinon.fake();
        // console.log(typeof ExpressConfig.prototype, Object.keys(ExpressConfig.prototype))
        // const expressStubInstance = sinon.createStubInstance(ExpressConfig);
        // expressStubInstance.setUpDatabaseConnection = sinon.stub();
        // // stubExpressConfig = sinon.stub(ExpressConfig.prototype, 'setUpDatabaseConnection').callsFake(()=>{
        // //     return {};
        // // });
        // stubDataManipulation = sinon.stub(ExpressConfig, 'prototype').yieldsTo("constructor", itemModel);	
        startDate = new Date().getTime();
        
    })

    it('9: expect post to /bar/add request be successful', async function(){
        const expressStubInstance1 = sinon.createStubInstance(ExpressConfig);
        expressStubInstance1.setUpDatabaseConnection = sinon.stub();
        const response = await chai.request('http://localhost:8081').post('/bar/add')
                                .send({expiry:startDate + 10000, quantity:10});
        expect(response).to.have.status(200);
        expect(response.body).to.be.empty;
    });
    it('10: expect post to /bar/add request be successful', function(done){
        setTimeout(async()=>{
            const response = await chai.request(itemsServer).post('/bar/add')
                                .send({expiry:startDate + 15000, quantity:10});
            expect(response).to.have.status(200);
            expect(response.body).to.be.empty;
            done()
        }, 1000)
        
    });
    it('11: expect post to /bar/add request be successful', function(done){
        setTimeout(async ()=>{
            const response = await chai.request(itemsServer).post('/bar/add')
                                .send({expiry:startDate + 20000, quantity:10});
            expect(response).to.have.status(200);
            expect(response.body).to.be.empty;
            done()
        }, 1000)
        
    });
    it('12: expect get to /bar/quantity request be successful', function(done){
        setTimeout(async ()=>{
            const response = await chai.request(itemsServer).get('/bar/quantity')
            expect(response.body).to.have.property('quantity', 30);
            expect(response.body).to.have.property('validTill', startDate+10000);
            done()
        }, 1000)
        
    });
    it('13: expect post to /bar/sell request be successful', function(done){
        setTimeout(async ()=>{
            const response = await chai.request(itemsServer).post('/bar/sell/')
                                .send({quantity:5});
            expect(response).to.have.status(200);
            expect(response.body).to.be.empty;
            done();
        }, 2000)
        
    });
    it('14: expect get to /bar/quantity request be successful', function(done){
        setTimeout(async ()=>{
             const response = await chai.request(itemsServer).get('/bar/quantity')
             expect(response.body).to.have.property('quantity', 25);
             expect(response.body).to.have.property('validTill', startDate+10000);
             done()
        }, 2000)
       
    });
    it('15: expect get to /bar/quantity request be successful', function(done){
        setTimeout(async ()=>{
            const response = await chai.request(itemsServer).get('/bar/quantity')
            expect(response.body).to.have.property('quantity', 20);
            expect(response.body).to.have.property('validTill', startDate+15000);
            done()
        }, 3000)
        
    });
    it('16: expect post to /bar/sell request be successful', function(done){
        setTimeout(async ()=>{
            const response = await chai.request(itemsServer).post('/bar/sell')
                            .send({quantity:13});
            expect(response).to.have.status(200);
            expect(response.body).to.be.empty;
            done()
        }, 3000)
        
    });
     it('17: expect get to /bar/quantity request be successful', function(done){
        setTimeout(async ()=>{
            const response = await chai.request(itemsServer).get('/bar/quantity')
            expect(response.body).to.have.property('quantity', 7);
            expect(response.body).to.have.property('validTill', startDate+20000);
            done()
        }, 1000)
        
    });
     it('18: expect get to /bar/quantity request be successful', function(done){
        setTimeout(async ()=>{
            const response = await chai.request(itemsServer).get('/bar/quantity')
            expect(response.body).to.have.property('quantity', 7);
            expect(response.body).to.have.property('validTill', startDate+20000);
            done()
        }, 3000)
        
    });
     it('19: expect get to /bar/quantity request be successful', function(done){
        setTimeout(async ()=>{
            const response = await chai.request(itemsServer).get('/bar/quantity')
            expect(response.body).to.have.property('quantity', 0);
            expect(response.body).to.have.property('validTill', null);
            done()
        }, 3000)
        
    });

     afterEach(async ()=>{
        await itemModel.drop();
        stubExpressConfig.restore();
        stubDataManipulation.restore();
        
    })
})

