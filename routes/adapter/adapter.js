const FormData = require('form-data');
const fetch = require('node-fetch');
const fs= require('fs');
const path = require('path');
// var express = require('express');
// var router = express.Router();


const IMAGE_SERVER_URL = "http://localhost:3000/upload";

// router.post('/image_adapter', function(req, res){
//     let sampleFile;

//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }

//     sampleFile = req.files.sampleFile;
//     var form = new http.FormData();
//     uploadImage(sampleFile);
// })


async function uploadImage(filePath) {
    var imageBuffer = fs.createReadStream(filePath);
    const form = new FormData();
    form.append('sampleFile', imageBuffer, {
      contentType: 'image/jpeg'
    });
    await fetch(IMAGE_SERVER_URL, { method: 'POST', body: form });

    fs.unlink(filePath, (err) => {});
  };

// uploadImage(__dirname + "/temp_images/vonuoc.jpg");

module.exports.uploadImage = uploadImage;