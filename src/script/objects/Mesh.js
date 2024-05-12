class Mesh extends Object3D {
  constructor(geometry, material) {
    super();
    this.geometry = geometry;
    this.material = material;
  }

  
  // JSON parser
  toJSON() {
    return {
      geometry: this.geometry,
      material: this.material,
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