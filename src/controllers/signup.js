import { userValidation } from '../helpers/validator';
import jwt from 'jsonwebtoken';
import crudUser from '../models/crud-user';

import users from "../assets/users";


const userActivityUp={
    getAll(req,res){
        res.send({users});
    },
    signup(req, res){
   
        
    const { error } = userValidation(req.body)     
    if(error){
        return res.status(400).send(error.details[0].message);
        
    };
    
    const check=crudUser.findOne(req.body.email);
    if(check){
        return res.status(400).send({msg:'Email already taken'});
    
    }
    const inPassword=crudUser.hashPassword(req.body.password);
    const payload={email:req.body.email};
    const secret=process.env.TOKEN;
    const options={expiresIn: '1d', issuer:'www.jwt.io'};

    const token=jwt.sign(payload,secret,options);

    const newUser = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:inPassword,
        gender:req.body.gender,
        jobRole:req.body.title,
        departement:req.body.departement
    }
    
    if(crudUser.addUser(newUser)){
        res.setHeader("x-auth",token)
        return res.status(201).json({
        status:201,
        message:'user created successfull',
        data:{
            email:req.body.email,
            password:inPassword,
            token:token
        }
    });
    
    }
    else{
    return res.status(400).json({
        status:400,
        message:'Failed to register user, please try again',

    })
}
 
}

}
export default userActivityUp;