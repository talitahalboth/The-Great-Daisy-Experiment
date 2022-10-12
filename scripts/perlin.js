//linear congruential generator parameters
var M = 4294967296, A = 1664525, C = 1;
//psuedo-random number generator (linear congruential)
function PSNG() {
    this.Z = Math.floor(Math.random() * M);
    this.next = function () {
        this.Z = (A * this.Z + C) % M;
        return this.Z / M - 0.5;
    };
}
//cosine interpolation
function Interpolate(pa, pb, px) {
    var ft = px * Math.PI, f = (1 - Math.cos(ft)) * 0.5;
    return pa * (1 - f) + pb * f;
}
var Perlin = /** @class */ (function () {
    function Perlin(amp, wl) {
        this.index = 0;
        this.amp = amp;
        this.wl = wl;
        this.fq = 1 / wl;
        this.psng = new PSNG();
        this.a = this.psng.next();
        this.b = this.psng.next();
        this.pos = [];
    }
    // isPositionBelowMountain(x: number, y: number) {
    //     if (this.pos.length < x) return false
    //     return this.pos[x] < y;
    // }
    Perlin.prototype.fillPos = function (width) {
        while (this.index < width) {
            if (this.index % this.wl === 0) {
                this.a = this.b;
                this.b = this.psng.next();
                this.pos.push(this.a * this.amp);
            }
            else {
                this.pos.push(Interpolate(this.a, this.b, (this.index % this.wl) / this.wl) * this.amp);
            }
            this.index++;
        }
    };
    return Perlin;
}());
//octave generator
function GenerateNoise(amp, wl, octaves, divisor, width) {
    var result = [];
    for (var i = 0; i < octaves; i++) {
        result.push(new Perlin(amp, wl));
        amp /= divisor;
        wl /= divisor;
    }
    return result;
}
//combines octaves together
function CombineNoise(pl) {
    var result = { pos: [] };
    if (!pl[0].pos)
        return result;
    for (var i = 0, total = 0, j = 0; i < pl[0].pos.length; i++) {
        total = 0;
        for (j = 0; j < pl.length; j++) {
            total += pl[j].pos[i];
        }
        result.pos.push(total);
    }
    return result;
}
