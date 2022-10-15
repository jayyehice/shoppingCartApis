const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//連線資訊
const { DB_URL: uri } = require('./config.json');

// 引用 express
const server = express();

// 預設 port
const port = process.env.PORT || 3000

// 建立 get method 顯示 index.html 內容
server.get('/', (req, res) => {
    // __dirname 回傳被執行 js 檔所在資料夾的絕對路徑
    res.sendFile(__dirname + '/index.html')
})


server.use(bodyParser.json());
server.use(cors());


const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const ObjectID = require('mongodb').ObjectID;

client.connect((err, db) => {

    if (err) throw err;
    // 連線資料庫
    const dbo = db.db("shop")



    // GET API
    //從 http://localhost:3000/order 取得資料
    server.get('/products', (req, res) => {
        // 回傳 order 的所有資料	
        dbo.collection('products').find().toArray((err, result) => {
            if (err) return console.log(err)
            // 顯示取得資料在頁面上
            res.send({ data: result })
        })
    })



    // POST API
    // 路徑為/order expressjs 取參數的方法之一 req.body
    server.post('/order', (req, res) => {
        // 顯示 clinet 端傳送過來的 JSON
        console.log(req.body);
        dbo.collection('order').insertOne(req.body, (err, result) => {
            if (err) return console.log(err)
            console.log('saved to database')
            res.send(req.body);
        });
    })



    // DELETE API
    server.delete('/order/:id', (req, res) => {
        // use _id need use ObjectID(value)
        const obj = { _id: ObjectID(req.params.id) };
        // 顯示刪除 _id
        console.log(obj)
        if (!obj) {
            res.sendStatus(403);
        }
        dbo.collection("order").deleteOne(obj, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            // 回傳訊息
            res.send('delete success');
        });
    })




    server.put('/order/:id', (req, res) => {
        // 顯示 id 及 修改內容
        console.log(req.params.id, req.body);
        if (!req.body) {
            res.sendStatus(403);
        }
        const newvalues = { $set: req.body };
        const obj = { _id: ObjectID(req.params.id) };
        dbo.collection("order").updateOne(obj, newvalues, function (err, obj) {
            if (err) throw err;
            console.log("1 document update");
            res.send('update success');
        });
    })


    // 監聽
    server.listen(port, () => {
        console.log(`listening on ${port}`)
    })
});

