import PerspectiveCamera from "../camera/PerspectiveCamera.js";
import OrthographicCamera from "../camera/OrthographicCamera.js";
import ObliqueCamera from "../camera/ObliqueCamera.js";

export function initializeCameraControls(camera) {
  const slider = document.getElementById("camera-radius-slider");
  const input = document.getElementById("camera-radius-input");

  // Set initial values
  const initSlider = 0;
  const initInput = 0;

  // Get initial values
 const initZ = 5;
 const initZoom = 1;

  // Slider listener
  slider.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (camera instanceof PerspectiveCamera) {
      camera._position._z = initZ - value/25;
      input.value = value;
    } else {
      camera._zoom = initZoom + value;
      input.value = value;
    }
    camera.computeProjectionMatrix();
  });

  // Input listener
  input.addEventListener("input", function() {
    const value = parseFloat(this.value);
    if (camera instanceof PerspectiveCamera) {
      camera.position._z = initZ - value/25;
      slider.value = value;
    } else {
      camera._zoom = initZoom + value;
      slider.value = value;
    }
    camera.computeProjectionMatrix();
  });

}
