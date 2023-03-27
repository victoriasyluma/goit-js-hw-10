export const fetchCountries = ({ name: searchValue }) => {
  return fetch(
    `https://restcountries.com/v3.1/name/${searchValue}?fields=name.official,capital,population,flags,languages`
  ).then((response) => {
    return response.json();
  });
};
