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
            authorId:uuid.v4(),
            comments:[]

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
            message:"Article added successfull",
            data:{
                createdOn:newArticle.createdOn,
                title:newArticle.title,
                author:newArticle.authorId
            }
        })
        
        


    },

    getAll(req,res){
        const token=req.headers.auth;
        const options={expiresIn: '1d', issuer:'www.jwt.io'};
        try{
            crudUser.validateToken(token,options);
            }
        catch(err){
            return res.send("Invalid or malformatted token provided");
            }

            const output=article.sort().reverse();
            
       res.status(200).send(output);        
    },
    getOne(req,res){
        const token=req.headers.auth;
        const options={expiresIn: '1d', issuer:'www.jwt.io'};
        try{
            crudUser.validateToken(token,options);
            }
        catch(err){
            return res.send("Invalid or malformatted token provided");
            }

        const id=parseInt(req.params.articleId);
        const data= crudUser.findOneArticle(id);
        if(!data) return res.status(400).send("No Article match that ID");
        const articleOne=crudUser.Article;
        res.status(200).json({
            status:200,
            data:articleOne
        });
    },
    addComment(req,res){
        const token=req.headers.auth;
        const options={expiresIn: '1d', issuer:'www.jwt.io'};
        try{
            crudUser.validateToken(token,options);
            }
        catch(err){
            return res.send("Invalid or malformatted token provided");
            }

        const comment=req.body.comment;
        const id=parseInt(req.params.articleId);
        const data= crudUser.findOneArticle(id);
        if(!data) return res.status(400).send("No Article match that ID");
        const articleOne=crudUser.Article;
        const newComment={
            commentId:articleOne.comments.length+1,
            authorId:articleOne.authorId,
            comment:comment

        }
        if(articleOne.comments.push(newComment))return res.status(201).json({
            status:201,
            message:"comment added successfull",
            article:articleOne.article,
            comment:articleOne.comments
        });




    },
    editOne(req,res){
        const token=req.headers.auth;
        const options={expiresIn: '1d', issuer:'www.jwt.io'};
        try{
            crudUser.validateToken(token,options);
            }
        catch(err){
            return res.send("Invalid or malformatted token provided");
            }

        const title=req.body.title;
        const article=req.body.article;
        const id=parseInt(req.params.articleId);
        const data= crudUser.findOneArticle(id);
        if(!data) return res.status(400).send("No Article match that ID");
        const articleOne=crudUser.Article;
        articleOne.article=article;
        articleOne.title=title;
        res.status(200).json({
            status:200,
            msg:"article edited successfull",
            title:articleOne.title,
            article:articleOne.article
        })

        
    },
    deleteOne(req,res){
        const token=req.headers.auth;
        const options={expiresIn: '1d', issuer:'www.jwt.io'};
        try{
            crudUser.validateToken(token,options);
            }
        catch(err){
            return res.send("Invalid or malformatted token provided");
            }

        const id=parseInt(req.params.articleId);
        const data= crudUser.findOneArticle(id);
        if(!data) return res.status(400).send("No Article match that ID");
        const articleOne=article.indexOf(crudUser.Article);
        if(!article.splice(articleOne)) return res.send("Something went wrong");
        res.status(200).json({
            status:204,
            msg:"article deleted successfull"
        })

        
    }

}

export default articleActions;
