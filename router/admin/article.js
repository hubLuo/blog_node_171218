var express=require("express");
var router=express();
var util = require("util");
var formidable = require("formidable");
var  ArticleType = require("../../schema/admin/ArticleClass.js");
var Article=require("../../schema/admin/Article.js");

//展示添加文章
router.get("/addArticle",function(req,res){
    //查询分类
    ArticleType.find({},function(err,result){
        res.render("admin/addArticle",{type:result});
    });

});
//添加文章操作
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
//展示文章列表页
router.get("/articleList",function(req,res){
    Article.find({}).populate("type").exec(function(err,article){
        console.log(article)
        res.render("admin/articleList",{art:article });
    });
    //res.render("admin/articleList",{ });
});
//展示添加文章类型页
router.get("/addType",function(req,res){
    res.render("admin/addType",{ });
});
//添加文章类型操作
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
module.exports=router;
