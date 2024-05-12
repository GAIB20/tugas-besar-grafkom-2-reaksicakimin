class OrthographicCamera extends Camera {
  constructor(left, right, bottom, top, near, far) {
    super();
    this._left = left;
    this._right = right;
    this._bottom = bottom;
    this._top = top;
    this._near = near;
    this._far = far;
    this.computeProjectionMatrix();
  }

  computeProjectionMatrix() {
    // TODO: Calculate zoom
    this._projectionMatrix = Matrix4.orthographic (
      this._left, this._right,
      this._bottom, this._top,
      this._near, this._far,
    );
  }
}

export default OrthographicCamera;