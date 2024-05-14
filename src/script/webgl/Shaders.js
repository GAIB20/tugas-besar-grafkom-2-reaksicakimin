// TODO: Modify vertexShaderSource
let vertexShaderSource = `
attribute vec4 a_position;

uniform mat4 u_worldMatrix;
uniform mat4 u_viewMatrix;

varying vec4 v_color;

void main() {
    vec4 wPos = u_viewMatrix * u_worldMatrix * a_position;

    gl_Position = wPos;
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