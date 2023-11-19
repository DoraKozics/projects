let achievements = {
    defaultColor: "#837c81",
    pink: {
        hasWon: false,
        color: "magenta"
    },
    green: {
        hasWon: false,
        color: "#32cd44"
    },
    red: {
        hasWon: false,
        color: "red"
    },
    brown: {
        hasWon: false,
        color: "#70200e"
    },
    blue: {
        hasWon: false,
        color: "#0000ff"
    }
}

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
