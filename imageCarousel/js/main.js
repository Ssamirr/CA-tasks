let imageContainer = document.querySelector(".image-container");
let nextButton = document.querySelector(".next-btn");
let prevButton = document.querySelector(".prev-btn");
let allImages = [];
let images;
let activeImg;
let getImgId;

nextButton.addEventListener("click", function () {
    imageEditor();
    if (images[getImgId + 1]) {
        images[getImgId + 1].classList.add("show");
    } else {
        images[0].classList.add("show");
    }
})

prevButton.addEventListener("click", function () {
    imageEditor();
    if (images[getImgId - 1]) {
        images[getImgId - 1].classList.add("show");
    } else {
        images[allImages.length - 1].classList.add("show");
    }
})

function randomImage() {
    fetch("https://picsum.photos/400")
        .then(data => {
            imageContainer.innerHTML = " ";

            let img = data.url;
            allImages.push(img);

            if (allImages.length > 5) {
                allImages.shift();
            }

            for (let i = 0; i < allImages.length; i++) {
                let carouselImg = document.createElement("img");
                carouselImg.src = allImages[i];
                carouselImg.id = i;
                if (i == allImages.length - 1) {
                    carouselImg.classList.add("show");
                } else {
                    carouselImg.classList.remove("show");
                }
                imageContainer.appendChild(carouselImg);
            }
        });
}

function imageEditor() {
    images = document.querySelectorAll("img");
    activeImg = document.querySelector(".show");
    getImgId = parseInt(activeImg.id);
    activeImg.classList.remove("show");
}

window.addEventListener('load', function () {
    randomImage();
})

setInterval(randomImage, 3000);


