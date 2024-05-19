import ShaderMaterial from './ShaderMaterial.js';
import Vector3 from '../math/Vector3.js';
import { vertexShaderSourcePhong, fragmentShaderSourcePhong  } from '../webgl/Shaders.js';
import Texture from '../texture/Texture.js';
import Mesh from '../objects/Mesh.js';
import BumpTexture from '../texture/BumpTexture.js';
import EnvironmentTexture from '../texture/EnvironmentTexture.js';
import WebGLRenderer from '../webgl/WebGLRenderer.js';

class PhongMaterial extends ShaderMaterial {
  constructor(options={}) {
    const { 
      shininess = 32, 
      ambient = [1, 1, 1, 1], 
      diffuse = {
        color: [1, 1, 1, 1], 
        texture: null
      },
      specular = {
        color: [1, 1, 1, 1],
        texture: null
      },
      displacement = null,
      normal = null,
      textureOption = 0
    } = options;

    const sampler = displacement ? 0 : null;
    const samplerCube = displacement ? 1 : null;
    // const sampler = 0;
    // const samplerCube = 1;

    // const vertexShaderSource = texture ? vertexShaderSourcePhongTexture : vertexShaderSourcePhong;
    // const fragmentShaderSource = texture ? fragmentShaderSourcePhongTexture : fragmentShaderSourcePhong;
    const vertexShaderSource = vertexShaderSourcePhong;
    const fragmentShaderSource = fragmentShaderSourcePhong;

    super({shininess: shininess, ambient: ambient, diffuse: diffuse, specular: specular, displacement: displacement, normal: normal, textureOption: textureOption, sampler: sampler, samplerCube: samplerCube});
    this._shininess = shininess;
    this._ambient = ambient;
    this._diffuse = diffuse;
    this._specular = specular;
    this._displacement = displacement;
    this._normal = normal;
    this._textureOption = textureOption;
    this._sampler = sampler;
    this._samplerCube = samplerCube;

    this._vertexShader = vertexShaderSource;
    this._fragmentShader = fragmentShaderSource;
  }

  // Public getters
  get ambient() { return this._ambient; }
  get diffuse() { return this._diffuse; }
  get specular() { return this._specular; }
  get shininess() { return this._shininess; }
  get texture() { return this._texture; }

  // Public setters
  set ambient(ambient) { this._ambient = ambient; }
  set diffuse(diffuse) { this._diffuse = diffuse; }
  set specular(specular) { this._specular = specular; }
  set shininess(shininess) { this._shininess = shininess; }
  set texture(texture) { this._texture = texture; }

  // JSON parser
  toJSON() {
    return {
      ambient: this.ambient,
      diffuse: this.diffuse,
      specular: this.specular,
      shininess: this.shininess,
      texture: this.texture ? this.texture.toJSON() : null,
      textureOption: this._textureOption,
      type: "PhongMaterial",
      ...super.toJSON(),
    };
  }

  static fromJSON(json) {
    var texture;
    if (json.texture){
      switch (json.texture.type) {
        case "BumpTexture":
          texture = BumpTexture.fromJSON(json.texture);
          break;
        case "EnvironmentTexture":
          texture = EnvironmentTexture.fromJSON(json.texture);
          break;
        default:
          texture = null;
          console.log("Texture not found");
      }
    } else {
      texture = null;
    }
    const material = new PhongMaterial({
      shininess: json.shininess, 
      ambient: json.ambient, 
      diffuse: json.diffuse, 
      specular: json.specular, 
      texture: texture,
      textureOption: json.textureOption
    });  
    super.fromJSON(json, material);
    return material;
  }
}

export default PhongMaterial;
