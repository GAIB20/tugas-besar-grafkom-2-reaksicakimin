import Object3D from "../objects/Object3D.js";

class Light extends Object3D {
  constructor(uniforms) {
    super();
    this._color = uniforms.color;
    this._intensity = uniforms.intensity;
    if (this.constructor.name === 'DirectionalLight') {
      this._uniforms = {
        lightPosition: uniforms.position,
        lightColor: uniforms.color,
        lightIntensity: uniforms.intensity,
        useSpotLight: false,
        useDirLight: true,
      }
    }
    
    else if (this.constructor.name === 'SpotLight') {
      this._uniforms = {
        spotLightPosition: uniforms.position,
        spotLightColor: uniforms.color,
        spotLightIntensity: uniforms.intensity,
        spotLightTarget: uniforms.target,
        spotLightInnerCutOff: uniforms.cutOff.inner,
        spotLightOuterCutOff: uniforms.cutOff.outer,
        useSpotLight: true,
        useDirLight: false,
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

// Update uniforms
  updateUniforms() {
    if (this.constructor.name === 'DirectionalLight') {
      this._uniforms = {
        lightPosition: this._position,
        lightColor: this._color,
        lightIntensity: this._intensity,
        useSpotLight: false,
        useDirLight: true,
      }
    }
    
    else if (this.constructor.name === 'SpotLight') {
      this._uniforms = {
        spotLightPosition: this._position,
        spotLightColor: this._color,
        spotLightIntensity: this._intensity,
        spotLightTarget: this._target,
        spotLightInnerCutOff: this._cutOff.inner,
        spotLightOuterCutOff: this._cutOff.outer,
        useSpotLight: true,
        useDirLight: false,
      }
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