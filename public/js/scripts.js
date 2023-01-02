var socket = new WebSocket('ws://localhost:8181/', 'chat');
            var name = 'User'
            socket.onopen = function () {
            socket.send('{"type": "join", "name":" '+name+'"}');
            }
            $(function(){
                $('#sendBtn').click(function (e) {
                e.preventDefault();
                var msg = $('#msg').val();
                if (msg.trim()== ''){
                    return false;
                }
                socket.send('{"type": "msg", "msg": "' + msg + '"}');
                addMsgUser(msg)      
            })
            
            socket.onmessage = function (msg) {
                var data = JSON.parse(msg.data);
                    addMsgBot(data.msg)
                    document.getElementById("msg").value=''
                };
        })

function addMsgUser(msg){
    var str = "";
    str += msg
    $(".BubbleUser").append(str);
    document.getElementsByClassName("BubbleUser").addClass("active");
}

function addMsgBot(msg){
    var str = "";
    str += msg;
    $(".BubbleBot").append(str);
}

function Timestamp(){
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes(); 
}

module.exports = script