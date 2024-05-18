import BufferGeometry from './BufferGeometry.js';
import BufferAttribute from './BufferAttribute.js';

class HollowPyramidGeometry extends BufferGeometry {
  constructor(width=1, height=1, depth=1) {
    super();
    this._width = width;
    this._height = height;
    this._depth = depth;
    const hw = width/4, hh = height/4, hd = depth/4;
    const vertices = new Float32Array([

    // front dasar bawah
      //front
      -hw*4, -hh, hd*4,
      -hw*4, -hh*2, hd*4,
      hw*4,  -hh*2, hd*4,

      hw*4,  -hh,  hd*4,
      -hw*4, -hh, hd*4,
      hw*4,  -hh*2, hd*4,

       // Back face
       -hw*4, -hh, hd*3,
       hw*4,  -hh*2, hd*3,
       -hw*4, -hh*2, hd*3,

       hw*4,  -hh, hd*3,
       hw*4,  -hh*2, hd*3,
       -hw*4, -hh, hd*3,

       // Top face
      -hw*4, -hh,  hd*3,
      -hw*4, -hh,  hd*4,
      hw*4,  -hh,  hd*4,
      
      hw*4,  -hh,  hd*3,
      -hw*4, -hh,  hd*3,
      hw*4,  -hh,  hd*4,

      // Bottom face
      -hw*4, -hh*2, hd*3,
      hw*4,  -hh*2, hd*3,
      hw*4,  -hh*2, hd*4,

      -hw*4, -hh*2, hd*4,
      -hw*4, -hh*2, hd*3,
      hw*4,  -hh*2, hd*4,

      // left face
      -hw*4, -hh, hd*3,
      -hw*4, -hh*2, hd*3,
      -hw*4, -hh*2, hd*4,

      -hw*4, -hh, hd*4,
      -hw*4, -hh, hd*3,
      -hw*4, -hh*2, hd*4,

      // right face
      hw*4, -hh, hd*3,
      hw*4, -hh, hd*4,
      hw*4, -hh*2, hd*4,

      hw*4, -hh*2, hd*3,
      hw*4, -hh, hd*3,
      hw*4, -hh*2, hd*4,



    // back dasar bawah
      //front
      -hw*4, -hh, -hd*3,
      -hw*4, -hh*2, -hd*3,
      hw*4,  -hh*2, -hd*3,

      hw*4,  -hh,  -hd*3,
      -hw*4, -hh, -hd*3,
      hw*4,  -hh*2, -hd*3,

       // Back face
       -hw*4, -hh, -hd*4,
       hw*4,  -hh*2, -hd*4,
       -hw*4, -hh*2, -hd*4,

       hw*4,  -hh, -hd*4,
       hw*4,  -hh*2, -hd*4,
       -hw*4, -hh, -hd*4,

       // Top face
      -hw*4, -hh,  -hd*4,
      -hw*4, -hh,  -hd*3,
      hw*4,  -hh,  -hd*3,
      
      hw*4,  -hh,  -hd*4,
      -hw*4, -hh,  -hd*4,
      hw*4,  -hh,  -hd*3,

      // Bottom face
      -hw*4, -hh*2, -hd*4,
      hw*4,  -hh*2, -hd*4,
      hw*4,  -hh*2, -hd*3,

      -hw*4, -hh*2, -hd*3,
      -hw*4, -hh*2, -hd*4,
      hw*4,  -hh*2, -hd*3,

      // left face
      -hw*4, -hh, -hd*4,
      -hw*4, -hh*2, -hd*4,
      -hw*4, -hh*2, -hd*3,

      -hw*4, -hh, -hd*3,
      -hw*4, -hh, -hd*4,
      -hw*4, -hh*2, -hd*3,

      // right face
      hw*4, -hh, -hd*4,
      hw*4, -hh, -hd*3,
      hw*4, -hh*2, -hd*3,

      hw*4, -hh*2, -hd*4,
      hw*4, -hh, -hd*4,
      hw*4, -hh*2, -hd*3,


    // left dasar bawah
      // Top face
      -hw*4, -hh,  -hd*3,
      -hw*4, -hh,  hd*3,
      -hw*3,  -hh,  hd*3,
      
      -hw*3,  -hh,  -hd*3,
      -hw*4, -hh, -hd*3,
      -hw*3,  -hh,  hd*3,

      //Bottom face
      -hw*4, -hh*2, -hd*3,
      -hw*3,  -hh*2, -hd*3,
      -hw*3,  -hh*2, hd*3,

      -hw*4, -hh*2, hd*3,
      -hw*4, -hh*2, -hd*3,
      -hw*3, -hh*2, hd*3,

      // Right face
      -hw*3,  -hh*2, -hd*3,
      -hw*3,  -hh,   hd*3,
      -hw*3,  -hh*2,  hd*3,

      -hw*3,  -hh*2, -hd*3,
      -hw*3,  -hh,   -hd*3,
      -hw*3,  -hh,   hd*3,

      // Left face
      -hw*4, -hh*2, -hd*3,
      -hw*4, -hh,  hd*3,
      -hw*4, -hh,  -hd*3,

      -hw*4, -hh*2, -hd*3,
      -hw*4, -hh*2, hd*3,
      -hw*4, -hh,  hd*3,
    

    
    // right dasar bawah
      // Top face
      hw*3, -hh,  -hd*3,
      hw*3, -hh,  hd*3,
      hw*4,  -hh,  hd*3,
      
      hw*4,  -hh,  -hd*3,
      hw*3, -hh, -hd*3,
      hw*4,  -hh,  hd*3,

      //Bottom face
      hw*3, -hh*2, -hd*3,
      hw*4,  -hh*2, -hd*3,
      hw*4,  -hh*2, hd*3,

      hw*3, -hh*2, hd*3,
      hw*3, -hh*2, -hd*3,
      hw*4, -hh*2, hd*3,

      // Right face
      hw*4,  -hh*2, -hd*3,
      hw*4,  -hh,   hd*3,
      hw*4,  -hh*2,  hd*3,

      hw*4,  -hh*2, -hd*3,
      hw*4,  -hh,   -hd*3,
      hw*4,  -hh,   hd*3,

      // Left face
      hw*3, -hh*2, -hd*3,
      hw*3, -hh,  hd*3,
      hw*3, -hh,  -hd*3,

      hw*3, -hh*2, -hd*3,
      hw*3, -hh*2, hd*3,
      hw*3, -hh,  hd*3,

    // pilar front kiri

      //front
      -hw/2, hh*4,  hd/2,
      -hw*4, -hh, hd*4,
      -hw*3, -hh, hd*4,

      hw/2,  hh*4,  hd/2,
      -hw/2, hh*4,  hd/2,
      -hw*3, -hh, hd*4,

      hw/2,  hh*4,  hd/2,
      -hw*3, -hh, hd*4,
      hw/2,  hh*3, hd/2,
      
      -hw/2, hh*4, -hd/2,
      -hw/2, hh*3, -hd/2, 
      -hw*4, -hh, hd*3,

      -hw/2, hh*4,  hd/2,
      -hw*4, -hh, hd*3,
      -hw*4, -hh, hd*4,

      -hw/2, hh*4,  hd/2,
      -hw/2, hh*4,  -hd/2,
      -hw*4, -hh, hd*3,

      // //back
      
      hw/2,  hh*3, hd/2,
      -hw*3, -hh, hd*4,
      -hw*3, -hh, hd*3,

      -hw*3, -hh, hd*3,
      -hw*4, -hh, hd*3,
      -hw/2, hh*3, -hd/2,

      -hw/2, hh*3, -hd/2,
      -hw/2, hh*3, hd/2,
      -hw*3, -hh, hd*3,

      -hw/2, hh*3, hd/2,
      hw/2, hh*3, hd/2,
      -hw*3, -hh, hd*3,

    // pilar front kanan
      
      //front
      hw/2, hh*4,  hd/2,
      hw*3, -hh, hd*4,
      hw*4, -hh, hd*4,

      hw/2,  hh*4,  hd/2,
      -hw/2, hh*4,  hd/2,
      hw*3, -hh, hd*4,

      -hw/2,  hh*4,  hd/2,
      -hw/2,  hh*3, hd/2,
      hw*3, -hh, hd*4,

      hw/2, hh*4, -hd/2,
      hw*4, -hh, hd*3,
      hw/2, hh*3, -hd/2, 

      hw/2, hh*4,  hd/2,
      hw*4, -hh, hd*4,
      hw*4, -hh, hd*3,

      hw/2, hh*4,  hd/2,
      hw*4, -hh, hd*3,
      hw/2, hh*4,  -hd/2,

      // back
      -hw/2,  hh*3, hd/2,
      hw*3, -hh, hd*3,
      hw*3, -hh, hd*4,

      hw*4, -hh, hd*3,
      hw*3, -hh, hd*3,
      hw/2, hh*3, -hd/2,

      hw/2, hh*3, -hd/2,
      hw*3, -hh, hd*3,
      hw/2, hh*3, hd/2,

      -hw/2, hh*3, hd/2,
      hw/2, hh*3, hd/2,
      hw*3, -hh, hd*3,


    


    // pilar back kiri

      //front
      -hw/2, hh*4,  -hd/2,
      -hw*3, -hh, -hd*4,
      -hw*4, -hh, -hd*4,

      hw/2,  hh*4,  -hd/2,
      -hw*3, -hh, -hd*4,
      -hw/2, hh*4,  -hd/2,

      hw/2,  hh*4,  -hd/2,
      hw/2,  hh*3, -hd/2,
      -hw*3, -hh, -hd*4,
      
      -hw/2, hh*4, hd/2,
      -hw*4, -hh, -hd*3,
      -hw/2, hh*3, hd/2, 

      -hw/2, hh*4,  -hd/2,
      -hw*4, -hh, -hd*4,
      -hw*4, -hh, -hd*3,

      -hw/2, hh*4,  -hd/2,
      -hw*4, -hh, -hd*3,
      -hw/2, hh*4,  hd/2,

      // //back
      
      hw/2,  hh*3, -hd/2,
      -hw*3, -hh, -hd*3,
      -hw*3, -hh, -hd*4,

      -hw*3, -hh, -hd*3,
      -hw/2, hh*3, hd/2,
      -hw*4, -hh, -hd*3,

      -hw/2, hh*3, hd/2,
      -hw*3, -hh, -hd*3,
      -hw/2, hh*3, -hd/2,

      -hw/2, hh*3, -hd/2,
      -hw*3, -hh, -hd*3,
      hw/2, hh*3, -hd/2,

    // pilar front kanan


      
      //front
      hw/2, hh*4,  -hd/2,
      hw*4, -hh, -hd*4,
      hw*3, -hh, -hd*4,

      hw/2,  hh*4,  -hd/2,
      hw*3, -hh, -hd*4,
      -hw/2, hh*4,  -hd/2,

      -hw/2,  hh*4,  -hd/2,
      hw*3, -hh, -hd*4,
      -hw/2,  hh*3, -hd/2,

      hw/2, hh*4, hd/2,
      hw/2, hh*3, hd/2, 
      hw*4, -hh, -hd*3,

      hw/2, hh*4,  -hd/2,
      hw*4, -hh, -hd*3,
      hw*4, -hh, -hd*4,

      hw/2, hh*4,  -hd/2,
      hw/2, hh*4,  hd/2,
      hw*4, -hh, -hd*3,

      // back
      -hw/2,  hh*3, -hd/2,
      hw*3, -hh, -hd*4,
      hw*3, -hh, -hd*3,

      hw*4, -hh, -hd*3,
      hw/2, hh*3, hd/2,
      hw*3, -hh, -hd*3,

      hw/2, hh*3, hd/2,
      hw/2, hh*3, -hd/2,
      hw*3, -hh, -hd*3,

      -hw/2, hh*3, -hd/2,
      hw*3, -hh, -hd*3,
      hw/2, hh*3, -hd/2,





    // Front face
    // -hw/2, hh*4,  hd/2,
    // -hw/2, hh*3, hd/2,
    // hw/2,  hh*3, hd/2,
    // hw/2,  hh*4,  hd/2,
    // -hw/2, hh*4, hd/2,
    // hw/2,  hh*3, hd/2,
    // // Back face
    // -hw/2, hh*4,  -hd/2,
    // hw/2,  hh*3, -hd/2,
    // -hw/2, hh*3, -hd/2,
    // hw/2,  hh*4,  -hd/2,
    // hw/2,  hh*3, -hd/2,
    // -hw/2, hh*4, -hd/2,
    // Top face
    -hw/2, hh*4,  -hd/2,
    -hw/2, hh*4,  hd/2,
    hw/2,  hh*4,  hd/2,
    
    hw/2,  hh*4,  -hd/2,
    -hw/2, hh*4, -hd/2,
    hw/2,  hh*4,  hd/2,
    // Bottom face
    -hw/2, hh*3, -hd/2,
    hw/2,  hh*3, -hd/2,
    hw/2,  hh*3, hd/2,
    -hw/2, hh*3, hd/2,
    -hw/2, hh*3, -hd/2,
    hw/2,  hh*3, hd/2,
    // // Right face
    // hw/2,  hh*3, -hd/2,
    // hw/2,  hh*4,   hd/2,
    // hw/2,  hh*3,  hd/2,
    // hw/2,  hh*3, -hd/2,
    // hw/2,  hh*4,   -hd/2,
    // hw/2,  hh*4,   hd/2,
    // // Left face
    // -hw/2, hh*3, -hd/2,
    // -hw/2, hh*4,  hd/2,
    // -hw/2, hh*4,  -hd/2,
    // -hw/2, hh*3, -hd/2,
    // -hw/2, hh*3, hd/2,
    // -hw/2, hh*4,  hd/2

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
      depth: this._depth,
      type: 'HollowPyramidGeometry'
    };
  }

  static fromJSON(json) {
    return new HollowPyramidGeometry(json.width, json.height, json.depth);
  }
}

export default HollowPyramidGeometry;