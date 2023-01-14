const fs = require('fs')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.webm')
    }
});
const upload = multer({storage: storage})


// 引用 express
const server = express();

// 預設 port
const port = process.env.PORT || 3000

server.use(express.static('public'));
server.use('/uploads',express.static('/uploads'));
server.use(bodyParser.json());
server.use(cors());

server.get('/', (req, res, next) => {
    return res.render("./public/index.html");
});

server.post('/upload', upload.single('content'),function (req, res, next){
    const str_success = '{"success": true, "data":{}}';
    var resobj = JSON.parse(str_success);
    res.status(200).send(resobj);
});


// 監聽
server.listen(port, () => {
    console.log(`listening on ${port}`)
})


