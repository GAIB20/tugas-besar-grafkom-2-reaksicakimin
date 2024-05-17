import PerspectiveCamera from "../camera/PerspectiveCamera.js";

class CameraControls {
  constructor(camera, canvas, target=null) {
    this._camera = camera;
    this._readyToMove = false
    this._readyToRotate = false
    this._canvas = canvas;
    this._center = this._camera;
    
    this.init();
    this.addEventListener();
 }

  init() {
    this.initPositionZ = this._camera._position._z;
    this.initZoom = this._camera._zoom;

    const radiusSlider = document.getElementById("camera-radius-slider");
    radiusSlider.value = 0;
    const radiusInput = document.getElementById("camera-radius-input");
    radiusInput.value = 0;
  }

  addEventListener() {
    const radiusSlider = document.getElementById("camera-radius-slider");
    radiusSlider.addEventListener("input", this.handleRadiusSlider.bind(this));

    const radiusInput = document.getElementById("camera-radius-input");
    radiusInput.addEventListener("input", this.handleRadiusInput.bind(this));

    const resetCamera = document.getElementById("reset-camera");
    resetCamera.addEventListener("click", () => {
      if (this._camera instanceof PerspectiveCamera) {
        this._camera._position._z = this.initPositionZ;
        const radiusSlider = document.getElementById("camera-radius-slider");
        radiusSlider.value = 0;
        const radiusInput = document.getElementById("camera-radius-input");
        radiusInput.value = 0;
        this._center.setPosition(0, 0, 5);
      } else {
        this._camera._zoom = this.initZoom;
        const radiusSlider = document.getElementById("camera-radius-slider");
        radiusSlider.value = 0;
        const radiusInput = document.getElementById("camera-radius-input");
        radiusInput.value = 0;
      }
      this._center.setRotation(0, 0, 0);
      this._camera.computeProjectionMatrix();
    });

    this._canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
    this._canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
    this._canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
  }

  handleRadiusInput(event) {
    const value = parseFloat(event.target.value);
    if (this._camera instanceof PerspectiveCamera) {
      this._camera._position._z = this.initPositionZ + value/10;
      const radiusSlider = document.getElementById("camera-radius-slider");
      radiusSlider.value = value;
    } else {
      this._camera._zoom = this.initZoom - value/70;
      const radiusSlider = document.getElementById("camera-radius-slider");
      radiusSlider.value = value;
    }
    this._camera.computeProjectionMatrix();
  }

  handleRadiusSlider(event) {
    const value = parseFloat(event.target.value);
    if (this._camera instanceof PerspectiveCamera) {
      this._camera._position._z = this.initPositionZ + value/10;
      const radiusInput = document.getElementById("camera-radius-input");
      radiusInput.value = value;
    } else {
      this._camera._zoom = this.initZoom - value/70;
      const radiusInput = document.getElementById("camera-radius-input");
      radiusInput.value = value;
    }
    this._camera.computeProjectionMatrix();
  }

  onMouseDown(event){
    if (event.button == 0) {
        this._readyToRotate = true;
    }
    if (event.button == 2) {
        this._readyToMove = true;
    }
  }

  onMouseUp(event){
    this._readyToMove = false;
    this._readyToRotate = false;
  }

  onMouseMove(event){
    if (this._readyToRotate){
      let yRotation = (this._center._rotation._x - event.movementY);
      let xRotation = (this._center._rotation._y - event.movementX);
      this._center.setRotation(yRotation, xRotation, 0);
    }
    else if (this._readyToMove){
      let yMove = event.movementY;
      let xMove = event.movementX;
      this._center._position._x -= xMove;
      this._center._position._y += yMove;
    }
  }
}

export default CameraControls;