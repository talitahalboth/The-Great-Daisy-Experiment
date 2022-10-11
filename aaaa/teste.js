function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}



var ClassicalNoise = function (r) { // Classic Perlin noise in 3D, for comparison
    if (r == undefined) r = Math;
    this.grad3 = [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]];
    this.p = [];
    for (var i = 0; i < 256; i++) {
        this.p[i] = Math.floor(r.random() * 256);
    }
    // To remove the need for index wrapping, double the permutation table length
    this.perm = [];
    for (var i = 0; i < 512; i++) {
        this.perm[i] = this.p[i & 255];
    }
};

ClassicalNoise.prototype.dot = function (g, x, y, z) {
    return g[0] * x + g[1] * y + g[2] * z;
};

ClassicalNoise.prototype.mix = function (a, b, t) {
    return (1.0 - t) * a + t * b;
};

ClassicalNoise.prototype.fade = function (t) {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
};

// Classic Perlin noise, 3D version
ClassicalNoise.prototype.noise = function (x, y, z) {
    // Find unit grid cell containing point
    var X = Math.floor(x);
    var Y = Math.floor(y);
    var Z = Math.floor(z);

    // Get relative xyz coordinates of point within that cell
    x = x - X;
    y = y - Y;
    z = z - Z;

    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255;
    Y = Y & 255;
    Z = Z & 255;

    // Calculate a set of eight hashed gradient indices
    var gi000 = this.perm[X + this.perm[Y + this.perm[Z]]] % 12;
    var gi001 = this.perm[X + this.perm[Y + this.perm[Z + 1]]] % 12;
    var gi010 = this.perm[X + this.perm[Y + 1 + this.perm[Z]]] % 12;
    var gi011 = this.perm[X + this.perm[Y + 1 + this.perm[Z + 1]]] % 12;
    var gi100 = this.perm[X + 1 + this.perm[Y + this.perm[Z]]] % 12;
    var gi101 = this.perm[X + 1 + this.perm[Y + this.perm[Z + 1]]] % 12;
    var gi110 = this.perm[X + 1 + this.perm[Y + 1 + this.perm[Z]]] % 12;
    var gi111 = this.perm[X + 1 + this.perm[Y + 1 + this.perm[Z + 1]]] % 12;

    // The gradients of each corner are now:
    // g000 = grad3[gi000];
    // g001 = grad3[gi001];
    // g010 = grad3[gi010];
    // g011 = grad3[gi011];
    // g100 = grad3[gi100];
    // g101 = grad3[gi101];
    // g110 = grad3[gi110];
    // g111 = grad3[gi111];
    // Calculate noise contributions from each of the eight corners
    var n000 = this.dot(this.grad3[gi000], x, y, z);
    var n100 = this.dot(this.grad3[gi100], x - 1, y, z);
    var n010 = this.dot(this.grad3[gi010], x, y - 1, z);
    var n110 = this.dot(this.grad3[gi110], x - 1, y - 1, z);
    var n001 = this.dot(this.grad3[gi001], x, y, z - 1);
    var n101 = this.dot(this.grad3[gi101], x - 1, y, z - 1);
    var n011 = this.dot(this.grad3[gi011], x, y - 1, z - 1);
    var n111 = this.dot(this.grad3[gi111], x - 1, y - 1, z - 1);
    // Compute the fade curve value for each of x, y, z
    var u = this.fade(x);
    var v = this.fade(y);
    var w = this.fade(z);
    // Interpolate along x the contributions from each of the corners
    var nx00 = this.mix(n000, n100, u);
    var nx01 = this.mix(n001, n101, u);
    var nx10 = this.mix(n010, n110, u);
    var nx11 = this.mix(n011, n111, u);
    // Interpolate the four results along y
    var nxy0 = this.mix(nx00, nx10, v);
    var nxy1 = this.mix(nx01, nx11, v);
    // Interpolate the two last results along z
    var nxyz = this.mix(nxy0, nxy1, w);

    return nxyz;
};



function Mountains(top, bottom, time) { //#D36F6F, #AD1515
    var ranges = [];
    var start, end;
    if (time < 0.5) {
        start = lerpColor("#D36F6F", "#F2C178", map(time, 0, 0.5, 0, 1));
        end = lerpColor("#AD1515", "#E85B57", map(time, 0, 0.5, 0, 1));
    } else {
        start = lerpColor("#654183", "#2D3A5F", map(time, 0.5, 1, 0, 1));
        end = lerpColor("#B198C6", "#6172A5", map(time, 0.5, 1, 0, 1));
    }

    var layers = int(random(2, 5));
    var heightUnit = (bottom - top) / (layers + 1);

    for (var l = 0; l < layers; l++) {
        var y = top + random(heightUnit * l, heightUnit * (l + 1));
        var spread = random(1, 3) * heightUnit;
        ranges.push(new MountainRange(
            y,
            spread,
            lerpColor(start, end, l / layers), (l + 1) / layers,
            time
        ));
    }

    this.draw = function () {
        ranges.forEach(function (range) {
            range.draw();
        });
    };
}

function MountainRange(y, spread, c, foreground, time) {
    var elevation = [];

    var noiseElevation = random(1, 100);
    var spikiness = random(40, 90);

    for (var x = 0; x < 150; x++) {
        elevation.push(map(noise(x / spikiness, noiseElevation), 0, 1, -1, 1) * spread);
    }



    this.draw = function () {
        fill(c);
        beginShape();
        for (var i = 0; i < elevation.length; i++) {
            vertex((i / (elevation.length - 1)) * width, y + elevation[i]);
        }
        vertex(width, height);
        vertex(0, height);
        endShape();

    };
}


