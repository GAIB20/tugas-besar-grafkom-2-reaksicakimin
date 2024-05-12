// TODO: Modify vertexShaderSource
let vertexShaderSource = `
  attribute vec4 position;
  void main() {
    gl_Position = position;
  }
`;

// TODO: Modify fragmentShaderSource
let fragmentShaderSource = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;