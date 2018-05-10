var mongoose =require("mongoose");

var arcTypeSchema=new mongoose.Schema({
    typename:String
});

var ArticleType= mongoose.model("ArcType",arcTypeSchema);

module.exports =ArticleType;
