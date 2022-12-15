let progress = document.querySelector('.progress');
let times = document.querySelector(".times");
let animation = "2s ease 0s infinite normal none running fill";
let time = 0;
let num = 0;

document.querySelector(".run").addEventListener('click', function () {
    time++;
    times.innerHTML = time + 1;
    if (progress.style.animation != animation) {
        showProgress();
    }
})

function showProgress() {
    let timeOut = setTimeout(showProgress, 2000);
    times.innerHTML = time;
    if (time > 0) {
        progress.style.animation = animation;
        num++;
        if (num == 1) {
            time--;
            num = 0;
        }
    } else {
        progress.style.animation = "null";
        clearTimeout(timeOut);
    }
}
