import Object3D from './Object3D.js';

class Mesh extends Object3D {
  constructor(geometry, material) {
    super();
    this._geometry = geometry;
    this._material = material;
  }


  // JSON parser
  toJSON() {
    return {
      geometry: this._geometry,
      material: this._material,
      ...super.toJSON(),
    };
  }

  static fromJSON(json) {
    const mesh = new Mesh();
    mesh.geometry = json.geometry;
    mesh.material = json.material;
    super.fromJSON(json, mesh);

    return mesh;
  }
}

export default Mesh;