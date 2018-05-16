var express=require("express");
var router=express();
var articleRouter=require("./article.js");
var userModel = require("../../modles/user/users.js");
// 处理以 /admin开头的路由，全部都会进入到这个模块来
router.use("/",function(req,res,next){
    console.log("管理模块权限判定")
    if(!req.session.userInfos){
        res.redirect("/login");
        return false;
    }
   /* //权限控制
    if(req.isAdmin){
        return;
    }*/
    userModel.isAdmin(req.session.userInfos.name,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        //结果只有两种：1是管理员，2是会员
        if(result){
            next();//往下走肯定会进入admin，因为访问的路由就是admin进来的
        }else{
            res.redirect("/");
        }
    });
    //res.send("admin管理页");

});
//只处理 /admin路由
router.get("/",function(req,res){
    res.render("admin/index",{ });
});

//引入文章模块路由
router.use(articleRouter);

module.exports = router;