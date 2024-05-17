import Object3D from './Object3D.js';
import BoxGeometry from '../geometry/BoxGeometry.js';
import HollowBoxGeometry from '../geometry/HollowBoxGeometry.js';
import PhongMaterial from '../material/PhongMaterial.js';
import BasicMaterial from '../material/BasicMaterial.js';

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
    var geometry;
    switch (json.geometry.type) {
      case "BoxGeometry":
        geometry = BoxGeometry.fromJSON(json.geometry);
        break;
      case "HollowBoxGeometry":
        geometry = HollowBoxGeometry.fromJSON(json.geometry);
        break;
      case "PlaneGeometry":
        geometry = PlaneGeometry.fromJSON(json.geometry);
        break;
      default:
        console.log("Geometry not found");
    }
    var material;
    switch (json.material.type) {
      case "PhongMaterial":
        material = PhongMaterial.fromJSON(json.material);
        break;
      case "BasicMaterial":
        material = BasicMaterial.fromJSON(json.material);
        break;
      default:
        console.log("Material not found");
    }

    const mesh = new Mesh(geometry, material);
    super.fromJSON(json, mesh);
    if (json && json.children) {
      json.children.map((child) => {
        const meshchild = Mesh.fromJSON(child);
        mesh.add(meshchild);
      });
    }
    console.log("Mesh: ", mesh);
    return mesh;
  }
}

export default Mesh;