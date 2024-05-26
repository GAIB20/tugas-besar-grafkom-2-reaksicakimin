import { hexToRgb, rgbToHex } from "../utils/color.js";
import DirectionalLight from "../light/DirectionalLight.js";
import SpotLight from "../light/SpotLight.js";
import { getScene } from "../../app/app.js";

class LightControls {
  constructor(scene, light) {
    this._scene = scene;
    this._light = light;
    this._listeners = {};

    this.init();
    this.addEventListener();
 }

 // getter
  getLight(){
    return this._light;
  }

 // setter
  setLight(light){
    this._light = light;
    this.init();
    this.removeEventListener();
    this.addEventListener();
  }

  init() {
    const lightType = document.getElementById("light-type");
    const lightTarget = document.getElementById("light-target");
    const lightInnerCutOff = document.getElementById("light-inner-cut-off");
    const lightOuterCutOff = document.getElementById("light-outer-cut-off");

    if (this._light.constructor.name === 'DirectionalLight') {
      lightType.value = "directional";
      lightTarget.style.display = "none";
      lightInnerCutOff.style.display = "none";
      lightOuterCutOff.style.display = "none";
    } else if (this._light.constructor.name === 'SpotLight') {
      lightType.value = "spot";
      lightTarget.style.display = "block";
      lightInnerCutOff.style.display = "block";
      lightOuterCutOff.style.display = "block";

      this.initTargetX = this._light._target._x;
      this.initTargetY = this._light._target._y;
      this.initTargetZ = this._light._target._z;
      this.initInnerCutOff = this._light._cutOff.inner;
      this.initOuterCutOff = this._light._cutOff.outer;

      const lightTargetXSlider = document.getElementById("light-target-x-slider");
      lightTargetXSlider.value = this.initTargetX;
      const lightTargetXInput = document.getElementById("light-target-x-input");
      lightTargetXInput.value = this.initTargetX;

      const lightTargetYSlider = document.getElementById("light-target-y-slider");
      lightTargetYSlider.value = this.initTargetY;
      const lightTargetYInput = document.getElementById("light-target-y-input");
      lightTargetYInput.value = this.initTargetY;

      const lightTargetZSlider = document.getElementById("light-target-z-slider");
      lightTargetZSlider.value = this.initTargetZ;
      const lightTargetZInput = document.getElementById("light-target-z-input");
      lightTargetZInput.value = this.initTargetZ;

      const lightInnerCutOffSlider = document.getElementById("light-inner-cut-off-slider");
      lightInnerCutOffSlider.value = this.initInnerCutOff;
      const lightInnerCutOffInput = document.getElementById("light-inner-cut-off-input");
      lightInnerCutOffInput.value = this.initInnerCutOff;

      const lightOuterCutOffSlider = document.getElementById("light-outer-cut-off-slider");
      lightOuterCutOffSlider.value = this.initOuterCutOff;
      const lightOuterCutOffInput = document.getElementById("light-outer-cut-off-input");
      lightOuterCutOffInput.value = this.initOuterCutOff;
    }

    this.initPositionX = this._light._position._x;
    this.initPositionY = this._light._position._y;
    this.initPositionZ = this._light._position._z;
    this.initColor = rgbToHex(this._light._color);
    this.initIntensity = this._light._intensity;

    const lightPositionXSlider = document.getElementById("light-x-slider");
    lightPositionXSlider.value = this.initPositionX;
    const lightPositionXInput = document.getElementById("light-x-input");
    lightPositionXInput.value = this.initPositionX;

    const lightPositionYSlider = document.getElementById("light-y-slider");
    lightPositionYSlider.value = this.initPositionY;
    const lightPositionYInput = document.getElementById("light-y-input");
    lightPositionYInput.value = this.initPositionY;

    const lightPositionZSlider = document.getElementById("light-z-slider");
    lightPositionZSlider.value = this.initPositionZ;
    const lightPositionZInput = document.getElementById("light-z-input");
    lightPositionZInput.value = this.initPositionZ;

    const lightColor = document.getElementById("light-color");
    lightColor.value = this.initColor;

    const lightIntensitySlider = document.getElementById("light-intensity-slider");
    lightIntensitySlider.value = this.initIntensity;
    const lightIntensityInput = document.getElementById("light-intensity-input");
    lightIntensityInput.value = this.initIntensity;
  }

  removeEventListener() {
    if (this._listeners.addLight) {
      document.getElementById("add-light").removeEventListener("click", this._listeners.addLight);
    }
    if (this._listeners.deleteLight) {
      document.getElementById("delete-light").removeEventListener("click", this._listeners.deleteLight);
    }
  }

