// TODO: Modify vertexShaderSource
let vertexShaderSource = `
  attribute vec4 a_position;
  
  void main() {
    gl_Position = a_position;
  }
`;

// TODO: Modify fragmentShaderSource
let fragmentShaderSource = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
`;

export { vertexShaderSource, fragmentShaderSource };