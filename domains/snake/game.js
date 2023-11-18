const mx = 50;
const my = 50;

let canvas;
let ctx;
let startButton;
let pauseButton;
let alertMessage;
let endMessage;

let timerId;
let gameSettings = {
    canPassWall: null,
    canPassSelf: null,
    canEatApple: null
};
let choice = null;

let tail = [
    {x: 1, y: 1},
    {x: 2, y: 1},
    {x: 3, y: 1}
];

let direction = {
    dx: 0, dy: 1
};

let goodApples = [];
let rottenApples = [];
let deadlyApples = [];
let bestApples = [];
let land = [];

let score;

const isSetToPlay = () => {
    return gameSettings.canPassWall != null
        && gameSettings.canPassSelf != null
        && gameSettings.canEatApple != null;
}

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

const setChoice = () => {
    if (gameSettings.canPassWall === null && choice != null) {
        gameSettings.canPassWall = choice;
        choice = null;
    }

    if (gameSettings.canPassSelf === null && choice != null) {
        gameSettings.canPassSelf = choice;
        choice = null;
    }

    if (gameSettings.canEatApple === null && choice != null) {
        gameSettings.canEatApple = choice;
        choice = null;
    }
}

const displayStartScreen = () => {
    ctx.clearRect(0, 0, 500, 500);
    ctx.font = "40px VT323";
    ctx.fillStyle = "#0000ff";
    ctx.fillText("snake: the game", 130, 200);
    ctx.font = "20px VT323";
    ctx.fillStyle = "#000000";
    ctx.fillText("start: press 's' or the start button", 110, 230);
    ctx.font = "20px VT323";
    ctx.fillStyle = "#000000";
    ctx.fillText("pause: press 'p' or the pause button", 110, 250);
    ctx.font = "20px VT323";
    ctx.fillStyle = "#000000";
    ctx.fillText("apple: press 'a' to place apples", 130, 270);
}

const fadeCanvas = () => {
    ctx.globalAlpha = 0.50;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, mx * 10, my * 10);
    ctx.globalAlpha = 1;
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

const placeToStart = () => {
    tail = [
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 3, y: 1}
    ];

    direction = {
        dx: 0, dy: 1  //default right direction
    };

    goodApples = [];
    rottenApples = [];
    deadlyApples = [];
    bestApples = [];
    land = [];

    score = {
        goodApples: 0,
        rottenApples: 0,
        bestApples: 0,
        land: 0
    };

    clearTimeout(timerId);
    timerId = setInterval(move, 50);

    endMessage.innerHTML = '';
}

const move = () => {
    const oldHead = tail[tail.length - 1];
    const newHead = {
        x: oldHead.x + direction.dx,
        y: oldHead.y + direction.dy
    };

    if (!hasEatenAnApple(newHead)) {
        tail.push(newHead);
        tail.shift();
    }

    draw();

    if (hasInvalidCoord()) {
        endGame();
    }

    rankApples();
}

const placeApple = () => {
    const x = Math.floor(Math.random() * (mx));
    const y = Math.floor(Math.random() * (my));
    while (isOccupied(x, y)) {
        placeApple();
    }

    if (hasGivenCoord(land, x, y)) {
        bestApples.push({x: x, y: y, created: new Date()});
    } else {
        goodApples.push({x: x, y: y, created: new Date()});
    }
}

const isOccupied = (paramX, paramY) => {
    return hasGivenCoord(tail, paramX, paramY)
        || hasGivenCoord(goodApples, paramX, paramY)
        || hasGivenCoord(rottenApples, paramX, paramY)
        || hasGivenCoord(deadlyApples, paramX, paramY)
        || hasGivenCoord(bestApples, paramX, paramY);

}

const hasEatenAnApple = (newHead) => {
    if (hasGivenCoord(goodApples, newHead.x, newHead.y)) {
        removeEatenApple(goodApples, newHead.x, newHead.y);
        tail.push(newHead);
        score.goodApples++;
        return true;
    } else if (hasGivenCoord(rottenApples, newHead.x, newHead.y)) {
        removeEatenApple(rottenApples, newHead.x, newHead.y);
        score.rottenApples++;
        return true;
    } else if (hasGivenCoord(bestApples, newHead.x, newHead.y)) {
        removeEatenApple(bestApples, newHead.x, newHead.y);
        tail.push(newHead);
        const finalX = newHead.x + direction.dx;
        const finalY = newHead.y + direction.dy;
        const finalHead = {
            x: finalX, y: finalY
        }
        tail.push(finalHead);
        score.bestApples++;
        return true;
    } else {
        return false;
    }
}

