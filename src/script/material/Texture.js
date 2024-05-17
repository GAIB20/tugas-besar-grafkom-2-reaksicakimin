import BufferAttribute from "../geometry/BufferAttribute.js";

class Texture {
  constructor(image) {
    this._image = image;
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

  // Load texture from an image
  load(gl) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    const level = 0;
    const internalFormat = this.getGLConstant(gl, this._format);
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = this.getGLConstant(gl, this._format);
    const srcType = this.getGLConstant(gl, this._dtype);
    const pixel = new Uint8Array([0, 0, 255, 255]);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

    const image = new Image();
    image.src = this._image;
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

      if (this.isPowerOf2(image.width) && this.isPowerOf2(image.height)) {
        gl.generateMipmap(gl.TEXTURE_2D);
      } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.getGLConstant(gl, 'CLAMP_TO_EDGE'));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.getGLConstant(gl, 'CLAMP_TO_EDGE'));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.getGLConstant(gl, 'LINEAR'));
      }
      this._texture = texture;
    };
  }

  setTextureCoordinates(bufferGeometry) {
    const texCoor = new Float32Array([
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.1,
      0.0, 1.1,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    ]);
    const textureCoordinates = new BufferAttribute(texCoor, 2);
    bufferGeometry.setAttribute('textureCoord', textureCoordinates);
  }

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
