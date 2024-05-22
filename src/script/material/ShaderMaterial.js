// TODO: not in guidebook yet, modify if necessary
class ShaderMaterial {
  // iterator for material id
  static _id = 0;

  constructor(uniforms) {
    this._fragmentShader = "";
    this._vertexShader = "";
    this._id = ShaderMaterial._id++;

    if (this.constructor.name === 'BasicMaterial') {
      this._uniforms = {
        color: uniforms.color,
      };
    } else if (this.constructor.name === 'PhongMaterial') {
      this._uniforms = {
        shininess: uniforms.shininess,
        ambient: uniforms.ambient,
        diffuse: uniforms.diffuse.color,
        specular: uniforms.specular.color,
        displacemment: uniforms.displacement,
        normal: uniforms.normal,
        environment: uniforms.environment,
        textureOption: uniforms.textureOption,
        normalMap: uniforms.normalMap,
        displacementMap: uniforms.displacementMap,
        diffuseMap: uniforms.diffuseMap,
        specularMap: uniforms.specularMap,
        environmentMap: uniforms.environmentMap,
      };
    }
  }

  // Public getter
  get fragmentShader() { return this._fragmentShader; }
  get vertexShader() { return this._vertexShader; }
  get uniforms() { return this._uniforms; }
  get id() { return this._id; }

  // Public setter
  set fragmentShader(fragmentShader) { this._fragmentShader = fragmentShader; }
  set vertexShader(vertexShader) { this._vertexShader = vertexShader; }
  set uniforms(uniforms) { this._uniforms = uniforms; }
  set id(id) { this._id = id; }

  // Check if two materials are equal
  equals(material) {
    return this.id === material.id;
  }

  // Update uniforms
  updateUniforms() {
    if (this.constructor.name === 'BasicMaterial') {
      this._uniforms = {
        color: this._color,
      }
    } else if (this.constructor.name === 'PhongMaterial') {
      this._uniforms = {
        shininess: this._shininess,
        ambient: this._ambient,
        diffuse: this._diffuse.color,
        specular: this._specular.color,
        displacemment: this._displacement,
        normal: this._normal,
        environment: this._environment,
        textureOption: this._textureOption,
        normalMap: this._normalMap,
        displacementMap: this._displacementMap,
        diffuseMap: this._diffuseMap,
        specularMap: this._specularMap,
        environmentMap: this._environmentMap,
      };
    }
  }

  
  // JSON parser
  toJSON() {
    // Note: sepertinya tidak perlu?

    // return {
    //   fragmentShader: this.fragmentShader,
    //   vertexShader: this.vertexShader,
    //   uniforms: this.uniforms,
    //   id: this.id,
    // };
  }

  static fromJSON(json) {
    // Note: sepertinya tidak perlu?

    // const material = new ShaderMaterial();
    // material.fragmentShader = json.fragmentShader;
    // material.vertexShader = json.vertexShader;
    // material.uniforms = json.uniforms;
    // material.id = json.id;

    // return material;
  }
}

export default ShaderMaterial;