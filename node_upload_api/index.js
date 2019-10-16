const express = require('express');
const multer = require('multer');

const fileFilter = function(req, file, cb) {
    const allowedTypes = ["image/jpeg","image/png","image/gif"];
    if(!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Wrong file type")
        error.code = "LIMIT_FILE_TYPES";
        return cb(error, false);
    }
    cb(null, true);
}

const MAX_SIZE = 20000;
const upload = multer({
    dest:'./uploads/',
    fileFilter,
    limits: {
        fileSize:MAX_SIZE
    }
})
const pureUpload = multer({
    dest:'./uploads/'
})

const app = express()
// uploadFiles.vue: formData.append('file', this.file)
app.post('/upload',upload.single('file'),(req,res) =>{
    res.json({file:req.file})
})

app.post('/dropzone',pureUpload.single('file'),(req,res) =>{
    res.json({file:req.file})
})

// 若要載入中介軟體函數，請呼叫 app.use()
app.use(function(err, req, res, next) {
    if(err.code === "LIMIT_FILE_TYPES") {
        res.status(422).json({error:"Only images are allowed"});
        return; 
    }
    if(err.code === "LIMTIT_FILE_SIZE") {
        res.status(422).json({error:`Too large. Max size is ${MAX_SIZE/1000}kb`});
        return; 
    }
})

app.listen(3000,()=>console.log('running on localhost:3000')); 