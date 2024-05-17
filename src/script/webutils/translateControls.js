import Object3D from "../objects/Object3D.js";

export function ObjectControls(object) {
  const translateXSlider = document.getElementById("translate-x-slider");
  const translateXInput = document.getElementById("translate-x-input");

  const translateYSlider = document.getElementById("translate-y-slider");
  const translateYInput = document.getElementById("translate-y-input");

  const translateZSlider = document.getElementById("translate-z-slider");
  const translateZInput = document.getElementById("translate-z-input");


  const scaleXSlider = document.getElementById("scale-x-slider");
  const scaleXInput = document.getElementById("scale-x-input");

  const scaleYSlider = document.getElementById("scale-y-slider");
  const scaleYInput = document.getElementById("scale-y-input");

  const scaleZSlider = document.getElementById("scale-z-slider");
  const scaleZInput = document.getElementById("scale-z-input");


  const rotationXSlider = document.getElementById("rotation-x-slider");
  const rotationXInput = document.getElementById("rotation-x-input");

  const rotationYSlider = document.getElementById("rotation-y-slider");
  const rotationYInput = document.getElementById("rotation-y-input");

  const rotationZSlider = document.getElementById("rotation-z-slider");
  const rotationZInput = document.getElementById("rotation-z-input");


  // Set initial values
  const initSlider = 0;
  const initInput = 0;

  // Get initial values
  const initPositionX = 0;
  const initPositionY = 0;
  const initPositionZ = 0;

  const initScaleX = 1;
  const initScaleY = 1;
  const initScaleZ = 1;

  const initRotationX = 0;
  const initRotationY = 0;
  const initRotationZ = 0;


  // TranslateX Slider listener
  translateXSlider.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object.translateX(initPositionX - value/25);
      translateXInput.value = value;
    }
  });

  // TranslateX Input listener
  translateXInput.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object.translateX(initPositionX - value/25);
      translateXSlider.value = value;
    }
  });


  // TranslateY Slider listener
  translateYSlider.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object.translateY(initPositionY - value/25);
      translateYInput.value = value;
    }
  });

  // TranslateY Input listener
  translateYInput.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object.translateY(initPositionY - value/25);
      translateYSlider.value = value;
    }
  });


  // TranslateZ Slider listener
  translateZSlider.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object.translateZ(initPositionZ - value/25);
      translateZInput.value = value;
    }
  });

  // TranslateZ Input listener
  translateZInput.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object.translateZ(initPositionZ - value/25);
      translateZSlider.value = value;
    }
  });


  // ScaleX Slider listener
  scaleXSlider.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object.scaleX(initScaleX + value);
      scaleXInput.value = value;
    }
  });

  // ScaleX Input listener
  scaleXInput.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object.scaleX(initScaleX + value);
      scaleXSlider.value = value;
    }
  });

  // ScaleY Slider listener
  scaleYSlider.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object.scaleY(initScaleY + value);
      scaleYInput.value = value;
    }
  });

  // ScaleY Input listener
  scaleYInput.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object.scaleY(initScaleY + value);
      scaleYSlider.value = value;
    }
  });

  // ScaleZ Slider listener
  scaleZSlider.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object.scaleZ(initScaleZ + value);
      scaleZInput.value = value;
    }
  });

  // ScaleZ Input listener
  scaleZInput.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object.scaleZ(initScaleZ + value);
      scaleZSlider.value = value;
    }
  });


  // RotationX Slider listener
  rotationXSlider.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object.rotateX(initRotationX + value);
      rotationXInput.value = value;
    }
  });

  // RotationX Input listener
  rotationXInput.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object.rotateX(initRotationX + value);
      rotationXSlider.value = value;
    }
  });

  // RotationY Slider listener
  rotationYSlider.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object.rotateY(initRotationY + value);
      rotationYInput.value = value;
    }
  });

  // RotationY Input listener
  rotationYInput.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object.rotateY(initRotationY + value);
      rotationYSlider.value = value;
    }
  });

  // RotationZ Slider listener
  rotationZSlider.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object.rotateZ(initRotationZ + value);
      rotationZInput.value = value;
    }
  });

  // RotationZ Input listener
  rotationZInput.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object.rotateZ(initRotationZ + value);
      rotationZSlider.value = value;
    }
  });

}
