/* global THREE, window, document, $ */
(function () {
   'use strict';
    $(document).ready(function() {
   
    var cubes = [];
    var floors = [];
    var bboxes = [];
    var scene = new THREE.Scene();

    var sceneWidth = 1000;
    var sceneHeight = 1000;
    //var smallestSize = Math.min(window.innerWidth, window.innerHeight);
    //var sceneWidth = smallestSize;
    //var sceneHeight = smallestSize;
    
    var effectFXAA;
    
    var composer;

    var camera = new THREE.PerspectiveCamera( 75, sceneHeight / sceneWidth, 0.1, 2500 );

    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(sceneWidth, sceneHeight);

    document.getElementById('map').appendChild( renderer.domElement );

    // material
    var green_color = 0x00ff00;
    var red_color = 0xcb3626;
    var orange_color = 0xf58220;
    var material = new THREE.LineBasicMaterial( { color: green_color, opacity: 0.3, blending: THREE.AdditiveBlending, transparent: true } );
    var red_material = new THREE.MeshBasicMaterial( { color: red_color, opacity: 1, blending: THREE.AdditiveBlending, transparent: true } );

    // rooms
    var floor_height = 100;

    var axis = new THREE.Vector3(0, 0.5, 0);//tilted a bit on x and y - feel free to plug your different axis here

    function render() {
        var i = 0;
        var rad = 0;
        var radIncrement = 0.001;
        window.requestAnimationFrame(render);

        var brand = scene.getObjectByName('brand');

        for(i=0; i<scene.children.length; i++) {
            var f = scene.children[i];
            //in your update/draw function
            rad -= radIncrement;
            brand.rotateOnAxis(axis,rad);
        }
        //for(i=0; i<bboxes.length; i++) {
        //    bboxes[i].update();
        //}
        renderer.render(scene, camera);
        //renderer.clear();
        //composer.render();
    }

    function add_rooms(rooms, floor) {
        var i = 0;
        var cube;
        var floor_container = new THREE.Object3D();
        for(i=0; i<rooms.length; i++) {
            var room = rooms[i];

            // geometry
            var geometry = new THREE.BoxGeometry(room.dimensions.width, room.dimensions.height, floor_height);

            // KAK ?
            if(floor === 4 && typeof room.number === "object" && (room.number.indexOf("428") > -1 || room.number.indexOf("429") > -1) ) {
                cube = new THREE.Mesh( geometry, red_material );
            } else {
                cube = new THREE.Mesh( geometry, material );
            }

            cube.position.x = room.position.x + room.dimensions.width / 2;
            cube.position.y = room.position.y * -1 - room.dimensions.height / 2; // Why flipped?
            cube.position.z = floor_height * floor;
            cube.name = room.number;

            cubes.push(cube);
            floor_container.add( cube );
        }
        scene.add(floor_container);
        floor_container.rotation.z = -90 * (Math.PI / 180);

        // DEBUG rotation around center
        var bbox = new THREE.BoundingBoxHelper( floor_container, red_color);
        bboxes[floor] = bbox;
        scene.add(bbox);
    }

    function drawText() {
        var shape = new THREE.TextGeometry("Chateau Neuf", {font: 'helvetiker'});
        var wrapper = new THREE.MeshBasicMaterial({color: orange_color});
        var words = new THREE.Mesh(shape, wrapper);
        words.position.set(-600, -200, 450);
        words.rotation.x = 90 * (Math.PI / 180);
        words.name = 'brand';
        scene.add(words);
    }

    function onRoomData(data) {
        drawText();

        var rooms = data.rooms;
        
        var floor = parseInt(rooms[0].number[0], 10);
        
        add_rooms(rooms, floor);
        add_rooms(rooms, floor -1); // FIXME: play

        camera.position.z = 1100;
        camera.position.x = -700;
        camera.position.y = -1500;

        camera.rotation.x = 55 * (Math.PI / 180);
        //camera.lookAt(scene.position);

        /* FX */
        var renderModel = new THREE.RenderPass( scene, camera );
        var effectBloom = new THREE.BloomPass( 1.1 );
        var effectCopy = new THREE.ShaderPass( THREE.CopyShader );

        effectFXAA = new THREE.ShaderPass( THREE.FXAAShader );

        var width = window.innerWidth || 2;
        var height = window.innerHeight || 2;

        effectFXAA.uniforms.resolution.value.set( 1 / width, 1 / height );

        effectCopy.renderToScreen = true;

        composer = new THREE.EffectComposer( renderer );

        composer.addPass( renderModel );
        composer.addPass( effectFXAA );
        composer.addPass( effectBloom );
        composer.addPass( effectCopy );

        render();
    }

    // load rooms
    $.getJSON("/rooms.json", onRoomData);

    });
}());