  addEventListener() {
    this._listeners.addLight = this.addLight.bind(this);
    this._listeners.deleteLight = this.deleteLight.bind(this);

    document.getElementById("add-light").addEventListener("click", this._listeners.addLight);
    document.getElementById("delete-light").addEventListener("click", this._listeners.deleteLight);



    // const addlight = document.getElementById("add-light");
    // addlight.addEventListener("click", this.addLight.bind(this));

    // const deleteLight = document.getElementById("delete-light");
    // deleteLight.addEventListener("click", this.deleteLight.bind(this));

    const lightType = document.getElementById("light-type");
    lightType.addEventListener("change", this.handleLightType.bind(this));

    const lightPositionXSlider = document.getElementById("light-x-slider");
    lightPositionXSlider.addEventListener("input", this.handleLightPositionXSlider.bind(this));

    const lightPositionXInput = document.getElementById("light-x-input");
    lightPositionXInput.addEventListener("input", this.handleLightPositionXInput.bind(this));

    const lightPositionYSlider = document.getElementById("light-y-slider");
    lightPositionYSlider.addEventListener("input", this.handleLightPositionYSlider.bind(this));

    const lightPositionYInput = document.getElementById("light-y-input");
    lightPositionYInput.addEventListener("input", this.handleLightPositionYInput.bind(this));

    const lightPositionZSlider = document.getElementById("light-z-slider");
    lightPositionZSlider.addEventListener("input", this.handleLightPositionZSlider.bind(this));

    const lightPositionZInput = document.getElementById("light-z-input");
    lightPositionZInput.addEventListener("input", this.handleLightPositionZInput.bind(this));

    const lightColor = document.getElementById("light-color");
    lightColor.addEventListener("input", this.handleLightColor.bind(this));

    const lightIntensitySlider = document.getElementById("light-intensity-slider");
    lightIntensitySlider.addEventListener("input", this.handleLightIntensitySlider.bind(this));

    const lightIntensityInput = document.getElementById("light-intensity-input");
    lightIntensityInput.addEventListener("input", this.handleLightIntensityInput.bind(this));

    if (this._light.constructor.name === 'SpotLight') {
      const lightTargetXSlider = document.getElementById("light-target-x-slider");
      lightTargetXSlider.addEventListener("input", this.handleLightTargetXSlider.bind(this));

      const lightTargetXInput = document.getElementById("light-target-x-input");
      lightTargetXInput.addEventListener("input", this.handleLightTargetXInput.bind(this));

      const lightTargetYSlider = document.getElementById("light-target-y-slider");
      lightTargetYSlider.addEventListener("input", this.handleLightTargetYSlider.bind(this));

      const lightTargetYInput = document.getElementById("light-target-y-input");
      lightTargetYInput.addEventListener("input", this.handleLightTargetYInput.bind(this));

      const lightTargetZSlider = document.getElementById("light-target-z-slider");
      lightTargetZSlider.addEventListener("input", this.handleLightTargetZSlider.bind(this));

      const lightTargetZInput = document.getElementById("light-target-z-input");
      lightTargetZInput.addEventListener("input", this.handleLightTargetZInput.bind(this));

      const lightInnerCutOffSlider = document.getElementById("light-inner-cut-off-slider");
      lightInnerCutOffSlider.addEventListener("input", this.handleLightInnerCutOffSlider.bind(this));

      const lightInnerCutOffInput = document.getElementById("light-inner-cut-off-input");
      lightInnerCutOffInput.addEventListener("input", this.handleLightInnerCutOffInput.bind(this));

      const lightOuterCutOffSlider = document.getElementById("light-outer-cut-off-slider");
      lightOuterCutOffSlider.addEventListener("input", this.handleLightOuterCutOffSlider.bind(this));

      const lightOuterCutOffInput = document.getElementById("light-outer-cut-off-input");
      lightOuterCutOffInput.addEventListener("input", this.handleLightOuterCutOffInput.bind(this));
    }
  }

  handleLightType(event) {
    if (event.target.value === "directional") {
      this._light = new DirectionalLight({});
    } else if (event.target.value === "spot") {
      this._light = new SpotLight({});
    }
    this._light._name = "Light";

    let light = this._scene.getObjectByName("Light");
    if (light) {
      this._scene.add(this._light);
      this._scene.remove(light);
    }

    this._light.updateUniforms();
    this.init();
    this.addEventListener();
  }

  handleLightPositionXInput(event) {
    const value = parseFloat(event.target.value);
    const lightPositionXSlider = document.getElementById("light-x-slider");
    lightPositionXSlider.value = value;
    this._light._position._x = value;
    this._light.updateUniforms();
  }

