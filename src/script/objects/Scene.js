class Scene extends Object3D {
  constructor() {
    super();
    this._background = null;
  }


  // JSON parser
  toJSON() {
    return {
      ...super.toJSON(),
      background: this.background,
    };
  }

  static fromJSON(json, object=null) {
    if (!object) object = new Scene();
    object.background = json.background;
    super.fromJSON(json, object);
    
    return object;
  }
}