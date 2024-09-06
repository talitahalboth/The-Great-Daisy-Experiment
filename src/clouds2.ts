export const canvas =
  (document.getElementById("canvas") as HTMLCanvasElement) ??
  new HTMLCanvasElement();
export const ctx = canvas.getContext("2d") ?? new CanvasRenderingContext2D();

let rect = canvas.getBoundingClientRect();

// increase the actual size of our canvas
const width = (canvas.width = rect.width * devicePixelRatio);
const height = (canvas.height = rect.height * devicePixelRatio);

// ensure all drawing operations are scaled
ctx.scale(devicePixelRatio, devicePixelRatio);

const paintBackground = () => {
  ctx.beginPath();

  ctx.moveTo(0, 0);
  ctx.lineTo(0, height);
  ctx.lineTo(width, height);
  ctx.lineTo(width, 0);
  ctx.lineTo(0, 0);

  ctx.fillStyle = "#9bd2f8";
  ctx.fill();

  ctx.closePath();
};

paintBackground();
const map = (v: number, a1: number, b1: number, a2: number, b2: number) => {
  return ((v - a1) / (b1 - a1)) * (b2 - a2) + a2;
};

const int = (n: number) => {
  return Math.floor(n);
};

const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const getRandomInt = (max: number) => {
  return int(Math.random() * max);
};

interface FluffInfo {
  x: number;
  y: number;
  r: number;
}

const distance = (x1: number, y1: number, x2: number, y2: number) => {
  const a = x1 - x2;
  const b = y1 - y2;

  const c = Math.sqrt(a * a + b * b);
  return Math.abs(c);
};

const calcPositionLeft = (prev: FluffInfo, r: number) => {
  const r1 = prev.r;
  const r2 = r;
  const hLine = getRandomInt(prev.r / 1.5);

  const a = r1 - r2 - hLine;
  const h = r1 + r2;
  const b = Math.sqrt(h * h - a * a);
  const x1 = prev.x;
  const y1 = prev.y;

  const x2 = x1 - b;
  const y2 = y1 + a;
  const newFluff = { x: x2, y: y2, r: r2 };
  return newFluff;
};

const calcPositionRight = (prev: FluffInfo, r: number) => {
  const r1 = prev.r;
  const r2 = r;
  const hLine = getRandomInt(prev.r / 1.5);

  const a = r1 - r2 - hLine;
  const h = r1 + r2;
  const b = Math.sqrt(h * h - a * a);
  const x1 = prev.x;
  const y1 = prev.y;

  const x2 = x1 + b;
  const y2 = y1 + a;
  const newFluff = { x: x2, y: y2, r: r2 };
  return newFluff;
};

const drawFluff = (fluff: FluffInfo) => {
  const x = fluff.x;
  const y = fluff.y;
  ctx.moveTo(x, y);
  ctx.arc(x, y, fluff.r, 0, Math.PI * 2);
};

const rectanglesIntersect = (
  minAx: number,
  minAy: number,
  maxAx: number,
  maxAy: number,
  minBx: number,
  minBy: number,
  maxBx: number,
  maxBy: number
) => {
  const aLeftOfB = maxAx < minBx;
  const aRightOfB = minAx > maxBx;
  const aAboveB = minAy > maxBy;
  const aBelowB = maxAy < minBy;

  return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
};

const drawClouds = (cloud: Cloud, furthersYValue: number) => {
  ctx.beginPath();
  const fluffs = cloud.fluffs;
  fluffs.forEach((fluff) => {
    drawFluff(fluff);
  });
  ctx.moveTo(fluffs[0].x, furthersYValue);
  fluffs.forEach((fluff) => {
    ctx.lineTo(fluff.x, fluff.y);
  });

  ctx.lineTo(fluffs[fluffs.length - 1].x, furthersYValue);
  ctx.shadowColor = "rgba(80, 80, 80, 0.2)";
  const shaddowOffset = map(6, 0, rect.height, 0, height);
  ctx.shadowOffsetX = shaddowOffset;
  ctx.shadowOffsetY = shaddowOffset;
  const grd = ctx.createLinearGradient(cloud.x1, cloud.y1, cloud.x1, cloud.y2);
  grd.addColorStop(0, "white");
  grd.addColorStop(0.5, "white");
  grd.addColorStop(1, "#fff");
  ctx.fillStyle = grd;
  // cloud.bezierCurves.forEach((curve) => {
  //   // ctx.beginPath();
  //   drawBezier(curve);
  //   // ctx.stroke();
  // });
  ctx.fill();
};

class Cloud {
  fluffs: FluffInfo[];
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  speed: number;
  public test() {
    return 1;
  }
  public draw() {
    ctx.beginPath();
    this.fluffs.forEach((fluff) => {
      drawFluff(fluff);
    });
    ctx.moveTo(this.fluffs[0].x, this.y2);
    this.fluffs.forEach((fluff) => {
      ctx.lineTo(fluff.x, fluff.y);
    });

    ctx.lineTo(this.fluffs[this.fluffs.length - 1].x, this.y2);
    ctx.shadowColor = "rgba(80, 80, 80, 0.2)";
    const shaddowOffset = map(6, 0, rect.height, 0, height);
    ctx.shadowOffsetX = shaddowOffset;
    ctx.shadowOffsetY = shaddowOffset;
    const grd = ctx.createLinearGradient(this.x1, this.y1, this.x1, this.y2);
    grd.addColorStop(0, "white");
    grd.addColorStop(0.5, "white");
    grd.addColorStop(1, "#fff");
    ctx.fillStyle = grd;
    // cloud.bezierCurves.forEach((curve) => {
    //   // ctx.beginPath();
    //   drawBezier(curve);
    //   // ctx.stroke();
    // });
    ctx.fill();
  }
}

