class Texture {
  constructor() {
    this._wrapS = 'REPEAT';
    this._wrapT = 'REPEAT';
    this._magFilter = 'LINEAR';
    this._minFilter = 'LINEAR';
    this._format = 'RGBA';
    this._dtype = 'UNSIGNED_BYTE';
    this._generateMipmaps = true;
    this._texture = null;
  }

  isPowerOf2(value) {
    return (value & (value - 1)) === 0;
  }

  getGLConstant(gl, constant) {
    return gl[constant];
  }

  // JSON parser
  toJSON() {
    return {};
  }

  static fromJSON(json) {
    return new Texture();
  }
}

export default Texture;