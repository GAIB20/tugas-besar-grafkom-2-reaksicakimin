function degToRad(degree) {
  return ((degree % 360) * Math.PI) / 180;
}

function radToDeg(radian) {
  return ((radian * 180) / Math.PI) % 360;
}

class Matrix {
  constructor(data=[], rowLength=0, colLength=0) {
    this._data = data;
    this._rowLength = rowLength;
    this._colLength = colLength;
  }

  get size() {
    return this._data.length;
  }

  get row() {
    return this._rowLength;
  }

  get column() {
    return this._colLength;
  }

  get data() {
    return this._data;
  }

  get(i, j) {
    return this._data[i * this._colLength + j];
  }

  premul(m) {
    let result = [];
    for (let i = 0; i < m._rowLength; i++) {
      for (let j = 0; j < this._colLength; j++) {
        let sum = 0;
        for (let k = 0; k < m._colLength; k++) {
            sum += m.get(i, k) * this.get(k, j);
        }
        result.push(sum);
      }
    }

    return new Matrix(result, m._rowLength, this._colLength);
  }

  mul(m) {
    return m.premul(this);
  }

  transpose() {
    const result = [];
    for (let i = 0; i < this._rowLength; i++) {
      for (let j = 0; j < this._colLength; j++) {
        result.push(this.get(j, i));
      }
    }

    return new Matrix(result, this._colLength, this._rowLength);
  }

  print() {
    let str = "";
    for (let i = 0; i < this._rowLength; i++) {
      for (let j = 0; j < this._colLength; j++) {
        str += this.get(i, j) + " ";
      }
      str += "\n";
    }

    console.log(str);
  }
}

class Matrix4 extends Matrix {
  constructor(data) {
    super(data, 4, 4);
  }

  // Translation
  static translation(Tx, Ty, Tz) {
    return new Matrix4([
      1,  0,  0,  0,
      0,  1,  0,  0,
      0,  0,  1,  0,
      Tx, Ty, Tz, 1,
    ]);
  }

  // Rotation
  static rotationX(degAngle) {
    const radAngle = degToRad(degAngle);
    const c = Math.cos(radAngle);
    const s = Math.sin(radAngle);

    return new Matrix4([
      1,  0,  0,  0,
      0,  c,  s,  0,
      0,  -s, c,  0,
      0,  0,  0,  1,
    ]);
  }

  static rotationY(degAngle) {
    const radAngle = degToRad(degAngle);
    const c = Math.cos(radAngle);
    const s = Math.sin(radAngle);

    return new Matrix4([
      c,  0,  -s, 0,
      0,  1,  0,  0,
      s,  0,  c,  0,
      0,  0,  0,  1,
    ]);
  }

  static rotationZ(degAngle) {
    const radAngle = degToRad(degAngle);
    const c = Math.cos(radAngle);
    const s = Math.sin(radAngle);

    return new Matrix4([
      c,  s,  0,  0,
      -s, c,  0,  0,
      0,  0,  1,  0,
      0,  0,  0,  1,
    ]);
  }

  static rotation(degYaw, degPitch, degRoll) {
    const yaw = degToRad(degYaw);
    const pitch = degToRad(degPitch);
    const roll = degToRad(degRoll);
    const c = [Math.cos(yaw), Math.cos(pitch), Math.cos(roll)];
    const s = [Math.sin(yaw), Math.sin(pitch), Math.sin(roll)];

    const m00 = c[1] * c[2];
    const m01 = c[1] * s[2];
    const m02 = -s[1];
    const m10 = s[0] * s[1] * c[2] - c[0] * s[2];
    const m11 = s[0] * s[1] * s[2] + c[0] * c[2];
    const m12 = s[0] * c[1];
    const m20 = c[0] * s[1] * c[2] + s[0] * s[2];
    const m21 = c[0] * s[1] * s[2] - s[0] * c[2];
    const m22 = c[0] * c[1];

    return new Matrix4([
      m00, m01, m02, 0,
      m10, m11, m12, 0,
      m20, m21, m22, 0,
      0,   0,   0,   1,
    ]);
  }

  // Scale
  static scale(Sx, Sy, Sz) {
    return new Matrix4([
      Sx, 0,  0,  0,
      0,  Sy, 0,  0,
      0,  0,  Sz, 0,
      0,  0,  0,  1,
    ]);
  }

  // Transformation
  static transform(position, rotation, scale) {
    const translationMatrix = Matrix4.translation(...position);
    const rotationMatrix = Matrix4.rotation(...rotation);
    const scaleMatrix = Matrix4.scale(...scale);

    return translationMatrix.premul(rotationMatrix).premul(scaleMatrix);
  }
}

function main() {
  const Sx = 2;
  const Sy = 1;
  const Sz = 0.5;

  const degAngleX = 30;
  const degAngleY = 0;
  const degAngleZ = 0;

  const Tx = 10;
  const Ty = 20;
  const Tz = 30;

  const transformationMatrix = Matrix4.transform(
    [Tx, Ty, Tz],
    [degAngleX, degAngleY, degAngleZ],
    [Sx, Sy, Sz]
  );

  console.log("Transformation Matrix:");
  console.log(transformationMatrix.transpose().print());
}

main();

// Expected output sesuai spek:
// 2 0 0 10
// 0 0.866 -0.25 20
// 0 0.5 0.433 30
// 0 0 0 1
