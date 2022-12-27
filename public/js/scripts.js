function addMsg(people, msg){
    var users = "user";
    var $_phone = $('#msg');
    var $_lastMessage = $('#msg .message:last');

    if (people == 1) users = 'user';
    if (people == 2) users = 'bot';
    
    if ($_lastMessage.hasClass(users)) {
        $_lastMessage.append(
            $('<div>').addClass('message-text').text(msg)
        )
    } else {
        $_phone.append(
            $('<div>').addClass('Bubble'+users).append(
                $('<div>').addClass('message-text').text(msg)

        )
        )
    }
    console.log(msg);
}

function Timestamp(){
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes(); 
}

module.exports = script