const hasGivenCoord = (list, paramX, paramY) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].x === paramX && list[i].y === paramY) {
            return true;
        }
    }
    return false;
}

const removeEatenApple = (list, headX, headY) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].x === headX && list[i].y === headY) {
            list.splice(i, 1);
        }
    }
}

const rankApples = () => {
    haveApplesChangeRank(goodApples, rottenApples);
    haveApplesChangeRank(rottenApples, deadlyApples);
    haveApplesChangeRank(deadlyApples, land);
}

const haveApplesChangeRank = (listBefore, listAfter) => {
    const now = new Date();
    for (let i = 0; i < listBefore.length; i++) {
        const timePassed = (now - listBefore[i].created) / 1000;
        if (timePassed > 5) {
            const apple = listBefore[i];
            listBefore.splice(i, 1);
            apple.created = new Date();
            listAfter.push(apple);
        }
    }
}

const hasInvalidCoord = () => {
    const headX = tail[tail.length - 1].x;
    const headY = tail[tail.length - 1].y;

    if (!(headX >= 0 && headX <= mx) || !(headY >= 0 && headY < my)) {
        return true;
    }

    // for (let i = 0; i < tail.length - 1; i++) {
    //     const bodyX = tail[i].x;
    //     const bodyY = tail[i].y;
    //     if (headX === bodyX && headY === bodyY) {
    //         return true;
    //     }
    // }

    if (hasGivenCoord(deadlyApples, headX, headY)) {
        removeEatenApple(deadlyApples, headX, headY);
        return true;
    }
    return false;
}

const endGame = () => {
    clearInterval(timerId);
    timerId = '';
    window.alert("Game over!");
    endMessage = document.createElement("span");
    endMessage.innerHTML = "Your score is: " + calculateScore();
    alertMessage.appendChild(endMessage);
    fadeCanvas();
}

const calculateScore = () => {
    let finalScore = 0;
    finalScore += score.goodApples;
    finalScore += score.rottenApples / 2;
    finalScore += score.bestApples * 5;
    return finalScore;
}

document.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    startButton = document.getElementById("start-button");
    pauseButton = document.getElementById("pause-button");
    alertMessage = document.getElementById("alert-message");

    if (!score) {
        document.fonts.ready.then((fontFaceSet) => {
            const fontFaces = [...fontFaceSet];
            displaySettingScreen();
        });
    } else {
        displayStartScreen();
    }

    startButton.onclick = () => {
        if (isSetToPlay()) {
            placeToStart();
            draw();
        }
    }
    pauseButton.onclick = () => {
        if (timerId) {
            window.alert("Game paused");
            fadeCanvas();
        }
    }
});

document.addEventListener("keydown", (event) => {
    console.log("Key pressed down:", event);
    if (event.code === "ArrowUp") {
        event.preventDefault();
        direction.dx = 0;
        direction.dy = -1;
    }
    if (event.code === "ArrowDown") {
        event.preventDefault();
        direction.dx = 0;
        direction.dy = 1;
    }
    if (event.code === "ArrowRight") {
        event.preventDefault();
        direction.dx = 1;
        direction.dy = 0;
    }
    if (event.code === "ArrowLeft") {
        event.preventDefault();
        direction.dx = -1;
        direction.dy = 0;
    }

    if (event.code === "KeyP" && timerId) {
        window.alert("Game paused")
    }

    if (event.code === "KeyA") {
        placeApple();
    }

    if (event.code === "KeyS" && isSetToPlay()) {
        placeToStart();
    }

    if (event.code === "Enter" && !timerId && isSetToPlay()) {
        event.preventDefault();
        displayStartScreen();
    }

    if (event.code === "KeyY") {
        choice = true;
        setChoice();
    }

    if (event.code === "KeyZ") {
        choice = true;
        setChoice();
    }

    if (event.code === "KeyN") {
        choice = false;
        setChoice();
    }
});
