let user = document.querySelector(".bubbleGame__userName");
let joinButton = document.querySelector(".bubbleGame__button");
let userForm = document.querySelector(".user-form");
let bubbleGame__area__game = document.querySelector(".bubbleGame__area__game");
let start_game = document.querySelector('.start_game');
let stop_game = document.querySelector('.stop_game');
let level_easy = document.querySelector('.bubbleGame__area__buttons__level__easy');
let level_medium = document.querySelector('.bubbleGame__area__buttons__level__medium');
let level_hard = document.querySelector('.bubbleGame__area__buttons__level__hard');
let score_result = document.querySelector(".bubbleGame__area_user__score");
let high_score_result = document.querySelector(".bubbleGame__area_user__highScore");
let high_score;
let show_bubble;
let score = 0;


joinButton.addEventListener("click", function () {
    event.preventDefault()
    if (user.value.trim().length == 0) {
        alert("Enter Your Name");
    } else {
        userForm.style.display = "none";
        document.querySelector(".bubbleGame__area_user__name").innerText += user.value;
        document.querySelector(".bubbleGame__area").style.display = "block";
        if (localStorage.getItem(user.value)) {
            high_score_result.innerText = `High Score:${localStorage.getItem(user.value)}`;
        } else {
            high_score_result.innerText = `High Score:0`;
        }
    }
})

level_easy.addEventListener("click", function () {
    bubble(2000);
    selectedLevel();
    level_easy.classList.add("selected-button-color");
})

level_medium.addEventListener("click", function () {
    bubble(1000);
    selectedLevel();
    level_medium.classList.add("selected-button-color");
})

level_hard.addEventListener("click", function () {
    bubble(500);
    selectedLevel();
    level_hard.classList.add("selected-button-color");
})

start_game.addEventListener("click", function () {
    bubble(2000);
    level_easy.classList.add("selected-button-color");
    document.querySelectorAll(".game_buttons").forEach(function (element) {
        if (element != event.target) {
            element.classList.remove("pointerEvent");
        } else {
            element.classList.add("pointerEvent");
        }
    })
    level_easy.classList.add("pointerEvent");
})

stop_game.addEventListener("click", function () {
    alert(`Your Score:${score}`)
    localStorageScore();
    stoppedGame();
})

function bubble(time) {
    clearInterval(show_bubble)
    show_bubble = setInterval(() => {
        let bubble = document.createElement("div");
        bubble.classList.add('bubbleGame__area__game__bubble');
        document.querySelector(".bubbleGame__area__game").appendChild(bubble);
        bubble.addEventListener("click", function () {
            clickBubble(event.target)
        });

        let spacex = bubbleGame__area__game.offsetWidth - bubble.offsetWidth;
        let spacey = bubbleGame__area__game.offsetHeight - bubble.offsetHeight;


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
    if (level_easy.classList.contains("selected-button-color")) {
        score += 1;
    } else if (level_medium.classList.contains("selected-button-color")) {
        score += 2
    } else {
        score += 3;
    }
    score_result.innerText = `Score:${score}`;
}

function stoppedGame() {
    document.querySelector(".bubbleGame__area__game").innerHTML = " ";
    clearInterval(show_bubble);
    document.querySelectorAll(".game_buttons").forEach(function (element) {
        element.classList.add("pointerEvent");
    })
    start_game.classList.remove("pointerEvent");
    document.querySelectorAll(".level_buttons").forEach(function (element) {
        element.classList.remove("selected-button-color");
    })
    score = 0;
    score_result.innerText = `Score:${score}`;
}

function localStorageScore() {
    if (localStorage.getItem(user.value)) {
        if (localStorage.getItem(user.value) < score) {
            localStorage.setItem(user.value, score);
            high_score_result.innerText = `High Score:${localStorage.getItem(user.value)}`;
        }
    } else {
        localStorage.setItem(user.value, score);
        high_score_result.innerText = `High Score:${localStorage.getItem(user.value)}`;
    }
}
