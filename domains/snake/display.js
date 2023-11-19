const displaySettingScreen = () => {
    ctx.clearRect(0, 0, 500, 500);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, mx * 10, my * 10);
    ctx.font = "28px VT323";
    ctx.fillStyle = "#ffffff";

    let lines = [];
    let x = 17;
    let y = 40;
    let space = 25;
    addLine(lines, "welcome to snake: the game!", x, y);
    y = +y + +space + +space;
    addLine(lines, "choose your settings:", x, y);
    y = +y + +space;
    addLine(lines, "press y/n 3x times whether you", x, y);
    y = +y + +space;
    addLine(lines, "- want to pass through walls", x, y);
    y = +y + +space;
    addLine(lines, "- want to pass yourself", x, y);
    y = +y + +space;
    addLine(lines, "- want to place apples", x, y);
    y = +y + +space + +space;
    addLine(lines, "press 'enter' to continue", x, y);

    typeLineByLine(lines);
}

const addLine = (lines, text, x, y) => {
    lines.push({
        text: text,
        x: x,
        y: y
    })
}

const typeLineByLine = (lines) => {
    let i = 0;
    let timerId = setInterval(() => {
        typeLetterByLetter(lines[i].text, lines[i].x, lines[i].y);
        i++;
        if (i === lines.length) {
            clearInterval(timerId);
        }
    }, 1500);
}

const typeLetterByLetter = (text, x, y) => {
    let i = 0;

    const timerId = setInterval(() => {
        ctx.fillText(text.charAt(i), x, y);
        i++;
        x += 12;
        if (i === text.length) {
            clearInterval(timerId);
        }
    }, 50);
}

const displayStartScreen = () => {
    ctx.clearRect(0, 0, 500, 500);
    ctx.font = "40px VT323";
    ctx.fillStyle = "#0000ff";
    ctx.fillText("snake: the game", 130, 150);
    ctx.font = "20px VT323";
    ctx.fillStyle = "#837c81";
    ctx.fillText("start: press 's' or the start button", 110, 180);
    ctx.fillText("pause: press 'p' or the pause button", 110, 200);
    ctx.fillText("apple: press 'a' to place apples", 110, 220);

    ctx.fillStyle = "red";
    ctx.fillRect(110, 240, 10, 10);
    ctx.fillStyle = "#000000";
    ctx.fillText(": makes you grow 1x, turns brown in 5s", 120, 250);
    ctx.fillText("worth 1 point", 138, 270);

    ctx.fillStyle = "#70200e";
    ctx.fillRect(110, 280, 10, 10);
    ctx.fillStyle = "#000000";
    ctx.fillText(": stay the same length, turns black in 5s", 120, 290);
    ctx.fillText("worth 0.5 point", 138, 310);

    ctx.fillStyle = "magenta";
    ctx.fillRect(110, 320, 10, 10);
    ctx.fillStyle = "#000000";
    ctx.fillText(": grows on land, makes you grow 2x,", 120, 330);
    ctx.fillText("turns black in 10s, worth 5 point", 138, 350);

    ctx.fillStyle = "#000000";
    ctx.fillRect(110, 360, 10, 10);
    ctx.fillStyle = "#000000";
    ctx.fillText(": kills you, turns into land", 120, 370);
}

const draw = () => {
    ctx.clearRect(0, 0, 500, 500);

    ctx.fillStyle = "#32cd44";
    land.forEach((coord) => {
        ctx.fillRect(coord.x * 10, coord.y * 10, 10, 10);
    });

    ctx.fillStyle = "#0000ff";
    tail.forEach((coord) => {
        ctx.fillRect(coord.x * 10, coord.y * 10, 10, 10);
    });

    ctx.fillStyle = "red";
    goodApples.forEach((coord) => {
        ctx.fillRect(coord.x * 10, coord.y * 10, 10, 10);
    });

    ctx.fillStyle = "#70200e";
    rottenApples.forEach((coord) => {
        ctx.fillRect(coord.x * 10, coord.y * 10, 10, 10);
    });

    ctx.fillStyle = "black";
    deadlyApples.forEach((coord) => {
        ctx.fillRect(coord.x * 10, coord.y * 10, 10, 10);
    });

    ctx.fillStyle = "magenta";
    bestApples.forEach((coord) => {
        ctx.fillRect(coord.x * 10, coord.y * 10, 10, 10);
    });
};

const displayEndScreen = () => {
    fadeCanvas();
    ctx.fillStyle = "black";
    ctx.fillRect(149, 135, 192, 180);

    ctx.strokeStyle = "white";
    ctx.moveTo(156, 146);
    ctx.lineTo(156, 303);
    ctx.stroke();

    ctx.moveTo(334, 146);
    ctx.lineTo(334, 303);
    ctx.stroke();

    ctx.moveTo(160, 143);
    ctx.lineTo(330, 143);
    ctx.stroke();

    ctx.moveTo(160, 307);
    ctx.lineTo(330, 307);
    ctx.stroke();

    ctx.font = "40px VT323";
    ctx.fillStyle = "red";
    ctx.fillText("game over", 175, 170);
    ctx.font = "20px VT323";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(("Your score is: " + calculateScore()), 170, 200);

    ctx.fillStyle = "red";
    ctx.fillRect(170, 210, 10, 10);
    ctx.fillStyle = "white";
    ctx.fillText((": " + score.goodApples + " x 1"), 180, 220);

    ctx.fillStyle = "#70200e";
    ctx.fillRect(170, 230, 10, 10);
    ctx.fillStyle = "white";
    ctx.fillText((": " + score.rottenApples + " x 0.5"), 180, 240);

    ctx.fillStyle = "magenta";
    ctx.fillRect(170, 250, 10, 10);
    ctx.fillStyle = "white";
    ctx.fillText((": " + score.bestApples + " x 5"), 180, 260);

    ctx.fillText(("Highest score: " + highScore), 170, 295);
}

const displayPauseButton = () => {
    ctx.fillStyle = "#0000ff";
    ctx.fillRect(150, 180, 200, 100);

    // ctx.strokeStyle = "white";
    // ctx.moveTo(154, 183);
    // ctx.lineTo(346, 183);
    // ctx.stroke();
    //
    // ctx.moveTo(154, 277);
    // ctx.lineTo(346, 277);
    // ctx.stroke();
    //
    // ctx.moveTo(153, 183);
    // ctx.lineTo(153, 276);
    // ctx.stroke();
    //
    // ctx.moveTo(347, 183);
    // ctx.lineTo(347, 276);
    // ctx.stroke();

    ctx.font = "32px VT323";
    ctx.fillStyle = "white";
    ctx.fillText("game paused", 180, 215);

    ctx.font = "20px VT323";
    ctx.fillStyle = "#837c81";
    ctx.fillText("press 'p' or pause", 180, 242);
    ctx.fillText("to resume", 210, 260);
}

const fadeCanvas = () => {
    ctx.globalAlpha = 0.50;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, mx * 10, my * 10);
    ctx.globalAlpha = 1;
}