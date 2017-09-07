var http = require('http');
var path = require('path');
var fs= require('fs');
var url= require('url');

function staticRoot(staticPath,req,res){

    var pathObj = url.parse(req.url,true);
    console.log(req.body);
    console.log(pathObj);
    if(pathObj.pathname==='/'){
        pathObj.pathname+='index.html';
    }


    var filePath = path.join(staticPath,pathObj.pathname);
/*
    var fsObj = fs.readFileSync(filePath,'binary');
    console.log("the file path is :",filePath);
    res.write(fsObj,'binary');
    res.end();
*/
    fs.readFile(filePath,'binary',function(err,data){
        if(err){
            console.log(404);
            res.writeHead("404","NOT FOUND");
            res.end("<h1>404 NOT FOUND!</h1>");
        }
        else{
            console.log("OK");
            res.write(data,'binary');
            res.end();
        }
    })

   
}
var server = http.createServer(function(req,res){
    staticRoot(path.resolve(__dirname,'static'),req,res);
})

console.log("visted http://localhost:8080");
server.listen(8080);
