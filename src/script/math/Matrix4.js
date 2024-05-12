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
}