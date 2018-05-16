/**
 * 用户管理模块
 */
var express = require("express");
var router = express.Router();
var userModel = require("../../modles/user/users.js");//用户注册登录模块

/*router.get("/!*",function(req,res,next){
    console.log(req.session);
    if(!req.session.userInfos){
        res.redirect("/login");
        //next();
        //return false;
    }
});*/

//注册页
router.get("/reg",function(req,res,next){
    res.render("users/register");
});

//注册表单
router.post("/reg",function(req,res,next){
    //插入第一次没问题，需要判断用户是否已经存在
    console.log("Reg loading....");
    var request = req;
    userModel.userFind(req,function(err,result,fields){//查询用户是否存在
        if(err){
            console.log(err);
            return;
        }
        console.log("表单内容--",fields);
        console.log("长度："+result.length);
        //result是查询的数据，fields：是用户输入的数据
        if(result.length == 0){
            userModel.register(fields,function(err){//向数据库插入数据（用户输入的数据）
                if(err){
                    console.log(err);
                    return;
                }
                res.send("注册成功");
            })
        }else{
            res.send("用户名已经注册，请重新换个");
        }
    });
});

//登录
router.get("/login",function(req,res,next){
    res.render("users/login");

});

//处理用户登录
router.post("/login",function(req,res,next){
    console.log("login.....");
    userModel.queryUserInfo(req,function(findInfo){
        if(findInfo == "null"){
            res.send("请先注册");
        }else if(findInfo == "admin"){
            res.redirect("/admin");
        }else if(findInfo == "member"){
            res.redirect("/")
        }else if(findInfo == "fail"){
            res.send("用户名或密码错误");
        }
    });

});


module.exports = router;