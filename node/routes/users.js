var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var CONN_DB_STR = "mongodb://localhost:27017/houtai";
// var CONN_DB_STR = "mongodb://47.98.148.13:27017/houtai";
var async=require("async");
var formidable=require("formidable");
var fs = require("fs");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/submit', function(req, res) {
  var username=req.body.username;
  var userpwd=req.body.userpwd;

  var findcomment=function(db,callback){
      var userinfo=db.collection("userinfo");
      var date=new Date().toLocaleDateString();
      var age="";
      var place="";
      var like1="";
      var like2="";
      var like3="";
      var person="";
      var sex="";
      var name=username;
      var personimg="/images/touxiang/y.jpg";
      async.waterfall([
        function(callback){
            userinfo.find({username:username},{}).toArray((err,result)=>{
              if(err) throw err;
               callback(null,result);
            })
        },function(arg,callback){
          if(arg.length>0){
              callback(null,1)
          }else{
            userinfo.insert({username,userpwd,date,age,place,like1,like2,like3,person,sex,name,personimg},(err,result)=>{
              if(err) throw err;
              callback(null,0);
            })
          }
        }
      ],function(err,result){
          if(err) throw err;
           callback(result);
      })
  }
  
  MongoClient.connect(CONN_DB_STR, (err, db) => {
    if(err) throw err;
    findcomment(db,(result)=>{
      if(result==0){
        res.redirect("/?username="+username);
      }else{
        res.send("<script>alert('用户名已经注册');window.location.href='/create'</script>");
      }
     
    })
    
  })
 
});

router.post("/login",(req,res)=>{

    
    var username=req.body.username;
    var userpwd=req.body.userpwd;


    var findcomment=function(db,callback){
      var userinfo=db.collection("userinfo");
      async.waterfall([
        function(callback){
            userinfo.find({username:username},{}).toArray((err,result)=>{
              if(err) throw err;
              
               callback(null,result);
            })
        },function(arg,callback){
          if(arg.length>0){
              if(arg[0].userpwd==userpwd){
                  callback(null,0);
              }else{
                  callback(null,1);
              }
          }else{
           
              callback(null,1);
          
          }
        }
      ],function(err,result){
          if(err) throw err;
           callback(result);
      })
  }


  MongoClient.connect(CONN_DB_STR, (err, db) => {
    if(err) throw err;
    findcomment(db,(result)=>{
      if(result==0){
        req.session.username=username;
        res.redirect("/modle");
      }else{
        res.send("<script>alert('用户名或密码错误');window.location.href='/'</script>");
      }
    })
    
  })

})

router.get("/logout",(req,res)=>{
  req.session.destroy(err=>{
    if(err) throw err;
    res.redirect("/");
  })
})

router.get('/changemeg', function(req, res, next) {
  var username=req.session.username||"";
  MongoClient.connect(CONN_DB_STR, (err, db) => {
       var userinfo=db.collection("userinfo");
       userinfo.find({username:username},{}).toArray((err,result)=>{
         if(err) throw err;
         result=result[0];
         res.render('changemeg', { title: '注册',username,result});
       }) 
  })
  
});


router.post("/changeperson", function(req, res) {
  // console.log(req);
  var   AVATAR_UPLOAD_FOLDER ="/avatar/"
  var form = new formidable.IncomingForm();   //创建上传表单
  form.encoding ="utf-8";        //设置编辑
  form.uploadDir = "public" + AVATAR_UPLOAD_FOLDER;   //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
  form.parse(req, function (err, fields, files) {
    // console.log(fields);
    // console.log(fields)  
    var extName ="";  //后缀名
    switch (files.fulAvatar.type) {
      case "image/pjpeg":
        extName = "jpg";
        break;
      case "image/jpeg":
        extName = "jpg";
        break;
      case "image/png":
        extName = "png";
        break;
      case "image/x-png":
        extName = "png";
        break;
    }
    var avatarName = Math.random() + "." + extName;
    // var newPath = form.uploadDir + avatarName;
    // var imgsrc = AVATAR_UPLOAD_FOLDER + avatarName;
    // fs.renameSync(files.fulAvatar.path, newPath);  //重命名
    // res.locals.success = "上传成功";
    // console.log(imgsrc);
    var avatarName = Math.random() + "." + extName;
    if (files.fulAvatar.name) {
      var newPath = form.uploadDir + avatarName;
      imgsrc = AVATAR_UPLOAD_FOLDER + avatarName
      fs.renameSync(files.fulAvatar.path, newPath);
    } else {
      imgsrc = ""
    }
    //重命名
    res.locals.success = "上传成功";
    console.log(imgsrc)
    var cv={}
    
    var username=req.session.username;
    var data=fields;
    if(imgsrc){
      cv={
        name:data.name,
        userpwd:data.userpwd,
        sex:data.sex,
        age:data.age,   
        place:data.place,
        person:data.person,
        like1:data.like1,
        like2:data.like2,
        like3:data.like3,
        personimg:imgsrc
      }
    }else{
      cv={
        name:data.name,
        userpwd:data.userpwd,
        sex:data.sex,
        age:data.age,   
        place:data.place,
        person:data.person,
        like1:data.like1,
        like2:data.like2,
        like3:data.like3,
      }
    }
    
    MongoClient.connect(CONN_DB_STR, (err, db) => {
      var userinfo=db.collection("userinfo");
      if(data){
        userinfo.updateOne({username:username},{
          $set:cv
        })
      }
     
      res.send("<script language=JavaScript>parent.location.reload();</script>");
})
  });       
});

