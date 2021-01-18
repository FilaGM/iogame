//= = = Constants = = =
const app = require('express')();
const express = require("express");
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 5000

const KeyCodes = {
    a:65,
    d:68,
    space:32
}
//= = =

//= = = Variables = = =

objects = [

]

users = [

]
//= = =


//= = = Functions = = =
function getToken(length){
    var chars = "abcdefghijklmnopqrstuvwxyz"
    chars += chars.toUpperCase()
    var str = ""
    while(true){
        str = ""
        for(var i = 0;i<length;i++){
            str += chars[Math.floor(Math.random() * chars.length)]
        }
        var fnd = false
        users.forEach(function(item,index){
            if(item.token == str){
                fnd = true
            }
        })
        if(fnd == false){
            break;
        }
    }
    return str
}
function getUserByToken(token){
    var itm = {}
    users.forEach(function(item){
        if(item.token == token){
            itm = item
        }
    })
    return itm
}
//= = = 


//= = = Server = = =
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/page/index.html');
});

app.use(express.static('public'))

http.listen(PORT, () => {
    console.log("listening on *:"+PORT);
});
//= = =

//= = = sockets = = =
io.on('connection', (socket) => {
    var newUser = {
        token:getToken(20),
    }
    users.push(newUser)
    socket.emit("getSelfInfo",newUser)
    console.log("User " + newUser.token + " joined")
    socket.on("diss",function(data){
        var i = 0;
        var fnd = false;
        users.forEach(function(item,index){
            if(item.token == data.token){
                i = index;
                fnd = true
            }
        })
        if(fnd == true){
            console.log("User " + users[i].token + " left")
            users.splice(i,1)
        }
    })
    socket.on("keydown",function(data){

    })
    socket.on("keyup",function(data){

    })
});
//= = =


//= = = Main loop = = =
setInterval(update,10)
function update(){
    io.emit("update",{
        objects:objects,
        users:users
    })
}
//= = =