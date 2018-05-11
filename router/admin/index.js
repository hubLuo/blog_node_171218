var express=require("express");
var router=express();
var articleRouter=require("./article.js");

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

//引入文章模块路由
router.use(articleRouter);

module.exports = router;