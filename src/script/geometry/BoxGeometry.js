import BufferGeometry from './BufferGeometry.js';
import BufferAttribute from './BufferAttribute.js';

class BoxGeometry extends BufferGeometry {
  constructor(width=1, height=1, depth=1) {
    super();
    this._width = width;
    this._height = height;
    this._depth = depth;
    const hw = width/2, hh = height/2, hd = depth/2;
    const vertices = new Float32Array([
      // Front face
      -hw, hh,  hd,
      -hw, -hh, hd,
      hw,  -hh, hd,
      hw,  hh,  hd,
      -hw, hh, hd,
      hw,  -hh, hd,
      // Back face
      -hw, hh,  -hd,
      hw,  -hh, -hd,
      -hw, -hh, -hd,
      hw,  hh,  -hd,
      hw,  -hh, -hd,
      -hw, hh, -hd,
      // Top face
      -hw, hh,  -hd,
      -hw, hh,  hd,
      hw,  hh,  hd,
      
      hw,  hh,  -hd,
      -hw, hh, -hd,
      hw,  hh,  hd,
      // Bottom face
      -hw, -hh, -hd,
      hw,  -hh, -hd,
      hw,  -hh, hd,
      -hw, -hh, hd,
      -hw, -hh, -hd,
      hw,  -hh, hd,
      // Right face
      hw,  -hh, -hd,
      hw,  hh,   hd,
      hw,  -hh,  hd,
      hw,  -hh, -hd,
      hw,  hh,   -hd,
      hw,  hh,   hd,
      // Left face
      -hw, -hh, -hd,
      -hw, hh,  hd,
      -hw, hh,  -hd,
      -hw, -hh, -hd,
      -hw, -hh, hd,
      -hw, hh,  hd
    ]);
    this.setAttribute('position', new BufferAttribute(vertices, 3));
    this.calculateNormals();
    this.setTextureCoordinates();
  }

  setTextureCoordinates() {
    const texCoor = new Float32Array([
      // 0.0, 0.0,
      // 0.0, 1.0,
      // 1.0, 1.0,
      // 1.0, 0.0,
      // 0.0, 0.0,
      // 1.0, 1.0,
      1.0, 1.0,
      1.0, 0.0,
      0.0, 0.0,
      0.0, 1.0,
      1.0, 1.0,
      0.0, 0.0,

      1.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 1.0,

      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.1,
      0.0, 0.1,
      1.0, 0.0,
      0.0, 1.0,

      1.0, 0.0,
      0.0, 0.0,
      0.0, 1.0,
      1.0, 1.0,
      1.0, 0.0,
      0.0, 1.0,

      1.0, 0.0,
      0.0, 1.0,
      1.0, 1.0,
      1.0, 0.0,
      0.0, 0.0,
      0.0, 1.0,

      1.0, 0.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    ]);
    const textureCoordinates = new BufferAttribute(texCoor, 2);
    this.setAttribute('textureCoord', textureCoordinates);
  }

  
  // JSON parser
  toJSON() {
    return {
      ...super.toJSON(),
      width: this._width,
      height: this._height,
      depth: this._depth,
      type: 'BoxGeometry'
    };
  }

  static fromJSON(json) {
    return new BoxGeometry(json.width, json.height, json.depth);
  }
}

export default BoxGeometry;