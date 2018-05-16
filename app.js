var express=require("express");
var app=express();

//获取post请求的body方法
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//session管理
var session = require("express-session");
app.use(session({
   secret:"jia mi de ming zi",//应用在https的加密的名字。
   resave:false,//是指每次请求都重新设置session
   saveUninitialized:true,//无论有没有session，每次都请求设置一个session
   cookie:{maxAge:60*30*1000}//过期时间，单位毫秒
}));
//设置模板引擎
app.set("view engine","ejs");
//配置静态资源目录
app.use(express.static("./public"));

var db=require("./config/db.js");
//前端模块
app.get("/",function(req,res){
   res.send("欢迎来到我的博客");
});
//后端模块
app.use("/admin",require("./router/admin"));
//引入用户注册和登录路由模块
app.use(require("./router/user/users.js"));
//会员模块
app.get("/member",function(req,res){
   res.send("hello member");
});
//注意1 use 和 get 方法的区别
app.listen(3001);//监听端口