router.get("/friends",(req,res)=>{
  res.render("friends")
})
router.get("/saylist",(req,res)=>{
    var pageindex=req.query.pageindex;
    var pagecount=req.query.pagecount;
    var count=0;
    var name=req.query.name||"";
    console.log(name);
    var bengin=function(db,callback){
      var comments=db.collection("comments");
        async.series([
          function(callback){
              if(name){
                var query=new RegExp("^.*"+name+".*$")
                comments.find({name:query},{}).toArray((err,result)=>{
                  if(err) throw err;
                 
                  count=result.length;
                 
                    callback(null,count);
                
              })
              }else{
                comments.find({},{}).toArray((err,result)=>{
                  if(err) throw err;
                 
                  count=result.length;
                 
                    callback(null,count);
                
              })
              }
              
          },
          function(callback){
           
                if(count>0){
                    if(name){
                    var query=new RegExp("^.*"+name+".*$")
                    var pageMax=Math.ceil(count/pagecount);
             
                    pageindex=pageindex<=1?1:pageindex;
                    pageindex=pageindex>=pageMax?pageMax:pageindex;
                   
                    comments.find({name:query},{}).sort({_id:-1}).skip((pageindex-1)*pagecount).limit(pagecount*1).toArray((err,result)=>{
                      if(err) throw err;
                      
                        callback(null,result);
                    })

                    }
                    else{
                    var pageMax=Math.ceil(count/pagecount);
             
                    pageindex=pageindex<=1?1:pageindex;
                    pageindex=pageindex>=pageMax?pageMax:pageindex;
                   
                    comments.find({},{}).sort({_id:-1}).skip((pageindex-1)*pagecount).limit(pagecount*1).toArray((err,result)=>{
                      if(err) throw err;
                      
                        callback(null,result);
                    })
                    }
                    
                  }
                  
                  else{
                        callback(null,false);
                    }
              
          }
        ],function(err,result){
            if(err) throw err;
            callback(result);
        })
    };

    MongoClient.connect(CONN_DB_STR,(err,db)=>{
      if(err) throw err;
      bengin(db,function(result){
        //   console.log(result);
          if(result[0]){
              res.send({
                  result
              })
          }else{
            res.send({
              result:false
             })
          }
      })

    });
});

router.get("/loadreply",(req,res)=>{
  var uid=req.query.uid*1;
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
      var reply=db.collection("reply");
      reply.find({uid},{}).toArray((err,result)=>{
          res.send({
              result
          })
      })
  })
});


router.get("/reply",(req,res)=>{
  var messge=req.query.messge;
  var uid=req.query.uid*1;
  var username=req.session.username;

function createreply(db,callback){
    var reply=db.collection("reply");
    async.waterfall([
      function(callback){
        var userinfo=db.collection("userinfo");
        userinfo.find({username},{}).toArray((err,result)=>{
            console.log(result);
            var name=result[0].name;
            
            callback(null,name);
        })
      },
      function(arg,callback){
          var  name=arg;
          var idlist=db.collection("idlist");
          idlist.findAndModify(
              {name:"comments"},  // query 
              [['_id',"desc"]],  // sort 降序
              {$inc:{uid:1}},   // uid +1 
              function(err,result){
                  if(err) throw err;
                  var reid=result.value.uid;            
              reply.insert({
                uid,
                list:{
                  name,
                  messge,
                  reid
                }
              },(err,result)=>{
                if(err) throw err;
                callback(null,arg,true);
              })
              }
          )     
      },
      function(arg1,arg2,callback){
          reply.find({uid},{}).toArray((err,result)=>{
            callback(null,[arg1,arg2,result]);
          })
      }
    ],function(err,result){
      if(err) throw err;
      callback(result);
      
    });
};
MongoClient.connect(CONN_DB_STR,(err,db)=>{
  
    createreply(db,function(result){
      console.log(result);
        res.send({
            result:result[2]
        })
    })
});
});


router.get("/loadperson",(req,res)=>{
      var uid=req.query.uid*1;
      function findperson(db,callback){
          async.waterfall([
            function(callback){
                var comments=db.collection("comments");
                comments.findOne({uid},{username:1},(err,result)=>{
                  if(err) throw err;
                  console.log(result);
                  var username= result.username;         
                  callback(null,username);              
                })
            },
            function(arg,callback){
                var userinfo=db.collection("userinfo");
                var username=arg;
              
                userinfo.find({username},{}).toArray((err,result)=>{
                  if(err) throw err;
                
                  callback(null,[arg,result]);
              })
            }
          ],function(err,result){
              if(err) throw err;
              callback(result);
          })
      }

      MongoClient.connect(CONN_DB_STR,(err,db)=>{
        findperson(db,function(result){
          console.log(result);
            res.send({
              result:result[1]
            });
        })
      })

});



module.exports = router;
