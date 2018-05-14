/**
 * 用户管理模块
 */
var express = require("express");
var router = express.Router();
var userModel = require("../../modles/user/users.js");//用户注册登录模块

//注册
router.get("/reg",function(req,res,next){

    res.render("users/register");

});

//注册表单
router.post("/reg",function(req,res,next){
    //插入第一次没问题，需要判断用户是否已经存在
});

//登录
router.get("/login",function(req,res,next){
    res.render("users/login");

});

//处理用户登录
router.post("/login",function(req,res,next){

});


module.exports = router;