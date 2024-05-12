class WebGLRenderer {
  constructor(canvas) {
    this._canvas = document.querySelector(canvas);
    this._gl = canvas.getContext('webgl');
    this._shaderCache = {};
    this._currentProgram = null;

    this.setViewport();
    
    this.adjustCanvas();
    const ro = new ResizeObserver(this.adjustCanvas.bind(this));
    ro.observe(this._canvas, {box: 'content-box'});
  }

  setViewport() {
    this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
  }

  adjustCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width * dpr;
    const height = rect.height * dpr;
    
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  }

  createOrGetMaterial(material) {
    if (material instanceof ShaderMaterial) {
      const progId = material.id;
      if (!this._shaderCache[progId]) {
        const vertexShader = createShader(this._gl, material.vertexShader, ShaderType.VERTEX);
        const fragmentShader = createShader(this._gl, material.fragmentShader, ShaderType.FRAGMENT);
        const program = createProgram(this._gl, vertexShader, fragmentShader);
        this._shaderCache[progId] = program;
      }

      return this._shaderCache[progId];
    }
  }

  setProgramInfo(programInfo) {
    this._gl.useProgram(programInfo.program);
    this._currentProgram = programInfo;
  }

  render(scene, camera) {
    const gl = this._gl;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    const defaultUniform = {
      cameraPosition: camera.worldPosition,
      viewMatrix: camera.viewProjectionMatrix,
    }

    const renderObject = (object, uniforms) => {
      if (!object.visible) return;
      object.updateWorldMatrix(false, true);
      if (object instanceof Mesh && object.geometry.attributes.position) {
        const material = object.material;
        const info = this.createOrGetMaterial(material);
        setProgramInfo(info);
        setAttributes(info, object.geometry.attributes);
        setUniforms(info, {
          ...material.uniforms,
          ...uniforms,
          worldMatrix: object.worldMatrix,
          useVertexColor: object.geometry.useVertexColors,
        });
        this._gl.drawArrays(this._gl.TRIANGLES, 0, object.geometry.attributes.position.count);
      }
      object.children.forEach(child => renderObject(child, uniforms));
    };

    renderObject(scene, defaultUniform);
  }

}