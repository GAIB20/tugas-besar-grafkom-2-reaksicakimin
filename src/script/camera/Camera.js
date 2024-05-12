import Object3D from "../objects/Object3D.js";
import Matrix4 from "../math/Matrix4.js";

class Camera extends Object3D {
  constructor() {
    super();
    this._projectionMatrix = Matrix4.identity();
    this._invWorldMatrix = Matrix4.identity();
    this._zoom = 1;
  }

  computeWorldMatrix() {
    super.computeWorldMatrix();
    this._invWorldMatrix = Matrix4.inv(this._worldMatrix);
  }

  get viewProjectionMatrix() {
    this.computeWorldMatrix();
    return this._projectionMatrix.premul(this._invWorldMatrix);
  }

  get projectionMatrix() { return this._projectionMatrix; }

  computeProjectionMatrix() {
    throw new Error("Camera.computeProjectionMatrix() must be implemented in derived classes.");
  }
}

export default Camera;