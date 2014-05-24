// Ref: http://education-eco.blogspot.no/2014/02/venueindoor-map-using-d3js-and-geojson.html

var util = require("util"),
    fs = require("fs"),
    parser = require('libxml-to-js');

var xml = fs.readFileSync(__dirname + "/data/neuf04.svg", "utf-8");
parser(xml, function (err, result) {
    if (err) { throw err; }
    
    var width = result['@'].width;
    var height = result['@'].height;

    // rooms
    var g = result.g.rect;
    var rooms = [];
    Object.keys(g).forEach(function(key) {
        var r = g[key]['@'];
        var number = r.id;
        // more than one room number per shape?
        if(r.id.indexOf(',') > -1) {
            number = r.id.split(",");
        }
        rooms.push({
            number: number,
            pos: {
                x: r.x,
                y: r.y
            },
            size: {
                height: r.height,
                width: r.width,
            }
        });
    });

fs.writeFileSync(__dirname + "/data/rooms.json", JSON.stringify({rooms: rooms}),  "utf-8");

});
