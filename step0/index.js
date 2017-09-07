var http=require("http");

var server=http.createServer(function(request,response){
    
    console.log(request.body);
    response.setHeader('Content-Type','text/css');
    response.write('<html><head><meta charset="utf-8"/></head>');
    response.write('<body>');
    response.write('<h1>hello world</h1>');
    response.end();
});

console.log("open http://localhost:8080");
server.listen(8080);

