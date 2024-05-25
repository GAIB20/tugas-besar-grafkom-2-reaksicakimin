import Object3D from "../objects/Object3D.js";

class Light extends Object3D {
  constructor(uniforms) {
    super();
    this._color = uniforms.color;
    this._intensity = uniforms.intensity;

    this._uniforms = {
      lightPosition: uniforms.position,
      lightColor: uniforms.color,
      lightIntensity: uniforms.intensity,
    }

    if (this.constructor.name === 'SpotLight') {
      this._uniforms.lightTarget = uniforms.target;
      this._uniforms.lightInnerCutOff = uniforms.cutOff.inner;
      this._uniforms.lightOuterCutOff = uniforms.cutOff.outer;
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

// Update uniforms
  updateUniforms() {
    this._uniforms = {
      lightPosition: this._position,
      lightColor: this._color,
      lightIntensity: this._intensity,
    }

    if (this.constructor.name === 'SpotLight') {
      this._uniforms.lightTarget = this._target;
      this._uniforms.lightInnerCutOff = this._cutOff.inner;
      this._uniforms.lightOuterCutOff = this._cutOff.outer;
    }
  }

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