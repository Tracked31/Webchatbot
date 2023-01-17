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
function reply(nachricht, bot){
    var nachricht_low = nachricht.toLowerCase()

    if(reply_smalltalk(nachricht_low, bot)== true){
        return
    }

    bot.send('Möchtest du in eine Großstadt, Stadt oder Kleinstadt reisen?')
    switch(nachricht_low){
        case 'großstadt':
            reply_landkreise_y('Großstadt',nachricht_low,bot)
            break
        case 'stadt':
            reply_landkreise_y('Stadt',nachricht_low,bot)
            break
        case 'kleinstadt':
            reply_landkreise_y('Kleinstadt',nachricht_low,bot)
            break
        case '':
            wrong_param(bot)
            break
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

function reply_landkreise_y(part,nachricht,bot){
    bot.send('Möchtest du in einen bestimmten Landkreis reisen?')
    switch(nachricht){
        case 'ja',landkreise:
            reply_landkreise_cities(part,nachricht,bot)
            break
        case 'nein':
            nature_reply(nachricht,bot)
            break
    }
}
function reply_landkreise_cities(part, nachricht,bot){
    bot.send('In welchen Landkreis Bayerns möchtest du reisen?')
    switch(nachricht){
        case 'unterfranken':
            if(reply_landkreise(nachricht)== true){
                for(var x in cities.part ){
                    for(var a in cities.part[x]){
                        if(values.cities.part[x][a].includes(cities_landkreise_con.unterfranken)){
                            return true}
                        if(true){
                            nature_reply(nachricht,bot)
                        } 
                    }
                }
            }
            break
        case 'mittelfranken':
            if(reply_landkreise(nachricht)== true){
                for(var x in cities.part ){
                    for(var a in cities.part[x]){
                        if(values.cities.part[x][a].includes(cities_landkreise_con.mittelfranken)){
                            return true}
                        if(true){
                            nature_reply(nachricht,bot)
                        } 
                    }
                }
            }
            break
        case 'oberfranken':
            if(reply_landkreise(nachricht)== true){
                for(var x in cities.part ){
                    for(var a in cities.part[x]){
                        if(values.cities.part[x][a].includes(cities_landkreise_con.oberfranken)){
                            return true}
                        if(true){
                            nature_reply(nachricht,bot)
                        } 
                    }
                }
            }
            break
        case 'niederbayern':
            if(reply_landkreise(nachricht)== true){
                for(var x in cities.part ){
                    for(var a in cities.part[x]){
                        if(values.cities.part[x][a].includes(cities_landkreise_con.niederbayern)){
                            return true}
                        if(true){
                            nature_reply(nachricht,bot)
                        } 
                    }
                }
            }
            break
        case 'oberbayern':
            if(reply_landkreise(nachricht)== true){
                for(var x in cities.part ){
                    for(var a in cities.part[x]){
                        if(values.cities.part[x][a].includes(cities_landkreise_con.oberbayern)){
                            return true}
                        if(true){
                            nature_reply(nachricht,bot)
                        } 
                    }
                }
            }
            break
        case 'oberpfalz':
            if(reply_landkreise(nachricht)== true){
                for(var x in cities.part ){
                    for(var a in cities.part[x]){
                        if(values.cities.part[x][a].includes(cities_landkreise_con.oberpfalz)){
                            return true}
                        if(true){
                            nature_reply(nachricht,bot)
                        } 
                    }
                }
            }
            break
        case 'schwaben':
            if(reply_landkreise(nachricht)== true){
                for(var x in cities.part ){
                    for(var a in cities.part[x]){
                        if(values.cities.part[x][a].includes(cities_landkreise_con.schwaben)){
                            return true}
                        if(true){
                            nature_reply(nachricht,bot)
                        } 
                    }
                }
            }
            break
    }

}

function nature_reply(nachricht,bot){
    bot.send('Möchtest du das in die Stadt in der Nähe eines Gewässers oder Bergen liegt?')
    switch(nachricht){
        case 'ja':
            lake_river_mountain_reply(nachricht,bot)
            break
        case 'nein':
            out_dest()
            break
    }
}
function lake_river_mountain_reply(nachricht,bot){
    bot.send('Soll die Stadt an einem Fluss, See oder Berg liegen?')
    switch(nachricht){
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