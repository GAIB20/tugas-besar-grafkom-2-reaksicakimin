class WebGLUtils {
  createShader(gl, source, type) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        return shader;

    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  createProgram(gl, vert, frag) {
    let program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
  
    if (gl.getProgramParameter(program, gl.LINK_STATUS))
      return program;
  
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  createAttributeSetters(gl, program) {
    function createAttributeSetter(info) {
      const loc = gl.getAttribLocation(program, info.name);
      const buf = gl.createBuffer();
      return (...values) => {
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        const v = values[0];
        if (v instanceof BufferAttribute) {
          if (v.isDirty) {
            gl.bufferData(gl.ARRAY_BUFFER, v.data, gl.STATIC_DRAW);
            v.consume();
          }
          gl.enableVertexAttribArray(loc);
          gl.vertexAttribPointer(loc, v.size, v.dtype, v.normalize, v.stride, v.offset);
        } else {
          gl.disableVertexAttribArray(loc);
          if (v instanceof Float32Array)
            gl[`vertexAttrib${v.length}fv`](loc, v);
          else
            gl[`vertexAttrib${values.length}f`](loc, ...values);
        }
      };
    }
  
    const attribSetters = {};
    const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < numAttribs; i++) {
      const info = gl.getActiveAttrib(program, i);
      if (!info) continue;
      attribSetters[info.name] = createAttributeSetter(info);
    }
  
    return attribSetters;
  }

  createUniformSetters(gl, program) {
    function createUniformSetter(info) {
      const loc = gl.getUniformLocation(program, info.name);
      const type = info.type;
      const setterName = UniformSetterWebGLType[type];
      if (!setterName) {
        return null;
      }

      return (...values) => {
        if (loc !== null) {
          gl[`uniform${setterName}`](loc, ...values);
        }
      };
    }
  
    const uniformSetters = {};
    const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < numUniforms; i++) {
      const info = gl.getActiveUniform(program, i);
      if (!info) continue;
      uniformSetters[info.name] = createUniformSetter(info);
    }

    return uniformSetters;
  }

  setAttributes(programInfo, attributes) {
    for (let attributeName in attributes) {
      setAttribute(programInfo, attributeName, attributes[attributeName]);
    }
  }

  setAttribute(programInfo, attributeName, ...data) {
    const setters = programInfo.attributeSetters;
    if (attributeName in setters) {
      const shaderName = `a_${attributeName}`;
      setters[shaderName](...data);
    }
  }

  setUniforms(programInfo, uniforms) {
    for (let uniformName in uniforms) {
      setUniform(programInfo, uniformName, uniforms[uniformName]);
    }
  }

  setUniform(programInfo, uniformName, ...data) {
    const setters = programInfo.uniformSetters;
    if (uniformName in setters) {
      const shaderName = `u_${uniformName}`;
      setters[shaderName](...data);
    }
  }
}