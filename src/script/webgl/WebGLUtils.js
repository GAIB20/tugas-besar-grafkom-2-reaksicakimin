import { UniformSetterWebGLType } from './Types.js';

class WebGLUtils {
  static createShader(gl, source, type) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        return shader;

    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  static createProgram(gl, vert, frag) {
    let program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
  
    if (gl.getProgramParameter(program, gl.LINK_STATUS))
      return {
        program: program,
        attributeSetters: this.createAttributeSetters(gl, program),
        uniformSetters: this.createUniformSetters(gl, program)
      }
  
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  static createAttributeSetters(gl, program) {
    function createAttribSetter(info) {
      const loc = gl.getAttribLocation(program, info.name);
      const buf = gl.createBuffer();
      return (v) => {
          gl.bindBuffer(gl.ARRAY_BUFFER, buf);
          gl.enableVertexAttribArray(loc);
          gl.bufferData(gl.ARRAY_BUFFER, v.data, gl.STATIC_DRAW);
          gl.vertexAttribPointer(loc, v.size, v.dtype, v.normalize, v.stride, v.offset);
      }
  }

  const attribSetters = {};
  const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < numAttribs; i++) {
      const info = gl.getActiveAttrib(program, i);
      if (!info) break;
      attribSetters[info.name] = createAttribSetter(info);
  }
  return attribSetters;
  }

  static createUniformSetters(gl, program)  {
    function createUniformSetter(info) {
      const loc = gl.getUniformLocation(program, info.name);
      const isArray = (info.size > 1 && info.name.substr(-3) === '[0]');
      const type = UniformSetterWebGLType[info.type];
      return (v) => {
          if (typeof v === 'object' && 'toArray' in v) v = v.toArray();
          if (isArray) {
              gl[`uniform${type}v`](loc, v);
          } else {
              if (type.substr(0, 6) === 'Matrix')
                  gl[`uniform${type}`](loc, false, v.data);
              else {
                  if (Array.isArray(v))
                      gl[`uniform${type}`](loc, ...v);
                  else
                      gl[`uniform${type}`](loc, v);
              }
          }
      };
  }

  const uniformSetters = {};
  const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < numUniforms; i++) {
      const info = gl.getActiveUniform(program, i);
      if (!info) break;
      let name = (info.name.substr(-3) === '[0]') ? info.name.substr(0, info.name.length - 3) : info.name;
      uniformSetters[name] = createUniformSetter(info);
  }
  return uniformSetters;
}

  static setAttributes(programInfo, attribs) {
    const setters = programInfo.attributeSetters;
    for (let attrName in attribs) {
      const shaderName = `a_${attrName}`;
      if (shaderName in setters)
          setters[shaderName](attribs[attrName]);
  }
  }

  // static setAttribute(programInfo, attributeName, ...data) {
  //   const setters = programInfo.attributeSetters;
  //   if (attributeName in setters) {
  //     const shaderName = `a_${attributeName}`;
  //     setters[shaderName](...data);
  //   }
  // }

  static setUniforms(programInfo, uniforms) {
    const setters = programInfo.uniformSetters;
    for (let uniformName in uniforms) {
      const shaderName = `u_${uniformName}`;
      if (shaderName in setters) 
          setters[shaderName](uniforms[uniformName]);
      
  }
  }

  // static setUniform(programInfo, uniformName, ...data) {
  //   // print ...data
  //   console.log("DATA: ", data)
  //   const setters = programInfo.uniformSetters;
  //   for (let key in setters) {
  //     console.log(key)
  //     if (key.includes("u_")) {
  //       setters[key.substring(2)] = setters[key];
  //       delete setters[key];
  //     }
  //   }
  //   if (uniformName in setters) {
  //     console.log("ASDASDASD")
  //     const shaderName = `u_${uniformName}`;
  //     console.log(shaderName)
  //     setters[shaderName](data[uniformName]);
  //   }
  // }
}

export default WebGLUtils;