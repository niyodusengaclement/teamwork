import crudUser from "../models/crud-user";
import { addArticleValidation } from "../helpers/validator";
import moment from 'moment';
import uuid from 'uuid';
import article from "../assets/article"

const articleActions = {
    create(req,res){
        const token=req.headers.auth;
        const options={expiresIn: '1d', issuer:'www.jwt.io'};
        const newArticle = {
            id:article.length+1,
            createdOn:moment.now(),
            title:req.body.title,
            article:req.body.article,
            authorId:uuid.v4()

        }
        try{
        crudUser.validateToken(token,options);
        }
        catch(err){
            return res.send("Invalid or malformatted token provided").false
        }

        const { error } = addArticleValidation(req.body);
        if(error){
            return res.send(error.details[0].message);
        }
        if(!crudUser.addArticle(newArticle)){
            return res.send("something went wrong");
        }
        res.status(200).json({
            status:200,
            message:"USer added successfull",
            data:{
                createdOn:newArticle.createdOn,
                title:newArticle.title,
                author:newArticle.authorId
            }
        })
        
        


    },

    getAll(req,res){
        
       res.status(200).send(article);        
    }

}

export default articleActions;
