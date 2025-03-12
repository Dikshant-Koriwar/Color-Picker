const colorInput = document.getElementById("colorInput");
const colorCode = document.getElementById("colorCode");
const copyButton = document.getElementById("copyButton");
const complementaryContainer = document.getElementById("complementaryContainer");
const saveColorButton = document.getElementById("saveColorButton");
const favoritesContainer = document.getElementById("favoritesContainer");

colorInput.addEventListener("input", () => {
  const selectedColor = colorInput.value;
  updateColorDisplay(selectedColor);
  showComplementary(selectedColor);
});

function updateColorDisplay(color) {
  colorCode.textContent = color;
  colorCode.style.color = color;
}

function showComplementary(comColor) {
  const complementaryColors = getComplementaryColor(comColor);
  complementaryContainer.innerHTML = ""; // Clear previous colors

  complementaryColors.forEach((colo) => {
    const colorBox = document.createElement("div");
    colorBox.classList.add("color-box");
    colorBox.style.backgroundColor = colo;
    complementaryContainer.appendChild(colorBox);
  });
}

function getComplementaryColor(color) {
  const base = parseInt(color.slice(1), 16); // FIX: Use slice instead of splice
  const complement = (0xffffff ^ base).toString(16).padStart(6, "0");
  return [`#${complement}`];
}

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(colorCode.textContent)
    .then(() => alert("Color code copied!"))
    .catch(err => console.error(err.message)); // FIX: Use err.message
});

saveColorButton.addEventListener("click", () => {
  const color = colorCode.textContent;
  addFavoriteColor(color);
});

function addFavoriteColor(color) {
  const colorBox = document.createElement("div");
  colorBox.classList.add("color-box");
  colorBox.style.backgroundColor = color;
  colorBox.title = color;
  favoritesContainer.appendChild(colorBox);
}

