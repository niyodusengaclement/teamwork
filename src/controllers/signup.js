import { userValidation } from '../helpers/validator';
import jwt from 'jsonwebtoken';
import crudUser from '../models/crud-user';
import bcrypt from 'bcrypt';
import users from "../assets/users";


const userActivityUp={
    getAll(req,res){
        res.send({users});
    },
signup(req, res){
    
    const salt = bcrypt.genSaltSync(10);
    const inPassword= bcrypt.hashSync(req.body.password, salt);
    const newUser = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:inPassword,
        gender:req.body.gender,
        jobRole:req.body.title,
        departement:req.body.departement
    }

    const { error } = userValidation(req.body)     
    if(error){
        res.status(400).send(error.details[0].message);
        return
    };
    
    const check=crudUser.findOne(req.body.email);
    if(check){
    res.send('Email already taken');
    return;
    }
    const payload={email:req.body.email};
    const secret=process.env.TOKEN;
    const options={expiresIn: '1d', issuer:'www.jwt.io'};

    const token=jwt.sign(payload,secret,options);
    
    if(crudUser.addUser(newUser)){
        res.setHeader('Content-Type','application/json');
        res.status(201).json({
        status:201,
        message:'user created successfull',
        data:{
            email:req.body.email,
            token:token
        }
    });
    
    }
    else{
    res.json({
        status:400,
        message:'Failed to register user, please try again',

    })
}
    
}

}
export default userActivityUp;