function degToRad(degree) {
  return ((degree % 360) * Math.PI) / 180;
}

function radToDeg(radian) {
  return ((radian * 180) / Math.PI) % 360;
}