import Texture from "./Texture.js";

class NormalTexture extends Texture {
  constructor(images) {
    super();
    this._images = images;
    this._normalTexture = null;
    this._bumpTexture = null;
    this._diffuseTexture = null;
    this._specularTexture = null;
    
  }

  load(gl) {
    this.loadNormal(gl);
    this.loadbump(gl);
    this.loaddiffuse(gl);
    this.loadspecular(gl);
  }

  loadNormal(gl){
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
    image.src = this._images[0];
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
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    this._normalTexture = texture;
  }

  loadbump(gl){
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
    image.src = this._images[1];
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
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    this._bumpTexture = texture;
  }

  loaddiffuse(gl){
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
    image.src = this._images[2];
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
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    this._diffuseTexture = texture;
  }

  loadspecular(gl){
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
    image.src = this._images[3];
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
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    this._specularTexture = texture;
  }

  toJSON() {
    return {
      image: this._image,
      type: "BumpTexture",
    };
  }

  static fromJSON(json) {
    return new BumpTexture(json.image);
  }
}

export default NormalTexture;
