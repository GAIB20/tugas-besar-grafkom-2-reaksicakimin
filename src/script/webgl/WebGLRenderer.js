import Mesh from '../objects/Mesh.js';
import ShaderMaterial from '../material/ShaderMaterial.js';
import WebGLUtils from './WebGLUtils.js';
import { ShaderType } from './Types.js';
import { vertexShaderSourceBasic, fragmentShaderSourceBasic, vertexShaderSourcePhong, fragmentShaderSourcePhong } from './Shaders.js';
import BasicMaterial from '../material/BasicMaterial.js';
import PhongMaterial from '../material/PhongMaterial.js';
import Light from '../light/Light.js';
import DirectionalLight from '../light/DirectionalLight.js';
import SpotLight from '../light/SpotLight.js';
import { hexToRgb } from '../utils/color.js';
import Vector3 from '../math/Vector3.js';


class WebGLRenderer {
  constructor(canvas) {
    this._canvas = canvas;
    
    this._gl = canvas.getContext('webgl');
    this._shaderCache = {};
    this._currentProgram = null;
    this._canvasColor = [0, 0, 0, 1];

    this.setViewport();
    
    this.adjustCanvas();
    window.addEventListener('resize', () => {
      this.setViewport();
      this.adjustCanvas();
    });
    // listener canvas color
    const canvasColor = document.getElementById("canvas-color-input");
    const canvasColorLabel = document.getElementById("canvas-color-value");
    canvasColor.addEventListener("input", () => {
      const color = canvasColor.value;
      canvasColorLabel.innerText = color;
      this._canvasColor = hexToRgb(color);
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
    gl.clearColor(...this._canvasColor);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    const defaultUniform = {
      cameraPosition: camera.worldPosition,
      viewMatrix: camera.viewProjectionMatrix,
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
        if (object._material._textureOption === 0) {
          gl.activeTexture(gl.TEXTURE4);
          gl.bindTexture(gl.TEXTURE_CUBE_MAP, object._material._environment);
        }
      }
    }

    const renderObject = (object, uniforms) => {
      const lights = scene.getObjectByClassName(Light);
      const directionalLights = scene.getObjectByClassName(DirectionalLight);
      const spotLights = scene.getObjectByClassName(SpotLight);

      let lightDirPositions = new Float32Array(directionalLights.length * 3);
      let lightDirColors = new Float32Array(directionalLights.length * 4);
      let lightDirIntensities = new Float32Array(directionalLights.length);

      let lightSpotPositions = new Float32Array(spotLights.length * 3);
      let lightSpotColors = new Float32Array(spotLights.length * 4);
      let lightSpotIntensities = new Float32Array(spotLights.length);
      let lightSpotTargets = new Float32Array(spotLights.length * 3);
      let lightSpotInnerCutOffs = new Float32Array(spotLights.length);
      let lightSpotOuterCutOffs = new Float32Array(spotLights.length);

      let useSpotLights = false;
      let useDirLights = false;
      
      let dir = 0;
      let spot = 0;
      for (let i = 0; i < lights.length; i++) {
        const light = lights[i];
        if (light instanceof DirectionalLight) {
          let pos = light._position;
          let color = light._color;
          let intensity = light._intensity;
          lightDirPositions.set([pos._x, pos._y, pos._z], dir * 3);
          lightDirColors.set(color, dir * 4);
          lightDirIntensities[dir] = intensity;
          useDirLights = true;

          dir++;
        } else if (light instanceof SpotLight) {
          let pos = light._position;
          let color = light._color;
          let intensity = light._intensity;
          let target = light._target;
          let innerCutOff = light._cutOff.inner;
          let outerCutOff = light._cutOff.outer;
          lightSpotPositions.set([pos._x, pos._y, pos._z], spot * 3);
          lightSpotColors.set(color, spot * 4);
          lightSpotIntensities[spot] = intensity;
          lightSpotTargets.set([target._x, target._y, target._z], spot * 3);
          lightSpotInnerCutOffs[spot] = innerCutOff;
          lightSpotOuterCutOffs[spot] = outerCutOff;
          useSpotLights = true;

          spot++;
        }
      }

      const lightDirUniforms = {
        lightPosition: lightDirPositions,
        lightColor: lightDirColors,
        lightIntensity: lightDirIntensities,
        useDirLight: useDirLights,
        useSpotLight: useSpotLights,
      };

      const lightSpotUniforms = {
        spotLightPosition: lightSpotPositions,
        spotLightColor: lightSpotColors,
        spotLightIntensity: lightSpotIntensities,
        spotLightTarget: lightSpotTargets,
        spotLightInnerCutOff: lightSpotInnerCutOffs,
        spotLightOuterCutOff: lightSpotOuterCutOffs,
        useSpotLight: useSpotLights,
        useDirLight: useDirLights,
      };

      if (!object.visible) return;
      object.computeWorldMatrix(false, true);
      if (object instanceof Mesh && object._geometry._attributes.position) {
        const material = object._material;
        const info = this.createOrGetMaterial(material);
        this.setProgramInfo(info);
        WebGLUtils.setAttributes(info, object._geometry._attributes);
        setTexture(object);
        WebGLUtils.setUniforms(info, {
          ...lightDirUniforms,
          ...lightSpotUniforms,
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