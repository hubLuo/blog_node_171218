var express=require("express");
var app=express();
app.set("view engine","ejs");//设置模板引擎
app.use(express.static("./public"));//配置静态资源目录
app.get("/",function(res,req){
   req.send("欢迎来到我的博客");
});
app.listen(3000);//监听端口

