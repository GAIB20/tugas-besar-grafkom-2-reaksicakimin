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
attribute vec2 a_textureCoord;
attribute vec4 a_color;
attribute vec3 a_normal;
attribute vec3 a_tangent;
attribute vec3 a_bitangent;

uniform mat4 u_worldMatrix;
uniform mat4 u_viewMatrix;
uniform vec2 u_resolution;
uniform bool u_useVertexColor;
uniform sampler2D u_displacementMap;

varying vec4 v_color;
varying vec3 v_normal, v_pos;
varying vec3 v_tangent, v_bitangent;
varying highp vec2 v_textureCoord;

void main() {
  float disp = texture2D(u_displacementMap, a_textureCoord).r;
  vec4 displace = a_position;
  float displaceFactor = 0.1;
  float displaceBias = 0.0;

  displace.xyz += (displaceFactor * disp - displaceBias) * a_normal;
  gl_Position = u_worldMatrix * u_viewMatrix * a_position;

  v_pos = vec3(u_worldMatrix * a_position);
  v_normal = mat3(u_worldMatrix) * a_normal;
  v_tangent = mat3(u_worldMatrix) * a_tangent;
  v_color = mix(vec4(1,1,1,1), a_color, float(u_useVertexColor));
  v_textureCoord = a_textureCoord;
  v_bitangent = mat3(u_worldMatrix) * a_bitangent;
}
`;

let fragmentShaderSourcePhong = `
precision mediump float;

uniform float u_shininess;
uniform vec3 u_lightPosition;
uniform vec3 u_lightDirection;
uniform vec4 u_lightColor;
uniform vec3 u_cameraPosition;
uniform vec4 u_ambient;
uniform vec4 u_diffuse;
uniform vec4 u_specular;
uniform int u_textureOption;

uniform sampler2D u_normalMap;
uniform sampler2D u_displacementMap;
uniform sampler2D u_diffuseMap;
uniform sampler2D u_specularMap;

varying vec4 v_color;
varying vec3 v_normal, v_pos;
varying vec3 v_tangent, v_bitangent;

varying highp vec2 v_textureCoord;

mat3 transpose(in mat3 inMatrix)
      {
          vec3 i0 = inMatrix[0];
          vec3 i1 = inMatrix[1];
          vec3 i2 = inMatrix[2];

          mat3 outMatrix = mat3(
              vec3(i0.x, i1.x, i2.x),
              vec3(i0.y, i1.y, i2.y),
              vec3(i0.z, i1.z, i2.z)
          );

          return outMatrix;
      }

void main() {
  if (u_textureOption == 1) {
    // vec3 T = normalize(v_tangent);
    // vec3 N = normalize(v_normal);
    // vec3 B = normalize(v_bitangent);
    // vec3 normal = normalize(texture2D(u_normalMap, v_textureCoord).rgb * 2.0 - 1.0);
    // mat3 TBN = transpose(mat3(T, B, N));
    // vec3 lightDir = TBN * normalize(u_lightPosition - v_pos);
    // vec3 viewDir = TBN * normalize(u_cameraPosition - v_pos);

    // vec3 ambient = u_ambient.rgb * 0.4;
    // vec3 diff = texture2D(u_diffuseMap, v_textureCoord).rgb;
    // float diffFactor = max(dot(diff, lightDir), 0.0);
    // diffFactor = min(diffFactor, 1.1);
    // vec3 diffuse = u_diffuse.rgb * diffFactor ;
    // float spec = texture2D(u_specularMap, v_textureCoord).r;
    // vec3 r = reflect(-lightDir, normal);
    // vec3 specular = u_specular.rgb * u_lightColor.rgb * spec * pow(dot(r, viewDir), u_shininess);
    
    // gl_FragColor = vec4(ambient + diffuse + specular , 1.0) * vec4(diff, 1.0);
    gl_FragColor = texture2D(u_diffuseMap, v_textureCoord);
    
  }
}
`;

export { vertexShaderSourceBasic, fragmentShaderSourceBasic, vertexShaderSourcePhong, fragmentShaderSourcePhong };