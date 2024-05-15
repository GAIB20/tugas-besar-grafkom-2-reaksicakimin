class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  get() {
    return { x: this._x, y: this._y, z: this._z };
  }

  set(x, y, z) {
    this._x = x;
    this._y = y;
    this._z = z;
    return this;
  }

  add(v) {
    this._x += v._x;
    this._y += v._y;
    this._z += v._z;
    return this;
  }

  subtract(v) {
    this._x -= v._x;
    this._y -= v._y;
    this._z -= v._z;
    return this;
  }

  multiplyScalar(scalar) {
    this._x *= scalar;
    this._y *= scalar;
    this._z *= scalar;
    return this;
  }

  dot(v) {
    return this._x * v._x + this._y * v._y + this._z * v._z;
  }

  cross(v) {
    const x = this._y * v._z - this._z * v._y;
    const y = this._z * v._x - this._x * v._z;
    const z = this._x * v._y - this._y * v._x;
    return new Vector3(x, y, z);
  }

  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
  }

  normalize() {
    const len = this.length();
    if (len !== 0) {
        this.multiplyScalar(1 / len);
    }
    return this;
  }

  clone() {
    return new Vector3(this._x, this._y, this._z);
  }

  toArray() {
    return [this._x, this._y, this._z];
  }

  static up() {
    return new Vector3(0, 1, 0);
  }

  static down() {
    return new Vector3(0, -1, 0);
  }

  static left() {
    return new Vector3(-1, 0, 0);
  }

  static right() {
    return new Vector3(1, 0, 0);
  }

  static forward() {
    return new Vector3(0, 0, -1);
  }

  static back() {
    return new Vector3(0, 0, 1);
  }

  static subtractVectors(a, b) {
    return new Vector3(a._x - b._x, a._y - b._y, a._z - b._z);
  }

  static addVectors(a, b) {
    return new Vector3(a._x + b._x, a._y + b._y, a._z + b._z);
  }
  
  static multiplyScalar(v, scalar) {
    return new Vector3(v._x * scalar, v._y * scalar, v._z * scalar);
  }
  
  static dotProduct(a, b) {
    return a._x * b._x + a._y * b._y + a._z * b._z;
  }
  
  static crossProduct(a, b) {
    return new Vector3(
      a._y * b._z - a._z * b._y,
      a._z * b._x - a._x * b._z,
      a._x * b._y - a._y * b._x
    );
  }

  static getBufferAttribute(attribute, index) {
    const value = attribute.get(index, attribute._size);
    return new Vector3(
      ...value,
      ...[0, 0, 0].slice(attribute.size)
    );
  }
    
}

export default Vector3;