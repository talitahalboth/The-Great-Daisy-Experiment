class MountainRange {
    range: Perlin[]
    height: number
    daisies: Figure[]
    color: string
    constructor(props: { range: Perlin[], height: number, daisies: Figure[], color: string }) {
        const { range, height, daisies, color } = props
        this.range = range
        this.height = height
        this.daisies = daisies
        this.color = color

    }

    updateMountains(h: number) {
        this.range.forEach((noise) => noise.fillPos(w))
        if (this.height === 0) {
            this.height = h
        }
    }

    drawDaisies() {
        this.daisies.forEach((figure) => {
            figure.draw(ctx)
        })
    }

    drawMountain() {

        const combinedNoise = CombineNoise(this.range)
        ctx.fillStyle = this.color
        ctx.strokeStyle = this.color
        ctx.beginPath()
        ctx.moveTo(0, this.height + combinedNoise.pos[0] ?? this.height);
        for (var i = 0; i < combinedNoise.pos.length; i++) {
            ctx.lineTo(i, this.height + combinedNoise.pos[i]);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.stroke();
        ctx.closePath();
        ctx.fill();

    }
}