import ShaderMaterial from './ShaderMaterial.js';
import { vertexShaderSourceBasic, fragmentShaderSourceBasic } from "../webgl/Shaders.js";

// TODO: not in guidebook yet, modify if necessary
class BasicMaterial extends ShaderMaterial {
  constructor(colors=[1, 1, 1, 1]) {
    super({color: colors});
    this._color = colors;
    
    this._texture = null;
    this._vertexShader = vertexShaderSourceBasic;
    this._fragmentShader = fragmentShaderSourceBasic;
  }

  // Public getter
  get color() { return this._color; }

  // Public setter
  set color(color) { this._color = color; }


  // JSON parser
  toJSON() {
    return {
      color: this.color,
      texture: this._texture,
      type: "BasicMaterial",
      ...super.toJSON(),
    };
  }

  static fromJSON(json) {
    const material = new BasicMaterial(json.color);
    material._color = json.color;
    material._texture = json.texture;
    super.fromJSON(json, material);

    return material;
  }
}

export default BasicMaterial;