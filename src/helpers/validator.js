import joi from 'joi';

export function userValidation(input){
    const inputData={
        firstname:joi.string().required().min(3).max(20),
        lastname:joi.string().required().min(3).max(20),
        email:joi.string().email().required().min(5),
        password:joi.string().required().min(6).max(30),
        gender:joi.string().required().min(4).max(6),
        jobRole:joi.string().required().min(3).max(20),
        departement:joi.string().required().min(2).max(20)
    }
    return joi.validate(input,inputData);
}

export function signinValidation(inputVal){
    const validInput={
        email:joi.string().required().email().min(6),
        password:joi.string().required()
    }
    return joi.validate(inputVal,validInput);
}

export function addArticleValidation(inputVal){
    const validInput={
        title:joi.string().required().min(7),
        article:joi.string().required().min(10)
    }
    return joi.validate(inputVal,validInput);
}


