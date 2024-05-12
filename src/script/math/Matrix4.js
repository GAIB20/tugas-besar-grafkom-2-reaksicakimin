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

  // Rotations
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

  // Identity
  static identity() {
    return new Matrix4([
      1,  0,  0,  0,
      0,  1,  0,  0,
      0,  0,  1,  0,
      0,  0,  0,  1,
    ]);
  }

  // Determinant
  static det(m) {
    const m00 = m.get(0, 0), m01 = m.get(0, 1), m02 = m.get(0, 2), m03 = m.get(0, 3);
    const m10 = m.get(1, 0), m11 = m.get(1, 1), m12 = m.get(1, 2), m13 = m.get(1, 3);
    const m20 = m.get(2, 0), m21 = m.get(2, 1), m22 = m.get(2, 2), m23 = m.get(2, 3);
    const m30 = m.get(3, 0), m31 = m.get(3, 1), m32 = m.get(3, 2), m33 = m.get(3, 3);

    return (
      m03*m12*m21*m30 - m02*m13*m21*m30 - m03*m11*m22*m30 + m01*m13*m22*m30 +
      m02*m11*m23*m30 - m01*m12*m23*m30 - m03*m12*m20*m31 + m02*m13*m20*m31 +
      m03*m10*m22*m31 - m00*m13*m22*m31 - m02*m10*m23*m31 + m00*m12*m23*m31 +
      m03*m11*m20*m32 - m01*m13*m20*m32 - m03*m10*m21*m32 + m00*m13*m21*m32 +
      m01*m10*m23*m32 - m00*m11*m23*m32 - m02*m11*m20*m33 + m01*m12*m20*m33 +
      m02*m10*m21*m33 - m00*m12*m21*m33 - m01*m10*m22*m33 + m00*m11*m22*m33
    );
  }

  // Inverse
  static inv(m) {
    const m00 = m.get(0, 0), m01 = m.get(0, 1), m02 = m.get(0, 2), m03 = m.get(0, 3);
    const m10 = m.get(1, 0), m11 = m.get(1, 1), m12 = m.get(1, 2), m13 = m.get(1, 3);
    const m20 = m.get(2, 0), m21 = m.get(2, 1), m22 = m.get(2, 2), m23 = m.get(2, 3);
    const m30 = m.get(3, 0), m31 = m.get(3, 1), m32 = m.get(3, 2), m33 = m.get(3, 3);

    const det = Matrix4.det(m);
    if (det === 0) return null;

    const invDet = 1 / det;
    const inv = new Matrix4([
      (m12*m23*m31 - m13*m22*m31 + m13*m21*m32 - m11*m23*m32 - m12*m21*m33 + m11*m22*m33) * invDet,
      (m03*m22*m31 - m02*m23*m31 - m03*m21*m32 + m01*m23*m32 + m02*m21*m33 - m01*m22*m33) * invDet,
      (m02*m13*m31 - m03*m12*m31 + m03*m11*m32 - m01*m13*m32 - m02*m11*m33 + m01*m12*m33) * invDet,
      (m03*m12*m21 - m02*m13*m21 - m03*m11*m22 + m01*m13*m22 + m02*m11*m23 - m01*m12*m23) * invDet,
      (m13*m22*m30 - m12*m23*m30 - m13*m20*m32 + m10*m23*m32 + m12*m20*m33 - m10*m22*m33) * invDet,
      (m02*m23*m30 - m03*m22*m30 + m03*m20*m32 - m00*m23*m32 - m02*m20*m33 + m00*m22*m33) * invDet,
      (m03*m12*m30 - m02*m13*m30 - m03*m10*m32 + m00*m13*m32 + m02*m10*m33 - m00*m12*m33) * invDet,
      (m02*m13*m20 - m03*m12*m20 + m03*m10*m22 - m00*m13*m22 - m02*m10*m23 + m00*m12*m23) * invDet,
      (m11*m23*m30 - m13*m21*m30 + m13*m20*m31 - m10*m23*m31 - m11*m20*m33 + m10*m21*m33) * invDet,
      (m03*m21*m30 - m01*m23*m30 - m03*m20*m31 + m00*m23*m31 + m01*m20*m33 - m00*m21*m33) * invDet,
      (m01*m13*m30 - m03*m11*m30 + m03*m10*m31 - m00*m13*m31 - m01*m10*m33 + m00*m11*m33) * invDet,
      (m03*m11*m20 - m01*m13*m20 - m03*m10*m21 + m00*m13*m21 + m01*m10*m23 - m00*m11*m23) * invDet,
      (m12*m21*m30 - m11*m22*m30 - m12*m20*m31 + m10*m22*m31 + m11*m20*m32 - m10*m21*m32) * invDet,
      (m01*m22*m30 - m02*m21*m30 + m02*m20*m31 - m00*m22*m31 - m01*m20*m32 + m00*m21*m32) * invDet,
      (m02*m11*m30 - m01*m12*m30 - m02*m10*m31 + m00*m12*m31 + m01*m10*m32 - m00*m11*m32) * invDet,
      (m01*m12*m20 - m02*m11*m20 + m02*m10*m21 - m00*m12*m21 - m01*m10*m22 + m00*m11*m22) * invDet,
    ]);

    return inv;
  }

  // Camera orthographic projection
  static orthographic(left, right, bottom, top, near, far) {
    const rl = right - left;
    const tb = top - bottom;
    const fn = far - near;

    return new Matrix4([
      2 / rl,                 0,                      0,                    0,
      0,                      2 / tb,                 0,                    0,
      0,                      0,                      -2 / fn,              0,
      -(right + left) / rl,   -(top + bottom) / tb,   -(far + near) / fn,   1,
    ]);
  }

  // Camera oblique projection
  static oblique(left, right, bottom, top, near, far, theta, phi) {
    const radTetha = degToRad(theta);
    const radPhi = degToRad(phi);

    const ST = Matrix4.orthographic(left, right, bottom, top, near, far);
    const H = new Matrix4([
      1,                      0,                    0, 0,
      0,                      1,                    0, 0,
      -1/Math.tan(radTetha),  -1/Math.tan(radPhi),  1, 0,
      0,                      0,                    0, 1,
    ]);

    return H.premul(ST);
  }

  // Camera perspective projection
  static perspective(fov, aspect, near, far) {
    const f = Math.tan(Math.PI * 0.5 - 0.5 * degToRad(fov));
    const rangeInv = 1 / (near - far);

    return new Matrix4([
      f / aspect,  0,  0,                         0,
      0,           f,  0,                         0,
      0,           0,  (near + far) * rangeInv,  -1,
      0,           0,  near * far * rangeInv * 2, 0,
    ]);
  }
}