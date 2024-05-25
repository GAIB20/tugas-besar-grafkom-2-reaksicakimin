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
    this._verticesLength = vertices.length;
    this.calculateNormals();
    if (!this._color) {
      this.setGradientColor();
    } else {
      this.setColor();
    }
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

      1.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 1.0,

      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
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

  setGradientColor() {
    const colors = new Float32Array([
      // Front face gradient (from red to yellow)
      1.0, 0.0, 0.0,   // Top-left
      1.0, 0.0, 0.0,   // Bottom-left
      1.0, 1.0, 0.0,   // Bottom-right
      1.0, 1.0, 0.0,   // Top-right
      1.0, 0.0, 0.0,   // Top-left
      1.0, 1.0, 0.0,   // Bottom-right
      // Back face gradient (from green to cyan)
      0.0, 1.0, 0.0,   // Top-left
      0.0, 1.0, 1.0,   // Bottom-right
      0.0, 1.0, 0.0,   // Bottom-left
      0.0, 1.0, 1.0,   // Top-right
      0.0, 1.0, 1.0,   // Bottom-right
      0.0, 1.0, 0.0,   // Top-left
      // Top face gradient (from blue to magenta)
      0.0, 0.0, 1.0,   // Top-left
      0.0, 0.0, 1.0,   // Bottom-left
      1.0, 0.0, 1.0,   // Bottom-right
      1.0, 0.0, 1.0,   // Top-right
      0.0, 0.0, 1.0,   // Top-left
      1.0, 0.0, 1.0,   // Bottom-right
      // Bottom face gradient (from yellow to white)
      1.0, 1.0, 0.0,   // Bottom-left
      1.0, 1.0, 1.0,   // Bottom-right
      1.0, 1.0, 1.0,   // Top-right
      1.0, 1.0, 0.0,   // Top-left
      1.0, 1.0, 0.0,   // Bottom-left
      1.0, 1.0, 1.0,   // Top-right
      // Right face gradient (from magenta to cyan)
      1.0, 0.0, 1.0,   // Bottom-left
      0.0, 1.0, 1.0,   // Top-right
      1.0, 0.0, 1.0,   // Bottom-right
      1.0, 0.0, 1.0,   // Bottom-left
      0.0, 1.0, 1.0,   // Top-left
      0.0, 1.0, 1.0,   // Top-right
      // Left face gradient (from cyan to white)
      0.0, 1.0, 1.0,   // Top-left
      1.0, 1.0, 1.0,   // Bottom-right
      0.0, 1.0, 1.0,   // Bottom-left
      0.0, 1.0, 1.0,   // Top-right
      0.0, 1.0, 1.0,   // Bottom-right
      1.0, 1.0, 1.0    // Top-left
    ]);
    this.setAttribute('color', new BufferAttribute(colors, 3));
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