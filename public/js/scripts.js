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
                addMsg(msg,'self')      
            })
            
            socket.onmessage = function (msg) {
                var data = JSON.parse(msg.data);
                if(data.name == 'Chatbot'){
                    addMsg(data.msg,'bot')
                    document.getElementById("msg").value=''
                }
                };
        })

function addMsg(msg,type){
    var str = "";
    if(type == 'self'){
        str += "<div class=\"bubbleWrapper\">";
        str += "<div class=\"inlineContainerUser\">";
        str += "<img class=\"inlineIcon\" src=\"./images/Avatar_user.png\">";
        str += "<div class=\"BubbleUser\">";
        str += msg;
        str += "<\/div>";
        str += "<\/div>",
        str += "<\/div>";
        $(".msgs").append(str);
    }
    else{
        str += "<div class=\"bubbleWrapper\">";
        str += "<div class=\"inlineContainerBot\">";
        str += "<img class=\"inlineIcon\" src=\"./images/boticon.png\">";
        str += "<div class=\"BubbleBot\">";
        str += msg;
        str += "<\/div>";
        str += "<\/div>";
        str += "<\/div>";
        $(".msgs").append(str); 
    }
}

module.exports = script