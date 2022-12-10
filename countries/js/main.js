let searchCountry = document.querySelector(".search-country");
let mainCountries = document.querySelector(".main-countries");
let selectOption = document.querySelector(".main-header_select");
let darkLightButton = document.querySelector(".header button");
let darkLightButtonInner = darkLightButton.querySelector("span");
let darkLightButtonIcon = darkLightButton.querySelector("i");
let selectOptions = [];
let selectedCountries = [];

const BASE_URL = 'https://restcountries.com/v3.1';

window.addEventListener("load", function () {
    getData();
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

searchCountry.addEventListener("input", function () {
    if (searchCountry.value.length > 0) {
        fetch(`${BASE_URL}/name/${searchCountry.value}`)
            .then(res => res.json())
            .then(data => {
                if (!data.length) {
                    mainCountries.innerHTML = "Data Not Found";
                } else {
                    filterForSelectOption(data);
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
                filterForSearch(data);
            })
    }
})

const getData = () => {
    mainCountries.innerHTML = "";
    fetch(`${BASE_URL}/all`)
        .then(res => res.json())
        .then(data => {
            let selectedCountries = [];
            data.forEach(function (element) {
                if (searchCountry.value.length > 0) {
                    let newOption = searchCountry.value;
                    if (element.name.common.toLowerCase().includes(newOption.toLowerCase())) {
                        selectedCountries.push(element);
                    }
                } else if (selectOption.value != 0) {
                    let newOption = selectOption.value;
                    if (newOption == element.region) {
                        selectedCountries.push(element);
                    }
                } else {
                    selectedCountries = data;
                }
            })
            dataHelper(selectedCountries);
        })
}

function dataHelper(data) {
    mainCountries.innerHTML = "";
    if (data.length) {
        data.forEach(function (item) {
            showCountries(item);
        })
    }
    else {
        mainCountries.innerHTML = "Data Not Found";
    }
}

function filterForSearch(data) {
    selectedCountries = [];
    data.forEach(function (element) {
        if (searchCountry.value.length > 0) {
            let newOption = searchCountry.value;
            if (element.name.common.toLowerCase().includes(newOption.toLowerCase())) {
                selectedCountries.push(element);
            }
        } else {
            selectedCountries = data;
        }
    })
    dataHelper(selectedCountries);
}

function filterForSelectOption(data) {
    selectedCountries = [];
    data.forEach(function (element) {
        if (selectOption.value != 0) {
            let newOption = selectOption.value;
            if (newOption == element.region) {
                selectedCountries.push(element);
            }
        } else {
            selectedCountries = data;
        }
    })
    dataHelper(selectedCountries);
}

function showCountries(item) {
    let head = document.createElement("div");
    head.classList.add("head")

    let mainCountriesItem = document.createElement("div");
    mainCountriesItem.classList.add("main-countries__item");
    head.appendChild(mainCountriesItem)

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
    countriesCapital.innerHTML = `<span class="bold">capital:</span>${item.capital ? item.capital : " "}</span>`

    mainCountriesItem.appendChild(countriesFlag);
    mainCountriesItem.appendChild(mainCountriesItemInfo);
    mainCountriesItemInfo.appendChild(countryName);
    mainCountriesItemInfo.appendChild(countriesPopulation);
    mainCountriesItemInfo.appendChild(countriesRegion);
    mainCountriesItemInfo.appendChild(countriesCapital);
    mainCountries.appendChild(head);

    if (!selectOptions.includes(item.region)) {
        selectOptions.push(item.region);
        let selectValue = document.createElement("option");
        selectValue.value = item.region;
        selectValue.innerText = item.region;
        selectOption.appendChild(selectValue);
    }

    mainCountriesItem.addEventListener("click", function () {
        window.location = "./detailPage.html";
        let clickedCountry = item.name.official;
        localStorage.setItem("clickedCountry", clickedCountry);
    })
}








