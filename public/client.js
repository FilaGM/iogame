//= = = Variables = = =
var socket = io();

var gotSelf = false
var self = {}

var canvas = document.getElementById("ctx")
var ctx = canvas.getContext("2d")

var mainPlayer = new Image()
mainPlayer.src = "/image/player_local.png"
//= = =

canvas.height = window.innerHeight
canvas.width = window.innerWidth

//= = = Sockets = = =
socket.on("getSelfInfo",function(data){
    if(gotSelf == false){
        self = data
        gotSelf = true
    }
})
socket.on("update",function(data){
    
})
socket.on("disconnect",function(){
    gotSelf = false
    self = {}
})
//= = =


//= = = Inputs = = =
window.onkeydown = function(event){
    socket.emit("keydown",{self:self,key:event.keyCode})
}
window.onkeyup = function(event){
    socket.emit("keyup",{self:self,key:event.keyCode})
}
//= = =

function disconnect(){
    socket.emit("diss",self)
}
window.onbeforeunload = disconnect