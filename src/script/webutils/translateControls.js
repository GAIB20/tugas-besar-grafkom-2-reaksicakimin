import Object3D from "../objects/Object3D.js";

export function ObjectControls(object) {
  const slider = document.getElementById("translate-x-slider");
  const input = document.getElementById("translate-x-input");

  // Set initial values
  const initSlider = 0;
  const initInput = 0;

  // Get initial values
 const initX = 0;

  // Slider listener
  slider.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object._position._z = initX - value/25;
      input.value = value;
    }
    object.computeProjectionMatrix();
  });

  // Input listener
  input.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (object instanceof Object3D) {
      object.position._z = initX - value/25;
      slider.value = value;
    }
    object.computeProjectionMatrix();
  });

}
