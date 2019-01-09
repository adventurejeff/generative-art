const canvasSketch = require('canvas-sketch');
const createShader = require('canvas-sketch-util/shader');
const glsl = require('glslify');

// Setup our sketch
const settings = {
  context: 'webgl',
  animate: true
};

// Your glsl code
//the glsl in comment tags is for vs code to use with
//Comment tagged templates & Shader languages support for VS Code
const frag = glsl(/* glsl */`
  precision highp float;

  uniform float aspectRatio;
  uniform float time;
  varying vec2 vUv;

  void main () {
      //change a colour over time by sin
      //vec3 colour = vec3(sin(time) + 1.0);
      //gl_FragColor = vec4(colour,1);

      //Mix two colours across the X coordinate
      vec3 colourA = sin(time) + vec3(1.0, 0,0 );
      vec3 colourB = vec3(0.0, 0.5, 0.0);

      vec2 center = vUv - 0.5; //get the center of the space
      center.x *= aspectRatio; //shrink the x relative to the aspect ratio
      //this could also be center.y /= aspectRatio which would change the way the circle is aligned 
      //(would change size along a different axis)
      float distanceFromCenter = length(center);

      vec3 colour = mix(colourA, colourB, vUv.x);
      //Fancy if else syntax (argument evaluation ? true : false)
      //gl_FragColor = vec4(colour, distanceFromCenter > 0.25 ? 0.0 : 1.0);
      
      //add some smoothing with the smoothstep GLSL function
      float alpha = smoothstep(0.25, 0.249, distanceFromCenter);
      
      gl_FragColor = vec4(colour, alpha);


  }
`);

// Your sketch, which simply returns the shader
const sketch = ({ gl }) => {
  // Create the shader and return it
  return createShader({

    clearColor: 'white', //false sets to transparent!!!

    // Pass along WebGL context
    gl,
    // Specify fragment and/or vertex shader strings
    frag,
    // Specify additional uniforms to pass down to the shaders
    uniforms: {
      // Expose props from canvas-sketch
      time: ({ time }) => time, 
      aspectRatio: ({width, height}) => width / height
    }
  });
};

canvasSketch(sketch, settings);
