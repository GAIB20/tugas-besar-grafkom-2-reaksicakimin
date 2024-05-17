let vertexShaderSourceBasic = `
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

let fragmentShaderSourceBasic = `
precision highp float;
varying vec4 v_color;

void main() {
  gl_FragColor = v_color;
}
`;


let vertexShaderSourcePhong = `
attribute vec4 a_position;
attribute vec4 a_color;
attribute vec3 a_normal;

uniform mat4 u_worldMatrix;
uniform mat4 u_viewMatrix;
uniform vec2 u_resolution;
uniform bool u_useVertexColor;

varying vec4 v_color;
varying vec3 v_normal, v_pos;

void main() {
  gl_Position = u_viewMatrix * u_worldMatrix * a_position;

  v_pos = gl_Position.xyz / gl_Position.w;
  v_normal = mat3(u_worldMatrix) * a_normal;
  v_color = mix(vec4(1,1,1,1), a_color, float(u_useVertexColor));
}
`;

let fragmentShaderSourcePhong = `
precision mediump float;

uniform float u_shininess;
uniform vec3 u_lightPosition;
uniform vec3 u_cameraPosition;
uniform vec4 u_ambient;
uniform vec4 u_diffuse;
uniform vec4 u_specular;

varying vec4 v_color;
varying vec3 v_normal, v_pos;

void main() {
  vec3 N = normalize(v_normal);
  vec3 L = normalize(normalize(u_lightPosition) - v_pos);
  vec3 H = normalize(L + normalize(u_cameraPosition));

  float kDiff = max(dot(L, N), 0.0);
  vec3 diffuse = kDiff * u_diffuse.rgb;

  float kSpec = pow(max(dot(N, H), 0.0), u_shininess);
  vec3 specular = kSpec * u_specular.rgb;
    gl_FragColor = v_color * vec4(
      0.1 * u_ambient.a * u_ambient.rgb + 
      u_diffuse.a * diffuse +
      u_specular.a * specular
    , 1.0);
}
`;

let vertexShaderSourcePhongTexture = `
attribute vec4 a_position;
attribute vec2 a_textureCoord;
attribute vec4 a_color;
attribute vec3 a_normal;

uniform mat4 u_worldMatrix;
uniform mat4 u_viewMatrix;
uniform vec2 u_resolution;
uniform bool u_useVertexColor;

varying vec4 v_color;
varying vec3 v_normal, v_pos;
varying highp vec2 v_textureCoord;

void main() {
  gl_Position = u_viewMatrix * u_worldMatrix * a_position;

  v_pos = gl_Position.xyz / gl_Position.w;
  v_normal = mat3(u_worldMatrix) * a_normal;
  v_color = mix(vec4(1,1,1,1), a_color, float(u_useVertexColor));
  v_textureCoord = a_textureCoord;
}
`;

let fragmentShaderSourcePhongTexture = `
precision mediump float;

uniform float u_shininess;
uniform vec3 u_lightPosition;
uniform vec3 u_cameraPosition;
uniform vec4 u_ambient;
uniform vec4 u_diffuse;
uniform vec4 u_specular;
uniform int u_textureOption;
uniform sampler2D u_sampler;

varying vec4 v_color;
varying vec3 v_normal, v_pos;

varying highp vec2 v_textureCoord;

void main() {
  if (u_textureOption == 0) {
  vec3 N = normalize(v_normal);
  vec3 L = normalize(normalize(u_lightPosition) - v_pos);
  vec3 H = normalize(L + normalize(u_cameraPosition));

  float kDiff = max(dot(L, N), 0.0);
  vec3 diffuse = kDiff * u_diffuse.rgb;

  float kSpec = pow(max(dot(N, H), 0.0), u_shininess);
  vec3 specular = kSpec * u_specular.rgb;
    gl_FragColor = v_color * vec4(
      0.1 * u_ambient.a * u_ambient.rgb + 
      u_diffuse.a * diffuse +
      u_specular.a * specular
    , 1.0);
  } else {
    
    gl_FragColor = texture2D(u_sampler, v_textureCoord);
  }
}
`;

export { vertexShaderSourceBasic, fragmentShaderSourceBasic, vertexShaderSourcePhong, fragmentShaderSourcePhong, vertexShaderSourcePhongTexture, fragmentShaderSourcePhongTexture };