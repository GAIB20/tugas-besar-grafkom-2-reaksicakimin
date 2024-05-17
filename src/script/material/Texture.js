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
    };
    
    this._texture = texture;
  }

  loadEnvironment(gl, environment){
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

    const faces = [
      gl.TEXTURE_CUBE_MAP_POSITIVE_X,
      gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
      gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
      gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
      gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
      gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
    ];

    for (let i = 0; i < faces.length; i++) {
      const face = faces[i];
      const level = 0;
      const internalFormat = gl.RGBA;
      const width = environment[i].width;
      const height = environment[i].height;
      const border = 0;
      const srcFormat = gl.RGBA;
      const srcType = gl.UNSIGNED_BYTE;
      const pixel = new Uint8Array([255, 0, 255, 255]);
      gl.texImage2D(face, level, internalFormat, width, height, border, srcFormat, srcType, null);

      const image = new Image();
      image.src = environment[i].src;
      image.onload = () => {
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        gl.texImage2D(face, level, internalFormat, srcFormat, srcType, image);

        if (this.isPowerOf2(image.width) && this.isPowerOf2(image.height)) {
          gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        } else {
          gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
      };
    }
    this._texture = texture;
  }

  // JSON parser
  toJSON() {
    return {
      image: this._image,
    };
  }

  static fromJSON(json) {
    const texture = new Texture(json.image);
    return texture;
  }
}

export default Texture;
