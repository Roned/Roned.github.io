var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var CONN_DB_STR = "mongodb://localhost:27017/houtai";
// var CONN_DB_STR = "mongodb://47.98.148.13:27017/houtai";
var async=require("async");
var multiparty = require("multiparty");
var fs = require("fs");




router.post("/uploadImg",(req,res)=>{
    console.log("上传图片");
    // formData
    var form = new multiparty.Form();
    // 设置编码
    form.encoding = "UTF-8";
    // 设置文件的临时存储路径
    form.uploadDir = "./uploadtemp";
    // 设置上传图片的大小
    form.maxFilesSize =  2*1024*1024     // 2M    bytes  1B  存2个汉字 4个英文字母  // gbk-2313

    form.parse(req,(err,fields,files)=>{
        if(err) throw err;
        // fields 文件域 
        // files 对应文件 
        console.log(fields);
        console.log(files);
        var uploadUrl = "/images/upload/"; // 文件的真实路径
        file  = files["filedata"];  // 富文本编辑对象
        originalFilename = file[0].originalFilename;  // 文件名称  5.jpg 
        tempath = file[0].path    // 文件的临时路径 uploadtemp

        var timestamp = new Date().getTime();  //时间戳
        uploadUrl+=timestamp+originalFilename;    // /images/uploda/12332231205.jpg
        newPath = "./public"+uploadUrl;

        // 通过文件流读写数据
        var fileReadStream = fs.createReadStream(tempath);
        var fileWriteStream = fs.createWriteStream(newPath);

        fileReadStream.pipe(fileWriteStream);  // 通过pipe 管道输送文件 图片

        // 监听文件上传  关闭  on('pipe')
        fileWriteStream.on("close",()=>{
            // 删除临时文件夹
            fs.unlinkSync(tempath);
            res.send('{"err":"","msg":"'+uploadUrl+'"}');
        })
    })
    // res.send("上传图片");
})

router.post('/submit',(req,res)=>{
    var username=req.session.username;
    var name=req.query.name;
    var content=req.body.content;
    var date=new Date().toLocaleString();
    
    MongoClient.connect(CONN_DB_STR,(err,db)=>{
        async.waterfall([
            function(callback){
                var idlist=db.collection("idlist");
                idlist.findAndModify(
                    {name:"comments"},  // query 
                    [['_id',"desc"]],  // sort 降序
                    {$inc:{uid:1}},   // uid +1 
                    function(err,result){
                        if(err) throw err;
                        var uid=result.value.uid;
                        var data={uid,username,name,content,date};
                        callback(null,data);
                    }
                )
            },function(arg,callback){
                var comments=db.collection("comments");
                comments.insert({uid:arg.uid,username:arg.username,name:arg.name,content:arg.content,date:arg.date},(err,result)=>{
                    if (err) throw err; 
                    callback(null,arg);
                })
            }
        ],function(err,result){
            if(err) throw err;
            res.redirect("/index");
        })
    })
});

router.get('/createsay',(req,res)=>{
    var username=req.session.username;
   
    var name=req.query.name;
    res.render("createsay",{username,name});
})
module.exports=router;