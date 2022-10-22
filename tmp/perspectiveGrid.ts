
// const canvas = document.getElementById("canvas") as HTMLCanvasElement ?? new HTMLCanvasElement
// const ctx = canvas.getContext("2d") ?? new CanvasRenderingContext2D()
// var ez = canvas.getBoundingClientRect()
// const fov = 512 /// Field of view kind of the lense, smaller values = spheric
// const viewDist = 22 /// view distance, higher values = further away
// const w = ez.width / 2 /// center of screen
// const h = ez.height / 2
// const angle = -60 /// grid angle
// /* i, p1, p2,         /// counter and two points (corners) */
// const grid = 20 /// grid size in Cartesian


// function rotateX(x: number, y: number) {

//     var rd, ca, sa, ry, rz, f;

//     rd = angle * Math.PI / 180; /// convert angle into radians
//     ca = Math.cos(rd);
//     sa = Math.sin(rd);

//     ry = y * ca; /// convert y value as we are rotating
//     rz = y * sa; /// only around x. Z will also change

//     /// Project the new coords into screen coords
//     f = fov / (viewDist + rz);
//     x = x * f + w;
//     y = ry * f + h;

//     return [x, y];
// }

// const strokeLine = (x1: number, y1: number, x2: number, y2: number) => {
//     ctx.moveTo(x1, y1);
//     ctx.lineTo(x2, y2);
//     ctx.stroke();
// }

// /// create vertical lines
// for (let i = -grid; i <= grid; i++) {
//     const p1 = rotateX(i, -grid);
//     const p2 = rotateX(i, grid);
//     strokeLine(p1[0], p1[1], p2[0], p2[1]); //from easyCanvasJS, see demo
// }

// /// create horizontal lines
// for (let i = -grid; i <= grid; i++) {
//     const p1 = rotateX(-grid, i);
//     const p2 = rotateX(grid, i);
//     strokeLine(p1[0], p1[1], p2[0], p2[1]);
// }


// const doStuff = (cx: number, cy: number) => {
//     const c1 = rotateX(cx, cy); /// upper left corner
//     const c2 = rotateX(cx + 1, cy); /// upper right corner
//     const c3 = rotateX(cx + 1, cy + 1); /// bottom right corner
//     const c4 = rotateX(cx, cy + 1); /// bottom left corner

//     /// draw a polygon between the points
//     ctx.beginPath();
//     ctx.moveTo(c1[0], c1[1]);
//     ctx.lineTo(c2[0], c2[1]);
//     ctx.lineTo(c3[0], c3[1]);
//     ctx.lineTo(c4[0], c4[1]);
//     ctx.closePath();

//     /// fill the polygon
//     ctx.fillStyle = 'rgb(200,0,0)';
//     ctx.fill();
// }

// doStuff(-1, -1)
// doStuff(0, -1)

// doStuff(-10, -10)