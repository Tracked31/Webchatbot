var smalltalk = require('./data/smalltalk.json')
var backup = require('./data/backup.json')
var cities = require('./data/bayern_cities.json')
var lake_river_mountain_con = require('./data/cities_lakes_rivers_mountains_con.json')
var landkreise = require('./data/landkreise.json')
var cities_landkreise_con = require('./data/cities_landkreise_con.json')
var fs = require('fs')


var temp_city_size = get_temp_city_size()
var temp_landkreis_y_n = get_temp_landkreis_y_n()
var temp_landkreis_akt = get_temp_landkreis_akt()
var temp_nature_q = get_temp_nature_q()
var temp_l_r_m_reply = get_temp_l_r_m_reply()


function reply(nachricht, bot){
    var nachricht_low = nachricht.toLowerCase()

    if(reply_smalltalk(nachricht_low, bot)== true){
        return
    }

    temp_city_size = get_temp_city_size()

    if(temp_city_size == 'großstadt' || temp_city_size == 'stadt' || temp_city_size == 'kleinstadt'){
        reply_landkreise_y(nachricht_low,bot)
    }
    else{
        bot.send('Möchtest du in eine Großstadt, Stadt oder Kleinstadt reisen?')
        var data = {
            "city_size":nachricht_low,
            "landkreis_y_n":null,
            "landkreis_akt":null,
            "nature_q":null,
            "l_r_m_reply":null
        }
        data = JSON.stringify(data)
        fs.writeFileSync('./Bot/data/temp_data.json', data)
    }
}

function reply_smalltalk(nachricht, bot){
    for(var reply in smalltalk){
        for(var a in smalltalk[reply]){
            if(nachricht.includes(smalltalk[reply][a])){
                bot.send(reply)
                return true
            }
        }
    }
    return false
}

function reply_landkreise(nachricht){
    for(var reply in landkreise){
        for(var a in landkreise[reply]){
            if(nachricht.includes(landkreise[reply][a])){
                return true
            }
        }
    }
    return false
}

function reply_landkreise_y(nachricht,bot){
    temp_landkreis_y_n = get_temp_landkreis_y_n()
    if(temp_landkreis_y_n == null){
        bot.send('Möchtest du in einen bestimmten Landkreis reisen?')
        var data = {
            "city_size":temp_city_size,
            "landkreis_y_n":nachricht,
            "landkreis_akt":null,
            "nature_q":null,
            "l_r_m_reply":null
        }
        data = JSON.stringify(data)
        fs.writeFileSync('./Bot/data/temp_data.json', data)
    }
    if(temp_landkreis_y_n == 'ja'){
        reply_landkreise_cities(nachricht,bot)
    }
    if(temp_landkreis_y_n == 'nein'){
        nature_reply(nachricht,bot)
    }
}

function reply_landkreise_cities(nachricht,bot){
    temp_landkreis_akt = get_temp_landkreis_akt()
    if(temp_landkreis_akt == 'unterfranken' || temp_landkreis_akt == 'mittelfranken' || temp_landkreis_akt == 'oberfranken' || temp_landkreis_akt == 'niederbayern' || temp_landkreis_akt == 'oberbayern' || temp_landkreis_akt == 'oberpfalz'|| temp_landkreis_akt == 'schwaben'){
        if(reply_landkreise(temp_landkreis_akt)== true){
            if(check_landkreise_cities == true){
                nature_reply(nachricht,bot)
            }   
        }
    }
    else{
        bot.send('In welchen Landkreis Bayerns möchtest du reisen?')
        var data = {
            "city_size":temp_city_size,
            "landkreis_y_n":temp_landkreis_y_n,
            "landkreis_akt":nachricht,
            "nature_q":null,
            "l_r_m_reply":null
        }
        data = JSON.stringify(data)
        fs.writeFileSync('./Bot/data/temp_data.json', data)
    }
}

function check_landkreise_cities(){
    for(var x in cities.temp_city_size){
        for(var a in cities.temp_city_size[x]){
            if(values.cities.temp_city_size[x][a].includes(cities_landkreise_con.temp_landkreis_akt)){
                return true
            } 
        }
    }
}

function nature_reply(nachricht,bot){
    temp_nature_q = get_temp_nature_q()
    if(temp_nature_q == null){
        bot.send('Möchtest du das in die Stadt in der Nähe eines Gewässers oder Bergen liegt?')
        var data = {
            "city_size":temp_city_size,
            "landkreis_y_n":temp_landkreis_y_n,
            "landkreis_akt":temp_landkreis_akt,
            "nature_q":nachricht,
            "l_r_m_reply":null
        }
        data = JSON.stringify(data)
        fs.writeFileSync('./Bot/data/temp_data.json', data)
    }
    if(temp_nature_q == 'ja'){
        lake_river_mountain_reply(nachricht,bot)
    }
    if(temp_nature_q == 'nein'){
        out_dest()
    }
}
function lake_river_mountain_reply(nachricht,bot){
    temp_l_r_m_reply = get_temp_l_r_m_reply()
    if(temp_l_r_m_reply == 'fluss' || temp_l_r_m_reply == 'see' || temp_l_r_m_reply == 'berg'){
        part = temp_l_r_m_reply
        if(check_river_mountain_sea(nachricht,part) == true){
            out_dest()
        }
    }
    else{
        bot.send('Soll die Stadt an einem Fluss, See oder Berg liegen?')
        var data = {
            "city_size":temp_city_size,
            "landkreis_y_n":temp_landkreis_y_n,
            "landkreis_akt":temp_landkreis_akt,
            "nature_q":temp_nature_q,
            "l_r_m_reply":nachricht
        }
        data = JSON.stringify(data)
        fs.writeFileSync('./Bot/data/temp_data.json', data)
    }
}
function check_river_mountain_sea(nachricht, part){
    for(var x in cities.temp_city_size ){
        for(var a in cities.temp_city_size[x]){
            if(values.cities.temp_city_size[x][a].includes(lake_river_mountain_con.part.nachricht
                )){
                    if(values.cities.temp_city_size[x][a].includes(cities_landkreise_con.temp_landkreis_akt)==true){
                        return true
                    }
                }
        }
    }
}
function wrong_param(bot){
    const key = backup.key(name)
    const randIndex = Math.floor(Math.random() * key.length)
    const randKey = key[randIndex]
    const name = name[randKey]
    bot.send(name)
}

function out_dest(bot){
    bot.send('')
}

function get_temp_city_size(){
    var json = fs.readFileSync('./Bot/data/temp_data.json')
    var data = JSON.parse(json)
    return data.city_size
}

function get_temp_landkreis_y_n(){
    var json = fs.readFileSync('./Bot/data/temp_data.json')
    var data = JSON.parse(json)
    return data.landkreis_y_n
}

function get_temp_landkreis_akt(){
    var json = fs.readFileSync('./Bot/data/temp_data.json')
    var data = JSON.parse(json)
    return data.landkreis_akt
}
function get_temp_nature_q(){
    var json = fs.readFileSync('./Bot/data/temp_data.json')
    var data = JSON.parse(json)
    return data.nature_q
}
function get_temp_l_r_m_reply(){
    var json = fs.readFileSync('./Bot/data/temp_data.json')
    var data = JSON.parse(json)
    return data.l_r_m_reply
}

module.exports = reply