function Sky(time) {
    var sky, horizon;
    if (time < 0.5) {
        sky = lerpColor("#B9F7D5", "#57C8F0", map(time, 0, 0.5, 0, 1));
        horizon = lerpColor("#FCED42", "#E365ED", map(time, 0, 0.5, 0, 1));
    } else {
        sky = lerpColor("#C282E5", "#1A285A", map(time, 0.5, 1, 0, 1));
        horizon = lerpColor("#82E3E5", "#BFE1FC", map(time, 0.5, 1, 0, 1));
    }

    this.draw = function () {
        setGradient(0, 0, width, height, sky, horizon);
    };
}


var width = 720;
var height = 405;
var canvas = document.getElementById("landscape");
var container = document.getElementById("header");
var overlay = document.getElementById("overlay");
var buffer, buffer_canvas;
var pathCleared = true;
var transitioning = false;

var clearBackground = function () {
    buffer.clearRect(0, 0, width, height);
};

var random = function (low, high) {
    if (high === undefined) {
        high = low;
        low = 0;
    }
    return Math.random() * (high - low) + low;
};

var int = function (n) {
    return Math.floor(n);
};

var strokeWeight = function (w) {
    buffer.lineWidth = w;
};

var stroke = function (c) {
    buffer.strokeStyle = c;
};

var line = function (x1, y1, x2, y2) {
    buffer.beginPath();
    buffer.moveTo(x1, y1);
    buffer.lineTo(x2, y2);
    buffer.stroke();
};

var fill = function (c) {
    buffer.fillStyle = c;
};

var beginShape = function () {
    buffer.beginPath();
    pathCleared = true;
};

var vertex = function (x, y) {
    if (pathCleared) {
        buffer.moveTo(x, y);
    } else {
        buffer.lineTo(x, y);
    }
    pathCleared = false;
};

var endShape = function () {
    buffer.closePath();
    buffer.fill();
};

var rect = function (x, y, w, h) {
    buffer.fillRect(x, y, w, h);
};

var ellipse = function (x, y, w, h) {
    buffer.beginPath();
    buffer.ellipse(x, y, w / 2, h / 2, 0, 0, 2 * Math.PI);
    buffer.fill();
};

var setGradient = function (x, y, w, h, c1, c2) {
    var gradient = buffer.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, c1);
    gradient.addColorStop(1, c2);
    buffer.fillStyle = gradient;
    buffer.fillRect(x, y, w, h);
};

var hexToRGB = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

var componentToHex = function (c) {
    var hex = int(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};

var rgbToHex = function (r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

var lerp = function (a, b, n) {
    return Math.abs((b - a) * n + a);
};

var lerpColor = function (beginning, end, percent) {
    var c1 = hexToRGB(beginning);
    var c2 = hexToRGB(end);
    return rgbToHex(
        lerp(c1.r, c2.r, percent),
        lerp(c1.g, c2.g, percent),
        lerp(c1.b, c2.b, percent)
    );
};

var map = function (v, a1, b1, a2, b2) {
    return (((v - a1) / (b1 - a1)) * (b2 - a2) + a2);
};

var perlin = new ClassicalNoise();
var noise = function (x, y) {
    y = y || 0;
    return map(perlin.noise(x, y, 0), -1, 1, 0, 1);
};

var BUILDING_TOP = 0,
    BUILDING_LEFT = -1,
    BUILDING_RIGHT = 1,
    BUILDING_MAX_LEVELS = 2;

var BRANCH_ROOT = 0,
    BRANCH_LEFT = -1,
    BRANCH_RIGHT = 1,
    BRANCH_MAX_LEVELS = 3;

var time, sky, mountains;

var drawScene = function (offsetX, offsetY) {
    sky.draw();
    mountains.draw();
    stage.drawImage(buffer_canvas, offsetX, offsetY);
};

var regenScene = function () {
    width = 1280;
    height = 720;
    time = 0;
    sky = new Sky(time);
    mountains = new Mountains(height * 0.2, height * 0.8, time);
};

var redrawCanvas = function (regen) {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    if (regen) regenScene();
    var scale;
    if (canvas.width > (width / height) * canvas.height) {
        scale = canvas.width / width;
    } else {
        scale = canvas.height / height;
    }

    buffer_canvas.width = width * scale;
    buffer_canvas.height = height * scale;
    buffer.scale(2, 2);
    drawScene(
        (canvas.width - buffer_canvas.width) / 2,
        (canvas.height - buffer_canvas.height) / 2
    );
};

var transition = function () {
    if (transitioning) return;
    overlay.classList.remove("transparent");
    transitioning = true;
    setTimeout(function () {
        redrawCanvas(true);
        overlay.classList.add("transparent");
        setTimeout(function () {
            transitioning = false;
        }, 700);
    }, 700);
};

if (canvas.getContext) {
    stage = canvas.getContext("2d");
    buffer_canvas = document.createElement("canvas");
    buffer = buffer_canvas.getContext("2d");
    if (CanvasRenderingContext2D.prototype.ellipse == undefined) {
        CanvasRenderingContext2D.prototype.ellipse = function (x, y, radiusX, radiusY, rotation, startAngle, endAngle, antiClockwise) {
            this.save();
            this.translate(x, y);
            this.rotate(rotation);
            this.scale(radiusX, radiusY);
            this.arc(0, 0, 1, startAngle, endAngle, antiClockwise);
            this.restore();
        };
    }
    window.addEventListener("resize", throttle(function () { redrawCanvas() }, 200));
    canvas.addEventListener("click", function () { redrawCanvas(true) });
    redrawCanvas(true);
} else {
    console.log("canvas not supported");
    document.getElementById("header").classList.add("static");
}

