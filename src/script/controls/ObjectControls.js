import Object3D from "../objects/Object3D.js";
import { hexToRgb, rgbToHex } from "../utils/color.js";

class ObjectControls {
  constructor(object) {
    this.object = object;

    this.init();
    this.addEventListeners();
  }

  init() {
    if (this.object instanceof Object3D) {
      const shapeColor = document.getElementById("shape-color");
      if (this.object._geometry) {
        const shapeColorPicker = document.getElementById("shape-color-picker");
        const shapeGradient = document.getElementById("shape-gradient");
        const shapeGradientToggle = document.getElementById("shape-gradient-toggle");
        if (this.object._geometry.constructor.name === "BoxGeometry") {
          shapeGradientToggle.style.display = "block";
        } else {
          shapeGradientToggle.style.display = "none";
        }

        shapeColor.style.display = "block";
        if (this.object._geometry._color) {
          shapeColorPicker.style.display = "block";
          shapeGradient.value = "off";
          this.initColor = this.object._geometry._color;

          const colorPicker = document.getElementById("shape-color-input");
          colorPicker.value = rgbToHex([this.initColor[0], this.initColor[1], this.initColor[2]]);
          const colorValue = document.getElementById("shape-color-value");
          colorValue.value = colorPicker.value;
        } else {
          shapeColorPicker.style.display = "none";
          shapeGradient.value = "on";
        }
      } else {
        shapeColor.style.display = "none";
      }

      this.initPositionX = this.object._position._x;
      this.initPositionY = this.object._position._y;
      this.initPositionZ = this.object._position._z;

      this.initScaleX = this.object._scale._x;
      this.initScaleY = this.object._scale._y;
      this.initScaleZ = this.object._scale._z;

      this.initRotationX = this.object._rotation._x;
      this.initRotationY = this.object._rotation._y;
      this.initRotationZ = this.object._rotation._z;

      const translateXSlider = document.getElementById("translate-x-slider");
      translateXSlider.value = this.object._position._x;
      const translateXInput = document.getElementById("translate-x-input");
      translateXInput.value = this.object._position._x;

      const translateYSlider = document.getElementById("translate-y-slider");
      translateYSlider.value = this.object._position._y;
      const translateYInput = document.getElementById("translate-y-input");
      translateYInput.value = this.object._position._y;

      const translateZSlider = document.getElementById("translate-z-slider");
      translateZSlider.value = this.object._position._z;
      const translateZInput = document.getElementById("translate-z-input");
      translateZInput.value = this.object._position._z;

      const scaleXSlider = document.getElementById("scale-x-slider");
      scaleXSlider.value = this.object._scale._x;
      const scaleXInput = document.getElementById("scale-x-input");
      scaleXInput.value = this.object._scale._x;

      const scaleYSlider = document.getElementById("scale-y-slider");
      scaleYSlider.value = this.object._scale._y;
      const scaleYInput = document.getElementById("scale-y-input");
      scaleYInput.value = this.object._scale._y;

      const scaleZSlider = document.getElementById("scale-z-slider");
      scaleZSlider.value = this.object._scale._z;
      const scaleZInput = document.getElementById("scale-z-input");
      scaleZInput.value = this.object._scale._z;

      const rotationXSlider = document.getElementById("rotation-x-slider");
      rotationXSlider.value = this.object._rotation._x;
      const rotationXInput = document.getElementById("rotation-x-input");
      rotationXInput.value = this.object._rotation._x;

      const rotationYSlider = document.getElementById("rotation-y-slider");
      rotationYSlider.value = this.object._rotation._y;
      const rotationYInput = document.getElementById("rotation-y-input");
      rotationYInput.value = this.object._rotation._y;

      const rotationZSlider = document.getElementById("rotation-z-slider");
      rotationZSlider.value = this.object._rotation._z;
      const rotationZInput = document.getElementById("rotation-z-input");
      rotationZInput.value = this.object._rotation._z;
    }
  }

  setObject(object) {
    this.object = object;
    this.init();
  }

