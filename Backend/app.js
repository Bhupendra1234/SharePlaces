const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const placesRoutes = require('./routes/places-routes');
const UserRoutes= require('./routes/users-routes');
const HttpError = require('./models/http-error');
const app = express();
app.use(bodyParser.json());

app.use('/Uploads/images',express.static(path.join('Uploads','images')));
app.use((req,res,next)=>{
 res.setHeader('Access-Control-Allow-Origin','*');
 res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type,Accept,Authorization');
 res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PATCH');
 next();
});

app.use('/api/places', placesRoutes); // => /api/places...
app.use('/api/users',UserRoutes);
app.use((req,res,next)=>{
    const error =  new HttpError("Could not find place");
    throw error;
})

app.use((error, req, res, next) => {
   if(req.file)
   {
      fs.unlink(req.file.path,(err)=>{
        console.log(err);
      });
   }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
});
 
mongoose.connect('mongodb+srv://sanju:sanju1234@cluster0-ldyfo.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}).then(()=>{
  app.listen(5000);
})
.catch((err)=>
{
    console.log(err);
})

