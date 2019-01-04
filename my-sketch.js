const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');


const settings = {
  dimensions: [ 2048, 2048 ], //or 'A4'/[x, y] 
  //orentation: 'landscape'
  //pixelsPerInch: 300, units: 'cm' 
  //Noitce the , between each paramter
};


const sketch = () => {
  
  //Setting the seed for the random function from sketch utils, (rather than using JS Math.random)
  //but in this case it's a random number.
  random.setSeed(Math.random());

  //Function declaration
  const createGrid = () => {
    const points = []; //create an array of points
    const iterations = 15;

    //2 (xy) dimension loop
    for (let x=0; x < iterations; x++){
      for (let y = 0; y < iterations; y++){
        const u = x / (iterations - 1);
        const v = y / (iterations - 1);

        //add them to the array
        points.push([u,v]);
      }

    }

    //Retun the array 
    return points;
  };
  
  // Call the function that returns an array and store it in points

  const points = createGrid().filter(() => random.value() > 0.5);
  //Using the filter we can drop some out
  //console.log(() => Math.random() > 0.5);
  //This outputs a null or a false??

  //declare a margin
  const margin = 400;
  var totalElements = 0;

  return ({ context, width, height }) => {
    context.fillStyle = 'brown';
    context.fillRect(0,0,width,height);

    points.forEach(([u,v]) => {

      //Using Lerp, put a margin on the element
      //Lerp gives us a higher for earlier one
      //and 
      const x = lerp(margin, width-margin, u)
      console.log(u + " " + lerp(margin, width-margin, u).toString())
      const y = lerp(margin, height - margin, v);

      //configure and draw the line
      context.beginPath();
      context.arc(x, y, 10, Math.PI * 2, false);
      context.strokeStyle = 'black';
      context.lineWidth = 5;
      context.stroke();

      totalElements++;

    });
    console.log('Total elemetns ' + totalElements.toString())

      
  };

};

canvasSketch(sketch, settings);


//
/*




*/