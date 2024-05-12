// TODO: not in guidebook yet, modify if necessary
class Texture {
  constructor(image) {
    this._image = image;
    this._wrapS = WebGLRenderingContext.REPEAT;
    this._wrapT = WebGLRenderingContext.REPEAT;
    this._magFilter = WebGLRenderingContext.LINEAR;
    this._minFilter = WebGLRenderingContext.LINEAR;
    this._format = WebGLRenderingContext.RGBA;
    this._dtype = WebGLRenderingContext.UNSIGNED_BYTE;
    this._generateMipmaps = true;
  }

  // Public getter
  get image() { return this._image; }
  get wrapS() { return this._wrapS; }
  get wrapT() { return this._wrapT; }
  get magFilter() { return this._magFilter; }
  get minFilter() { return this._minFilter; }
  get format() { return this._format; }
  get dtype() { return this._dtype; }
  get generateMipmaps() { return this._generateMipmaps; }

  // Public setter
  set image(image) { this._image = image;}
  set wrapS(wrapS) { this._wrapS = wrapS; }
  set wrapT(wrapT) { this._wrapT = wrapT; }
  set magFilter(magFilter) { this._magFilter = magFilter; }
  set minFilter(minFilter) { this._minFilter = minFilter; }
  set format(format) { this._format = format; }
  set dtype(dtype) { this._dtype = dtype; }
  set generateMipmaps(generateMipmaps) { this._generateMipmaps = generateMipmaps; }


  // JSON parser
  toJSON() {
    return {
      image: this.image,
      wrapS: this.wrapS,
      wrapT: this.wrapT,
      magFilter: this.magFilter,
      minFilter: this.minFilter,
      format: this.format,
      dtype: this.dtype,
      generateMipmaps: this.generateMipmaps,
    };
  }

  static fromJSON(json) {
    const texture = new Texture(json.image);
    texture.wrapS = json.wrapS;
    texture.wrapT = json.wrapT;
    texture.magFilter = json.magFilter;
    texture.minFilter = json.minFilter;
    texture.format = json.format;
    texture.dtype = json.dtype;
    texture.generateMipmaps = json.generateMipmaps;

    return texture;
  }
}

export default Texture;