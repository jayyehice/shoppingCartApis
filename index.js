const fs = require('fs')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//連線資訊
// const { DB_URL: uri } = require('./config.json');
const uri = process.env.DB_URL;

// 引用 express
const server = express();

// 預設 port
const port = process.env.PORT || 3000

server.use(bodyParser.json());
server.use(cors());


var multer  = require('multer');

var upload = multer({dest: "public/uploads"})

server.post('/upload', upload.single('MyFile'), function (req, res, next) {
    var file = req.file;
    // combine file
    let formData = req.body.fileUpload;

    const str_success = '{"success": true, "data":{}}';
    var resobj = JSON.parse(str_success);        
    res.status(200).send(resobj);  
});


// 監聽
server.listen(port, () => {
    console.log(`listening on ${port}`)
})


