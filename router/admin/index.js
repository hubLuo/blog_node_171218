var express=require("express");
var router=express();
var util = require("util");
var formidable = require("formidable");
var  ArticleType = require("../../schema/admin/ArticleClass.js");
var Article=require("../../schema/admin/Article.js");

// 处理以 /admin开头的路由，全部都会进入到这个模块来
router.use("/",function(req,res,next){
   /* //权限控制
    if(req.isAdmin){
        return;
    }*/
    //res.send("admin管理页");
    console.log("admin管理页");
    next();
});
//只处理 /admin路由
router.get("/",function(req,res){
    res.render("admin/index",{ });
});
router.get("/addArticle",function(req,res){
    //查询分类
    ArticleType.find({},function(err,result){
        res.render("admin/addArticle",{type:result});
    });

});
router.post("/addArticle",function(req,res){
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        //注意，插入数据时，类型需要填写正确，要不然，插入不会成功
        //res.writeHead(200, {'content-type': 'text/plain;charset=UTF-8;'});
        Article.create(fields,function(err){
            //console.log(fields);
            //res.send("添加文章成功");
            res.render("admin/index",{ });
        });

        //res.write('received upload:\n\n');
        //res.end(util.inspect({fields: fields, files: files}));

        //课下自行先插入数据试试，展开测试
    });
    //res.render("admin/addArticle",{});

});
router.get("/addType",function(req,res){
    res.render("admin/addType",{ });
});
router.post("/addType",function(req,res){

    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        //res.writeHead(200, {'content-type': 'text/plain;charset=UTF-8;'});
        ArticleType.create(fields,function(err){
            //console.log("添加文章类型成功");
            //res.send("添加文章类型成功");
            res.render("admin/index",{ });
        });
        //res.write('received upload:\n\n');
        //res.end(util.inspect({fields: fields, files: files}));

        //课下自行先插入数据试试，展开测试
    });
});
module.exports = router;