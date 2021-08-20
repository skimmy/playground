var http = require("http");

http.createServer(function(req, res) {
    console.log(req.headers["user-agent"]);
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello World!");
}).listen(3000);

console.log("Server strted on localhost:3000 press Ctrl+C to terminate...");