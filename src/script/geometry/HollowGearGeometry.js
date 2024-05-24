import BufferGeometry from './BufferGeometry.js';
import BufferAttribute from './BufferAttribute.js';

function rotateY(vertices, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const z = vertices[i + 2];
      vertices[i] = x * cos - z * sin;
      vertices[i + 2] = x * sin + z * cos;
  }
}

function createInitialBlock(hw, hh, hd) {
  return new Float32Array([
      // Front face
      -hw * 2, hh * 2, hd * 2,
      -hw * 2, -hh * 2, hd * 2,
      -hw, -hh * 2, hd * 2,
      -hw, hh * 2, hd * 2,
      -hw * 2, hh * 2, hd * 2,
      -hw, -hh * 2, hd * 2,

      // Back face
      -hw * 2, hh * 2, hd,
      -hw, -hh * 2, hd,
      -hw * 2, -hh * 2, hd,
      -hw, hh * 2, hd,
      -hw, -hh * 2, hd,
      -hw * 2, hh * 2, hd,

      // Top face
      -hw * 2, hh * 2, hd,
      -hw * 2, hh * 2, hd * 2,
      -hw, hh * 2, hd * 2,
      -hw, hh * 2, hd,
      -hw * 2, hh * 2, hd,
      -hw, hh * 2, hd * 2,

      // Bottom face
      -hw * 2, -hh * 2, hd,
      -hw, -hh * 2, hd,
      -hw, -hh * 2, hd * 2,
      -hw * 2, -hh * 2, hd * 2,
      -hw * 2, -hh * 2, hd,
      -hw, -hh * 2, hd * 2,

      // Right face
      -hw, -hh * 2, hd,
      -hw, hh * 2, hd * 2,
      -hw, -hh * 2, hd * 2,
      -hw, -hh * 2, hd,
      -hw, hh * 2, hd,
      -hw, hh * 2, hd * 2,

      // Left face
      -hw * 2, -hh * 2, hd,
      -hw * 2, hh * 2, hd * 2,
      -hw * 2, hh * 2, hd,
      -hw * 2, -hh * 2, hd,
      -hw * 2, -hh * 2, hd * 2,
      -hw * 2, hh * 2, hd * 2,

      // ATASSSS
      //front
      -hw, hh*2, hd*2,
      -hw, hh, hd*2,
      hw,  hh, hd*2,
      hw,  hh*2,  hd*2,
      -hw, hh*2, hd*2,
      hw,  hh, hd*2,

       // Back face
       -hw, hh*2, hd,
       hw,  hh, hd,
       -hw, hh, hd,
       hw,  hh*2, hd,
       hw,  hh, hd,
       -hw, hh*2, hd,

       // Top face
      -hw, hh*2,  hd,
      -hw, hh*2,  hd*2,
      hw,  hh*2,  hd*2,
      hw,  hh*2,  hd,
      -hw, hh*2,  hd,
      hw,  hh*2,  hd*2,

      // Bottom face
      -hw, hh, hd,
      hw,  hh, hd,
      hw,  hh, hd*2,
      -hw, hh, hd*2,
      -hw, hh, hd,
      hw,  hh, hd*2,

      // BAWAHHH
      //front
      -hw, -hh, hd*2,
      -hw, -hh*2, hd*2,
      hw,  -hh*2, hd*2,
      hw,  -hh,  hd*2,
      -hw, -hh, hd*2,
      hw,  -hh*2, hd*2,

       // Back face
       -hw, -hh, hd,
       hw,  -hh*2, hd,
       -hw, -hh*2, hd,
       hw,  -hh, hd,
       hw,  -hh*2, hd,
       -hw, -hh, hd,

       // Top face
      -hw, -hh,  hd,
      -hw, -hh,  hd*2,
      hw,  -hh,  hd*2,
      hw,  -hh,  hd,
      -hw, -hh,  hd,
      hw,  -hh,  hd*2,

      // Bottom face
      -hw, -hh*2, hd,
      hw,  -hh*2, hd,
      hw,  -hh*2, hd*2,
      -hw, -hh*2, hd*2,
      -hw, -hh*2, hd,
      hw,  -hh*2, hd*2,
  ]);
}


class HollowGearGeometry extends BufferGeometry {
  constructor(width = 1, height = 1, depth = 1) {
    super();
    this._width = width;
    this._height = height;
    this._depth = depth;
    
    const hw = width / 4, hh = height / 4, hd = depth / 4;
    const angle = (2 * Math.PI) / 16;

    let vertices = [];

    for (let i = 0; i < 16; i++) {
        const blockVertices = createInitialBlock(hw, hh, hd);
        rotateY(blockVertices, i * angle);
        vertices = vertices.concat(Array.from(blockVertices));
    }

    this.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));
    this.calculateNormals();
}

  
  // JSON parser
  toJSON() {
    return {
      ...super.toJSON(),
      width: this._width,
      height: this._height,
      depth: this._depth,
      type: 'HollowGearGeometry'
    };
  }

  static fromJSON(json) {
    return new HollowGearGeometry(json.width, json.height, json.depth);
  }
}

export default HollowGearGeometry;