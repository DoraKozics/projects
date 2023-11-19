let hasWonPink;
let hasWonGreen;
let hasWonRed;
let hasWonBrown;
let hasWonBlue;

let hasOpenedWindow = false;
let achievementsButton;
let achievementsWindow;

document.addEventListener("DOMContentLoaded", () => {
    achievementsButton = document.getElementById("achievements-button");
    achievementsWindow = document.getElementById("achievements-window");

    achievementsButton.onclick = displayAchievements;
})

const displayAchievements = () => {
    if (!hasOpenedWindow && (!timerId || isPaused)) {
        achievementsWindow.classList.remove("hidden");
        hasOpenedWindow = true;
        achievementsWindow.innerHTML = "achievements";

        let closeBtn = document.createElement("p");
        closeBtn.setAttribute("id", "close-button");
        closeBtn.innerHTML = "close";
        achievementsWindow.appendChild(closeBtn);
        closeBtn.onclick = () => {
            achievementsWindow.setAttribute("class", "hidden");
            hasOpenedWindow = false;
        }
    }
}
