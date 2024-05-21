import Texture from "./Texture.js";

class EnvironmentTexture extends Texture {
  constructor(environment) {
    super();
    this._environment = environment;

    // this.load(gl);
  }

  load(gl) {
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
      const width = this._environment[i].width;
      const height = this._environment[i].height;
      const border = 0;
      const srcFormat = gl.RGBA;
      const srcType = gl.UNSIGNED_BYTE;
      const pixel = new Uint8Array([255, 0, 255, 255]);
      gl.texImage2D(face, level, internalFormat, width, height, border, srcFormat, srcType, null);

      const image = new Image();
      image.src = this._environment[i].src;
      image.onload = () => {
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        gl.texImage2D(face, level, internalFormat, srcFormat, srcType, image);

        if (this.isPowerOf2(image.width) && this.isPowerOf2(image.height)) {
          gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        } else {
          gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, this.getGLConstant(gl, 'CLAMP_TO_EDGE'));
          gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, this.getGLConstant(gl, 'CLAMP_TO_EDGE'));
          gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, this.getGLConstant(gl, 'LINEAR'));
        }
      };
    }
    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    this._texture = texture;
  }

  toJSON() {
    return {
      environment: this._environment,
      type: "EnvironmentTexture",
    };
  }

  static fromJSON(json) {
    return new EnvironmentTexture(json.environment);
  }
}

export default EnvironmentTexture;
