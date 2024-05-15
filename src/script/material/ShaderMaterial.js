// TODO: not in guidebook yet, modify if necessary
import { vertexShaderSource, fragmentShaderSource } from "../webgl/Shaders.js";

class ShaderMaterial {
  constructor(colors) {
    this._fragmentShader = fragmentShaderSource;
    this._vertexShader = vertexShaderSource;
    this._uniforms = {
      color: colors || [255, 255, 255, 1],
    };
    this._id = 1;
  }

  // Public getter
  get fragmentShader() { return this._fragmentShader; }
  get vertexShader() { return this._vertexShader; }
  get uniforms() { return this._uniforms; }
  get id() { return this._id; }

  // Public setter
  set fragmentShader(fragmentShader) { this._fragmentShader = fragmentShader; }
  set vertexShader(vertexShader) { this._vertexShader = vertexShader; }
  set uniforms(uniforms) { this._uniforms = uniforms; }
  set id(id) { this._id = id; }

  // Check if two materials are equal
  equals(material) {
    return this.id === material.id;
  }

  
  // JSON parser
  toJSON() {
    return {
      fragmentShader: this.fragmentShader,
      vertexShader: this.vertexShader,
      uniforms: this.uniforms,
      id: this.id,
    };
  }

  static fromJSON(json) {
    const material = new ShaderMaterial();
    material.fragmentShader = json.fragmentShader;
    material.vertexShader = json.vertexShader;
    material.uniforms = json.uniforms;
    material.id = json.id;

    return material;
  }
}

export default ShaderMaterial;