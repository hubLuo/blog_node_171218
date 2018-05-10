var mongoose =require("mongoose");
//注意，插入数据时，类型需要填写正确，要不然，插入不会成功
var articleSchema=new mongoose.Schema({
    title:String,
    attribute:[],
    author:String,
    type:[],
    read:Number,
    createtime:Date,
    content:String,
    support:Number,
    Tag:[],
    updatetime:Date
});

var Article= mongoose.model("Article",articleSchema);

module.exports =Article;
