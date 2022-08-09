import './css/styles.css';
import Notiflix from 'notiflix';
const debounce = require("lodash.debounce")
import fetchCountries from "./js/fetchCountries.js"

const DEBOUNCE_DELAY = 300;


const searchBoxEl = document.querySelector("#search-box")
const countryListEl = document.querySelector(".country-list")
const countryInfoEl = document.querySelector(".country-info")

const onSearchBoxInput = ({target}) => {
    const counryName = target.value.trim()
    countryListEl.textContent = ""
    countryInfoEl.textContent = ""

    if(counryName.length < 1) return

    fetchCountries(counryName)
        .then(updateView)
        .catch((error) => Notiflix.Notify.failure('Oops, there is no country with that name'))
}

function updateView(counties){

    if(counties.length === 1){
        const {name,capital,population,flags,languages} = counties[0]
        countryInfoEl.innerHTML = `
            <img src="${flags.svg}" height=40 />
            <h2 class="country_name">${name.official}</h2>
            <p class="country_property"><span class="country_property__name">Capital:</span> ${capital}</p>
            <p class="country_property"><span class="country_property__name">Population:</span> ${population}</p>
            <p class="country_property"><span class="country_property__name">Languages:</span> ${Object.values(languages)}</p>
        `
    }else if(counties.length <= 10){
        countryListEl.innerHTML = "<ul>" + counties.map(({name,flags}) => `
            <li class="country_list_item">
                <img src="${flags.svg}" width=20 />
                <h2 class="country_list_item__name">${name.official}</h2>
            </li>
        `).join("") + "</ul>"
    }else{
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    }
}

searchBoxEl.addEventListener("input", debounce(onSearchBoxInput, DEBOUNCE_DELAY))
