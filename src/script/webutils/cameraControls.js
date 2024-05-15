// cameraControls.js

// Function to initialize camera radius controls
export function initializeCameraControls(camera) {
  const slider = document.getElementById("camera-radius-slider");
  const input = document.getElementById("camera-radius-input");

  // Set initial values
  const initSlider = 0;
  const initInput = 0;

  // Get initial z values
 const initZ = 5;

  // Add event listener for slider
  slider.addEventListener("input", function() {
    const value = parseFloat(this.value);
    camera._position._z = initZ + value;
    input.value = value;
  });

  // Add event listener for input
  input.addEventListener("input", function() {
    const value = parseFloat(this.value);
    camera._position._z = initZ + value;
    slider.value = value;
  });
}
