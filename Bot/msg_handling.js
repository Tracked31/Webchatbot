var smalltalk = require('./data/smalltalk.json')
var backup = require('./data/backup.json')
var cities = require('./data/bayern_cities.json')
var lake_river_mountain = require('./data/bayern_lake_mountains_rivers.json')
var lake_river_mountain_con = require('./data/cities_lakes_rivers_mountains_con.json')
var landkreise = require('./data/landkreise.json')
var cities_landkreise_con = require('./data/cities_landkreise_con.json')
const { values } = require('lodash')


/* Gesprächsverlauf:
    -smalltalk
    -Landkreis Auswahlt ja/welcher?)/nein
    -Stadt Auswahlt Großstadt(ab 200.000)/Stadt(ab 100.000)/Kleinstadt(20.000-100.000)
        -> Landkreis ja: Überprüfung ob Stadt in Landkreis
    -Berge in der Nähe ja/nein
        -> ja: Überprüfung ??
    -Fluss/See in Nähe ja/nein
        ->ja: Überprüfung ??
    -Ausgabe der Stadt als Reiseziel
*/
var city_size = []
var landkreis_y_n = []
var landkreis_akt = []
var nature_q = []
var l_r_m_reply = []

function reply(nachricht, bot){
    var nachricht_low = nachricht.toLowerCase()

    if(reply_smalltalk(nachricht_low, bot)== true){
        return
    }

    if(city_size.includes(['großstadt', 'stadt','kleinstadt'])){
        reply_landkreise_y(city_size, bot)}
    else{
        bot.send('Möchtest du in eine Großstadt, Stadt oder Kleinstadt reisen?')
        city_size = nachricht_low
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

function reply_landkreise_y(city_size,bot){
    if(landkreis_y_n.includes(['ja', 'nein'])){
        switch(landkreis_y_n){
            case 'ja':
                reply_landkreise_cities(city_size,nachricht,bot)
                break
            case 'nein':
                nature_reply(bot)
                break
        }
    }
    else{
        bot.send('Möchtest du in einen bestimmten Landkreis reisen?')
        landkreis_y_n = nachricht
    }
}
function reply_landkreise_cities(city_size, nachricht,bot){
    if(landkreis_akt.includes(['unterfranken', 'mittelfranken', 'oberfranken','niederbayern','oberbayern','oberpfalz','schwaben'])){
        if(reply_landkreise(landkreis_akt) == true){
            for(var x in cities.city_size){
                for(var a in cities.city_size[x]){
                    if(values.cities.city_size[x][a].includes(cities_landkreise_con.landkreis_akt)){
                        return true}
                    if(true){
                        nature_reply(nachricht,bot)
                    } 
                }
            }
        }
    }
    else{
        bot.send('In welchen Landkreis Bayerns möchtest du reisen?')
        landkreis_akt = nachricht
    }
}

function nature_reply(nachricht,bot){
    if(nature_q.includes(['ja', 'nein'])){
        switch(nature_q){
            case 'ja':
                lake_river_mountain_reply(nachricht,bot)
                break
            case 'nein':
                out_dest()
                break
        }
    }
    else{
        bot.send('Möchtest du das in die Stadt in der Nähe eines Gewässers oder Bergen liegt?')
        nature_q = nachricht
    }
}
function lake_river_mountain_reply(nachricht,bot){
    if(l_r_m_reply.includes(['fluss', 'see','berg'])){
        switch(l_r_m_reply){
            case'fluss':
                for(var x in cities.part ){
                    for(var a in cities.part[x]){
                        if(values.cities.part[x][a].includes(lake_river_mountain_con.Stadt_Fluss.nachricht
                            )){
                                if(values.cities.part[x][a].includes(cities_landkreise_con.landkreis_akt)==true){
                                    return true
                                }
                            }
                        if(true){
                            out_dest()
                        } 
                        
                    }
                }
                break
            case 'see':
                for(var x in cities.part ){
                    for(var a in cities.part[x]){
                        if(values.cities.part[x][a].includes(lake_river_mountain_con.Stadt_See.nachricht
                            )){
                                if(values.cities.part[x][a].includes(cities_landkreise_con.landkreis_akt)==true){
                                    return true
                                }
                            }
                        if(true){
                            out_dest()
                        } 
                        
                    }
                }
                out_dest()
                break
            case 'berg':
                for(var x in cities.part ){
                    for(var a in cities.part[x]){
                        if(values.cities.part[x][a].includes(lake_river_mountain_con.Stadt_Berg.nachricht
                            )){
                                if(values.cities.part[x][a].includes(cities_landkreise_con.nachricht)==true){
                                    return true
                                }
                            }
                        if(true){
                            out_dest()
                        } 
                        
                    }
                }
                out_dest()
                break
        }
    }
    else{
        bot.send('Soll die Stadt an einem Fluss, See oder Berg liegen?')
        l_r_m_reply = nachricht  
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

module.exports = reply