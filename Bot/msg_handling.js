const send = require('./bot').send
var smalltalk = require('./data/smalltalk.json')

function reply(nachricht){
    nachricht_low = nachricht.toLowerCase()

    if(reply_smalltalk(nachricht_low)== true){
        return
    }

}

function reply_smalltalk(nachricht){
    for(var reply in smalltalk){
        for(var a in smalltalk[reply]){
            if(nachricht.includes(smalltalk[reply][a])){
                send(reply)
                return true
            }
        }
    }
    return false
}

module.exports = reply