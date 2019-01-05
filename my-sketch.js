const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [ 2048, 2048 ], //or 'A4'/[x, y] 
  //orentation: 'landscape'
  //pixelsPerInch: 300, units: 'cm' 
  //Noitce the , between each paramter
};


const sketch = () => {

  //Pick a random palette from the palettes module.
  //slicing it up from the 5 to a smaller count of colours
  const colourCount = 4;
  const palette = random.pick(palettes).slice(0,colourCount);


  //Setting the seed for the random function from sketch utils, (rather than using JS Math.random)
  //but in this case it's a random number.
  random.setSeed(Math.random());

  //Function declaration
  const createGrid = () => {
    const points = []; //create an array of points
    const iterations = 25;

    //2 (xy) dimension loop
    for (let x=0; x < iterations; x++){
      for (let y = 0; y < iterations; y++){
        const u = x / (iterations - 1);
        const v = y / (iterations - 1);

        //add them to the array, scrap that. We'll create a set of variables
        //put the position in, and the radius value randomised.
        //and a colour from the palette
        points.push({
          colour: random.pick(palette),
          position: [u,v], 
          radius: Math.abs(random.noise2D(u,v)) *20, //use noise for the size and rotation
          rotation: Math.abs(random.noise2D(u,v)) *10
          //radius: Math.abs(0.01 * random.gaussian() * 0.01)
          //radius: random.value() * 10
        });
      }

    }

    //Retun the array 
    return points;
  };
  
  // Call the function that returns an array and store it in points

  const points = createGrid().filter(() => random.value() > 0.2);
  //Using the filter we can drop some out
  //console.log(() => Math.random() > 0.5);
  //This outputs a null or a false??

  //declare a margin
  const margin = 400;
  var totalElements = 0;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0,0,width,height);

    points.forEach(data => {

      //Don't quite get this bit. (deconstructing)
      const { 
        position, radius, colour, rotation
      } = data;
      const [ u, v ] = position;
      //Using Lerp, put a margin on the element
      //Lerp gives us a higher for earlier one
      //and 
      const x = lerp(margin, width-margin, u)
      const y = lerp(margin, height - margin, v);

      /*
      //configure and draw the line
      context.beginPath();
      context.arc(x, y, radius * 5, Math.PI * 2, false);
      context.fillStyle = colour;
      context.lineWidth = 10;
      context.fill();
      */

      context.save(); //save the state, so we can restore it again next time.
      //else we'd be rotating and rotating more and more 

      //configure and draw text
      context.fillStyle = colour;
      //context.font = '100px "Arial"';
      context.font = `${radius * width * .005}px "Helvetica"`;
      context.translate(x,y)
      context.rotate(rotation);
      context.fillText('=', 0, 0);
      totalElements++;

      //restore the saved context values
      context.restore();

    });
    console.log('Total elemetns ' + totalElements.toString())

      
  };

};

canvasSketch(sketch, settings);


//
/*




*/