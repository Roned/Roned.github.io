var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var CONN_DB_STR = "mongodb://localhost:27017/houtai";
// var CONN_DB_STR = "mongodb://47.98.148.13:27017/houtai";
var async=require("async");
var formidable=require("formidable");
var fs=require("fs");

/* GET home page. */

router.get('/', function(req, res, next) {
  var name=req.query.username ||"";
  res.render('login', { title: '登录' ,
name});
});
router.get('/create', function(req, res, next) {
  res.render('create', { title: '注册' });
});

router.get('/index', function(req, res) {
    var vistname=req.query.name; 
    var nowname=req.session.username;
    var username=vistname||req.session.username;
    var findsay=function(db,trun){
      async.waterfall([
          function(callback){
              var userinfo=db.collection("userinfo");
              userinfo.find({username,username},{}).toArray((err,result)=>{
                if(err) throw err;
                result=result[0];
                callback(null,result);
              })
          },
          function(arg,callback){
              var comments=db.collection("comments");
              comments.find({username,username},{}).toArray((err,result)=>{
                if(err) throw err;
            
                callback(null,[arg,result]);
              })
          }
         
      ],function(err,result){
          if(err) throw err;
          trun(result);
      })
  }

  MongoClient.connect(CONN_DB_STR, (err, db) => {
      findsay(db,(result)=>{
       
        res.render("index",{username,result:result[0],result1:result[1],vistname,nowname});
    })
    })
});
router.get('/modle', function(req, res, next) {
  var username=req.session.username||"";

  if(username){
    MongoClient.connect(CONN_DB_STR, (err, db) => {
      var userinfo=db.collection("userinfo");
      userinfo.find({username,username},{}).toArray((err,result)=>{
            if(err) throw err;
           result=result[0];
           
            res.render("modle",{username,result})
      })
    
    })

  }else{
    res.redirect("/");
  }
});

router.get('/createsay',(req,res)=>{
    res.render("createsay");
})


router.get("/saylist",(req,res)=>{
    var username=req.query.username;
    var pageindex=req.query.pageindex;
    var pagecount=req.query.pagecount;
    var count=0;
    var bengin=function(db,callback){
      var comments=db.collection("comments");
        async.series([
          function(callback){
              
              comments.find({username},{}).toArray((err,result)=>{
                  if(err) throw err;
                 
                  count=result.length;
                 
                    callback(null,count);
                
              })
          },
          function(callback){
           
                if(count>0){
                    var pageMax=Math.ceil(count/pagecount);
             
                    pageindex=pageindex<=1?1:pageindex;
                    pageindex=pageindex>=pageMax?pageMax:pageindex;
                   
                    comments.find({username},{}).sort({_id:-1}).skip((pageindex-1)*pagecount).limit(pagecount*1).toArray((err,result)=>{
                      if(err) throw err;
                      
                        callback(null,result);
                    })}else{
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
                // console.log(result);
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



router.get("/controlsay",(req,res)=>{
    var username=req.session.username;
    if(req.query.pageindex){
        var pageindex=req.query.pageindex
    }else{
        var pageindex=1;
    }
    var pagecount=20;
    var Maxpage=0;
    var count=0;
  
    function findsaylist(db,callback){
        var comments=db.collection("comments");
        async.waterfall([
            function(callback){
                comments.find({username},{}).toArray((err,result)=>{
                    if(err) throw err;
                    callback(null,result);
                })
            },
            function(arg,callback){
                if(arg.length>0){
                    Maxpage=arg.length;
                    count=Math.ceil(Maxpage/pagecount);
                    pageindex=pageindex<=1?1:pageindex;
                    pageindex=pageindex>=count?count:pageindex;
                    comments.find({username},{}).sort({uid:-1}).skip((pageindex-1)*pagecount).limit(pagecount).toArray((err,result)=>{
                        callback(null,[arg,result]);
                        }
                    )
                }else{
                    callback(null,[arg,false]);
                }
               
            }
        ],function(err,result){
                if(err) throw err;
                callback(result);
        })
    }

    MongoClient.connect(CONN_DB_STR,(err,db)=>{

        findsaylist(db,function(result){
            // console.log(result[0].length)
            if(result[0].length>0){
                res.render("controlsay",{
                    result:result[1],
                    pageMax:Maxpage,
                    pageindex,
                    test:true
                    
                })
            }else{
                res.render("controlsay",{
                    test:false
                })
            }
            
        })
      
    })
});

router.get("/delete",(req,res)=>{
        var uid=req.query.uid*1;
        // console.log(uid);
       function deletesay(db,callback){
            async.waterfall([
                function(callback){
                    var comments=db.collection("comments");
                    comments.remove({uid},(err,result)=>{
                        if(err) throw  err;
                        callback(null,true);
                    })
                },
                function(arg,callback){
                    var reply=db.collection("reply");
                    reply.remove({uid},(err,result)=>{
                        if(err) throw err;
                        callback(null,[arg,true]);
                    })
                }
            ],function(err,result){
                if(err) throw err;
                callback(result);
            })
       }
       MongoClient.connect(CONN_DB_STR,(err,db)=>{
        deletesay(db,function(result){
            // console.log(result);
            res.send(result);
        })
    });
    });

    
    router.get("/imglist",(req,res)=>{
        var username=req.query.username;
        // console.log(username);
        function findimg(db,callback){
            var imglist=db.collection("imglist");
            async.waterfall([
                function(callback){
                    // console.log("========")
                    imglist.find({username},{}).toArray((err,result)=>{
                        // console.log(result)
                        if(result.length>0){
                            callback(null,result);
                        }else{
                            callback(null,false);
                        }
                    })
                },
                function(arg,callback){
                    // console.log("========")
                    if(arg){
                        imglist.find({username},{}).sort({imgid:-1}).toArray((err,result)=>{
                            callback(null,[arg,result]);
                        })
                    }else{
                        callback(null,[arg,false]);
                    }
                }
            ],function(err,result){
                // console.log("========")
                if(err) throw err;
                console.log(result)
                callback(result);
            })
        }
        MongoClient.connect(CONN_DB_STR,(err,db)=>{
            if(err) throw err;
            
            findimg(db,function(result){
                // console.log("======")
                if(result[0]){
                    res.send({
                        result:result[1]
                    })
                }else{
                    res.send({
                        result:result[0]
                    })
                }
            })
        })
    });
    

    router.post("/insertimg", function(req, res) {
        // console.log(req);
        var   AVATAR_UPLOAD_FOLDER ="/xiangce/"
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
          var newPath = form.uploadDir + avatarName;
          var imgsrc = AVATAR_UPLOAD_FOLDER + avatarName;
          
          fs.renameSync(files.fulAvatar.path, newPath);  //重命名
          res.locals.success = "上传成功";
        //   console.log(imgsrc);
      
        //   console.log("============")
          var data=fields;
        //   console.log(data);
          var username=req.session.username;
          if(data){
            function findimg(db,callback){
                var imglist=db.collection("imglist");
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
                                
                                callback(null,uid);
                            }
                        )
                    },
                    function(arg,callback){ 
                        var imgid=arg;
                        var imgdate=new Date().toLocaleDateString();
                        imglist.insert({
                            username,
                            imgid,
                            imgdate,
                            imgsrc 
                        },(err,result)=>{
                            if(err) throw err;
                            callback(null,[arg,result]);
                        })
                        
                    }
                ],function(err,result){
                    if(err) throw err;
                    callback(result);
                })
            }
    
              MongoClient.connect(CONN_DB_STR, (err, db) => {
               
                findimg(db,function(result){
                    res.redirect("/index")
                })
         
          }) 
          }
         
        });       
      });


