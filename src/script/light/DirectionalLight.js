import Light from "./Light.js";
import Vector3 from "../math/Vector3.js";

class DirectionalLight extends Light {
  constructor(position = new Vector3(20, 100, 300), color = [1, 1, 1, 1], intensity = 1.0, direction = new Vector3(20, 100, 300)) {
    super({
      color: color,
      intensity: intensity,
    });

    this._direction = direction;
    this._position = position;
  }

  // Public getter
  get direction() { return this._direction; }

  // Public setter
  set direction(direction) { this._direction = direction; }

  // JSON parser
  toJSON() {
    return {
      direction: this.direction,
      ...super.toJSON(),
    };
  }

  // Static method
  static fromJSON(json) {
    const light = new DirectionalLight();
    light.direction = json.direction;
    return light;
  }
}

export default DirectionalLight;