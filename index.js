// 引用 express
const express = require('express');
const server = express();

// 預設 port
const port = process.env.PORT || 3000

// 建立 get method 顯示 index.html 內容
server.get('/', (req, res) => {
    // __dirname 回傳被執行 js 檔所在資料夾的絕對路徑
    res.sendFile(__dirname + '/index.html')
})
// 監聽 port
server.listen(port, () => console.log(`Listening on ${port}`))





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://:@cluster0.hjpsmzy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


client.connect((err, db) => {

    if (err) throw err;
    // 連線資料庫
    const dbo = db.db("test")
    // console.log('mongoDB in running')
    // // 關閉連線
    // db.close()
    // 建立一筆資料
    // const myobj = { name: "jw", time: "2020/04/14/15:00", content: "hello world" };
    // // mongoDB 的操作方式
    // dbo.collection("devices").insertOne(myobj, function (err, res) {
    //     if (err) throw err;
    //     console.log("1 document inserted");
    //     db.close();
    // });

    // client.close();


    //GET API  從 http://localhost:3000/comments 取得資料
    server.get('/comments', (req, res) => {
        // 回傳 comments 的所有資料	
        dbo.collection('devices').find().toArray((err, result) => {
            if (err) return console.log(err)
        // 顯示取得資料在頁面上
            res.send({ data: result })
        })
    })



    
});



