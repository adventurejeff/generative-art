const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1024, 1024 ], //or 'A4'/[x, y] 
  //orentation: 'landscape'
  //pixelsPerInch: 300, units: 'cm' 
  //Noitce the , between each paramter
};


const sketch = () => {
  

  //Function declaration
  const createGrid = () => {
    const points = []; //create an array of points
    const iterations = 5;

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
  const points = createGrid();


  //declare a margin
  const margin = 1024 / 10;
  var totalElements = 0;

  return ({ context, width, height }) => {
    context.fillStyle = 'brown';
    context.fillRect(0,0,width,height);

    points.forEach(([u,v]) => {
      const x = u * width;
      const y = v * height;

      //configure and draw the line
      context.beginPath();
      context.arc(x + margin, y + margin, 40, Math.PI * 2, false);
      context.strokeStyle = 'black';
      context.lineWidth = 10;
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