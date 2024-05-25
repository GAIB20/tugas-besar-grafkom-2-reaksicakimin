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
      // ATASSSS
      //front
      -hw*4.5, hh*2, hd*2,
      -hw*4.5, hh, hd*2,
      hw*4.5,  hh, hd*2,
      hw*4.5,  hh*2,  hd*2,
      -hw*4.5, hh*2, hd*2,
      hw*4.5,  hh, hd*2,

       // Back face
       -hw*4.5, hh*2, hd,
       hw*4.5,  hh, hd,
       -hw*4.5, hh, hd,
       hw*4.5,  hh*2, hd,
       hw*4.5,  hh, hd,
       -hw*4.5, hh*2, hd,

       // Top face
      -hw*4.5, hh*2,  hd,
      -hw*4.5, hh*2,  hd*2,
      hw*4.5,  hh*2,  hd*2,
      hw*4.5,  hh*2,  hd,
      -hw*4.5, hh*2,  hd,
      hw*4.5,  hh*2,  hd*2,

      // Bottom face
      -hw*4.5, hh, hd,
      hw*4.5,  hh, hd,
      hw*4.5,  hh, hd*2,
      -hw*4.5, hh, hd*2,
      -hw*4.5, hh, hd,
      hw*4.5,  hh, hd*2,

      // BAWAHHH
      //front
      -hw*4.5, -hh, hd*2,
      -hw*4.5, -hh*2, hd*2,
      hw*4.5,  -hh*2, hd*2,
      hw*4.5,  -hh,  hd*2,
      -hw*4.5, -hh, hd*2,
      hw*4.5,  -hh*2, hd*2,

       // Back face
       -hw*4.5, -hh, hd,
       hw*4.5,  -hh*2, hd,
       -hw*4.5, -hh*2, hd,
       hw*4.5,  -hh, hd,
       hw*4.5,  -hh*2, hd,
       -hw*4.5, -hh, hd,

       // Top face
      -hw*4.5, -hh,  hd,
      -hw*4.5, -hh,  hd*2,
      hw*4.5,  -hh,  hd*2,
      hw*4.5,  -hh,  hd,
      -hw*4.5, -hh,  hd,
      hw*4.5,  -hh,  hd*2,

      // Bottom face
      -hw*4.5, -hh*2, hd,
      hw*4.5,  -hh*2, hd,
      hw*4.5,  -hh*2, hd*2,
      -hw*4.5, -hh*2, hd*2,
      -hw*4.5, -hh*2, hd,
      hw*4.5,  -hh*2, hd*2,

      // Penutup bintang
        // Front face
      -hw * 6, hh * 2, hd * 2,
      -hw * 6, -hh * 2, hd * 2,
      -hw, -hh * 2, hd * 2,
      -hw, hh * 2, hd * 2,
      -hw * 6, hh * 2, hd * 2,
      -hw, -hh * 2, hd * 2,

      // Back face
      -hw * 6, hh * 2, hd,
      -hw, -hh * 2, hd,
      -hw * 6, -hh * 2, hd,
      -hw, hh * 2, hd,
      -hw, -hh * 2, hd,
      -hw * 6, hh * 2, hd,

      // Top face
      -hw * 6, hh * 2, hd,
      -hw * 6, hh * 2, hd * 2,
      -hw, hh * 2, hd * 2,
      -hw, hh * 2, hd,
      -hw * 6, hh * 2, hd,
      -hw, hh * 2, hd * 2,

      // Bottom face
      -hw * 6, -hh * 2, hd,
      -hw, -hh * 2, hd,
      -hw, -hh * 2, hd * 2,
      -hw * 6, -hh * 2, hd * 2,
      -hw * 6, -hh * 2, hd,
      -hw, -hh * 2, hd * 2,

      // Right face
      -hw, -hh * 2, hd,
      -hw, hh * 2, hd * 2,
      -hw, -hh * 2, hd * 2,
      -hw, -hh * 2, hd,
      -hw, hh * 2, hd,
      -hw, hh * 2, hd * 2,

      // Left face
      -hw * 6, -hh * 2, hd,
      -hw * 6, hh * 2, hd * 2,
      -hw * 6, hh * 2, hd,
      -hw * 6, -hh * 2, hd,
      -hw * 6, -hh * 2, hd * 2,
      -hw * 6, hh * 2, hd * 2,
  ]);
}


class HollowStarGeometry extends BufferGeometry {
  constructor(width = 1, height = 1, depth = 1) {
    super();
    this._width = width;
    this._height = height;
    this._depth = depth;
    
    const hw = width / 8, hh = height / 8, hd = depth / 8;
    const angle = (2 * Math.PI) / 5;

    let vertices = [];

    for (let i = 0; i < 5; i++) {
        const blockVertices = createInitialBlock(hw, hh, hd);
        rotateY(blockVertices, i * angle);
        vertices = vertices.concat(Array.from(blockVertices));
    }

    this.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));
    this._verticesLength = vertices.length;
    this.calculateNormals();
    this.setColor();
}

  
  // JSON parser
  toJSON() {
    return {
      ...super.toJSON(),
      width: this._width,
      height: this._height,
      depth: this._depth,
      type: 'HollowStarGeometry'
    };
  }

  static fromJSON(json) {
    return new HollowStarGeometry(json.width, json.height, json.depth);
  }
}

export default HollowStarGeometry;