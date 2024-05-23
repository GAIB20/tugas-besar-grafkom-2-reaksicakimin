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

    clone() {
        return new Transform(this.position.clone(), this.rotation.clone(), this.scale.clone());
    }

    interpolateTo(targetTransform, alpha) {
        this.position.add(targetTransform.position.clone().subtract(this.position.clone()).multiplyScalar(alpha)),
        this.rotation.add(targetTransform.rotation.clone().subtract(this.rotation.clone()).multiplyScalar(alpha)),
        this.scale.add(targetTransform.scale.clone().subtract(this.scale.clone()).multiplyScalar(alpha))
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