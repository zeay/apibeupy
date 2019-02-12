const mailerFunction = require('./mail.js');
const fs = require('fs');
const geoIp = require('geoip-lite');
const routes = {};
let template;

//read template and make it available
(function(){
    fs.readFile('./thankyou.html', 'utf-8',(err,data)=>{
        if(err){
            template = null;
        }else{
            template = data;
        }
    });
}());

//Email validation
function validateEmail(email){
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (reg.test(email)){
        return true;
    }else{
        return false;
    }
}

routes.notFound = (data, callback)=> {
    callback(404, "application/json", {message: "You are lost look documentation"});
}

//method bound options and get else 404;
routes.newsletter = (data, callback)=>{
    if(data.method === 'options'){
        callback(200, 'application/json', {message: 'options working'});
    }else if(data.method === 'get' && validateEmail(data.email)){
        if(data.query.email && validateEmail(data.query.email)){
            mailerFunction.newsletter({
                email: data.email, 
                subscriber:data.query.email 
            }, (err)=>{ 
                if(!err){
                        if(template){
                            callback(200, 'text/html', template);
                        }else{
                            callback(502, 'application/json', {message: "Subscibe Successfully got Error showing success File contact support"});
                        }
                }else{
                    callback(400, 'application/json', {message: "Error doing Email"});
                }
            });
        }else{
            callback(400, 'application/json', {message: "We are unable to validate provided email"});
        }

    }else{
        callback(400, 'application/json', {message: "Method or email is wrong"});
    }
}


//method bound options and get else 404;
routes.message = (data, callback)=>{
    if(data.method === 'options'){
        callback(200, 'application/json', {message: 'options working'});
    }else if(data.method === 'get' && validateEmail(data.email)){
        if(data.query.email && validateEmail(data.query.email) && data.query.message && data.query.userName){
            mailerFunction.sendMessage({
                email: data.email, 
                userEmail:data.query.email ,
                userName: data.query.userName,
                subject: data.query.subject,
                message: data.query.message
            }, (err)=>{ 
                if(!err){
                        if(template){
                            callback(200, 'text/html', template);
                        }else{
                            callback(502, 'application/json', {message: "Message send successfully got Error showing success File contact support"});
                        }
                }else{
                    callback(400, 'application/json', {message: "Error Sending Message"});
                }
            });
        }else{
            callback(400, 'application/json', {message: "Field(s) are missing"});
        }

    }else{
        callback(400, 'application/json', {message: "Method or email is wrong"});
    }
}


routes.ip = (data, callback)=>{
    if(data.method === 'options'){
        callback(200, 'application/json', {message: "Options working"});
    }else if(data.method === 'get'){
        let ipData;
        let ip = data.ip;
        let geo = geoIp.lookup(ip);
        if(ip === "::1" || geo === null){ 
            ip="localhost";
            ipData = {
                ip: ip,
                info: geo
            };
        }else{
            ipData = {
                ip: ip,
                info: geo
            };
        }
        callback(200, 'application/json', ipData);

    }else{
        callback(400, 'application/json', {message: "Method/route is incorrect"});
    }
}

module.exports = routes;