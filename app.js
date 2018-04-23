var express=require("express");
var app=express();
app.set("view engine","ejs");//设置模板引擎
app.use(express.static("./public"));//配置静态资源目录
//前端模块
app.get("/",function(req,res){
   res.send("欢迎来到我的博客");
});
//后端模块
app.use("/admin",function(req,res){
   res.send("hello admin");
});
//会员模块
app.get("/member",function(req,res){
   res.send("hello member");
});
//注意1 use 和 get 方法的区别
app.listen(3000);//监听端口