  handleLightPositionXSlider(event) {
    console.log(event);
    const value = parseFloat(event.target.value);
    const lightPositionXInput = document.getElementById("light-x-input");
    lightPositionXInput.value = value;
    this._light._position._x = value;
    this._light.updateUniforms();
  }

  handleLightPositionYInput(event) {
    const value = parseFloat(event.target.value);
    const lightPositionYSlider = document.getElementById("light-y-slider");
    lightPositionYSlider.value = value;
    this._light._position._y = value;
    this._light.updateUniforms();
  }

  handleLightPositionYSlider(event) {
    const value = parseFloat(event.target.value);
    const lightPositionYInput = document.getElementById("light-y-input");
    lightPositionYInput.value = value;
    this._light._position._y = value;
    this._light.updateUniforms();
  }

  handleLightPositionZInput(event) {
    const value = parseFloat(event.target.value);
    const lightPositionZSlider = document.getElementById("light-z-slider");
    lightPositionZSlider.value = value;
    this._light._position._z = value;
    this._light.updateUniforms();
  }

  handleLightPositionZSlider(event) {
    const value = parseFloat(event.target.value);
    const lightPositionZInput = document.getElementById("light-z-input");
    lightPositionZInput.value = value;
    this._light._position._z = value;
    this._light.updateUniforms();
  }

  handleLightColor(event) {
    this._light._color = hexToRgb(event.target.value);
    this._light.updateUniforms();
  }

  handleLightIntensityInput(event) {
    const value = parseFloat(event.target.value);
    const lightIntensitySlider = document.getElementById("light-intensity-slider");
    lightIntensitySlider.value = value;
    this._light._intensity = value;
    this._light.updateUniforms();
  }

  handleLightIntensitySlider(event) {
    const value = parseFloat(event.target.value);
    const lightIntensityInput = document.getElementById("light-intensity-input");
    lightIntensityInput.value = value;
    this._light._intensity = value;
    this._light.updateUniforms();
  }

  handleLightTargetXInput(event) {
    const value = parseFloat(event.target.value);
    const lightTargetXSlider = document.getElementById("light-target-x-slider");
    lightTargetXSlider.value = value;
    this._light._target._x = value;
    this._light.updateUniforms();
  }

  handleLightTargetXSlider(event) {
    const value = parseFloat(event.target.value);
    const lightTargetXInput = document.getElementById("light-target-x-input");
    lightTargetXInput.value = value;
    this._light._target._x = value;
    this._light.updateUniforms();
  }

  handleLightTargetYInput(event) {
    const value = parseFloat(event.target.value);
    const lightTargetYSlider = document.getElementById("light-target-y-slider");
    lightTargetYSlider.value = value;
    this._light._target._y = value;
    this._light.updateUniforms();
  }

  handleLightTargetYSlider(event) {
    const value = parseFloat(event.target.value);
    const lightTargetYInput = document.getElementById("light-target-y-input");
    lightTargetYInput.value = value;
    this._light._target._y = value;
    this._light.updateUniforms();
  }

  handleLightTargetZInput(event) {
    const value = parseFloat(event.target.value);
    const lightTargetZSlider = document.getElementById("light-target-z-slider");
    lightTargetZSlider.value = value;
    this._light._target._z = value;
    this._light.updateUniforms();
  }

  handleLightTargetZSlider(event) {
    const value = parseFloat(event.target.value);
    const lightTargetZInput = document.getElementById("light-target-z-input");
    lightTargetZInput.value = value;
    this._light._target._z = value;
    this._light.updateUniforms();
  }

  handleLightInnerCutOffInput(event) {
    const value = parseFloat(event.target.value);
    const lightInnerCutOffSlider = document.getElementById("light-inner-cut-off-slider");
    lightInnerCutOffSlider.value = value;
    this._light._cutOff.inner = value;
    this._light.updateUniforms();
  }

  handleLightInnerCutOffSlider(event) {
    const value = parseFloat(event.target.value);
    const lightInnerCutOffInput = document.getElementById("light-inner-cut-off-input");
    lightInnerCutOffInput.value = value;
    this._light._cutOff.inner = value;
    this._light.updateUniforms();
  }

  handleLightOuterCutOffInput(event) {
    const value = parseFloat(event.target.value);
    const lightOuterCutOffSlider = document.getElementById("light-outer-cut-off-slider");
    lightOuterCutOffSlider.value = value;
    this._light._cutOff.outer = value;
    this._light.updateUniforms();
  }

