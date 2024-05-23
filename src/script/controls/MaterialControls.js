import { hexToRgb, rgbToHex } from "../utils/color.js";
import PhongMaterial from "../material/PhongMaterial.js";
import BasicMaterial from "../material/BasicMaterial.js";

class MaterialControls {
  constructor(scene, textures) {
    this._material = scene;
    this._textures = textures;
    this._textureIndex = 0;
    this._scene = scene;
    
    this.init();
    this.addEventListener();
  }

  init() {
    const materialGroup = document.getElementById("material-group");
    const materialType = document.getElementById("material-type");
    const basicParams = document.getElementById("basic-params");
    const phongParams = document.getElementById("phong-params");
    if (this._material) {
      if (this._material.constructor.name === "BasicMaterial") {
        materialGroup.style.display = "block";
        materialType.value = "basic";
        basicParams.style.display = "block";
        phongParams.style.display = "none";

        this.initAmbientColor = this._material._color;

        const ambientColorPicker = document.getElementById("basic-ambient");
        ambientColorPicker.value = rgbToHex([this.initAmbientColor[0], this.initAmbientColor[1], this.initAmbientColor[2]]);

      } else if (this._material.constructor.name === "PhongMaterial") {
        materialGroup.style.display = "block";
        materialType.value = "phong";
        basicParams.style.display = "none";
        phongParams.style.display = "block";

        this.initShininess = this._material._shininess;
        this.initAmbientColor = this._material._ambient;
        this.initDiffuseColor = this._material._diffuse.color;
        this.initDiffuseTexture = this._material._diffuse.texture ? "on" : "off";
        console.log(this.initDiffuseTexture)
        this.initSpecularColor = this._material._specular.color;
        this.initSpecularTexture = this._material._specular.texture ? "on" : "off";
        this.initDisplacementTexture = this._material._displacement ? "on" : "off";
        this.initNormalTexture = this._material._normal ? "on" : "off";
        this.initTextureOption = this._material._textureType;

        const shininessSlider = document.getElementById("shininess-slider");
        shininessSlider.value = this.initShininess;
        const shininessInput = document.getElementById("shininess-input");
        shininessInput.value = this.initShininess;

        const ambientColorPicker = document.getElementById("phong-ambient");
        ambientColorPicker.value = rgbToHex([this.initAmbientColor[0], this.initAmbientColor[1], this.initAmbientColor[2]]);

        const diffuseColorPicker = document.getElementById("phong-diffuse");
        diffuseColorPicker.value = rgbToHex([this.initDiffuseColor[0], this.initDiffuseColor[1], this.initDiffuseColor[2]]);

        const diffuseTexture = document.getElementById("texture-diffuse");
        diffuseTexture.value = this.initDiffuseTexture;

        const specularColorPicker = document.getElementById("phong-specular");
        specularColorPicker.value = rgbToHex([this.initSpecularColor[0], this.initSpecularColor[1], this.initSpecularColor[2]]);

        const specularTexture = document.getElementById("texture-specular");
        specularTexture.value = this.initSpecularTexture;

        const displacementTexture = document.getElementById("texture-displacement");
        displacementTexture.value = this.initDisplacementTexture;

        const normalTexture = document.getElementById("texture-normal");
        normalTexture.value = this.initNormalTexture;

        const textureOption = document.getElementById("texture-options");
        textureOption.value = this.initTextureOption;
      }
    } else {
      materialGroup.style.display = "none";
      basicParams.style.display = "none";
      phongParams.style.display = "none";
    }
  }

  setMaterial(material) {
    this._material = material;
    this.init();
    this.addEventListener();
  }

