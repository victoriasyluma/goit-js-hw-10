import './css/styles.css';
import notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchInput = document.getElementById('search-box');

searchInput.addEventListener(
  'input',
  debounce(() => {
    if (searchInput.value.trim() === '') return;

    fetchCountries({ name: searchInput.value })
      .then((response) => {
        debugger;

        if (response.name.official > 10) {
          notiflix.Notify.failure(
            `Too many matches found. Please enter a more specific name.`
          );
        }
      })
      .catch(() => {});
  }, DEBOUNCE_DELAY)
);

// export function fetchCountries(name) {
//   return fetch('https://restcountries.com/v3.1/name/name')
//     .then((response) => response.json())
//     .then((data) => data)
//     .catch((error) => console.error(error));
// }

// export const fetchCountries = async (name) => {
//   const response = await fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages`
//   );
//   const data = await response.json();
//   return data;
// };

// Написати обробник події input для текстового поля, який буде викликати функцію fetchCountries з введеною користувачем
