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

    toJSON() {
        return {
            position: this.position.toJSON(),
            rotation: this.rotation.toJSON(),
            scale: this.scale.toJSON()
        };
    }
}