router.get("/controlimg",(req,res)=>{
    var username=req.session.username;
    if(req.query.pageindex){
        var pageindex=req.query.pageindex
    }else{
        var pageindex=1;
    }
    var pagecount=20;
    var Maxpage=0;
    var count=0;
  
    function findsaylist(db,callback){
        var imglist=db.collection("imglist");
        async.waterfall([
            function(callback){
                imglist.find({username},{}).toArray((err,result)=>{
                    if(err) throw err;
                    callback(null,result);
                })
            },
            function(arg,callback){
                if(arg.length>0){
                    Maxpage=arg.length;
                    count=Math.ceil(Maxpage/pagecount);
                    pageindex=pageindex<=1?1:pageindex;
                    pageindex=pageindex>=count?count:pageindex;
                    imglist.find({username},{}).sort({uid:-1}).skip((pageindex-1)*pagecount).limit(pagecount).toArray((err,result)=>{
                        callback(null,[arg,result]);
                        }
                    )
                }else{
                    callback(null,[arg,false]);
                }
               
            }
        ],function(err,result){
                if(err) throw err;
                callback(result);
        })
    }

    MongoClient.connect(CONN_DB_STR,(err,db)=>{

        findsaylist(db,function(result){
            // console.log(result[0].length)
            if(result[0].length>0){
                res.render("controlimg",{
                    result:result[1],
                    pageMax:Maxpage,
                    pageindex,
                    test:true
                    
                })
            }else{
                res.render("controlimg",{
                    test:false
                })
            }
            
        })
      
    })
});


router.get("/deleteimg",(req,res)=>{
    var imgid=req.query.imgid*1;
    // console.log(uid);
   function deletesay(db,callback){
        async.waterfall([
            function(callback){
                var imglist=db.collection("imglist");
                imglist.remove({imgid},(err,result)=>{
                    if(err) throw  err;
                    callback(null,true);
                })
            }
        ],function(err,result){
            if(err) throw err;
            callback(result);
        })
   }
   MongoClient.connect(CONN_DB_STR,(err,db)=>{
    deletesay(db,function(result){
        // console.log(result);
        res.send(result);
    })
});
});


router.get("/findsayperson",(req,res)=>{
    var uid=req.query.uid*1;
    MongoClient.connect(CONN_DB_STR,(err,db)=>{
        if(err) throw err;
        var comments=db.collection("comments");
        comments.findOne({uid},{username:1},(err,result)=>{
            var username=result.username;
            res.send({
                username
            })
        })
    })
})
module.exports = router;
