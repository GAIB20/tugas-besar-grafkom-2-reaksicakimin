// Attribute Setters
function createAttributeSetters(program) {
  const gl = program.context;

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

function setAttribute(programInfo, attributeName, ...data) {
  const setters = programInfo.attributeSetters;
  if (attributeName in setters) {
    const shaderName = `a_${attributeName}`;
    setters[shaderName](...data);
  }
}

function setAttributes(programInfo, attributes) {
  for (let attributeName in attributes) {
    setAttribute(programInfo, attributeName, attributes[attributeName]);
  }
}


// Uniform Setters
function createUniformSetters(program) {
  const gl = program.context;

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

function setUniform(programInfo, uniformName, ...data) {
  const setters = programInfo.uniformSetters;
  if (uniformName in setters) {
    const shaderName = `u_${uniformName}`;
    setters[shaderName](...data);
  }
}

function setUniforms(programInfo, uniforms) {
  for (let uniformName in uniforms) {
    setUniform(programInfo, uniformName, uniforms[uniformName]);
  }
}
