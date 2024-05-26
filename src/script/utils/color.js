export function rgbToHex([r, g, b]) {
  return "#" +
    (r*255).toString(16).padStart(2, '0') +
    (g*255).toString(16).padStart(2, '0') +
    (b*255).toString(16).padStart(2, '0');
}

export function hexToRgb(hex) {
  const r = parseInt(hex.substring(1, 3), 16) / 255;
  const g = parseInt(hex.substring(3, 5), 16) / 255;
  const b = parseInt(hex.substring(5, 7), 16) / 255;
  return [r, g, b, 1];
}