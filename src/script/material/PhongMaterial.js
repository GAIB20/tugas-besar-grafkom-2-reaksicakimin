import ShaderMaterial from './ShaderMaterial.js';

// TODO: not in guidebook yet, modify if necessary
class PhongMaterial extends ShaderMaterial {
  constructor() {
    super();
    this._ambient = [255,255, 255, 1],
    this._diffuse = [255,255, 255, 1],
    this._specular = [255,255, 255, 1],
    this._shininess = 32;
  }

  // Public getters
  get ambient() { return this._ambient; }
  get diffuse() { return this._diffuse; }
  get specular() { return this._specular; }
  get shininess() { return this._shininess; }

  // Public setters
  set ambient(ambient) { this._ambient = ambient; }
  set diffuse(diffuse) { this._diffuse = diffuse; }
  set specular(specular) { this._specular = specular; }
  set shininess(shininess) { this._shininess = shininess; }


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