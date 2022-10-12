var Figure = /** @class */ (function () {
    function Figure(newX, newY, scale, img) {
        var randomScale = Math.random();
        // var imgIndex = getRandomInt(imagesArray.length)
        this.img = img;
        var size = initialSize;
        size = size * scale;
        // slightly increase the size randomly
        size += size * randomScale / 5;
        var y = newY - Math.floor((size * img.height / img.width) / 2);
        var x = newX - Math.floor((size) / 2);
        var color = "white";
        var w = Math.floor(size * img.width / img.width);
        var h = Math.floor(size * img.height / img.width);
        this.properties = {
            x: x,
            y: y,
            w: w,
            h: h
        };
    }
    Figure.prototype.draw = function (ctx) {
        ctx.drawImage(this.img, Math.floor(this.properties.x), Math.floor(this.properties.y), Math.floor(this.properties.w), Math.floor(this.properties.h));
    };
    return Figure;
}());
