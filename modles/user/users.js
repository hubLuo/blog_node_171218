var express = require("express");
var router = express.Router();
var formidable = require("formidable");
var crypto = require("crypto");
var Users = require("../../schema/user/User.js");
/*
 登录注册的业务实现
 */



module.exports = {
    register:function(fields,callback){


    },
    //用户是否存在：判断用户名是否已经存在
    userFind:function(req,callback){

    },
    queryUserInfo:function(req,callback){

    },
    isAdmin:function(username,callback){

    }

}
