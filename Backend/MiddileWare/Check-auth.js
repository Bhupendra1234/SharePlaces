 const HtttpError = require('../models/http-error');
 const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
        if(req.method==='OPTIONS')
          return  next();
    try{
    const token = req.headers.authorization.split(' ')[1];
     if(!token)
     {
         throw new Error('Authendication Failed');
     }
    const Decodedtoken=  jwt.verify(token,'supersecreat_don`t_share');
    req.userData= {userId:Decodedtoken.userId};
    next();
    }
    catch(err)
    {
        const error = new HtttpError('Authendication Failed!',401);
       return next(error);
    }
}