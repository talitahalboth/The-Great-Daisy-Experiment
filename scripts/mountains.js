var MountainRange = /** @class */ (function () {
    function MountainRange(props) {
        var range = props.range, height = props.height, daisies = props.daisies, color = props.color;
        this.range = range;
        this.height = height;
        this.daisies = daisies;
        this.color = color;
    }
    MountainRange.prototype.updateMountains = function (h) {
        this.range.forEach(function (noise) { return noise.fillPos(w); });
        if (this.height === 0) {
            this.height = h;
        }
    };
    MountainRange.prototype.drawDaisies = function () {
        this.daisies.forEach(function (figure) {
            figure.draw(ctx);
        });
    };
    MountainRange.prototype.drawMountain = function () {
        var _a;
        var combinedNoise = CombineNoise(this.range);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, (_a = this.height + combinedNoise.pos[0]) !== null && _a !== void 0 ? _a : this.height);
        for (var i = 0; i < combinedNoise.pos.length; i++) {
            ctx.lineTo(i, this.height + combinedNoise.pos[i]);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.stroke();
        ctx.closePath();
        ctx.fill();
    };
    return MountainRange;
}());