const generateFluff = (): Cloud => {
  const { width, height } = rect;
  const minSizebigFluff = (width + height) / 40;
  const maxSizebigFluff = (width + height) / 30;

  const fluffs: FluffInfo[] = [];

  const bigFluff = {
    x: getRandomInt(width),
    y: getRandomInt(height),
    r: int(getRandomArbitrary(minSizebigFluff, maxSizebigFluff)),
  };
  const minSize = bigFluff.r / 3;
  const maxSize = bigFluff.r;
  let prevFluffLeft: FluffInfo = bigFluff;

  const amountOfFluff = int(getRandomArbitrary(1, 3));
  let prevFluffRight: FluffInfo = prevFluffLeft;
  fluffs.push(prevFluffRight);
  for (let index = 0; index < amountOfFluff; index += 2) {
    let fluffLeft = getRandomArbitrary(minSize, maxSize);
    let fluffRight =
      index + 1 < amountOfFluff ? getRandomArbitrary(minSize, maxSize) : 0;
    const rand = Math.random();
    if (rand < 0.5) {
      fluffLeft = fluffLeft + fluffRight;
      fluffRight = fluffLeft - fluffRight;
      fluffLeft = fluffLeft - fluffRight;
    }
    // calculate x and y of left fluff
    const newFluffLeft = calcPositionLeft(prevFluffLeft, fluffLeft);
    fluffs.unshift(newFluffLeft);
    prevFluffLeft = newFluffLeft;

    //calculate x and y of right fluff
    const newFluffRight = calcPositionRight(prevFluffRight, fluffRight);
    fluffs.push(newFluffRight);
    prevFluffRight = newFluffRight;
  }

  const furthersYValue = fluffs.reduce((prev, curr) => {
    return Math.max(prev, curr.y + curr.r);
  }, 0);

  const smallestYValue = fluffs.reduce((prev, curr) => {
    return Math.min(prev, curr.y - curr.r);
  }, height);

  const createEndFluffLeft = () => {
    const firstFluff = fluffs[0];
    const diam = Math.max(minSize * 2, furthersYValue - firstFluff.y);
    const r = diam / 2;
    const x = calcPositionLeft(firstFluff, r).x;
    const y = furthersYValue - r;
    const offsetDistance =
      distance(firstFluff.x, firstFluff.y, x, y) - (firstFluff.r + r);
    const fluffLeft = {
      x: x + offsetDistance,
      y: y,
      r: diam / 2,
    };
    fluffs.unshift(fluffLeft);
  };

  const createEndFluffRight = () => {
    const lastFluff = fluffs[fluffs.length - 1];
    const diam = Math.max(minSize * 2, furthersYValue - lastFluff.y);

    const r = diam / 2;
    const x = calcPositionRight(lastFluff, r).x;
    const y = furthersYValue - r;
    const offsetDistance =
      distance(lastFluff.x, lastFluff.y, x, y) - (lastFluff.r + r);
    const fluffRight = {
      x: x - offsetDistance,
      y,
      r,
    };
    fluffs.push(fluffRight);
  };

  createEndFluffLeft();
  createEndFluffRight();

  const furthersXValue = fluffs.reduce((prev, curr) => {
    return Math.max(prev, curr.x + curr.r);
  }, 0);

  const smallestXValue = fluffs.reduce((prev, curr) => {
    return Math.min(prev, curr.x - curr.r);
  }, height);

  const y1 = smallestYValue;
  const y2 = furthersYValue;
  const x1 = smallestXValue;
  const x2 = furthersXValue;
  const speed = Math.random() * 0.5 + 0.2; // Speed of movement

  const clouds = { fluffs, x1, x2, y1, y2, speed };
  return clouds;
};

const previousClouds: Cloud[] = [];

const checkIntersects = (cloud: Cloud) => {
  const ret = previousClouds.reduce((intersects, prev) => {
    const inter = rectanglesIntersect(
      prev.x1,
      prev.y1,
      prev.x2,
      prev.y2,
      cloud.x1,
      cloud.y1,
      cloud.x2,
      cloud.y2
    );
    return intersects || inter;
  }, false);
  return ret;
};

const checkOutOfBounds = (cloud: Cloud) => {
  // console.log(rect.width, rect.height);
  const { width, height } = rect;
  const middlex = (cloud.x1 + cloud.x2) / 2;
  const middley = (cloud.y1 + cloud.y2) / 2;
  return middlex < 0 || middlex > width || middley < 0 || middley > height;
};

for (let i = 0; i < 5; i++) {
  let cloud = generateFluff();
  let attempts = 0;
  while ((checkIntersects(cloud) || checkOutOfBounds(cloud)) && attempts < 20) {
    attempts++;
    cloud = generateFluff();
  }

  // drawClouds(cloud.fluffs, cloud.y1);
  previousClouds.push(cloud);
}

previousClouds.forEach((cloud) => {
  drawClouds(cloud, cloud.y2);
});

// // Animation loop
// function animate() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   paintBackground();
//   previousClouds.forEach((cloud) => {
//     const size = cloud.x2 - cloud.x1;
//     if (cloud.x1 - size > canvas.width) {
//       cloud.x1 = -size * 2;
//       cloud.x2 = -size * 2 + size;
//       cloud.fluffs.forEach((fluff) => {
//         fluff.x = -size * 2;
//       });
//     }
//     cloud.x1 += cloud.speed;
//     cloud.x2 += cloud.speed;
//     cloud.fluffs.forEach((fluff) => {
//       fluff.x += cloud.speed;
//     });
//     drawClouds(cloud, cloud.y2);
//     // this.x += this.speed;
//     // If the cloud goes off screen, reset it to the left
//     // this.draw();
//   });
//   requestAnimationFrame(animate);
// }

// // Start animation
// animate();
