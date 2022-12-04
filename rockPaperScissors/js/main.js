let rulesButton = document.querySelector(".game__rules");
let rulesModal = document.querySelector(".modal");
let gameContents = document.querySelector(".game__contents");
let gameTools = document.querySelectorAll(".game__main__tools__svg");
let gameMain = document.querySelector(".game__main");
let userSelect = document.querySelector(".user_side");
let houseSelect = document.querySelector(".house_side");
let winnerOrLosser = document.querySelector(".winner-or-losser");
let againButton = document.querySelector(".again-button");
let userScore = document.querySelector(".user-score");
let score;
let paper = `<div class="game__main__tools__svg game__main__paper "><img src="./images/icon-paper.svg" alt=""></div>`;
let scissors = `<div class="game__main__tools__svg game__main__scissors "><img src="./images/icon-scissors.svg" alt=""></div>`;
let rock = `<div class="game__main__tools__svg game__main__rock "><img src="./images/icon-rock.svg" alt=""></div>`;
let rockPaperScissors = [paper, scissors, rock];

if (localStorage.getItem("score")) {
    score = localStorage.getItem("score");
} else {
    score = 0;
}
userScore.innerText = score;

rulesButton.addEventListener("click", function () {
    event.stopPropagation();
    rulesModal.classList.add("modal__show");
    gameContents.style.opacity = "0.2";
})

document.querySelector("body").addEventListener("click", function () {
    if (event.target.closest(".game__modal__close") || !event.target.closest(".modal")) {
        rulesModal.classList.remove("modal__show");
        gameContents.style.opacity = "1";
    }
})

gameTools.forEach(function (e) {
    e.addEventListener("click", function () {
        let userChoosing;
        let text;
        let houseChoosing

        if (e.classList.contains("game__main__paper")) {
            userChoosing = paper;
        } else if (e.classList.contains("game__main__scissors")) {
            userChoosing = scissors;
        } else {
            userChoosing = rock;
        }

        let randomNumber = Math.floor(Math.random() * rockPaperScissors.length);
        houseChoosing = rockPaperScissors[randomNumber];

        if (userChoosing == houseChoosing) {
            text = "Draw";
        } else if (userChoosing == paper && houseChoosing == rock || userChoosing == scissors && houseChoosing == paper || userChoosing == rock && houseChoosing == scissors) {
            text = "You Win";
            score++;
        } else {
            text = "You lost";
            score--;
        }
        localStorage.setItem("score", score);

        gameMain.style.opacity = "0";
        setTimeout(() => {
            gameMain.style.display = "none";
            document.querySelector(".game__select").style.display = "flex";
            userSelect.innerHTML = userChoosing;
            houseSelect.innerHTML = houseChoosing;
            winnerOrLosser.innerText = text;
            userScore.innerText = score;
        }, 500);

    })
})

againButton.addEventListener("click", function () {
    document.querySelector(".game__select").style.display = "none";
    gameMain.style.display = "flex";
    gameMain.style.opacity = "1";
})

