// Degree to radian
function degToRad(degree) {
  return ((degree % 360) * Math.PI) / 180;
}

// Radian to degree
function radToDeg(radian) {
  return ((radian * 180) / Math.PI) % 360;
}