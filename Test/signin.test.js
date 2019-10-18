import { it } from "mocha";
import { request,expect,assert } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import user from "./data";


chai.use(chaiHttp);
chai.should();
export default function signin () {
    it("Signin should fail if no email or password provided", (done) => {
        request(app)
        .post("/api/v1/auth/signin")
        .send(user.invalidEmail)
        .end((err,res) => {
            assert.equal(400,res.status);
            expect(res.body).to.have.property("msg","Validation Error")
            done();
        })

    })
    it("User should login if is registered", done => {
        request(app)
        .post("/api/v1/auth/signin")
        .send(user.takenEmail)
        .end((err,res) => {
            assert.equal(200,res.status);
            expect(res).to.have.header("x-auth")
            expect(res.body).to.have.property("message","You are successfull logged in Buddy")
            expect(res.body).to.have.property("data")
            done();
        })
    })
    it("User should not login if he is not registered", done => {
        request(app)
        .post("/api/v1/auth/signin")
        .send(user.invalidUser)
        .end((err,res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property("message","invalid credentials, check your email and password")
            done();
        })
    })
   
}