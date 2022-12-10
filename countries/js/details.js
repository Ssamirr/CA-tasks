const BASE_URL = 'https://restcountries.com/v3.1';
let country = localStorage.getItem("clickedCountry");
let darkLightButton = document.querySelector(".header button");
let darkLightButtonInner = darkLightButton.querySelector("span");
let darkLightButtonIcon = darkLightButton.querySelector("i");
let allDetails = document.querySelector(".details");

window.addEventListener("load", function () {
    if (localStorage.getItem("Mode")) {
        if (localStorage.getItem("Mode") == "Light Mode") {
            darkLightButtonInner.innerText = "Light Mode";
            darkLightButtonIcon.classList.replace("fa-moon-o", "fa-sun-o");
            document.querySelector("body").classList.add("dark-light");
        }else{
            darkLightButtonInner.innerText = "Dark Mode";
            darkLightButtonIcon.classList.replace("fa-sun-o", "fa-moon-o");
            document.querySelector("body").classList.remove("dark-light");
        }
    }
})

darkLightButton.addEventListener("click", function () {
    document.querySelector("body").classList.toggle("dark-light");
    darkLightMode();
})

function darkLightMode() {
    if (darkLightButtonInner.innerText == "Light Mode") {
        darkLightButtonInner.innerText = "Dark Mode";
        darkLightButtonIcon.classList.replace("fa-sun-o", "fa-moon-o");
    } else {
        darkLightButtonInner.innerText = "Light Mode";
        darkLightButtonIcon.classList.replace("fa-moon-o", "fa-sun-o");
    }
    localStorage.setItem("Mode", darkLightButtonInner.innerText);
}

const getCountry = (country) => {
    fetch(`${BASE_URL}/name/${country}?fullText=true`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            countryInfo(data[0]);
        })
        .catch(err=>console.log("err ",err))
}

getCountry(country);

function countryInfo(item) {
    let detailsLeft = document.createElement("div");
    detailsLeft.classList.add("details-left");

    let countryFlag = document.createElement("img");
    countryFlag.src = item.flags.svg;
    detailsLeft.appendChild(countryFlag);

    let detailsRight = document.createElement("div");
    detailsRight.classList.add("details-right");

    let countryName = document.createElement("h1");
    countryName.classList.add("details-right__cname");
    countryName.innerText = item.name.common;
    detailsRight.appendChild(countryName);

    let detailsInfo = document.createElement("div");
    detailsInfo.classList.add("details-info");
    detailsRight.appendChild(detailsInfo);

    allDetails.appendChild(detailsLeft);
    allDetails.appendChild(detailsRight);

    let detailsInfoMain = document.createElement("div");
    detailsInfoMain.classList.add("details-info-main");
    detailsInfo.appendChild(detailsInfoMain);

    let nativeName = document.createElement("span");
    for (let x in item.name.nativeName) {
        let native = item.name.nativeName[x].common;
        nativeName.innerHTML = `<span class="bold">Native Name:</span>${native}`;
        break;
    }

    let population = document.createElement("span");
    population.innerHTML = `<span class="bold">Population:</span>${item.population}`;

    let region = document.createElement("span");
    region.innerHTML = `<span class="bold">Region:</span>${item.region}`;

    let subRegion = document.createElement("span");
    subRegion.innerHTML = `<span class="bold">Sub Region:</span>${item.subregion}`;

    let capital = document.createElement("span");
    capital.innerHTML = `<span class="bold">Capital:</span>${item.capital}`;

    detailsInfoMain.appendChild(nativeName);
    detailsInfoMain.appendChild(population);
    detailsInfoMain.appendChild(region);
    detailsInfoMain.appendChild(subRegion);
    detailsInfoMain.appendChild(capital);

    let detailsInfoSecondary = document.createElement("div");
    detailsInfoSecondary.classList.add("details-info-secondary");
    detailsInfo.appendChild(detailsInfoSecondary);

    let topLevelDomain = document.createElement("span");
    topLevelDomain.innerHTML = `<span class="bold">Top Level Domain:</span>${item.tld[0]}`;

    let currency = document.createElement("span");
    for (let x in item.currencies) {
        let itemCurrency = x;
        currency.innerHTML = `<span class="bold">Currencies:</span>${itemCurrency}`;
        break;
    }

    let languages = document.createElement("span");
    let allLanguages = [];
    for (let x in item.languages) {
        allLanguages.push(x.toUpperCase());
    }
    languages.innerHTML = `<span class="bold">Languages:</span>${allLanguages}`;

    detailsInfoSecondary.appendChild(topLevelDomain);
    detailsInfoSecondary.appendChild(currency);
    detailsInfoSecondary.appendChild(languages);

    let countryBorders = document.createElement("div");
    countryBorders.classList.add("borders");
    detailsRight.appendChild(countryBorders);
    countryBorders.innerHTML = `<span class="bold">Borders:</span>`;

    for (let x in item.borders) {
        let borders = document.createElement("button");
        borders.innerHTML = item.borders[x];
        countryBorders.appendChild(borders);

        borders.addEventListener("click", function () {
            fetch(`${BASE_URL}/alpha/${item.borders[x]}`)
                .then(res => res.json())
                .then(data => {
                    allDetails.innerHTML = " ";
                    localStorage.setItem("clickedCountry", data[0].name.official);
                    getCountry(data[0].name.official);
                })
        })
    }
}

document.querySelector('.back-button button').addEventListener("click", function () {
    window.location = "./index.html";
})