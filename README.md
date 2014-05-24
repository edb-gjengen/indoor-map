# Install

    npm install
    npm install -g browserify
    
    node parse.js >> rooms.json

    # TODO doesnt work
    browserify -t brfs index.js -o bundle.js 
    open index.html

# TODO / Plan

- Draw SVG-shapes over PDF maps in Inscape and set id to roomnumber.
- parse SVG into suitable json datastructur (room, coordinates, dimensions)

- render with three.js like described below

# Design

- Black backgrund
- Wireframe of room per floor tagged with name of room
- Highlight room by drawing color semitransparent glowing cube on tob of room floor 
    - Controller by query param and browser controls
