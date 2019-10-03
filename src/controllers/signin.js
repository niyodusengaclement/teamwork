import { signinValidation } from "../helpers/validator";
import CrudUser from "../models/crud-user";
import jwt from "jsonwebtoken";

const userActivityIn = {
    signin(req,res){
        const { error } = signinValidation(req.body);
        if(error){
            return res.send({
                msg:"Validation Error",
                Error:error.details[0].message
            })
        }

        const user=CrudUser.logUser(req.body.email,req.body.password);
        if(!user){
            return res.status(400).json({
                status:400,
                message:"invalid credentials, check your email and password"
            });
        }
        const payload={email:req.body.email};
        const secret=process.env.TOKEN;
        const options={expiresIn: '1d', issuer:'www.jwt.io'};
        const token=jwt.sign(payload,secret,options);
        res.status(200).json({
            status:200,
            message:"You are successfull logged in Buddy",
            data:token
        });
    }

}
export default userActivityIn;