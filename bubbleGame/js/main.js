let user = document.querySelector(".bubbleGame__userName");
let joinButton = document.querySelector(".bubbleGame__button");
let userForm = document.querySelector(".user-form");
let bubbleGameAreaGame = document.querySelector(".bubbleGame__area__game");
let startGame = document.querySelector('.start_game');
let stopGame = document.querySelector('.stop_game');
let levelEasy = document.querySelector('.bubbleGame__area__buttons__level__easy');
let levelMedium = document.querySelector('.bubbleGame__area__buttons__level__medium');
let levelHard = document.querySelector('.bubbleGame__area__buttons__level__hard');
let scoreResult = document.querySelector(".bubbleGame__area_user__score");
let highScoreResult = document.querySelector(".bubbleGame__area_user__highScore");
let showBubble;
let score = 0;
let audio = new Audio("./audio/click.mp3");



joinButton.addEventListener("click", function () {
    event.preventDefault()
    if (user.value.trim().length == 0) {
        alert("Enter Your Name");
    } else {
        userForm.style.display = "none";
        document.querySelector(".bubbleGame__area_user__name").innerText += user.value;
        document.querySelector(".bubbleGame__area").style.display = "block";
        if (localStorage.getItem(user.value)) {
            highScoreResult.innerText = `High Score:${localStorage.getItem(user.value)}`;
        } else {
            highScoreResult.innerText = `High Score:0`;
        }
    }
})

levelEasy.addEventListener("click", function () {
    bubble(2000);
    selectedLevel();
    levelEasy.classList.add("selected-button-color");
})

levelMedium.addEventListener("click", function () {
    bubble(1000);
    selectedLevel();
    levelMedium.classList.add("selected-button-color");
})

levelHard.addEventListener("click", function () {
    bubble(500);
    selectedLevel();
    levelHard.classList.add("selected-button-color");
})

startGame.addEventListener("click", function () {
    bubble(2000);
    levelEasy.classList.add("selected-button-color");
    document.querySelectorAll(".game_buttons").forEach(function (element) {
        if (element != event.target) {
            element.classList.remove("pointerEvent");
        } else {
            element.classList.add("pointerEvent");
        }
    })
    levelEasy.classList.add("pointerEvent");
})

stopGame.addEventListener("click", function () {
    alert(`Your Score:${score}`)
    localStorageScore();
    stoppedGame();
})

function bubble(time) {
    clearInterval(showBubble)
    showBubble = setInterval(() => {
        let bubble = document.createElement("div");
        bubble.classList.add('bubbleGame__area__game__bubble');
        document.querySelector(".bubbleGame__area__game").appendChild(bubble);
        bubble.addEventListener("click", function () {
            clickBubble(event.target)
        });

        let spacex = bubbleGameAreaGame.offsetWidth - bubble.offsetWidth;
        let spacey = bubbleGameAreaGame.offsetHeight - bubble.offsetHeight;


        let randomNumberX = Math.ceil(Math.random() * spacex);
        let randomNumberY = Math.ceil(Math.random() * spacey);

        bubble.style.left = randomNumberX + "px";
        bubble.style.top = randomNumberY + "px";

        if (document.querySelectorAll(".bubbleGame__area__game__bubble").length == 50) {
            alert(`You Lost\nYour Score:${score}`);
            localStorageScore();
            stoppedGame();
        }

    }, time);
}

function selectedLevel() {
    document.querySelectorAll(".level_buttons").forEach(function (element) {
        element.classList.remove("selected-button-color");
        if (element == event.target) {
            element.classList.add("pointerEvent");
        } else {
            element.classList.remove("pointerEvent")
        }
    })
}

function clickBubble(item) {
    item.remove();
    if (levelEasy.classList.contains("selected-button-color")) {
        score += 1;
    } else if (levelMedium.classList.contains("selected-button-color")) {
        score += 2
    } else {
        score += 3;
    }
    scoreResult.innerText = `Score:${score}`;
    audio.play()
}

function stoppedGame() {
    document.querySelector(".bubbleGame__area__game").innerHTML = " ";
    clearInterval(showBubble);
    document.querySelectorAll(".game_buttons").forEach(function (element) {
        element.classList.add("pointerEvent");
    })
    startGame.classList.remove("pointerEvent");
    document.querySelectorAll(".level_buttons").forEach(function (element) {
        element.classList.remove("selected-button-color");
    })
    score = 0;
    scoreResult.innerText = `Score:${score}`;
}

function localStorageScore() {
    if (localStorage.getItem(user.value)) {
        if (localStorage.getItem(user.value) < score) {
            localStorage.setItem(user.value, score);
            highScoreResult.innerText = `High Score:${localStorage.getItem(user.value)}`;
        }
    } else {
        localStorage.setItem(user.value, score);
        highScoreResult.innerText = `High Score:${localStorage.getItem(user.value)}`;
    }
}
