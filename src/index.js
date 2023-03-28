import './css/styles.css';
import notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchInput = document.getElementById('search-box');

const countryListElement = document.querySelector('.country-list');
const countryInfoElement = document.querySelector('.country-info');

searchInput.addEventListener(
  'input',
  debounce(() => {
    if (searchInput.value.trim() === '') return;

    fetchCountries({ name: searchInput.value })
      .then((countries) => {
        console.log(countries.length);

        const countriesLength = countries.length;

        // every time we execute the callback we should clean the html
        cleanHtml();

        // if its empty return
        if (countriesLength === 0) return;

        // if there is more than 10 elements display notification and return
        const queryIsNotSpecific = countriesLength > 10;
        if (queryIsNotSpecific) {
          // show message Too many matches found. Please enter a more specific name.
          showNotSpecificQueryNotification();
          return;
        }

        const shouldDisplayMultipleFlags = countriesLength > 2;
        if (shouldDisplayMultipleFlags) {
          // build multiple elements in the html with flag and name
          buildMultipleElement(countries);

          return;
        }

        // build the list with the info of single country
        // get single country
        const country = countries[0];

        createSingleElementList(country);
      })
      .catch((error) => {
        if (error.message === 'NOT_FOUND') {
          showNotFoundNotification();

          return;
        }
      });
  }, DEBOUNCE_DELAY)
);

const cleanHtml = () => {
  // we clean the html
  countryListElement.innerHTML = '';
  countryInfoElement.innerHTML = '';
};

const showNotSpecificQueryNotification = () => {
  // show the notification
  notiflix.Notify.info(
    `Too many matches found. Please enter a more specific name.`
  );
};

const showNotFoundNotification = () => {
  notiflix.Notify.failure(`Oops, there is no country with that name`);
};

const buildMultipleElement = (countries) => {
  const html = countries
    .map((country) => {
      const {
        name: { official },
        flags: { svg },
      } = country;

      return /*html */ `   
        <li class="country-item">
          <img src="${svg}" width="35" height="35" />
          <p>${official}</p>
        </li>`;
    })
    .join('');

  countryListElement.innerHTML = html;
};

const createSingleElementList = ({
  name: { official },
  capital,
  population,
  flags: { svg },
  languages,
}) => {
  const languagesString = Object.values(languages).join(', ');

  const html = /*html*/ `
      <div class="label">
        <img src=${svg} width= '50' height = '50' />
        <h1>${official}</h1>
      </div>

      <ul class="info">
        <li>
          <span>Capital:</span> ${capital}
        </li>

        <li>
          <span>Population:</span> ${population}
        </li>

        <li>
          <span>Languages:</span> ${languagesString}
        </li>
      </ul>
  `;

  countryInfoElement.innerHTML = html;
};
