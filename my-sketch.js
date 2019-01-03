const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 256, 256 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    //rectangle on the outside
    context.fillStyle = 'orange';
    context.fillRect(0, 0, width, height);

    //rectangle in the center
    context.strokeStyle = 'white';
    context.lineWidth = 14;
    
    //
    context.strokeRect(width / 4, height / 4, width / 2, height / 2);

    //
    context.beginPath();
    context.arc(width/2, height/2, 75, 0, 2 * Math.PI);
    context.strokeStyle = 'red';
    context.stroke();
    
    //
    context.beginPath();
    context.fillStyle = 'green';
    context.fill();
    context.fillRect(Math.random() * 100,10,100,100);

  };
};

canvasSketch(sketch, settings);
