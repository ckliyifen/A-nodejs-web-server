
var http = require('http');
var app = require('../app');

console.log(app);

http.createServer(app).listen(8080);
console.log('open http://localhost:8080!');