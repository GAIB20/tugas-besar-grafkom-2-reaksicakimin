class LightControls {
  constructor(light) {
    this._light = light;
    
    this.init();
    this.addEventListener();
 }

  init() {
    this.initPositionX = this._light._position._x;
    this.initPositionY = this._light._position._y;
    this.initPositionZ = this._light._position._z;

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
  }

  addEventListener() {
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
  }

  handleLightPositionXInput(event) {
    const value = parseFloat(event.target.value);
    const lightPositionXSlider = document.getElementById("light-x-slider");
    lightPositionXSlider.value = value;
    this._light._position._x = value;
  }

  handleLightPositionXSlider(event) {
    const value = parseFloat(event.target.value);
    const lightPositionXInput = document.getElementById("light-x-input");
    lightPositionXInput.value = value;
    this._light._position._x = value;
  }

  handleLightPositionYInput(event) {
    const value = parseFloat(event.target.value);
    const lightPositionYSlider = document.getElementById("light-y-slider");
    lightPositionYSlider.value = value;
    this._light._position._y = value;
  }

  handleLightPositionYSlider(event) {
    const value = parseFloat(event.target.value);
    const lightPositionYInput = document.getElementById("light-y-input");
    lightPositionYInput.value = value;
    this._light._position._y = value;
  }

  handleLightPositionZInput(event) {
    const value = parseFloat(event.target.value);
    const lightPositionZSlider = document.getElementById("light-z-slider");
    lightPositionZSlider.value = value;
    this._light._position._z = value;
  }

  handleLightPositionZSlider(event) {
    const value = parseFloat(event.target.value);
    const lightPositionZInput = document.getElementById("light-z-input");
    lightPositionZInput.value = value;
    this._light._position._z = value;
  }

}

export default LightControls;