let searchCountry = document.querySelector(".search-country");
let mainCountries = document.querySelector(".main-countries");
let selectOption = document.querySelector(".main-header_select");
let selectOptions = [];

const BASE_URL = 'https://restcountries.com/v3.1';

searchCountry.addEventListener("input", function () {
    if (searchCountry.value.length > 0) {
        fetch(`${BASE_URL}/name/${searchCountry.value}`)
            .then(res => res.json())
            .then(data => {
                if (!data.length) {
                    mainCountries.innerHTML = "Data Not Found";
                } else {
                    dataHelper(data)
                }

            })
    } else {
        getData()
    }
})

selectOption.addEventListener("change", function () {
    let selectOptionValue = selectOption.value;
    if (selectOptionValue == 0) {
        getData()
    } else {
        fetch(`${BASE_URL}/region/${selectOptionValue}`)
            .then(res => res.json())
            .then(data => {
                dataHelper(data)
            })
    }
})

const getData = () => {
    mainCountries.innerHTML = "";
    fetch(`${BASE_URL}/all`)
        .then(res => res.json())
        .then(data => {
            dataHelper(data);
        })
}

function dataHelper(data) {
    mainCountries.innerHTML = "";
    data.forEach(function (item) {
        showCountries(item);
    })
}

function showCountries(item) {
    let mainCountriesItem = document.createElement("div");
    mainCountriesItem.classList.add("main-countries__item");

    let countriesFlag = document.createElement("img");
    countriesFlag.classList.add('main-countries__item__flag');
    countriesFlag.src = item.flags.svg;

    let mainCountriesItemInfo = document.createElement("div");
    mainCountriesItemInfo.classList.add("main-countries__item__info");

    let countryName = document.createElement("div");
    countryName.classList.add("main-countries__item__info_country");
    countryName.innerText = item?.name?.common;

    let countriesPopulation = document.createElement("span");
    countriesPopulation.classList.add("main-countries__item__info__population");
    countriesPopulation.innerHTML = `<span class="bold">Population:</span>${item.population}</span>`;

    let countriesRegion = document.createElement("span");
    countriesRegion.classList.add("main-countries__item__info__region");
    countriesRegion.innerHTML = `<span class="bold">Region:</span>${item.region}</span>`;

    let countriesCapital = document.createElement("span");
    countriesCapital.classList.add("main-countries__item__info__capital");
    countriesCapital.innerHTML = `<span class="bold">capital:</span>${item.capital}</span>`

    mainCountriesItem.appendChild(countriesFlag);
    mainCountriesItem.appendChild(mainCountriesItemInfo);
    mainCountriesItemInfo.appendChild(countryName);
    mainCountriesItemInfo.appendChild(countriesPopulation);
    mainCountriesItemInfo.appendChild(countriesRegion);
    mainCountriesItemInfo.appendChild(countriesCapital);
    mainCountries.appendChild(mainCountriesItem);

    if (!selectOptions.includes(item.region)) {
        selectOptions.push(item.region);
        let selectValue = document.createElement("option");
        selectValue.value = item.region;
        selectValue.innerText = item.region;
        selectOption.appendChild(selectValue);
    }

    mainCountriesItem.addEventListener("click", function () {
        window.location = "./detailPage.html";
        let clickedCountry = item.name.common;
        localStorage.setItem("clickedCountry", clickedCountry);
    })
}

getData();







