import Object3D from "../objects/Object3D.js";

class Scene extends Object3D {
  constructor() {
    super();
    this._background = null;
  }


  // JSON parser
  toJSON() {
    return {
      background: this.background,
      ...super.toJSON(),
    };
  }

  static fromJSON(json, object=null) {
    if (!object) object = new Scene();
    object.background = json.background;
    super.fromJSON(json, object);
    
    return object;
  }
}

export default Scene;