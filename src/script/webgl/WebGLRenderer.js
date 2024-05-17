import Mesh from '../objects/Mesh.js';
import ShaderMaterial from '../material/ShaderMaterial.js';
import WebGLUtils from './WebGLUtils.js';
import { ShaderType } from './Types.js';
import { vertexShaderSourceBasic, fragmentShaderSourceBasic, vertexShaderSourcePhong, fragmentShaderSourcePhong } from './Shaders.js';
import BasicMaterial from '../material/BasicMaterial.js';
import PhongMaterial from '../material/PhongMaterial.js';




class WebGLRenderer {
  constructor(canvas) {
    this._canvas = canvas;
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
    
    this._gl = canvas.getContext('webgl');
    this._shaderCache = {};
    this._currentProgram = null;

    this.setViewport();
    
    // this.adjustCanvas();
    const ro = new ResizeObserver(this.adjustCanvas.bind(this));
    ro.observe(this._canvas, {box: 'content-box'});
  }
    
  setViewport() {
    this._gl.viewport(0, 0, this._canvas.clientWidth, this._canvas.clientHeight);
  }

  adjustCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width * dpr;
    const height = rect.height * dpr;
    
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      this._gl.viewport(0, 0, width, height);
    }
  }

  createOrGetMaterial(material) {
    if (material instanceof ShaderMaterial) {
      const progId = material.id;
      let vertexShaderSource, fragmentShaderSource;

      if (material instanceof BasicMaterial) {
        vertexShaderSource = vertexShaderSourceBasic;
        fragmentShaderSource = fragmentShaderSourceBasic;
      } else if (material instanceof PhongMaterial) {
        vertexShaderSource = vertexShaderSourcePhong;
        fragmentShaderSource = fragmentShaderSourcePhong;
      }

      if (!this._shaderCache[progId]) {
        const vertexShader = WebGLUtils.createShader(this._gl, vertexShaderSource, ShaderType.VERTEX);
        const fragmentShader = WebGLUtils.createShader(this._gl, fragmentShaderSource, ShaderType.FRAGMENT);
        const program = WebGLUtils.createProgram(this._gl, vertexShader, fragmentShader);
        this._shaderCache[progId] = program;
      }

      return this._shaderCache[progId];
    }
  }

  setProgramInfo(programInfo) {
    if (this._currentProgram !== programInfo) {
      this._gl.useProgram(programInfo.program);
      this._currentProgram = programInfo;
    }
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

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    const renderObject = (object, uniforms) => {
      if (!object.visible) return;
      object.computeWorldMatrix(false, true);
      if (object instanceof Mesh && object._geometry._attributes.position) {
        const material = object._material;
        const info = this.createOrGetMaterial(material);
        this.setProgramInfo(info);
        WebGLUtils.setAttributes(info, object._geometry._attributes);
        
        // Flip image pixels into the bottom-to-top order that WebGL expects.
        WebGLUtils.setUniforms(info, {
          ...object._material._uniforms,
          ...uniforms,
          worldMatrix: object._worldMatrix,
          useVertexColor: object._geometry._useVertexColors,
        });
        this._gl.drawArrays(this._gl.TRIANGLES, 0, object._geometry._attributes.position.count);
      }
      object.children.forEach(child => renderObject(child, uniforms));
    };

    renderObject(scene, defaultUniform);
  }

}

export default WebGLRenderer;