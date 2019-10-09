import users from "../assets/users";
import article from "../assets/article"
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';


class CrudUser{
    constructor(){
        this.user=[];
        this.Article=[];
    }

    findOne(inputEmail){
        return this.user=users.find(data => data.email===inputEmail);
    }
    findAllArticles(){
        return this.Article=article.find(data => data.id !== null );
    }
    logUser(inputEmail,inputPassword){
        return this.user=users.find(data => data.email===inputEmail && data.password===inputPassword);
    }
    addUser(inputData){
        return users.push(inputData);
    }
    addArticle(newArticle){
        return article.push(newArticle);
    }
    findOneArticle(id){
        return this.Article=article.find(data => data.id === id);
    }
    logUser(inputEmail,inputPassword){
        //const hash= bcrypt.compareSync(inPassword,inputPassword);
        return this.user=users.find(data => data.email===inputEmail && data.password===inputPassword);
    }
    hashPassword(password){
        try{
            const salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(password, salt);
        }
        catch(err){
            return err;
        } 
         
    }
    
}

export default new CrudUser();