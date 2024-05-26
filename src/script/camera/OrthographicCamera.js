import Camera from './Camera.js';
import Matrix4 from '../math/Matrix4.js';

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
    const d = [
      (this._right - this._left) / (2 * this._zoom),
      (this._top - this._bottom) / (2 * this._zoom),
      (this._right - this._left) / 2,
      (this._top - this._bottom) / 2,
    ];

    const border = [
      -(d[2] + d[0])/2,
      (d[2] + d[0])/2,
      -(d[3] + d[1])/2,
      (d[3] + d[1])/2,
    ]

    this._projectionMatrix = Matrix4.orthographic (
      ...border,
      this._near, this._far,
    );
  }
}

export default OrthographicCamera;