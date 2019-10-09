import { signinValidation } from "../helpers/validator";
import CrudUser from "../models/crud-user";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const userActivityIn = {
    signin(req,res){
        const { error } = signinValidation(req.body);
        if(error){
            return res.send({
                msg:"Validation Error",
                Error:error.details[0].message
            })
        }

        const user=CrudUser.findOne(req.body.email);
        
        if(user){
                    
        const match = bcrypt.compareSync(req.body.password,user.password);
        
        if(match){
            const payload={email:req.body.email};
        const secret=process.env.TOKEN;
        const options={expiresIn: '1d', issuer:'www.jwt.io'};
        const token=jwt.sign(payload,secret,options);
        return res.status(200).send({
            status:200,
            message:"You are successfull logged in Buddy",
            data:token
        });

        }
        return res.status(400).send({
        status:400,
        message:"invalid credentials, check your email and password"
        })
        
    }
    return res.status(400).send({
        status:400,
        message:"invalid credentials, check your email and password"
        })
     
        
    }

}
export default userActivityIn;