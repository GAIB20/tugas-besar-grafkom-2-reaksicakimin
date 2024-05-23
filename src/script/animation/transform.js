import Vector3 from "../math/Vector3.js";

export class Transform {
    constructor(
        position = new Vector3(),
        rotation = new Vector3(),
        scale = new Vector3(1, 1, 1)
    ) {
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
}