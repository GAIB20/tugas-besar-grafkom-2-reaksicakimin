// Material controller
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("material-type").addEventListener("change", function() {
    const basicParams = document.getElementById("basic-params");
    const phongParams = document.getElementById("phong-params");

    if (this.value === "basic") {
        basicParams.style.display = "block";
      phongParams.style.display = "none";
    } else if (this.value === "phong") {
      basicParams.style.display = "none";
      phongParams.style.display = "block";
    } else if (this.value === "off") {
      basicParams.style.display = "none";
      phongParams.style.display = "none";
    }
  });
});

// Shininess slider
document.getElementById("shininess-slider").addEventListener("input", function() {
  document.getElementById("shininess-input").value = this.value;
});

document.getElementById("shininess-input").addEventListener("input", function() {
  document.getElementById("shininess-slider").value = this.value;
});
