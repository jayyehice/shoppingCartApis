const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ConnectionUri = require('./ConnectionUri');


// 引用 express
const server = express();

// 預設 port
const port = process.env.PORT || 3000

// 建立 get method 顯示 index.html 內容
server.get('/', (req, res) => {
    // __dirname 回傳被執行 js 檔所在資料夾的絕對路徑
    res.sendFile(__dirname + '/index.html')
})


// 監聽 port
// server.listen(port, () => console.log(`Listening on ${port}`))


server.use(bodyParser.json());
server.use(cors());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = ConnectionUri.uri();
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





client.connect((err, db) => {

    if (err) throw err;
    // 連線資料庫
    const dbo = db.db("shop")

    //GET API  從 http://localhost:3000/comments 取得資料
    server.get('/products', (req, res) => {
        // 回傳 comments 的所有資料	
        dbo.collection('products').find().toArray((err, result) => {
            if (err) return console.log(err)
        // 顯示取得資料在頁面上
            res.send({ data: result })
        })
    })





    
    
    // POST API 路徑為/comments expressjs 取參數的方法之一 req.body
    server.post('/order', (req, res) => {
        // 顯示 clinet 端傳送過來的 JSON
        console.log(req.body);
        dbo.collection('order').insertOne(req.body, (err, result) => {
            if (err) return console.log(err)
            console.log('saved to database')
            res.send(req.body);
        });
    })
    
    // modify server.listen(3000, () => {});
    /* 將之前的監聽 server.listen(port, () => console.log(`Listening on ${port}`)) 註解掉，改寫至 MongoClient.connect() 裡 */
    
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) return console.log(err)
        db = client.db('<dbName>')
        server.listen(port, () => {
            console.log('listening on 3000')
        })
    })

});






