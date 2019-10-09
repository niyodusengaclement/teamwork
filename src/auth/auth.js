import jwt from "jsonwebtoken";


function validateToken(req,res,next){
const authentication=req.headers.auth;
let result;
if (authentication){
    const token=req.headers.auth;
    const options={expiresIn: '1d', issuer:'www.jwt.io'};
    try{
        result=jwt.verify(token,process.env.TOKEN,options);
        req.decoded=result;
        next();

    }
    catch(err){
        res.status(401).send(err);
        //throw new Error(err);
    }
}
else{
    result={
        Error:'No token provided, Token required plz',
        Status:401
    };
    res.status(401).send(result);
    }
}

export default validateToken