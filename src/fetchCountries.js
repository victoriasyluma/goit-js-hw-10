export const fetchCountries = ({ name: searchValue }) => {
  return fetch(
    `https://restcountries.com/v3.1/name/${searchValue}?fields=name,capital,population,flags,languages`
  ).then((response) => {
    const { status } = response;
    const NOT_FOUND = 404;

    if (status === NOT_FOUND) {
      throw new Error('NOT_FOUND');
    }

    return response.json();
  });
};
