import { PerspectiveValues } from "./utils";

export function reverseRotateX(x2d: number, y2d: number, values: PerspectiveValues) {

    const { fov, viewDist, w, h, angle } = values

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

export function rotateX(x: number, y: number, values: PerspectiveValues) {

    const { fov, viewDist, w, h, angle } = values

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
    return [x2d, y2d];
}

