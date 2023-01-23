const http = require('http')
const server = http.createServer();
const io = require('socket.io')(server, {cors: {origin: '*'}});
const hostname = 'http://localhost:3031/';
const request = require('request');



io.on('connection', function (socket){
    socket.on("editor:change", function (data, callback){
        request.post({
            url: hostname + 'customer/home/',
            json: true,
            body: {...JSON.parse(data)},
        }, (error, response, body) => {
            if (error){
                return console.log(error);
            }
            callback(body.url)
        });
    });
})



server.listen('3030');