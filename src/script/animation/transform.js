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

    static fromJSON(json) {
        return new Transform(
            Vector3.fromJSON(json.position),
            Vector3.fromJSON(json.rotation),
            Vector3.fromJSON(json.scale)
        );
    }

    static toJSON(transform) {
        return {
            position: Vector3.toJSON(transform.position),
            rotation: Vector3.toJSON(transform.rotation),
            scale: Vector3.toJSON(transform.scale)
        };
    }
}