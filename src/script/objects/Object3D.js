import Matrix4 from "../math/Matrix4.js";
import Vector3 from "../math/Vector3.js";

class Object3D {
  constructor() {
    this._name = "Object3D";
    this._position = new Vector3;
    this._rotation = new Vector3;
    this._scale = new Vector3(1, 1, 1);
    this._localMatrix = Matrix4.identity();
    this._worldMatrix = Matrix4.identity();
    this._parent = null;
    this._children = [];
    this.visible = true;
  }

  // Public getter
  get position() { return this._position; }
  get rotation() { return this._rotation; }
  get scale() { return this._scale; }
  get parent() { return this._parent; }
  get localMatrix() { return this._localMatrix; }
  get worldMatrix() { return this._worldMatrix; }
  get children() { return this._children; }

  // Public setter
  set parent(parent) {
    if (this._parent !== parent) {
      this._parent = parent;
      this.computeWorldMatrix(false, true);
    }
  }

  get worldPosition() {
    this.computeWorldMatrix(true, false);
    return Matrix4.getTranslation(this._worldMatrix);
  }

  // Compute local matrix
  computeLocalMatrix() {
    const translationMatrix = Matrix4.translation(...this._position.toArray());
    const rotationMatrix = Matrix4.rotation(...this._rotation.toArray());
    const scaleMatrix = Matrix4.scale(...this._scale.toArray());

    this._localMatrix = translationMatrix.mul(rotationMatrix).mul(scaleMatrix);
  }

  // Compute world matrix
  computeWorldMatrix(updateParent = true, updateChildren = true) {
    if (updateParent && this.parent)
      this.parent.computeWorldMatrix(true, false);
    this.computeLocalMatrix();
    if (this.parent) {
      this._worldMatrix = this.parent.worldMatrix.premul(this._localMatrix);
    } else {
      this._worldMatrix = this._localMatrix.clone();
    }
    if (updateChildren)
      for (let i = 0; i < this._children.length; i++)
        this._children[i].computeWorldMatrix(false, true);
  }

  // Add child
  add(node) {
    if (node.parent !== this) {
      node.removeFromParent();
      node.parent = this;
    }
    this.children.push(node);

    return this;
  }

  // Remove child
  remove(node) {
    let index = this.children.indexOf(node);
    if (index !== -1) {
      this.children.splice(index, 1);
      node.parent = null;
    }

    return this;
  }

  // Remove from parent
  removeFromParent() {
    if (this.parent) this.parent.remove(this);

    return this;
  }

  //
  lookAt(target, up=Vector3.up()) {
    // TODO: Implement
  }

  localToWorld(vector) {
    // TODO: Implement
  }

  worldToLocal(vector) {
    // TODO: Implement
  }

  rotateOnWorldAxis(axis, angle) {
    // TODO: Implement
  }

  // Traverse
  traverse(onLeaf=null) {
    if (onLeaf) onLeaf(this);
    for (let i = 0; i < this._children.length; i++)
      this._children[i].traverse(onLeaf);
  }


  // JSON parser
  toJSON() {
    return {
      name: this._name,
      position: this._position,
      rotation: this._rotation,
      scale: this._scale,
      children: this._children.map((child) => child.toJSON()),
    };
  }

  static fromJSON(json, object=null) {
    if (!object) object = new Object3D();
    console.log("Json: ", json)
    object._name = json.name;
    object._position = Vector3.fromJSON(json.position);
    console.log("Position: ", object._position.x, object._position.y, object._position.z);
    object._rotation = Vector3.fromJSON(json.rotation);
    object._scale = Vector3.fromJSON(json.scale);
    if (json && json.children) {
      object._children = json.children.map((child) => Object3D.fromJSON(child));
    }
    console.log(object);
    return object;
  }
}

export default Object3D;
