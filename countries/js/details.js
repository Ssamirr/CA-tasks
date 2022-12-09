const BASE_URL = 'https://restcountries.com/v3.1';
let country = localStorage.getItem("clickedCountry");


fetch(`${BASE_URL}/name/${country}`)
    .then(res => res.json())
    .then(data => {
        countryInfo(data[0]);
    })

function countryInfo(item) {
    let countryName = document.querySelector(".details-right__cname");
    countryName.innerText = item.name.common;

    let countryFlag = document.querySelector(".details-left img");
    countryFlag.src = item.flags.svg;

    let detailsInfoMain = document.querySelector(".details-info-main");

    let nativeName = document.createElement("span");
    for (let x in item.name.nativeName) {
        let native = x;
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

    let detailsInfoSecondary = document.querySelector(".details-info-secondary");

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

    let countryBorders = document.querySelector(".borders");
    for (let x in item.borders) {
        let borders = document.createElement("button");
        borders.innerHTML = item.borders[x];
        countryBorders.appendChild(borders);
    }
}

document.querySelector('.back-button button').addEventListener("click",function(){
    window.location = "./index.html";
})