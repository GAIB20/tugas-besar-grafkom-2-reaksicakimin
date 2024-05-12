import ShaderMaterial from './ShaderMaterial.js';

// TODO: not in guidebook yet, modify if necessary
class BasicMaterial extends ShaderMaterial {
  constructor() {
    super();
    this._color = [1, 1, 1, 1]
  }

  // Public getter
  get color() { return this._color; }

  // Public setter
  set color(color) { this._color = color; }


  // JSON parser
  toJSON() {
    return {
      color: this.color,
      ...super.toJSON(),
    };
  }

  static fromJSON(json) {
    const material = new BasicMaterial();
    material.color = json.color;
    super.fromJSON(json, material);

    return material;
  }
}

export default BasicMaterial;