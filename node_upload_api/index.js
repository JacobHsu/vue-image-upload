const express = require('express');
const multer = require('multer');

const upload = multer({
    dest:'./uploads/'
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

app.listen(3000,()=>console.log('running on localhost:3000')); 