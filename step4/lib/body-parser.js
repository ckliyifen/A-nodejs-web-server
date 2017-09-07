/* this use for post data,you can choose the data you what*/

function bodyParser(req,res,next){
   
    var body = '';
    req.on('data',function(chunk){
        body += chunk;
    }).on('end',function(){
        req.body = parserBody(body);
        next();
    })
   
}

function parserBody(body){
    var obj = {};
    body.split('&').forEach(function(str) {
        obj[str.split('=')[0]] = str.split('=')[1];
    }, this);


    return obj;
}

module.exports = bodyParser;