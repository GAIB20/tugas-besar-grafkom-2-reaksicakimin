import Mesh from '../objects/Mesh.js';
import ShaderMaterial from '../material/ShaderMaterial.js';
import WebGLUtils from './WebGLUtils.js';
import { ShaderType } from './Types.js';
import { vertexShaderSourceBasic, fragmentShaderSourceBasic, vertexShaderSourcePhong, fragmentShaderSourcePhong } from './Shaders.js';
import BasicMaterial from '../material/BasicMaterial.js';
import PhongMaterial from '../material/PhongMaterial.js';
import DirectionalLight from '../light/DirectionalLight.js';


class WebGLRenderer {
  constructor(canvas) {
    this._canvas = canvas;
    
    this._gl = canvas.getContext('webgl');
    this._shaderCache = {};
    this._currentProgram = null;

    this.setViewport();
    
    this.adjustCanvas();
    window.addEventListener('resize', () => {
      this.setViewport();
      this.adjustCanvas();
    });
  }
    
  setViewport() {
    this._gl.viewport(0, 0, this._canvas.clientWidth, this._canvas.clientHeight);
  }

  adjustCanvas() {
    const canvas = this._canvas;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width * dpr;
    const height = rect.height * dpr;
    
    if (canvas.width !== width || canvas.height !== height) {
      const resize = new CustomEvent('resize', {
        detail: { width, height }
      });
      document.dispatchEvent(resize);

      canvas.width = width;
      canvas.height = height;
      this._gl.viewport(0, 0, width, height);
    }
  }

  createOrGetMaterial(material) {
    if (material instanceof ShaderMaterial) {
      const progId = material._id;
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

    const light = scene.getObjectByName("Light");
    const defaultUniform = {
      cameraPosition: camera.worldPosition,
      viewMatrix: camera.viewProjectionMatrix,
    }

    if (light instanceof DirectionalLight) {
      defaultUniform.lightPosition = light.position;
      defaultUniform.lightDirection = light._direction;
      defaultUniform.lightColor = light._color;
    }
    
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    const setTexture= (object) => {
      if (object._material instanceof PhongMaterial && object._material._displacement) {
        if (object._material._textureOption === 1) {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, object._material._normal);
          gl.activeTexture(gl.TEXTURE1);
          gl.bindTexture(gl.TEXTURE_2D, object._material._displacement);
          gl.activeTexture(gl.TEXTURE2);
          gl.bindTexture(gl.TEXTURE_2D, object._material._diffuse.texture);
          gl.activeTexture(gl.TEXTURE3);
          gl.bindTexture(gl.TEXTURE_2D, object._material._specular.texture);
        }
      }
    }

    const renderObject = (object, uniforms) => {
      if (!object.visible) return;
      object.computeWorldMatrix(false, true);
      if (object instanceof Mesh && object._geometry._attributes.position) {
        const material = object._material;
        const info = this.createOrGetMaterial(material);
        this.setProgramInfo(info);
        WebGLUtils.setAttributes(info, object._geometry._attributes);
        setTexture(object);
        WebGLUtils.setUniforms(info, {
          ...object._material._uniforms,
          ...uniforms,
          worldMatrix: object._worldMatrix,
          useVertexColor: object._geometry._useVertexColors,
        });
        this._gl.drawArrays(this._gl.TRIANGLES, 0, object._geometry._attributes.position.count);

      }

      // object.children.forEach(child => setTexture(child));
      object.children.forEach(child => renderObject(child, uniforms));
    };

    renderObject(scene, defaultUniform);
  }

}

export default WebGLRenderer;