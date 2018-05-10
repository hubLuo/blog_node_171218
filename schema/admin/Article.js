var mongoose =require("mongoose");
var Schema= mongoose.Schema;
//注意，插入数据时，类型需要填写正确，要不然，插入不会成功
var articleSchema=new Schema({
    title:String,
    attribute:[],
    author:String,
    type:{
        type:Schema.Types.ObjectId,
        ref:"ArcType"
    },
    read:Number,
    createtime:Date,
    content:String,
    support:Number,
    Tag:[],
    updatetime:Date
});

var Article= mongoose.model("Article",articleSchema);

module.exports =Article;
