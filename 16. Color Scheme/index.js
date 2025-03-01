const selectColor = document.getElementById("select-color");
const selectContainer = document.getElementById("select-container");
const colorDisplay = document.querySelector(".color-display");
const button = document.getElementById("button");

selectContainer.addEventListener("change", (e) => {
  selectColor.focus();
});

button.addEventListener("click", () => {
  fetchColorSchemes();
});

function fetchColorSchemes() {
  const color = colorDisplay.value.slice(1);
  const mode = selectColor.value;

  fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`)
    .then((req) => req.json())
    .then((data) => {
      const colorArr = data.colors.map((color) => color.hex.value);
      displayColorScheme(colorArr);
    })
    .catch((error) => {
      console.error("Error fetching colors:", error);
    });
}

function displayColorScheme(colors) {
  for (let i = 0; i <= 5; i++) {
    const colorDiv = document.querySelector(`.color${i}`);
    if (colorDiv && colors[i - 1]) {
      colorDiv.style.backgroundColor = colors[i - 1];
      colorDiv.textContent = colors[i - 1];
    }
  }
}
