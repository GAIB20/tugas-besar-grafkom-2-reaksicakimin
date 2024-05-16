import ShaderMaterial from './ShaderMaterial.js';
import Vector3 from '../math/Vector3.js';
// TODO: not in guidebook yet, modify if necessary
class PhongMaterial extends ShaderMaterial {
  constructor() {
    super();
    this._shininess = 32,
    this._lightPosition = new Vector3(20,100,300),
    this._ambient = [1, 1, 1, 1],
    this._diffuse = [1, 1, 1, 1],
    this._specular = [1,1, 1, 1];
    this._uniforms = {
      
      shininess: this._shininess,
      lightPosition: this._lightPosition,
      ambient: this._ambient,
      diffuse: this._diffuse,
      specular: this._specular,
    };
  }

  // Public getters
  get ambient() { return this._ambient; }
  get diffuse() { return this._diffuse; }
  get specular() { return this._specular; }
  get shininess() { return this._shininess; }
  get lightPosition() { return this._lightPosition; }

  // Public setters
  set ambient(ambient) { this._ambient = ambient; }
  set diffuse(diffuse) { this._diffuse = diffuse; }
  set specular(specular) { this._specular = specular; }
  set shininess(shininess) { this._shininess = shininess; }
  set lightPosition(lightPosition) { this._lightPosition = lightPosition; }


  // JSON parser
  toJSON() {
    return {
      ambient: this.ambient,
      diffuse: this.diffuse,
      specular: this.specular,
      shininess: this.shininess,
      ...super.toJSON(),
    };
  }

  static fromJSON(json) {
    const material = new PhongMaterial();
    material.ambient = json.ambient;
    material.diffuse = json.diffuse;
    material.specular = json.specular;
    material.shininess = json.shininess;
    super.fromJSON(json, material);

    return material;
  }
}

export default PhongMaterial;