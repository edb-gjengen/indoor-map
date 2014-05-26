# Install

    npm install
    npm start
    grunt watch
    
    # Parse rooms
    node parse.js >> rooms.json

# TODO 

- Draw SVG shapes over PDF maps in Inscape and set id to roomnumber.
- Parse SVG into suitable json datastructur (room, coordinates, dimensions).
- Render with three.js like described below.

# TODO improvements
- SVG parser: Allow SVG paths (see utils.js), use custom attribute for room numbers, make more generic 

# Design

Similar to [this three.js design](http://threejs.org/examples/#webgl_lines_colors)

- Black backgrund
- Wireframe of room per floor tagged with name of room
- Highlight room by drawing color semi-transparent glowing cube on tob of room floor 
    - Controlled by query param and browser controls

# References
- [Three.js](http://threejs.org/docs/)
- [PDF maps of Chateau Neuf](http://www.admin.uio.no/ta/PDF_fra_Pythagoras_bygningsvis_public/universitetet/blindern/bl38/bl38.htm)
