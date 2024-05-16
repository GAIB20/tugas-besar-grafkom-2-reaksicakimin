import BufferGeometry from './BufferGeometry.js';
import BufferAttribute from './BufferAttribute.js';

class HollowBoxGeometry extends BufferGeometry {
  constructor(width=1, height=1, depth=1) {
    super();
    this._width = width;
    this._height = height;
    this._depth = depth;
    const hw = width/4, hh = height/4, hd = depth/4;
    const vertices = new Float32Array([
    //tiang front left
      //front
      -hw*2, hh*2, hd*2,
      -hw*2, -hh*2, hd*2,
      -hw, -hh*2, hd*2,

      -hw,  hh*2,  hd*2,
      -hw*2, hh*2, hd*2,
      -hw,  -hh*2, hd*2,
      
      //back
      -hw*2, hh*2, hd,
      -hw, -hh*2, hd,
      -hw*2, -hh*2, hd,

      -hw,  hh*2,  hd,
      -hw, -hh*2, hd,
      -hw*2,  hh*2, hd,

      //top
      -hw*2, hh*2,  hd,
      -hw*2, hh*2,  hd*2,
      -hw,  hh*2,  hd*2,

      -hw, hh*2, hd,
      -hw*2, hh*2,  hd,
      -hw,  hh*2,  hd*2,

      //boti
      -hw*2, -hh*2, hd,
      -hw, -hh*2, hd,
      -hw, -hh*2, hd*2,

      -hw*2, -hh*2, hd*2,
      -hw*2, -hh*2, hd,
      -hw, -hh*2, hd*2,

      //right
      -hw, -hh*2, hd,
      -hw, hh*2, hd*2,
      -hw, -hh*2, hd*2,

      -hw, -hh*2, hd,
      -hw, hh*2, hd,
      -hw, hh*2, hd*2,

      //left
      -hw*2, -hh*2, hd,
      -hw*2, hh*2, hd*2,
      -hw*2, hh*2, hd,

      -hw*2, -hh*2, hd,
      -hw*2, -hh*2, hd*2,
      -hw*2, hh*2, hd*2,


    // tiang frong right
      //front
      hw, hh*2, hd*2,
      hw, -hh*2, hd*2,
      hw*2, -hh*2, hd*2,

      hw*2,  hh*2,  hd*2,
      hw, hh*2, hd*2,
      hw*2,  -hh*2, hd*2,
      
      //back
      hw, hh*2, hd,
      hw*2, -hh*2, hd,
      hw, -hh*2, hd,

      hw*2,  hh*2,  hd,
      hw*2, -hh*2, hd,
      hw,  hh*2, hd,

      //top
      hw, hh*2,  hd,
      hw, hh*2,  hd*2,
      hw*2,  hh*2,  hd*2,

      hw*2, hh*2, hd,
      hw, hh*2,  hd,
      hw*2,  hh*2,  hd*2,

      //boti
      hw, -hh*2, hd,
      hw*2, -hh*2, hd,
      hw*2, -hh*2, hd*2,

      hw, -hh*2, hd*2,
      hw, -hh*2, hd,
      hw*2, -hh*2, hd*2,

      //right
      hw*2, -hh*2, hd,
      hw*2, hh*2, hd*2,
      hw*2, -hh*2, hd*2,

      hw*2, -hh*2, hd,
      hw*2, hh*2, hd,
      hw*2, hh*2, hd*2,

      //left
      hw, -hh*2, hd,
      hw, hh*2, hd*2,
      hw, hh*2, hd,

      hw, -hh*2, hd,
      hw, -hh*2, hd*2,
      hw, hh*2, hd*2,

    // tiang back left
      //front
      -hw*2, hh*2, -hd,
      -hw*2, -hh*2, -hd,
      -hw, -hh*2, -hd,

      -hw,  hh*2,  -hd,
      -hw*2, hh*2, -hd,
      -hw,  -hh*2, -hd,
      
      //back
      -hw*2, hh*2, -hd*2,
      -hw, -hh*2, -hd*2,
      -hw*2, -hh*2, -hd*2,

      -hw,  hh*2,  -hd*2,
      -hw, -hh*2, -hd*2,
      -hw*2,  hh*2, -hd*2,

      //top
      -hw*2, hh*2,  -hd*2,
      -hw*2, hh*2,  -hd,
      -hw,  hh*2,  -hd,

      -hw, hh*2, -hd*2,
      -hw*2, hh*2,  -hd*2,
      -hw,  hh*2,  -hd,

      //boti
      -hw*2, -hh*2, -hd*2,
      -hw, -hh*2, -hd*2,
      -hw, -hh*2, -hd,

      -hw*2, -hh*2, -hd,
      -hw*2, -hh*2, -hd*2,
      -hw, -hh*2, -hd,

      //right
      -hw, -hh*2, -hd*2,
      -hw, hh*2, -hd,
      -hw, -hh*2, -hd,

      -hw, -hh*2, -hd*2,
      -hw, hh*2, -hd*2,
      -hw, hh*2, -hd,

      //left
      -hw*2, -hh*2, -hd*2,
      -hw*2, hh*2, -hd,
      -hw*2, hh*2, -hd*2,

      -hw*2, -hh*2, -hd*2,
      -hw*2, -hh*2, -hd,
      -hw*2, hh*2, -hd,

    // tiang back right
      //front
      hw, hh*2, -hd,
      hw, -hh*2, -hd,
      hw*2, -hh*2, -hd,

      hw*2,  hh*2,  -hd,
      hw, hh*2, -hd,
      hw*2,  -hh*2, -hd,
      
      //back
      hw, hh*2, -hd*2,
      hw*2, -hh*2, -hd*2,
      hw, -hh*2, -hd*2,

      hw*2,  hh*2,  -hd*2,
      hw*2, -hh*2, -hd*2,
      hw,  hh*2, -hd*2,

      //top
      hw, hh*2,  -hd*2,
      hw, hh*2,  -hd,
      hw*2,  hh*2,  -hd,

      hw*2, hh*2, -hd*2,
      hw, hh*2,  -hd*2,
      hw*2,  hh*2,  -hd,

      //boti
      hw, -hh*2, -hd*2,
      hw*2, -hh*2, -hd*2,
      hw*2, -hh*2, -hd,

      hw, -hh*2, -hd,
      hw, -hh*2, -hd*2,
      hw*2, -hh*2, -hd,

      //right
      hw*2, -hh*2, -hd*2,
      hw*2, hh*2, -hd,
      hw*2, -hh*2, -hd,

      hw*2, -hh*2, -hd*2,
      hw*2, hh*2, -hd*2,
      hw*2, hh*2, -hd,

      //left
      hw, -hh*2, -hd*2,
      hw, hh*2, -hd,
      hw, hh*2, -hd*2,

      hw, -hh*2, -hd*2,
      hw, -hh*2, -hd,
      hw, hh*2, -hd,


    // front datar atas
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

    // front dasar bawah
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

    // back datar atas
      //front
      -hw, hh*2, -hd,
      -hw, hh, -hd,
      hw,  hh, -hd,

      hw,  hh*2, -hd,
      -hw, hh*2, -hd,
      hw,  hh, -hd,

       // Back face
       -hw, hh*2, -hd*2,
       hw,  hh, -hd*2,
       -hw, hh, -hd*2,
       hw,  hh*2, -hd*2,
       hw,  hh, -hd*2,
       -hw, hh*2, -hd*2,

       // Top face
      -hw, hh*2,  -hd*2,
      -hw, hh*2,  -hd,
      hw,  hh*2,  -hd,
      
      hw,  hh*2,  -hd*2,
      -hw, hh*2,  -hd*2,
      hw,  hh*2,  -hd,

      // Bottom face
      -hw, hh, -hd*2,
      hw,  hh, -hd*2,
      hw,  hh, -hd,

      -hw, hh, -hd,
      -hw, hh, -hd*2,
      hw,  hh, -hd,

    // back dasar bawah
      //front
      -hw, -hh, -hd,
      -hw, -hh*2, -hd,
      hw,  -hh*2, -hd,

      hw,  -hh,  -hd,
      -hw, -hh, -hd,
      hw,  -hh*2, -hd,

       // Back face
       -hw, -hh, -hd*2,
       hw,  -hh*2, -hd*2,
       -hw, -hh*2, -hd*2,
       hw,  -hh, -hd*2,
       hw,  -hh*2, -hd*2,
       -hw, -hh, -hd*2,

       // Top face
      -hw, -hh,  -hd*2,
      -hw, -hh,  -hd,
      hw,  -hh,  -hd,
      
      hw,  -hh,  -hd*2,
      -hw, -hh,  -hd*2,
      hw,  -hh,  -hd,

      // Bottom face
      -hw, -hh*2, -hd*2,
      hw,  -hh*2, -hd*2,
      hw,  -hh*2, -hd,

      -hw, -hh*2, -hd,
      -hw, -hh*2, -hd*2,
      hw,  -hh*2, -hd,

    // dasar left atas
      // Top face
      -hw*2, hh*2,  -hd,
      -hw*2, hh*2,  hd,
      -hw,  hh*2,  hd,
      
      -hw,  hh*2,  -hd,
      -hw*2, hh*2, -hd,
      -hw,  hh*2,  hd,

      //Bottom face
      -hw*2, hh, -hd,
      -hw,  hh, -hd,
      -hw,  hh, hd,

      -hw*2, hh, hd,
      -hw*2, hh, -hd,
      -hw, hh, hd,
      
      



    // dasar left bawah









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
  }

  
  // JSON parser
  toJSON() {
    return {
      ...super.toJSON(),
      width: this._width,
      height: this._height,
      depth: this._depth
    };
  }

  static fromJSON(json) {
    return new BoxGeometry(json.width, json.height, json.depth);
  }
}

export default HollowBoxGeometry;