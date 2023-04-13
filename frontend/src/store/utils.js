// Build dynamic query string
export const objectToQuerySting = (obj) => {
  return Object.keys(obj)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]))
    .join("&");
};

export const stringifySearchWordObj = (citySuffix, cleanSuggestion, term) => {
  const searchWordObj = JSON.stringify({
    [term]: cleanSuggestion,
    citySuffix: citySuffix,
    term: term,
  });
  return searchWordObj;
};

export const getLocalStorageSearchCredentials = () => {
  const localStorageObj = JSON.parse(localStorage.getItem("searchWord"));
  let listingType = localStorage.getItem("listingType");

  let searchWord;
  let term;

  // Check if there is localStorage for an User
  if (localStorageObj && listingType) {
    searchWord = Object.values(localStorageObj)[0];

    // If there is a city suffix, add it to the search word
    // It should be a State like - NY, CA, FL, etc.
    if (localStorageObj.citySuffix) {
      searchWord += `,${localStorageObj.citySuffix}`;
    }

    term = localStorageObj.term;
  } else {
    // If there is no localStorage for an User, set default values
    searchWord = "New York, NY";
    term = "city";
    listingType = "Sale";
  }

  return { term, searchWord, listingType };
};

// Grab search filters from localstorage and
export const cleanLocalStorageSearchCredentials = () => {
  let { term, searchWord, listingType } = getLocalStorageSearchCredentials();

  searchWord = searchWord.split(",")[0]; // Grab only city form "City, State" string

  const encodedSeachValue = encodeURIComponent(searchWord);

  return {
    expected_response: "listings", // Flag for back-end. Rails may receive suggestions flag
    [term]: encodedSeachValue,
    term,
    listing_type: listingType,
  };
};