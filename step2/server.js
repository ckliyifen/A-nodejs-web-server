var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(req,res){
    routePath(req,res);
});
var route = {
    '/a':function(req,res){
        res.end("match /a, query is"+JSON.stringify(req.query));
    },
    '/b':function(req,res){
        res.end("macth /b");
    },
    '/a/c':function(req,res){
        res.end('macth /a/c');
    },
    '/search':function(req,res){
        res.end('username='+req.body.username+',password='+req.body.password);    
    }
}
function parseBody(body){
    var obj = {};
    body.split('&').forEach(function(str) {
        obj[str.split('=')[0]] = str.split('=')[1];
        
    });
    console.log(obj);

    return obj;
}
function routePath(req,res){
    var pathObj = url.parse(req.url,true);
    console.log(pathObj);
    var handleFn = route[pathObj.pathname];

    if(handleFn){

        req.query = pathObj.query;
        var body= '';
        req.on('data',function(chunk){
            body+=chunk;
            console.log(body);
        }).on('end',function(){
            req.body = parseBody(body);
            handleFn(req,res);
        })
    }
    else{
        staticRoot(path.join(__dirname,"static"),req,res);
    }
}
function staticRoot(staticPath,req,res){
    var pathObj = url.parse(req.url,true);
    console.log(pathObj);

    if(pathObj.pathname==='/'){
        pathObj.pathname+='index.html';
    }
   
   var filePath = path.join(staticPath,pathObj.pathname);
   console.log(filePath);

   fs.readFile(filePath,'binary',function(err,data){
       if(err){
           res.writeHead('404','NOT FOUND!');
           res.end("<h1>404 NOT FOUND!</h1>");
       }
       else{
           res.writeHead(200,'OK');
           res.write(data,'binary');  
           res.end();
       }
   })
}


server.listen(8080);
console.log("visited http://localhost:8080!");