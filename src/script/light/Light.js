import Object3D from "../objects/Object3D.js";

class Light extends Object3D {
  constructor(color, intensity) {
    super();
    this._color = color;
    this._intensity = intensity;
  }

  // Public getter
  get color() { return this._color; }
  get intensity() { return this._intensity; }

  // Public setter
  set color(color) { this._color = color; }
  set intensity(intensity) { this._intensity = intensity; }

  // JSON parser
  toJSON() {
    return {
      color: this.color,
      ...super.toJSON(),
    };
  }

  // Static method
  static fromJSON(json) {
    const light = new Light();
    light.color = json.color;
    return light;
  }
}

export default Light;