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
    function createAttributeSetter(info) {
      const loc = gl.getAttribLocation(program, info.name);
      const buf = gl.createBuffer();
      return (v) => {
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.enableVertexAttribArray(loc);
        gl.bufferData(gl.ARRAY_BUFFER, v.data, gl.STATIC_DRAW);
        gl.vertexAttribPointer(loc, v.size, v.dtype, v.normalize, v.stride, v.offset);
      }
    }

    const attributeSetters = {};
    const numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < numAttributes; i++) {
      const info = gl.getActiveAttrib(program, i);
      if (!info) continue;
      attributeSetters[info.name] = createAttributeSetter(info);
    }

    return attributeSetters;
  }

  static createUniformSetters(gl, program)  {
    function createUniformSetter(info) {
      const loc = gl.getUniformLocation(program, info.name);
      const isArray = (info.size > 1 && info.name.substr(-3) === '[0]');
      const type = UniformSetterWebGLType[info.type];
      return (v) => {
        console.log(info.name,v);
        if (typeof v === 'object' && 'toArray' in v) v = v.toArray();
        if (isArray) {
          gl[`uniform${type}v`](loc, v);
        } else {
          if (type.substr(0, 6) === 'Matrix')
            gl[`uniform${type}`](loc, false, v.data);
          else {
            if (Array.isArray(v))
              gl[`uniform${type}`](loc, ...v);
            else {
              gl[`uniform${type}`](loc, v);
            }
          }
        }
      };
    }

    const uniformSetters = {};
    const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < numUniforms; i++) {
      const info = gl.getActiveUniform(program, i);
      if (!info) continue;
      let name = (info.name.substr(-3) === '[0]') ? info.name.substr(0, info.name.length - 3) : info.name;
      uniformSetters[name] = createUniformSetter(info);
    }

    return uniformSetters;
  }

  // Attribute setters
  static setAttributes(programInfo, attributes) {
    for (let attrName in attributes) {
      this.setAttribute(programInfo, attrName, attributes[attrName]);
    }
  }
  
  static setAttribute(programInfo, attribName, ...data) {
    const setters = programInfo.attributeSetters;
    const shaderName = `a_${attribName}`;
    if (shaderName in setters) {
      setters[shaderName](...data);
    }
  }

  // Uniform setters
  static setUniforms(programInfo, uniforms) {
    for (let uniformName in uniforms) {
      this.setUniform(programInfo, uniformName, uniforms[uniformName]);
    }
  }
  
  static setUniform(programInfo, uniformName, ...data) {
    const setters = programInfo.uniformSetters;
    const shaderName = `u_${uniformName}`;
    if (shaderName in setters) {
      setters[shaderName](...data);
    }
  }
}

export default WebGLUtils;