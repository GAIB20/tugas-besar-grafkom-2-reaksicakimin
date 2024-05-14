import Camera from './Camera.js';
import Matrix4 from '../math/Matrix4.js';

class PerspectiveCamera extends Camera {
  constructor(fov, aspect, near, far) {
    super();
    this._fov = fov;
    this._aspect = aspect;
    this._near = near;
    this._far = far;
    this.computeProjectionMatrix();
  }

  computeProjectionMatrix() {
    // TODO: Calculate zoom
    this._projectionMatrix = Matrix4.perspective(
      this._fov, this._aspect, this._near, this._far,
    );
  }
}

export default PerspectiveCamera;