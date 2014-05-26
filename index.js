var cubes = [];
var scene = new THREE.Scene();

//var sceneWidth = 1000;
//var sceneHeight = 1000;
var sceneWidth = window.innerWidth;
var sceneHeight = window.innerHeight;

var camera = new THREE.PerspectiveCamera( 75, sceneHeight / sceneWidth, 0.1, 2500 );

var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true});
renderer.setSize(sceneWidth, sceneHeight);
document.body.appendChild( renderer.domElement );

// material
var green_color = 0x00ff00;
var red_color = 0xff0000;
var material = new THREE.MeshBasicMaterial( { color: green_color, wireframe: true } );
var red_material = new THREE.MeshBasicMaterial( { color: red_color } );

// rooms
var room_height = 120;

function render() {
    var i = 0;
	requestAnimationFrame(render);

    for(i=0; i<scene.children.length; i++) {
        var cube = scene.children[i];
        //cube.rotation.z += 0.01;
    }
	renderer.render(scene, camera);
}

function add_rooms(rooms, floor) {
    for(i=0; i<rooms.length; i++) {
        var room = rooms[i];
        var cube;

        // geometry
        var geometry = new THREE.BoxGeometry(room.dimensions.width, room.dimensions.height, room_height);

        if(typeof room.number == "object" && (room.number.indexOf("428") > -1 || room.number.indexOf("429") > -1) ) {
            // KAK
            cube = new THREE.Mesh( geometry, red_material );
        } else {
            cube = new THREE.Mesh( geometry, material );
        }

        cube.position.x = room.position.x + room.dimensions.width / 2;
        cube.position.y = room.position.y * -1 - room.dimensions.height / 2; // FIXME why flipped?
        cube.position.z = floor;
        cube.name = room.number;

        cubes.push(cube);
        scene.add( cube );
    }
}

function onRoomData(data) {
    var i = 0;
    var rooms = data.rooms;

    add_rooms(rooms, 0);
    add_rooms(rooms, room_height * 2); // FIXME: play

    camera.position.z = 400;
    camera.position.x = 450;
    camera.position.y = -1600;

    camera.rotation.x = 60 * (Math.PI / 180);
    //camera.lookAt(scene.position);

    render();
}

// load rooms
$.getJSON("/data/rooms.json", onRoomData);

