// Ref: http://education-eco.blogspot.no/2014/02/venueindoor-map-using-d3js-and-geojson.html

var util = require("util"),
    fs = require("fs"),
    parser = require('libxml-to-js'),
    utils = require("./utils");

var xml = fs.readFileSync(__dirname + "/data/neuf04.svg", "utf-8");
parser(xml, function (err, result) {
    if (err) { throw err; }
    
    var width = result['@'].width;
    var height = result['@'].height;

    // rooms
    var g = result.g.rect;
    var transform = result.g['@'].transform;
    console.log(transform);
    //translate(-21.057139,264.6204)
    var translateX = -21.057139;
    var translateY = 264.6204;
    var rooms = [];
    Object.keys(g).forEach(function(key) {
        var r = g[key]['@'];
        var number = r.id;

        // more than one room number per shape?
        if(r.id.indexOf(',') > -1) {
            number = r.id.split(",");
        }
        // more than one shape per room number?
        if(r.id.indexOf('_') > -1) {
            number = r.id.split("_")[0];
        }
        // TODO adjust position to top left instead of center
        // ie. find vector from center to top left corner
        var room = {
            number: number,
            position: {
                x: parseFloat(r.x) + translateX,
                y: parseFloat(r.y) + translateY
            },
            dimensions: {
                height: r.height,
                width: r.width,
            }
        };
        //utils.applySVGTransform(room, transform);
        console.log(room);
        rooms.push(room);
    });
    var data = {rooms: rooms, dimensions: { width: width, heigh: height}};

    fs.writeFileSync(__dirname + "/data/rooms.json", JSON.stringify(data, null, 4),  "utf-8");
});
