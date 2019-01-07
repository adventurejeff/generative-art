const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random'); //add the canvas random function
const palettes = require('nice-color-palettes');

// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');

//Pick a random palette from the palettes module.
  //slicing it up from the 5 to a smaller count of colours
  const colourCount = 4;
  const palette = random.pick(palettes).slice(0,colourCount);// Include any additional ThreeJS examples below

  //require('three/examples/js/controls/OrbitControls');

const settings = {

  dimensions: [512,512],
  fps: 24,
  duration: 4, //seconds
  
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true }
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context
  });

  // WebGL background color
  renderer.setClearColor('#FFF', 1);

  // Setup a camera
  const camera = new THREE.OrthographicCamera();
  camera.position.set(2, 2, -4);
  camera.lookAt(new THREE.Vector3()); //look at 0,0,0


  // Setup your scene
  const scene = new THREE.Scene();
  
  //Make the mesh
  const box = new THREE.BoxGeometry(1,1,1);

  //Loop of mesh instances
for(let i=0; i < 50; i++){
  const mesh = new THREE.Mesh(
    box,
    new THREE.MeshStandardMaterial({
      color: random.pick(palette),
    })
  );

  //Setting the position of the instances
  const variance = .4, scaleVariance = 2;
  mesh.position.set(
    random.range(-variance,variance),
    random.range(-variance,variance),
    random.range(-variance,variance)
  );
  //randomise the dimensions
  
  mesh.scale.set(
    random.range(-scaleVariance,scaleVariance),
    random.range(-scaleVariance,scaleVariance),
    random.range(-scaleVariance,scaleVariance)
  );
    
  //scaling them all
  mesh.scale.multiplyScalar(.1);
  scene.add(mesh);
}

  //LIGHTING
  light = new THREE.DirectionalLight('white', 1);
  light.position.set(0,4,0)
  scene.add(light);

  scene.add(new THREE.AmbientLight('red', 0.5));

 

  // draw each frame
  return {
    // Handle resize events here
    resize ({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);
    
      // ...
      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom
      const zoom = 1.0;

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update the camera
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render ({ playhead }) {
      scene.rotation.y = playhead * Math.PI * 2;// Using Playhead, we are looping 1 whole rotation
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload () {
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
