var url = require('url');

function makeQuery(req){
    var pathObj = url.parse(req.url,true);
   
    console.log(pathObj);
    req.query = pathObj.query;
}

function makeResponse(res){
    res.send = function(str){
        if(typeof str === 'string'){
            res.end(str);
        }
        if(typeof str === 'object'){
            res.end(JSON.stringify(str));
        }
        if(typeof str === 'number'){
            res.writeHead(str,arguments[1]);
            res.end('404 NOT FOUND!');
        }
    }
}

function express(){
    var tasks = [] ;
    var counter = 0;

    var app = function(req,res){
        makeQuery(req);
        makeResponse(res);

        var i = 0;
        function next(){
            var task = tasks[i++];
            if(!task){
                return;
            }
            
            //if this is the right path
            if(task.routePath === null || url.parse(req.url,true).pathname === task.routePath){
                task.middleWare(req,res,next);
            }
            else{
                next();
            }
        }

        next();
    }

    app.use = function(routePath,middleWare){
        //if the arg did not contained the path,it is the callback
        if(typeof routePath === 'function'){
            middleWare = routePath;
            routePath = null;
        }
        /* youcan use counter to test when the app.use call*/
        counter++;
        console.log(counter);
        tasks.push({
            routePath: routePath,
            middleWare: middleWare
        });
        
    }
    app.static = function(staticPath){
        return function(req,res,next){
            //set static route as step2;
        }
    }

    return app;
}

module.exports = express;