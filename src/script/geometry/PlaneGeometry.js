import BufferGeometry from './BufferGeometry.js';
import BufferAttribute from './BufferAttribute.js';

class PlaneGeometry extends BufferGeometry {
  constructor(width = 1, height = 1) {
    super();
    this._width = width;
    this._height = height;
    const hw = width / 2, hh = height / 2;
    const vertices = new Float32Array([
      -hw,  0,  -hh,
      hw,   0,  -hh,
      hw,   0,  hh,
      -hw,  0,  hh,
      -hw,  0,  -hh,
      hw,   0,  hh,
    ]);
    this.setAttribute('position', new BufferAttribute(vertices, 3));
    this._verticesLength = vertices.length;
    this.calculateNormals();
    this.setColor();
    this.setTextureCoordinates();
    this.calculateTangents();
  }

  setTextureCoordinates() {
    const texCoor = new Float32Array([
      1.0, 1.0,
      1.0, 0.0,
      0.0, 0.0,
      0.0, 1.0,
      1.0, 1.0,
      0.0, 0.0,
    ]);
    const textureCoordinates = new BufferAttribute(texCoor, 2);
    this.setAttribute('textureCoord', textureCoordinates);
  }


  // JSON parser
  toJSON() {
    return {
      width: this._width,
      height: this._height,
      ...super.toJSON(),
    };
  }

  static fromJSON(json) {
    return new PlaneGeometry(json.width, json.height);
  }
}

export default PlaneGeometry;