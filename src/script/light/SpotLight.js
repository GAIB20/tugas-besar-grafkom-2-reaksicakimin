import Light from "./Light.js";
import Vector3 from "../math/Vector3.js";

class SpotLight extends Light {
  constructor(options = {}) {
    const {
      position = new Vector3(0, 0, 0),
      color = [1, 1, 1, 1],
      intensity = 0.5,
      direction = new Vector3(0, 0, 0),
      cuttOff = {
        inner: 0.5,
        outer: 0.75
      }
    } = options;

    super({color: color, intensity: intensity, position: position, direction: direction, cuttOff: cuttOff});
    this._direction = direction;
    this._cutOff = {
      inner: cuttOff.inner,
      outer: cuttOff.outer
    };

    this._position = position;
  }

  // Public getter
  get direction() { return this._direction; }
  get cutOff() { return this._cutOff; }

  // Public setter
  set direction(direction) { this._direction = direction; }
  set cutOff(cuttOff) { this._cutOff = cuttOff; }

  // JSON parser
  toJSON() {
    return {
      direction: this.direction,
      cuttOff: this.cutOff,
      ...super.toJSON(),
    };
  }

  // Static method
  static fromJSON(json) {
    const light = new DirectionalLight();
    light.direction = json.direction;
    light.cutOff = json.cutOff;
    return light;
  }
}

export default SpotLight;