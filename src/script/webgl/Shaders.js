// TODO: Modify vertexShaderSource
let vertexShaderSource = `
attribute vec4 a_position;
attribute vec4 a_color;

uniform mat4 u_worldMatrix;
uniform mat4 u_viewMatrix;
uniform vec4 u_color;

varying vec4 v_color;

void main() {
    vec4 wPos = u_viewMatrix * u_worldMatrix * a_position;

    gl_Position = wPos;
    v_color = u_color;
}
`;

// TODO: Modify fragmentShaderSource
let fragmentShaderSource = `
  precision highp float;
  varying vec4 v_color;

  void main() {
    gl_FragColor = v_color;
  }
`;

export { vertexShaderSource, fragmentShaderSource };