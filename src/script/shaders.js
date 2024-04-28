var vertexShaderSource = `
attribute vec4 a_position;
attribute vec3 a_normal;
attribute vec4 a_color;
attribute vec2 a_texcoord;

// For Bump
attribute vec3 a_pos;
attribute vec3 a_tang;
attribute vec3 a_bitang;
attribute vec2 a_uv;

// For Environment
uniform mat4 u_matrix;
uniform vec2 u_resolution;
uniform mat4 u_worldInverseTranspose;
uniform mat4 u_projection;
uniform mat4 u_view;
uniform mat4 u_world;

varying vec3 v_normal;
varying vec2 v_texcoord;
varying vec4 v_color;
varying vec3 v_worldPosition;
varying vec3 v_worldNormal;

// For Bump
varying vec2 frag_uv;
varying vec3 ts_light_pos;
varying vec3 ts_view_pos;
varying vec3 ts_frag_pos;

uniform int u_textureOption1;

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
  if (u_textureOption1 == 0){
    gl_Position = u_matrix * a_position;
    v_normal = mat3(u_worldInverseTranspose) * a_normal;
    v_color = a_color;
    v_texcoord = a_texcoord;
  } 
  else if (u_textureOption1 == 1){
    gl_Position = u_matrix * a_position;
    v_worldPosition = (u_worldInverseTranspose * a_position).xyz;
    v_worldNormal = mat3(u_worldInverseTranspose) * a_normal;
    v_color = a_color;
  } 
  else if (u_textureOption1 == 2){
    gl_Position = u_matrix * a_position;
    ts_frag_pos = vec3(u_matrix * vec4(a_pos, 1.0));
    vec3 a_norm = cross(a_bitang, a_tang);

    v_normal = mat3(u_worldInverseTranspose) * a_normal;
    vec3 t = normalize(v_normal * a_tang);
    vec3 b = normalize(v_normal * a_bitang);
    vec3 n = normalize(v_normal * a_norm);
    mat3 tbn = transpose(mat3(t, b, n));

    vec3 light_pos = vec3(1, 2, 0);
    ts_light_pos = tbn * light_pos;

    ts_view_pos = tbn * vec3(0, 0, 0);
    ts_frag_pos = tbn * ts_frag_pos;
 
    v_texcoord = a_uv;

    // v_normal = mat3(u_worldInverseTranspose) * a_normal;
    v_color = a_color;
    //v_texcoord = a_texcoord;
  }
  else {
    gl_Position = u_matrix * a_position;
    v_normal = mat3(u_worldInverseTranspose) * a_normal;
    v_color = a_color;
    v_texcoord = a_texcoord;
  }
}
`;

var fragmentShaderSource = `
precision highp float;
varying vec4 v_color;
varying vec3 v_normal;
varying vec2 v_texcoord;
varying vec3 v_worldPosition;
varying vec3 v_worldNormal;

uniform sampler2D u_texture;
uniform samplerCube u_env_texture;
uniform vec3 u_reverseLightDirection;
uniform bool u_useLighting;
uniform bool u_useTexture;
uniform int u_textureOption;
uniform vec3 u_worldCameraPosition;

varying vec2 frag_uv;
varying vec3 ts_light_pos;
varying vec3 ts_frag_pos;

void main() {
  if (u_useTexture) {
    if(u_textureOption == 0){
      gl_FragColor = texture2D(u_texture, v_texcoord);
    } 
    else if(u_textureOption == 1){
      vec3 worldNormal = normalize(v_worldNormal);
      vec3 eyeToSurfaceDir = normalize(v_worldPosition - u_worldCameraPosition);
      vec3 direction = reflect(eyeToSurfaceDir,v_normal);
      gl_FragColor = textureCube(u_env_texture, direction);
    } 
    else if (u_textureOption == 2){
      vec3 light_dir = normalize(ts_light_pos - ts_frag_pos);

      vec3 albedo = vec3(1,1,1);
      vec3 ambient = 0.3 * albedo;
  
      vec3 norm = normalize(texture2D(u_texture, v_texcoord).rgb * 2.0 - 1.0);
      float diffuse = max(dot(light_dir, norm), 0.0);
      //gl_FragColor = vec4(diffuse * albedo + ambient, 1.0);

      gl_FragColor = texture2D(u_texture, v_texcoord);
    }
    else {
      gl_FragColor = v_color;
    }
  }
  else {
    gl_FragColor = v_color;
  }
  if (u_useLighting) {
    if (u_textureOption != 1){
      vec3 normal = normalize(v_normal);
      float light = dot(normal, u_reverseLightDirection);
      gl_FragColor.rgb *= light;
    }
  }
}`;