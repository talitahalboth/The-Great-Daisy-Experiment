export function reverseRotateX(x2d: number, y2d: number, fov: number, viewDist: number, w: number, h: number, angle: number, grid: any) {
    let rd, ca, sa, ry, rz, f;

    rd = angle * Math.PI / 180; /// convert angle into radians
    ca = Math.cos(rd);
    sa = Math.sin(rd);

    const numerator = viewDist * (y2d - h)
    const denominator = ca * fov + sa * (h - y2d)

    const y = numerator / denominator

    ry = y * ca; /// convert y value as we are rotating
    rz = y * sa; /// only around x. Z will also change

    /// Project the new coords into screen coords
    f = fov / (viewDist + rz);

    const x = (x2d - w) / f


    return [x, y];

}

export function rotateX(x: number, y: number, fov: number, viewDist: number, w: number, h: number, angle: number, grid: any) {

    let rd, ca, sa, ry, rz, f;

    rd = angle * Math.PI / 180; /// convert angle into radians
    ca = Math.cos(rd);
    sa = Math.sin(rd);

    ry = y * ca; /// convert y value as we are rotating
    rz = y * sa; /// only around x. Z will also change

    /// Project the new coords into screen coords
    f = fov / (viewDist + rz);
    const x2d = x * f + w;
    const y2d = ry * f + h;
    // var rev = reverseRotateX(x2d, y2d)
    // if ((Math.round(rev[0]) !== x || Math.round(rev[1]) !== y)) {

    //     console.log("-------------")
    //     console.log(x, y)
    //     console.log(Math.round(rev[0]), Math.round(rev[1]))
    //     console.log(x2d, y2d)
    // }
    return [x2d, y2d];
}