  handleLightOuterCutOffSlider(event) {
    const value = parseFloat(event.target.value);
    const lightOuterCutOffInput = document.getElementById("light-outer-cut-off-input");
    lightOuterCutOffInput.value = value;
    this._light._cutOff.outer = value;
    this._light.updateUniforms();
  }

  removeAnotherThanLight(json) {
    function findLightChildren(children) {
      let lightChildren = [];
      children.forEach(child => {
          if (child.type === "Light") {
              lightChildren.push(child);
          }
          if (child.children && child.children.length > 0) {
              lightChildren = lightChildren.concat(findLightChildren(child.children));
          }
      });
      return lightChildren;
  }
  const lightObjects = findLightChildren(json.children || []);
  return {
      ...json,
      children: lightObjects
  };

  }

  // buildLightHTML(json, parent){
  //   parent.innerHTML = '';
  //   console.log(json);
  //   const filteredjson = this.removeAnotherThanLight(json);
  //   console.log(filteredjson);

  //   const div = document.createElement('div');
  //   div.classList.add('list');
  //   const label = document.createElement('label');
  //   label.setAttribute('for', json.name);
  //   label.textContent = json.name;
  //   div.appendChild(label);

  //   div.addEventListener('click', function(event) {
  //     event.stopPropagation();
  //     let selectedObject = document.getElementById('selected-object');
  //     if (currentUnderlinedLabel && currentUnderlinedLabel !== label) {
  //       currentUnderlinedLabel.style.textDecoration = '';
  //     }
  //     if (label.style.textDecoration === 'underline') {
  //       label.style.textDecoration = '';
  //       currentUnderlinedLabel = null;

  //       selectedObject.value = '';
  //     } else {
  //       label.style.textDecoration = 'underline';
  //       currentUnderlinedLabel = label;

  //       selectedObject.value = json.name;
  //     }

  //     selectedObject.dispatchEvent(new Event('change'));
  //   });

  //   // if (json.children && json.children.length > 0) {
  //   //   const subDiv = document.createElement('div');
  //   //   subDiv.classList.add('items');
  //   //   json.children.forEach(child => {
  //   //     buildLightHTML(child, subDiv);
  //   //   });
  //   //   div.appendChild(subDiv);
  //   // }

  //   parent.appendChild(div);
  // }
  buildLightHTML(json, parent) {
    let currentUnderlinedLabel = null;
    parent.innerHTML = '';
    // console.log(json);
    const filteredjson = this.removeAnotherThanLight(json);
    // console.log(filteredjson);
  
    if (filteredjson.children && filteredjson.children.length > 0) {
      filteredjson.children.forEach(light => {
        const div = document.createElement('div');
        div.classList.add('list');
        const label = document.createElement('label');
        label.setAttribute('for', light.name);
        label.textContent = light.name;
        div.appendChild(label);
  
        div.addEventListener('click', function(event) {
          event.stopPropagation();
          let selectedObject = document.getElementById('selected-light-object');
          if (currentUnderlinedLabel && currentUnderlinedLabel !== label) {
            currentUnderlinedLabel.style.textDecoration = '';
          }
          if (label.style.textDecoration === 'underline') {
            label.style.textDecoration = '';
            currentUnderlinedLabel = null;
            selectedObject.value = '';
          } else {
            label.style.textDecoration = 'underline';
            currentUnderlinedLabel = label;
            selectedObject.value = light.name;
          }
          selectedObject.dispatchEvent(new Event('change'));
        });
  
        parent.appendChild(div);
      });
    }
  }

  addLight(event){
    console.log(event);
    const newLight = new DirectionalLight();
    newLight._name = "new light";
    const scene = getScene();
    console.log(newLight);
    scene.add(newLight);
    this.buildLightHTML(scene.toJSON(), document.getElementById('container-light'));
  }

  deleteLight(event){
    console.log(event);
    const scene = getScene();
    // const selectedLight = document.getElementById("selected-light-object").value;
    // const light = scene.getObjectByName(selectedLight);
    scene.remove(this._light);
    this.buildLightHTML(scene.toJSON(), document.getElementById('container-light'));
  }
  
  changeName(){
    const renameForm = document.getElementById("rename-form");
    const lightnameInput = document.getElementById("lightname");

    renameForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent form from submitting the traditional way
      const newName = lightnameInput.value;

      // Update the shape's name
      this._light._name = newName;

      // Optionally, update the scene or any other elements
      buildLightHTML(this.scene.toJSON(), document.getElementById('container'));

      alert(`Shape renamed to: ${newName}`);
    });
  }
}

export default LightControls;