  addEventListeners() {
    const colorPicker = document.getElementById("shape-color-input");
    colorPicker.addEventListener("input", this.handleColorPicker.bind(this));

    const shapeGradient = document.getElementById("shape-gradient");
    shapeGradient.addEventListener("input", this.handleShapeGradient.bind(this));

    const translateXSlider = document.getElementById("translate-x-slider");
    translateXSlider.addEventListener("input", this.handleTranslateXSlider.bind(this));

    const translateXInput = document.getElementById("translate-x-input");
    translateXInput.addEventListener("input", this.handleTranslateXInput.bind(this));

    const translateYSlider = document.getElementById("translate-y-slider");
    translateYSlider.addEventListener("input", this.handleTranslateYSlider.bind(this));

    const translateYInput = document.getElementById("translate-y-input");
    translateYInput.addEventListener("input", this.handleTranslateYInput.bind(this));

    const translateZSlider = document.getElementById("translate-z-slider");
    translateZSlider.addEventListener("input", this.handleTranslateZSlider.bind(this));

    const translateZInput = document.getElementById("translate-z-input");
    translateZInput.addEventListener("input", this.handleTranslateZInput.bind(this));

    const scaleXSlider = document.getElementById("scale-x-slider");
    scaleXSlider.addEventListener("input", this.handleScaleXSlider.bind(this));

    const scaleXInput = document.getElementById("scale-x-input");
    scaleXInput.addEventListener("input", this.handleScaleXInput.bind(this));

    const scaleYSlider = document.getElementById("scale-y-slider");
    scaleYSlider.addEventListener("input", this.handleScaleYSlider.bind(this));

    const scaleYInput = document.getElementById("scale-y-input");
    scaleYInput.addEventListener("input", this.handleScaleYInput.bind(this));

    const scaleZSlider = document.getElementById("scale-z-slider");
    scaleZSlider.addEventListener("input", this.handleScaleZSlider.bind(this));

    const scaleZInput = document.getElementById("scale-z-input");
    scaleZInput.addEventListener("input", this.handleScaleZInput.bind(this));

    const rotationXSlider = document.getElementById("rotation-x-slider");
    rotationXSlider.addEventListener("input", this.handleRotationXSlider.bind(this));

    const rotationXInput = document.getElementById("rotation-x-input");
    rotationXInput.addEventListener("input", this.handleRotationXInput.bind(this));

    const rotationYSlider = document.getElementById("rotation-y-slider");
    rotationYSlider.addEventListener("input", this.handleRotationYSlider.bind(this));

    const rotationYInput = document.getElementById("rotation-y-input");
    rotationYInput.addEventListener("input", this.handleRotationYInput.bind(this));

    const rotationZSlider = document.getElementById("rotation-z-slider");
    rotationZSlider.addEventListener("input", this.handleRotationZSlider.bind(this));

    const rotationZInput = document.getElementById("rotation-z-input");
    rotationZInput.addEventListener("input", this.handleRotationZInput.bind(this));
  }

  handleShapeGradient(event) {
    const value = event.target.value;
    if (value === "on") {
      this.object._geometry._color = null;
      this.object._geometry.setGradientColor();
    } else {
      this.object._geometry._color = [1,1,1,1];
      this.object._geometry.setColor();
    }

    this.init();
    this.addEventListeners();
  }

  handleColorPicker(event) {
    const value = event.target.value;
    const rgb = hexToRgb(value);
    if (this.object._geometry) {
      this.object._geometry._color = rgb;
      const colorValue = document.getElementById("shape-color-value");
      colorValue.value = value;

      this.object._geometry.setColor();
    }
  }

  handleTranslateXSlider(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.translateX(value);
      const translateXInput = document.getElementById("translate-x-input");
      translateXInput.value = value;
    }
  }

  handleTranslateXInput(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.translateX(value);
      const translateXSlider = document.getElementById("translate-x-slider");
      translateXSlider.value = value;
    }
  }

  handleTranslateYSlider(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.translateY(value);
      const translateYInput = document.getElementById("translate-y-input");
      translateYInput.value = value;
    }
  }

  handleTranslateYInput(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.translateY(value);
      const translateYSlider = document.getElementById("translate-y-slider");
      translateYSlider.value = value;
    }
  }

  handleTranslateZSlider(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.translateZ(value);
      const translateZInput = document.getElementById("translate-z-input");
      translateZInput.value = value;
    }
  }

  handleTranslateZInput(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.translateZ(value);
      const translateZSlider = document.getElementById("translate-z-slider");
      translateZSlider.value = value;
    }
  }

  handleScaleXSlider(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.scaleX(value);
      const scaleXInput = document.getElementById("scale-x-input");
      scaleXInput.value = value;
    }
  }

  handleScaleXInput(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.scaleX(value);
      const scaleXSlider = document.getElementById("scale-x-slider");
      scaleXSlider.value = value;
    }
  }

  handleScaleYSlider(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.scaleY(value);
      const scaleYInput = document.getElementById("scale-y-input");
      scaleYInput.value = value;
    }
  }

  handleScaleYInput(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.scaleY(value);
      const scaleYSlider = document.getElementById("scale-y-slider");
      scaleYSlider.value = value;
    }
  }

  handleScaleZSlider(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.scaleZ(value);
      const scaleZInput = document.getElementById("scale-z-input");
      scaleZInput.value = value;
    }
  }

  handleScaleZInput(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.scaleZ(value);
      const scaleZSlider = document.getElementById("scale-z-slider");
      scaleZSlider.value = value;
    }
  }

  handleRotationXSlider(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.rotateX(value);
      const rotationXInput = document.getElementById("rotation-x-input");
      rotationXInput.value = value;
    }
  }

  handleRotationXInput(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.rotateX(value);
      const rotationXSlider = document.getElementById("rotation-x-slider");
      rotationXSlider.value = value;
    }
  }

  handleRotationYSlider(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.rotateY(value);
      const rotationYInput = document.getElementById("rotation-y-input");
      rotationYInput.value = value;
    }
  }

  handleRotationYInput(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.rotateY(value);
      const rotationYSlider = document.getElementById("rotation-y-slider");
      rotationYSlider.value = value;
    }
  }

  handleRotationZSlider(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.rotateZ(value);
      const rotationZInput = document.getElementById("rotation-z-input");
      rotationZInput.value = value;
    }
  }

  handleRotationZInput(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.rotateZ(value);
      const rotationZSlider = document.getElementById("rotation-z-slider");
      rotationZSlider.value = value;
    }
  }
}

export default ObjectControls;