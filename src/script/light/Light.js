import Object3D from "../objects/Object3D.js";

class Light extends Object3D {
  constructor(uniforms) {
    super();
    this._color = uniforms.color;
    this._intensity = uniforms.intensity;

    if (this.constructor.name === 'DirectionalLight') {
      this._uniforms = {
        lightColor: uniforms.color,
        lightIntensity: uniforms.intensity,
        lightPosition: uniforms.position,
        lightDirection: uniforms.direction,
      }
    } else if (this.constructor.name === 'SpotLight') {
      this._uniforms = {
        lightColor: uniforms.color,
        lightIntensity: uniforms.intensity,
        lightPosition: uniforms.position,
        lightDirection: uniforms.direction,
        lightInnerCutOff: uniforms.cutOff.inner,
        lightOuterCutOff: uniforms.cutOff.outer,
      }
    }
  }

  // Public getter
  get color() { return this._color; }
  get intensity() { return this._intensity; }
  get uniforms() { return this._uniforms; }

  // Public setter
  set color(color) { this._color = color; }
  set intensity(intensity) { this._intensity = intensity; }
  set uniforms(uniforms) { this._uniforms = uniforms; }

  // JSON parser
  toJSON() {
    return {
      color: this.color,
      intensity: this.intensity,
      uniforms: this.uniforms,
      ...super.toJSON(),
    };
  }

  // Static method
  static fromJSON(json) {
    const light = new Light();
    light.color = json.color;
    light.intensity = json.intensity;
    light.uniforms = json.uniforms;
    return light;
  }
}

export default Light;