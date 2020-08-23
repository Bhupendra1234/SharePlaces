const multer = require('multer');
const uuid = require('uuidv1')
const MIME_TYPE_MAP={
    'image/png': 'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg',
};
const  fileUpload = multer({
    limits:500000,
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'Uploads/images');
        },
        filename:(req,file,cb)=>{
           const ext = MIME_TYPE_MAP[file.mimetype];
           cb(null,uuid()+'.'+ext);
        }
    }),fileFilter:(req,file,cb)=>{
        const IsValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = IsValid ? null :new Error('InValid mime type');
        cb(error,IsValid);
    }
});

module.exports= fileUpload