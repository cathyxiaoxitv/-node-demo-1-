var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function(request, response){
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method;
    // 👆读取请求方法

    /******** 从这里开始看，上面不要看 ************/

    console.log('她发请求过来啦！她想要' + pathWithQuery);
    console.log('method:');
    console.log(method);
    console.log(request.headers);
    if(path === '/'){
        response.statuseCode = 200;
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        var Accept = request.headers["accept"];
        console.log("Accept:");
        console.log(Accept);
        response.write(`
        <!DOCTYPE html>
        <head>
        <link rel="stylesheet" href="/x">      
        </head>
        <body>
           <h1>不好意思，刚刚没听见你说话😅</h1>
        </body>
        `);
        response.write(`让我追加试试看！`);
        response.end();
    } else if (path === '/x'){
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/css;charset=utf-8");
        response.write(`body{color: red}`);
        response.end();
    }else {
            response.statusCode = 404;
            response.setHeader('Content-Type', 'text/html;charset=utf-8');
            response.write(`你访问的页面不存在`);
            response.end();
    }

    // if(path === '/'){
    //     response.statusCode = 200
    //     response.setHeader('Content-Type', 'text/html;charset=utf-8')
    //     response.write(`二哈`)
    //     response.end()
    // } else if(path === '/x'){
    //     response.statusCode = 200
    //     response.setHeader('Content-Type', 'text/css;charset=utf-8')
    //     response.write(`body{color: red;}`)
    //     response.end()
    // } else {
    //     response.statusCode = 404
    //     response.setHeader('Content-Type', 'text/html;charset=utf-8')
    //     response.write(`你输入的路径不存在对应的内容`)
    //     response.end()
    // }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log(port + ' 号小剧场Action！\n欢迎通过此链接进行收看 http://localhost:' + port)
