// // http://thecodeplayer.com/walkthrough/3d-perspective-projection-canvas-javascript

// //creating a canvas using JS
// var canvas = document.createElement("canvas");
// //making the canvas fullscreen
// var w = canvas.width = window.innerWidth;
// var h = canvas.height = window.innerHeight;

// var fov = 250; //pixels are 250px away from us

// var ctx = canvas.getContext("2d");
// //appending the canvas to the body
// document.body.appendChild(canvas);


// addEventListener("resize", () => setSize());
// function setSize() {
//     w = canvas.width = window.innerWidth;
//     h = canvas.height = window.innerHeight;
//     render()
// }


// //an array of pixels with 3 dimensional coordinates
// //a square sheet of dots separated by 5px

// var pixelSeparation = 5
// var pixels = [];
// for (var x = -fov; x < fov; x += pixelSeparation)
//     for (var z = -fov; z < fov; z += pixelSeparation)
//         pixels.push({ x: x, y: 50, z: z });

// //time to draw the pixels
// function render() {
//     ctx.clearRect(0, 0, w, h);
//     //grabbing a screenshot of the canvas using getImageData
//     var imagedata = ctx.getImageData(0, 0, w, h);
//     //looping through all pixel points
//     var i = pixels.length;
//     while (i--) {
//         var pixel = pixels[i];
//         //calculating 2d position for 3d coordinates
//         //fov = field of view = denotes how far the pixels are from us.
//         //the scale will control how the spacing between the pixels will decrease with increasing distance from us.
//         var scale = fov / (fov + pixel.z);
//         var x2d = pixel.x * scale + w / 2;
//         var y2d = pixel.y * scale + h / 2;
//         //marking the points green - only if they are inside the screen
//         if (x2d >= 0 && x2d <= w && y2d >= 0 && y2d <= h) {
//             //imagedata.width gives the width of the captured region(canvas) which is multiplied with the Y coordinate and then added to the X coordinate. The whole thing is multiplied by 4 because of the 4 numbers saved to denote r,g,b,a. The final result gives the first color data(red) for the pixel.
//             var c = (Math.round(y2d) * imagedata.width + Math.round(x2d)) * 4;
//             imagedata.data[c] = 0; //red
//             imagedata.data[c + 1] = 255; //green
//             imagedata.data[c + 2] = 60; //blue
//             imagedata.data[c + 3] = 255; //alpha
//         }
//         pixel.z -= 1;
//         if (pixel.z < -fov) pixel.z += 2 * fov;
//     }
//     //putting imagedata back on the canvas
//     ctx.putImageData(imagedata, 0, 0);
// }

// //animation time
// // setInterval(render, 1000 / 30);
// render()


