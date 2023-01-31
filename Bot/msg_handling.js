// made by Simon Saur 
// Matrikelnummer: 22111149

var smalltalk = require('./data/smalltalk.json')
var backup = require('./data/backup.json')
var cities = require('./data/bayern_cities.json')
var lake_river_mountain_con = require('./data/cities_lakes_rivers_mountains_con.json')
var cities_landkreise_con = require('./data/cities_landkreise_con.json')
var fs = require('fs')
const { values } = require('lodash')
const { element } = require('prop-types')



function reply(nachricht, bot){
    //Funktion die auf Nachtricht des Users antwortet und im Bot.js aufgerufen wird

    var nachricht_low = nachricht.toLowerCase()

    if(reply_smalltalk(nachricht_low, bot)== true){
        return
    }

    var temp_city_size = get_temp_city_size()

    if(temp_city_size == 'großstadt' || temp_city_size == 'stadt' || temp_city_size == 'kleinstadt'){
        reply_landkreise_y(nachricht,bot)
    }
    else{
        if(nachricht_low == 'großstadt' || nachricht_low == 'stadt' || nachricht_low == 'kleinstadt'){
        var data = {
            "city_size":nachricht_low,
            "landkreis_y_n":null,
            "landkreis_akt":null,
            "nature_q":null,
            "l_r_m_reply":null
        }
        data = JSON.stringify(data)
        fs.writeFileSync('./Bot/data/temp_data.json', data)
        reply_landkreise_y(nachricht,bot)
    }
    else{
        bot.send('Möchtest du in eine Großstadt, Stadt oder Kleinstadt reisen?')
    }
    }
}



