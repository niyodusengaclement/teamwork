import chai from "chai";
import { it } from "mocha";
import users from "./data"
import { request,expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import jwt from "jsonwebtoken";


chai.use(chaiHttp);

const payload=users.takenEmail;
const secret=process.env.TOKEN;
const options={expiresIn: '1d', issuer:'www.jwt.io'};
const token=jwt.sign(payload,secret,options);

export default function articles(){
    it("User should not see posted articles if he doesn't provide token", done => {
        request(app)
        .get("/api/v1/articles")        
        .end((err,res) => {
            expect(res).to.have.status(401)
            done();
        })
    })
    it("User should read article if provide valid token", done => {
        request(app)
        .get("/api/v1/articles")
        .set({'auth':token})
        .end((err,res) => {
            expect(res).to.have.status(200)
            done();
        })
    })
    it("User should not post Article if he doesn't provides token", done => {
        request(app)
        .post("/api/v1/articles")
        .end((err,res) => {
            expect(res).to.have.status(401)
            done();
        })
    })
    it("User should not post if he doesn't fill out title and/or article", done => {
        request(app)
        .post("/api/v1/articles")
        .set("auth",token)
        .send(users.invalidArticle)
        .end((err,res) => {
            expect(res).to.have.status(400)
            done();
        })
    })
    it("User should post new Article if he provide proper token and article info", done => {
        request(app)
        .post("/api/v1/articles")
        .set("auth",token)
        .send(users.validArticle)
        .end((err,res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property("message","Article added successfull")
            expect(res.body).to.have.property("status",200)
            done()
        })
    })
    it("User should not see get article if he doesn't provide token", done => {
        request(app)
        .get("/api/v1/articles/2")        
        .end((err,res) => {
            expect(res).to.have.status(401)
            done();
        })
    })
    it("User should not get article if ID provided doesn't match any", done => {
        request(app)
        .get("/api/v1/articles/12")  
        .set("auth",token)      
        .end((err,res) => {
            expect(res).to.have.status(400)
            expect(res.body).to.have.property("status",400)
            expect(res.body).to.have.property("message","No Article match that ID")
            done();
        })
    })
    it("User should get article if he provided proper article ID", done => {
        request(app)
        .get("/api/v1/articles/2")  
        .set("auth",token)      
        .end((err,res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property("status",200)
            expect(res.body).to.have.property("data")
            done();
        })
    })
    it("User should not edit article if he doesn't provide Token", done => {
        request(app)
        .patch("/api/v1/articles/2")      
        .end((err,res) => {
            expect(res).to.have.status(401)
            done();
        })
    })
    it("User should not modify article if ID provided doesn't match any", done => {
        request(app)
        .patch("/api/v1/articles/12")  
        .set("auth",token)      
        .end((err,res) => {
            expect(res).to.have.status(400)
            expect(res.body).to.have.property("status",400)
            expect(res.body).to.have.property("message","No Article match that ID")
            done();
        })
    })
    it("User should edit article if he provid proper article ID", done => {
        request(app)
        .patch("/api/v1/articles/2") 
        .send(users.validArticle) 
        .set("auth",token)      
        .end((err,res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property("status",200)
            expect(res.body).to.have.property("msg","article edited successfull")

            done();
        })
    })
    it("User should not delete article if he doesn't provide Token", done => {
        request(app)
        .delete("/api/v1/articles/2")      
        .end((err,res) => {
            expect(res).to.have.status(401)
            done();
        })
    })
    it("User should not delete article if ID provided doesn't match any", done => {
        request(app)
        .delete("/api/v1/articles/12")  
        .set("auth",token)      
        .end((err,res) => {
            expect(res).to.have.status(400)
            expect(res.body).to.have.property("status",400)
            expect(res.body).to.have.property("msg","No Article match that ID")
            done();
        })
    })
    it("User should not delete article if there is an error", done => {
        request(app)
        .delete("/api/v1/articles/12")  
        .set("auth",token)      
        .end((err,res) => {
            expect(res).to.have.status(400)
            done();
        })
    })
    it("User should delete article if he provid proper article ID", done => {
        request(app)
        .delete("/api/v1/articles/2")
        .set("auth",token)      
        .end((err,res) => {
            expect(res).to.have.status(204)
            done();
        })
    })

}
