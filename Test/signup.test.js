import chai from "chai";
import { describe, it } from "mocha";
import { expect,request,assert } from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import user from "./data"

chai.use(chaiHttp);
chai.should();
export default function signup () {
    it("App should run perfect", (done) => {
        request(app)
        .get('/')
        .end((err,res) =>{
            assert.equal(200,res.status);
            //expect(res).to.have.status(200);
            done();
        } )

    });

    it('Signup should fail if input data is not valid',(done) => {
        request(app)
        .post('/api/v1/auth/signup')
        .send(user.invalidInfo)
        .end((err,res) => {
            assert.equal(400,res.status);
            //res.should.have.status(400);
            done();
        })       
        
    } );
    it('Signup should fail if email already taken',(done) => {
        request(app)
        .post('/api/v1/auth/signup')
        .send(user.takenEmail)
        .then((res) => {
            res.should.have.status(400);
            done();
        })  
        .catch( err => {
            throw err
        })     
        
    } );
    it('User should be able to signup if input data is valid',(done) => {
        request(app)
        .post('/api/v1/auth/signup')
        .send(user.validInfo)
        .end((err,res) => {
            assert.equal(201,res.status);
            //res.should.have.status(201);
            res.should.be.an('object');
            done();
        })       
        
    } );

}