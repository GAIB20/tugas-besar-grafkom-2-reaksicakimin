import Texture from "./Texture.js";

class BumpTexture extends Texture {
  constructor(gl, image) {
    super();
    this._image = image;

    this.load(gl);
  }

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

  toJSON() {
    return {
      image: this._image,
    };
  }

  static fromJSON(json) {
    return new BumpTexture(json.image);
  }
}

export default BumpTexture;
