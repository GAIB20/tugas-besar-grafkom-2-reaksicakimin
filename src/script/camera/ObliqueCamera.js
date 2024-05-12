class ObliqueCamera extends Camera {
  constructor(left, right, bottom, top, near, far, theta, phi) {
    super();
    this._left = left;
    this._right = right;
    this._bottom = bottom;
    this._top = top;
    this._near = near;
    this._far = far;
    this._theta = theta;
    this._phi = phi;
    this.computeProjectionMatrix();
  }

  computeProjectionMatrix() {
    // TODO: Calculate zoom
    this._projectionMatrix = Matrix4.oblique(
      this._left, this._right,
      this._bottom, this._top,
      this._near, this._far,
      this._theta, this._phi,
    );
  }
}