function reply_smalltalk(nachricht, bot){
    //überprüft ob die Nachricht des Users in smalltalk.json 
    //ist und falls ja sendet die Antwort darauf

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

function reply_landkreise_y(nachricht,bot){
    //überprüft die Antwort auf die Frage und gibt weiteren Verlauf an

    var temp_city_size = get_temp_city_size()
    var temp_landkreis_y_n = get_temp_landkreis_y_n()
    if(temp_landkreis_y_n == 'ja' || temp_landkreis_y_n == 'nein'){
        if(temp_landkreis_y_n == 'ja'){
            reply_landkreise_cities(nachricht,bot)
        }
        if(temp_landkreis_y_n == 'nein'){
            nature_reply(nachricht,bot)
        }
    }
    else{
        if(nachricht == 'ja' || nachricht == 'nein'){
            var data = {
                "city_size":temp_city_size,
                "landkreis_y_n":nachricht,
                "landkreis_akt":null,
                "nature_q":null,
                "l_r_m_reply":null
            }
            data = JSON.stringify(data)
            fs.writeFileSync('./Bot/data/temp_data.json', data)
            if(nachricht == 'ja'){
                reply_landkreise_cities(nachricht,bot)
            }
            if(nachricht == 'nein'){
                nature_reply(nachricht,bot)
            }
        }
        else{
            bot.send('Möchtest du in einen bestimmten Landkreis reisen?')
        }
}
}

function reply_landkreise_cities(nachricht,bot){
    //überprüft die Antwort auf die Frage und gibt weiteren Verlauf an

    var temp_city_size = get_temp_city_size()
    var temp_landkreis_y_n = get_temp_landkreis_y_n()
    var temp_landkreis_akt = get_temp_landkreis_akt()
    if(temp_landkreis_akt == 'unterfranken' || temp_landkreis_akt == 'mittelfranken' || temp_landkreis_akt == 'oberfranken' || temp_landkreis_akt == 'niederbayern' || temp_landkreis_akt == 'oberbayern' || temp_landkreis_akt == 'oberpfalz'|| temp_landkreis_akt == 'schwaben'){
        if(check_landkreise_cities() == true){
            nature_reply(nachricht,bot)
            }
    }
    else{
        nachricht = nachricht.toLowerCase()
        if(nachricht == 'unterfranken' || nachricht == 'mittelfranken' || nachricht == 'oberfranken' || nachricht == 'niederbayern' || nachricht == 'oberbayern' || nachricht == 'oberpfalz'|| nachricht == 'schwaben'){
        var data = {
            "city_size":temp_city_size,
            "landkreis_y_n":temp_landkreis_y_n,
            "landkreis_akt":nachricht,
            "nature_q":null,
            "l_r_m_reply":null
        }
        data = JSON.stringify(data)
        fs.writeFileSync('./Bot/data/temp_data.json', data)
        if(check_landkreise_cities() == true){
            nature_reply(nachricht,bot)
        }
        if(check_landkreise_cities() == false){
            wrong_param(bot)
        }
    }
    else{
        bot.send('In welchen Landkreis Bayerns möchtest du reisen?(Unterfranken, Mittelfranken, Oberfranken, Niederbayern, Oberbayern, Oberpfalz, Schwaben)')
    }
}
}

function nature_reply(nachricht,bot){
    //überprüft die Antwort auf die Frage und gibt weiteren Verlauf an

    var temp_city_size = get_temp_city_size()
    var temp_landkreis_y_n = get_temp_landkreis_y_n()
    var temp_landkreis_akt = get_temp_landkreis_akt()
    var temp_nature_q = get_temp_nature_q()
    if(temp_nature_q == 'ja' || temp_nature_q == 'niemals'){
        if(temp_nature_q == 'ja'){
            lake_river_mountain_reply(nachricht,bot)
        }
        if(temp_nature_q == 'niemals'){
            if(out_dest(bot)== true){
                return
            } 
        }
    }
    else{
        if(nachricht == 'ja' || nachricht == 'niemals'){
            var data = {
                "city_size":temp_city_size,
                "landkreis_y_n":temp_landkreis_y_n,
                "landkreis_akt":temp_landkreis_akt,
                "nature_q":nachricht,
                "l_r_m_reply":null
            }
            data = JSON.stringify(data)
            fs.writeFileSync('./Bot/data/temp_data.json', data)
            if(nachricht == 'ja'){
                lake_river_mountain_reply(nachricht,bot)
            }
            if(nachricht == 'niemals'){
                if(out_dest(bot)== true){
                    return
                } 
            }
        }
        else{
            bot.send('Möchtest du das die Stadt in der Nähe eines Gewässers oder Bergen liegt?(ja, niemals)')
        }
    }
}

function lake_river_mountain_reply(nachricht,bot){
    //überprüft die Antwort auf die Frage und gibt weiteren Verlauf an

    var temp_city_size = get_temp_city_size()
    var temp_landkreis_y_n = get_temp_landkreis_y_n()
    var temp_landkreis_akt = get_temp_landkreis_akt()
    var temp_nature_q = get_temp_nature_q()
    var temp_l_r_m_reply = get_temp_l_r_m_reply()
    if(temp_l_r_m_reply == 'fluss' || temp_l_r_m_reply == 'see' || temp_l_r_m_reply == 'berg'){
        part = temp_l_r_m_reply
        if(check_river_mountain_sea() == true){
            if(out_dest(bot)== true){
                return
            } 
        }
    }
    else{
        nachricht = nachricht.toLowerCase()
        if(nachricht == 'fluss' || nachricht == 'see' || nachricht == 'berg'){
        var data = {
            "city_size":temp_city_size,
            "landkreis_y_n":temp_landkreis_y_n,
            "landkreis_akt":temp_landkreis_akt,
            "nature_q":temp_nature_q,
            "l_r_m_reply":nachricht
        }
        data = JSON.stringify(data)
        fs.writeFileSync('./Bot/data/temp_data.json', data)
        part = temp_l_r_m_reply
        if(check_river_mountain_sea() == true){
            if(out_dest(bot)== true){
                return
            } 
        }
        if(check_river_mountain_sea() == false){
            wrong_param(bot)
        }
    }
    else{
        bot.send('Soll die Stadt an einem Fluss, See oder Berg liegen?')
    }
    }
}

function check_landkreise_cities(){
    //überprüft ob eine Stadt aus der gewählten Stadtgröße auch im
    //gewählten Landkreis liegt

    var temp_city_size = get_temp_city_size()
    var temp_landkreis_akt = get_temp_landkreis_akt()
    var part_cities
    var part_landreis
    if(temp_city_size == 'stadt'){
        part_cities = cities.Stadt
    }
    if(temp_city_size == 'kleinstadt'){
        part_cities = cities.Kleinstadt
    }
    if(temp_city_size == 'großstadt'){
        part_cities = cities.Großstadt
    }
    if(temp_landkreis_akt == 'unterfranken'){
        part_landreis = cities_landkreise_con.Unterfranken
    }
    if(temp_landkreis_akt == 'mittelfranken'){
        part_landreis = cities_landkreise_con.Mittelfranken
    }
    if(temp_landkreis_akt == 'oberfranken'){
        part_landreis = cities_landkreise_con.Oberfranken
    }
    if(temp_landkreis_akt == 'niederbayern'){
        part_landreis = cities_landkreise_con.Niederbayern
    }
    if(temp_landkreis_akt == 'oberbayern'){
        part_landreis = cities_landkreise_con.Oberbayern
    }
    if(temp_landkreis_akt == 'oberpfalz'){
        part_landreis = cities_landkreise_con.Oberpfalz
    }
    if(temp_landkreis_akt == 'schwaben'){
        part_landreis = cities_landkreise_con.Schwaben
    }
    
    for(let x=0; x< part_cities.length; x++){
        for(let j=0; j< part_landreis.length; j++){
                if(part_cities[x] === part_landreis[j]){
                    return true
                }
        }
    }
    return false
}

function check_river_mountain_sea(){
    //überprüft ob eine Stadt aus der gewählten Stadtgröße auch im
    //gewählten Landkreis liegt und dort ein Fluss/See/Berg ist

    var temp_city_size = get_temp_city_size()
    var temp_landkreis_akt = get_temp_landkreis_akt()
    var temp_l_r_m_reply = get_temp_l_r_m_reply()
    var part_cities
    var part_landreis
    var part_nature
    if(temp_city_size == 'stadt'){
        part_cities = cities.Stadt
    }
    if(temp_city_size == 'kleinstadt'){
        part_cities = cities.Kleinstadt
    }
    if(temp_city_size == 'großstadt'){
        part_cities = cities.Großstadt
    }
    if(temp_landkreis_akt == 'unterfranken'){
        part_landreis = cities_landkreise_con.Unterfranken
    }
    if(temp_landkreis_akt == 'mittelfranken'){
        part_landreis = cities_landkreise_con.Mittelfranken
    }
    if(temp_landkreis_akt == 'oberfranken'){
        part_landreis = cities_landkreise_con.Oberfranken
    }
    if(temp_landkreis_akt == 'niederbayern'){
        part_landreis = cities_landkreise_con.Niederbayern
    }
    if(temp_landkreis_akt == 'oberbayern'){
        part_landreis = cities_landkreise_con.Oberbayern
    }
    if(temp_landkreis_akt == 'oberpfalz'){
        part_landreis = cities_landkreise_con.Oberpfalz
    }
    if(temp_landkreis_akt == 'schwaben'){
        part_landreis = cities_landkreise_con.Schwaben
    }
    if(temp_l_r_m_reply == 'see'){
        part_nature = lake_river_mountain_con.See
    }
    if(temp_l_r_m_reply == 'fluss'){
        part_nature = lake_river_mountain_con.Fluss
    }
    if(temp_l_r_m_reply == 'berg'){
        part_nature = lake_river_mountain_con.Berg
    }
    
    for(let x=0; x< part_cities.length; x++){
        for(let j=0; j< part_landreis.length; j++){
            for(let b=0; b<part_nature.length; b++){
                if(part_cities[x] === part_landreis[j] && part_cities[x] === part_nature[b] ){
                    return true
                }
            }
        }
    }
    return false
}

function wrong_param(bot){
    //gibt zufällige Nachricht zurück wenn Bot nichts versteht

    var output_backup = []
    var randIndex = Math.floor(Math.random() * backup.Backup)
    var item = backup.Backup[randIndex]
    output_backup.push(item)
    bot.send(output_backup)
    return
}

function out_dest(bot){
    //gibt das Reiseziel aus

    var temp_city_size = get_temp_city_size()
    var temp_landkreis_akt = get_temp_landkreis_akt()
    var temp_l_r_m_reply = get_temp_l_r_m_reply()
    var part_cities
    var part_landreis
    var part_nature
    if(temp_city_size == 'stadt'){
        part_cities = cities.Stadt
    }
    if(temp_city_size == 'kleinstadt'){
        part_cities = cities.Kleinstadt
    }
    if(temp_city_size == 'großstadt'){
        part_cities = cities.Großstadt
    }
    if(temp_landkreis_akt == 'unterfranken'){
        part_landreis = cities_landkreise_con.Unterfranken
    }
    if(temp_landkreis_akt == 'mittelfranken'){
        part_landreis = cities_landkreise_con.Mittelfranken
    }
    if(temp_landkreis_akt == 'oberfranken'){
        part_landreis = cities_landkreise_con.Oberfranken
    }
    if(temp_landkreis_akt == 'niederbayern'){
        part_landreis = cities_landkreise_con.Niederbayern
    }
    if(temp_landkreis_akt == 'oberbayern'){
        part_landreis = cities_landkreise_con.Oberbayern
    }
    if(temp_landkreis_akt == 'oberpfalz'){
        part_landreis = cities_landkreise_con.Oberpfalz
    }
    if(temp_landkreis_akt == 'schwaben'){
        part_landreis = cities_landkreise_con.Schwaben
    }
    if(temp_l_r_m_reply == 'see'){
        part_nature = lake_river_mountain_con.See
    }
    if(temp_l_r_m_reply == 'fluss'){
        part_nature = lake_river_mountain_con.Fluss
    }
    if(temp_l_r_m_reply == 'berg'){
        part_nature = lake_river_mountain_con.Berg
    }
    if(temp_city_size != null && temp_landkreis_akt == null && temp_l_r_m_reply == null){
        if(part_cities.length == 5 || part_cities.length < 5){
            bot.send("Das Reiseziel/-e ist: " + part_cities)
            return true
        }
        if(part_cities.length > 5){
            var output = []
            for(let i=0; i<5; i++){
            var randIndex = Math.floor(Math.random() * part_cities.length)
            var item = part_cities[randIndex]
            output.push(item)
            }
            bot.send("Das Reiseziel/-e ist: " + output)
            return true
        }
    }
    else if(temp_city_size != null && temp_landkreis_akt != null && temp_l_r_m_reply == null){
             
        for(let x=0; x< part_cities.length; x++){
            for(let j=0; j< part_landreis.length; j++){
                    if(part_cities[x] === part_landreis[j]){
                        var same = []
                        if(true){
                            same.push(part_cities[x])
                        }
                        if(same.length == 5 || same.length < 5){
                            bot.send("Das Reiseziel/-e ist: " + same)
                            return true
                        }
                        if(same.length > 5){
                            var output = []
                            for(let i=0; i<5; i++){
                            var randIndex = Math.floor(Math.random() * same.length)
                            var item = same[randIndex]
                            output.push(item)
                            }
                            bot.send("Das Reiseziel/-e ist: " + output)
                            return true
                        }
                    }
            }
        }
    }
    else if(temp_city_size != null && temp_landkreis_akt != null && temp_l_r_m_reply != null){
        for(let x=0; x< part_cities.length; x++){
            for(let j=0; j< part_landreis.length; j++){
                for(let b=0; b<part_nature.length; b++){
                    if(part_cities[x] === part_landreis[j] && part_cities[x] === part_nature[b] ){
                        var same_2 = []
                        if(true){
                            same_2.push(part_cities[x])
                        }
                        if(same_2.length == 5 || same_2.length < 5){
                            bot.send("Das Reiseziel/-e ist: " + same_2)
                            return true
                        }
                        if(same_2.length > 5){
                            var output = []
                            for(let i=0; i<5; i++){
                            var randIndex = Math.floor(Math.random() * same_2.length)
                            var item = same_2[randIndex]
                            output.push(item)
                            }
                            bot.send("Das Reiseziel/-e ist: " + output)
                            return true
                        }
                    }
                }
            }}
        }
    else if(temp_city_size != null && temp_landkreis_akt != null && temp_l_r_m_reply != null){
        for(let x=0; x< part_cities.length; x++){
            for(let j=0; j< part_landreis.length; j++){
                for(let b=0; b<part_nature.length; b++){
                    if(part_cities[x] === part_landreis[j] && part_cities[x] === part_nature[b] ){
                        var same_2 = []
                        if(true){
                            same_2.push(part_cities[x])
                        }
                        if(same_2.length == 5 || same_2.length < 5){
                            bot.send("Das Reiseziel/-e ist: " + same_2)
                            return true
                        }
                        if(same_2.length > 5){
                            var output = []
                            for(let i=0; i<5; i++){
                            var randIndex = Math.floor(Math.random() * same_2.length)
                            var item = same_2[randIndex]
                            output.push(item)
                            }
                            bot.send("Das Reiseziel/-e ist: " + output)
                            return true
                        }
                    }
                }
            }}
        }
        else if(temp_city_size != null && temp_landkreis_akt == null && temp_l_r_m_reply != null){
            for(let x=0; x< part_cities.length; x++){
                    for(let b=0; b<part_nature.length; b++){
                        if(part_cities[x] === part_nature[b] ){
                            var same_3 = []
                            if(true){
                                same_3.push(part_cities[x])
                            }
                            if(same_3.length == 5 || same_3.length < 5){
                                bot.send("Das Reiseziel/-e ist: " + same_3)
                                return true
                            }
                            if(same_3.length > 5){
                                var output = []
                                for(let i=0; i<5; i++){
                                var randIndex = Math.floor(Math.random() * same_3.length)
                                var item = same_3[randIndex]
                                output.push(item)
                                }
                                bot.send("Das Reiseziel/-e ist: " + output)
                                return true
                            }
                        }
                    }
                }
            }
}

//geben jeweiligen temporär gespeicherten Wert aus temp_data Datei zurück

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