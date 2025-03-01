const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  fetch("https://apis.scrimba.com/bored/api/activity")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("random-idea").innerText = data.activity;
      document.getElementById("activity-name").innerHTML = "🦾 Happy Bot 🦿";
      document.querySelector("main").classList.add("fun");
    });
});
