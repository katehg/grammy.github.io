

var REPEATING_HTML = "<div class='view view-first'>" +
    "<img src='!!!link!!!'>"+
    "<div class='mask'>"+
    "<h2>{%year%}</h2>"+
    "<p>{%album%}</p>" +
    "</div>"+
    "</div>";

function hexToRgb(hex) {
    hex = hex.substring(1, hex.length);
    var r = parseInt((hex).substring(0, 2), 16);
    var g = parseInt((hex).substring(2, 4), 16);
    var b = parseInt((hex).substring(4, 6), 16);

    return [r, g, b];
}

function colorDistance(color1, color2) {

    color1 = hexToRgb(color1);
    color2 = hexToRgb(color2);
    var result = 0;
    for (var i = 0; i < color1.length; i++)
        result += (color1[i] - color2[i]) * (color1[i] - color2[i]);
    return result;
}

function sort_json_objects_by_color(jsonArray){
    jsonArray.sort(function(obj1, obj2){
        return colorDistance(obj1.average_color, obj2.average_color)
    })
    return jsonArray
}

function sort_json_objects_by_year(jsonArray){
    jsonArray.sort(function(obj1,obj2){
        return obj1.year - obj2.year
    })
    return jsonArray
}

function sort_json_objects_by_performer(jsonArray){
    jsonArray.sort(function(obj1,obj2){
        return (obj1.perfomer < obj2.perfomer) ? -1 : (obj1.perfomer > obj2.perfomer) ? 1 : 0;
    })
    return jsonArray
}

function buildPage(jsonArray){
    document.getElementById("sort").innerHTML = ""
    for (var i = 0; i < jsonArray.length; i++){
        var page = REPEATING_HTML;
        page = page.replace('!!!link!!!',jsonArray[i]["link"]);
        page = page.replace('{%album%}',jsonArray[i].album);
        page = page.replace('{%year%}',jsonArray[i].year);

        document.getElementById("sort").innerHTML += page;
    }
}

function buildPage_performer(jsonArray){
    document.getElementById("sort").innerHTML = ""
    for (var i = 0; i < jsonArray.length; i++){
        var page = REPEATING_HTML;
        page = page.replace('!!!link!!!',jsonArray[i]["link"]);
        page = page.replace('{%album%}',jsonArray[i].perfomer);
        page = page.replace('{%year%}',jsonArray[i].year);

        document.getElementById("sort").innerHTML += page;
    }
}

$(document).ready(function(){
    $.getJSON('https://raw.githubusercontent.com/katehg/delyagina_kate/master/grammy_new.json', function(data) {
        buildPage(data)
    });
});

function build_sorted_colores_page(){
    $.getJSON('https://raw.githubusercontent.com/katehg/delyagina_kate/master/grammy_new.json', function(data) {
        buildPage(sort_json_objects_by_color(data))
    });
}

function build_sorted_years_page(){
    $.getJSON('https://raw.githubusercontent.com/katehg/delyagina_kate/master/grammy_new.json', function(data) {
        buildPage(sort_json_objects_by_year(data))
    });
}

function build_sorted_performers_page(){
    $.getJSON('https://raw.githubusercontent.com/katehg/delyagina_kate/master/grammy_new.json', function(data) {
        buildPage_performer(sort_json_objects_by_performer(data))
    });
}


