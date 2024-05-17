import Object3D from './Object3D.js';
import BoxGeometry from '../geometry/BoxGeometry.js';
import PhongMaterial from '../material/PhongMaterial.js';

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
    mesh._geometry = new BoxGeometry(1, 1, 1); // TODO: sesuaikan dengan geometry yang ada
    mesh._material = new PhongMaterial([255,255,255,1]); // TODO: sesuaikan dengan material yang ada
    super.fromJSON(json, mesh);
    if (json && json.children) {
      json.children.map((child) => {
        const meshchild = Mesh.fromJSON(child);
        mesh.add(meshchild);
      });
    }
    return mesh;
  }
}

export default Mesh;