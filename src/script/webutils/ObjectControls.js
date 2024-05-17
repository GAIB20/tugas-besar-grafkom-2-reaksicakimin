import Object3D from "../objects/Object3D.js";

class ObjectControls {
  constructor(object) {
    this.object = object;

    this.init();
    this.addEventListeners();
  }

  init() {
    if (this.object instanceof Object3D) {
      this.initPositionX = this.object._position._x;
      this.initPositionY = this.object._position._y;
      this.initPositionZ = this.object._position._z;

      this.initScaleX = this.object._scale._x;
      this.initScaleY = this.object._scale._y;
      this.initScaleZ = this.object._scale._z;

      this.initRotationX = this.object._rotation._x;
      this.initRotationY = this.object._rotation._y;
      this.initRotationZ = this.object._rotation._z;
    }
  }

  setObject(object) {
    this.object = object;
    this.init();
  }

  addEventListeners() {
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

  handleTranslateXSlider(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.translateX(this.initPositionX - value / 25);
      const translateXInput = document.getElementById("translate-x-input");
      translateXInput.value = value;
    }
  }

  handleTranslateXInput(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.translateX(this.initPositionX - value / 25);
      const translateXSlider = document.getElementById("translate-x-slider");
      translateXSlider.value = value;
    }
  }

  handleTranslateYSlider(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.translateY(this.initPositionY - value / 25);
      const translateYInput = document.getElementById("translate-y-input");
      translateYInput.value = value;
    }
  }

  handleTranslateYInput(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.translateY(this.initPositionY - value / 25);
      const translateYSlider = document.getElementById("translate-y-slider");
      translateYSlider.value = value;
    }
  }

  handleTranslateZSlider(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.translateZ(this.initPositionZ - value / 25);
      const translateZInput = document.getElementById("translate-z-input");
      translateZInput.value = value;
    }
  }

  handleTranslateZInput(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.translateZ(this.initPositionZ - value / 25);
      const translateZSlider = document.getElementById("translate-z-slider");
      translateZSlider.value = value;
    }
  }

  handleScaleXSlider(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.scaleX(this.initScaleX + value);
      const scaleXInput = document.getElementById("scale-x-input");
      scaleXInput.value = value;
    }
  }

  handleScaleXInput(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.scaleX(this.initScaleX + value);
      const scaleXSlider = document.getElementById("scale-x-slider");
      scaleXSlider.value = value;
    }
  }

  handleScaleYSlider(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.scaleY(this.initScaleY + value);
      const scaleYInput = document.getElementById("scale-y-input");
      scaleYInput.value = value;
    }
  }

  handleScaleYInput(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.scaleY(this.initScaleY + value);
      const scaleYSlider = document.getElementById("scale-y-slider");
      scaleYSlider.value = value;
    }
  }

  handleScaleZSlider(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.scaleZ(this.initScaleZ + value);
      const scaleZInput = document.getElementById("scale-z-input");
      scaleZInput.value = value;
    }
  }

  handleScaleZInput(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.scaleZ(this.initScaleZ + value);
      const scaleZSlider = document.getElementById("scale-z-slider");
      scaleZSlider.value = value;
    }
  }

  handleRotationXSlider(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.rotateX(this.initRotationX + value);
      const rotationXInput = document.getElementById("rotation-x-input");
      rotationXInput.value = value;
    }
  }

  handleRotationXInput(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.rotateX(this.initRotationX + value);
      const rotationXSlider = document.getElementById("rotation-x-slider");
      rotationXSlider.value = value;
    }
  }

  handleRotationYSlider(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.rotateY(this.initRotationY + value);
      const rotationYInput = document.getElementById("rotation-y-input");
      rotationYInput.value = value;
    }
  }

  handleRotationYInput(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.rotateY(this.initRotationY + value);
      const rotationYSlider = document.getElementById("rotation-y-slider");
      rotationYSlider.value = value;
    }
  }

  handleRotationZSlider(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.rotateZ(this.initRotationZ + value);
      const rotationZInput = document.getElementById("rotation-z-input");
      rotationZInput.value = value;
    }
  }

  handleRotationZInput(event) {
    const value = parseFloat(event.target.value);
    if (this.object instanceof Object3D) {
      this.object.rotateZ(this.initRotationZ + value);
      const rotationZSlider = document.getElementById("rotation-z-slider");
      rotationZSlider.value = value;
    }
  }
}

export default ObjectControls;