  addEventListener() {
    if (this._material) {
      if (this._material.constructor.name === "BasicMaterial") {
        const ambientColorPicker = document.getElementById("basic-ambient");
        ambientColorPicker.addEventListener("input", this.handleAmbientColor.bind(this));

      } else if (this._material.constructor.name === "PhongMaterial") {
        const shininessSlider = document.getElementById("shininess-slider");
        shininessSlider.addEventListener("input", this.handleShininessSlider.bind(this));
        const shininessInput = document.getElementById("shininess-input");
        shininessInput.addEventListener("input", this.handleShininessSlider.bind(this));

        const ambientColorPicker = document.getElementById("phong-ambient");
        ambientColorPicker.addEventListener("input", this.handleAmbientColor.bind(this));

        const diffuseColorPicker = document.getElementById("phong-diffuse");
        diffuseColorPicker.addEventListener("input", this.handleDiffuseColor.bind(this));

        const diffuseTexture = document.getElementById("texture-diffuse");
        diffuseTexture.addEventListener("change", this.handleTextureOption.bind(this));

        const specularColorPicker = document.getElementById("phong-specular");
        specularColorPicker.addEventListener("input", this.handleSpecularColor.bind(this));

        const specularTexture = document.getElementById("texture-specular");
        specularTexture.addEventListener("change", this.handleTextureOption.bind(this));

        const displacementTexture = document.getElementById("texture-displacement");
        displacementTexture.addEventListener("change", this.handleTextureOption.bind(this));

        const normalTexture = document.getElementById("texture-normal");
        normalTexture.addEventListener("change", this.handleTextureOption.bind(this));

        const textureOption = document.getElementById("texture-options");
        textureOption.addEventListener("change", this.handleTextureOption.bind(this));
      }

      const materialType = document.getElementById("material-type");
      materialType.addEventListener("change", this.handleMaterialType.bind(this));
    }
  }

  handleAmbientColor(event) {
    if (this._material.constructor.name === "BasicMaterial") {
      this._material._color = hexToRgb(event.target.value);
    } else if (this._material.constructor.name === "PhongMaterial") {
      this._material._ambient = hexToRgb(event.target.value);
    }
    this._material.updateUniforms();
  }

  handleShininessSlider(event) {
    const value = parseFloat(event.target.value);
    const shininessInput = document.getElementById("shininess-input");
    shininessInput.value = value;
    this._material._shininess = value;
    this._material.updateUniforms();
  }

  handleShininessInput(event) {
    const value = parseFloat(event.target.value);
    const shininessSlider = document.getElementById("shininess-slider");
    shininessSlider.value = value;
    this._material._shininess = value;
    this._material.updateUniforms();
  }

  handleDiffuseColor(event) {
    this._material._diffuse.color = hexToRgb(event.target.value);
    this._material.updateUniforms();
  }

  handleDiffuseTexture(event) {
    this._material._diffuse.texture = event.target.value === "on" ? this._textures[this._textureIndex]._diffuseTexture : this._textures[this._textureIndex]._defaultTexture;
    this._material.updateUniforms();
  }

  handleSpecularColor(event) {
    this._material._specular.color = hexToRgb(event.target.value);
    this._material.updateUniforms();
  }

  handleSpecularTexture(event) {
    this._material._specular.texture = event.target.value === "on" ? this._textures[this._textureIndex]._specularTexture : this._textures[this._textureIndex]._defaultTexture;
    this._material.updateUniforms();
  }

  handleDisplacementTexture(event) {
    this._material._displacement = event.target.value === "on" ? this._textures[this._textureIndex]._bumpTexture : this._textures[this._textureIndex]._defaultTexture;
    this._material.updateUniforms();
  }

  handleNormalTexture(event) {
    this._material._normal = event.target.value === "on" ? this._textures[this._textureIndex]._normalTexture : this._textures[this._textureIndex]._defaultTexture;
    this._material.updateUniforms();
  }

  handleTextureOption(event) {
    this._material._textureType = event.target.value;

    switch (event.target.value) {
      case "concrete":
        this._material.setTextures(this._textures[0]);
        this._textureIndex = 0;
        this._material._textureOption = 1;
        break;
      case "mud":
        this._material.setTextures(this._textures[1]);
        this._textureIndex = 1;
        this._material._textureOption = 1;
        break;
      case "environment":
        this._material._environment = this._textures[2];
        this._textureIndex = 2;
        this._material._textureOption = 2;
        break;
      default:
        this._material.setTextures(null);
        this._material._textureOption = 0;
        break;
    }

    this._material.updateUniforms();
  }

  handleMaterialType(event) {
    const materialGroup = document.getElementById("material-group");
    const basicParams = document.getElementById("basic-params");
    const phongParams = document.getElementById("phong-params");
  
    if (event.target.value === "basic") {
      this._material = new BasicMaterial();
      materialGroup.style.display = "block";
      basicParams.style.display = "block";
      phongParams.style.display = "none";
    } else if (event.target.value === "phong") {
      this._material = new PhongMaterial({});
      materialGroup.style.display = "block";
      basicParams.style.display = "none";
      phongParams.style.display = "block";
    }
  
    const selectedObjectName = document.getElementById('selected-object').value;
    const selectedObject = this._scene.getObjectByName(selectedObjectName);
    if (selectedObject) {
      selectedObject._material = this._material;
    }
  
    this._material.updateUniforms();

    this.init();
    this.addEventListener();
  }
  

}

export default MaterialControls;