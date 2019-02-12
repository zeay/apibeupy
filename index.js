//Api for Newsletter and Sending Message

const http = require('http');
const server = http.createServer();
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const routes = require('./routes.js');
const port = process.env.PORT || 3000;

//tackling request
server.on('request', (req, res)=>{
    let parseedURL = url.parse(req.url, true);
    let path = parseedURL.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g,'');
    let method = req.method.toLowerCase();
    let queryStringObject = parseedURL.query;
    let header = req.header;
    let decoder = new stringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data)=>{ 
        buffer += decoder.write(data);
    });
    req.on('end', ()=>{
        buffer += decoder.end();
        let indice = trimmedPath.split('/')
        let userIp = (req.headers['x-forwarded-for'] || '').split(',').pop() || req.connection.remoteAddress || 
        req.socket.remoteAddress || req.connection.socket.remoteAddress;
        let choosenPath = typeof(router[indice[0]]) !== 'undefined'? router[indice[0]]:routes.notFound;
        var data = {
            ip: userIp,
            path: indice[0],
            email: indice[1],
            method: method,
            query: queryStringObject,
            header: header,
            inputData: buffer
            
        }
        choosenPath(data, function(statusCode, type, result){
            let stringData;
            let status = statusCode || 200;
            let setheader = type|| 'application/json';
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('content-type', setheader);
            res.writeHead(status);
            if(setheader === "application/json"){
                stringData = JSON.stringify(result);
            }else{
                stringData= result;
            }

            res.end(stringData);
        });

    })
});

var router = {
    newsletter: routes.newsletter,
    messenger: routes.message,
    getIp: routes.ip
}



server.listen(port, ()=>{
    console.log("server is listening on port "+ port);
});