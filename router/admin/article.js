var express=require("express");
var router=express();
var arcModle=require("../../modles/admin/article");

/*
* 文章列表----------------
* */
//展示文章列表页
router.get("/articleList",function(req,res){
    arcModle.findArc(req.query,function(err,article){
        res.render("admin/articleList",{art:article });
    });
});


/*
 * 添加文章块----------------
 * */
//展示添加文章
router.get("/addArticle",function(req,res){
    //查询分类
    arcModle.findArcType({},function(err,result){
        res.render("admin/addArticle",{type:result});
    });
});
//添加文章操作
//注意，插入数据时，类型需要填写正确，要不然，插入不会成功，如阅读人数写为字符，那么会无法插入数据库
router.post("/addArticle",function(req,res){
    arcModle.addArc(req,function(err){
        //res.render("admin/index",{ });
        res.redirect("/admin/articleList");
    });
});
//修改文章显示
router.get("/editArticle",function(req,res,next){

    var aid = req.query._id;
/*    arcModle.updateArticle({"_id":aid},function(err,art){
        //.....
        console.log("artModel loading...");
        console.log(art);
        res.render("admin/updateArticle",art);

    });*/

    arcModle.findArc({"_id":aid},function(err,art){
        console.log("artModel loading...");
        arcModle.findArcType({},function(err,type){
            console.log({art:art[0],artType:type});
            res.render("admin/updateArticle",{art:art[0],artType:type});
        });
    });


});
//修改文章操作
router.post("/editArticle",function(req,res,next){
    arcModle.updateArc(req,function(err){
        if(err){
            console.log(err);
            return;
        }
        res.redirect("/admin/articleList");
    })
});
//删除文章操作
router.get("/delArticle",function(req,res,next){
    //拿到需要删除的文章ID
    var aid = req.query._id;

    arcModle.delArc({_id:aid},function(err){
        if(err){
            console.log(err);
            return;
        }
        res.redirect("/admin/articleList");
       // res.send("删除成功");
    });
});


/*
 * 添加文章类型块----------------
 * */
//展示文章类型页
router.get("/articleTypeList",function(req,res){
    arcModle.findArcType({},function(err,result){
        res.render("admin/arcTypeList",{arcType:result});
    });
});
//展示添加文章类型页
router.get("/addType",function(req,res){
    res.render("admin/addType",{ });
});
//添加文章类型操作
router.post("/addType",function(req,res){
    arcModle.addArcType(req,function(err){
        res.render("admin/index",{ });
    });
});
module.exports=router;
