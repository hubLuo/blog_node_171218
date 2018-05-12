var util = require("util");
var formidable = require("formidable");
var  ArticleType = require("../../schema/admin/ArticleClass.js");
var Article=require("../../schema/admin/Article.js");

function formidable_post (req,callback){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        //res.writeHead(200, {'content-type': 'text/plain;charset=UTF-8;'});
        callback(err,fields,files);
        //res.write('received upload:\n\n');
        //res.end(util.inspect({fields: fields, files: files}));
    });
};
module.exports={
    findArc(condition,callback){
        Article.find(condition || {}).populate("type").exec(function(err,article){
            callback(err,article);
        });
    },
    addArc(req,callback){
        formidable_post(req,function(err,fields,files){
            fields.updatetime = fields.createtime = new Date();//添加时间字段
            console.log("ADD----",fields);
            Article.create(fields,function(err){
                callback(err);
            });
        });
    },
    updateArc:function(req,callback){
        formidable_post(req,function(err,fields,files){
            fields.updatetime = new Date();
            console.log("update----",fields);
            //更新数据库语句有问题，这里只是演示下过程。
            Article.update(fields,function(err){
                callback(err);
                //res.send("插入成功");
            });
        });
    },
    findArcType(condition,callback){
        ArticleType.find(condition || {},function(err,result){
            callback(err,result);
        });
    },
    addArcType(req,callback){
        formidable_post(req,function(err,fields,files){
            ArticleType.create(fields,function(err){
                callback(err);
            });
        });
    },
    formidable:formidable_post
};
