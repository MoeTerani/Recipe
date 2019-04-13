/*
//import default export
import str from './models/Search';
//import specific
import { add, multi, id } from './views/SearchView';
//import everything from searchview
import * as searchView from './views/SearchView';

console.log(`Using imported vriables ${add(5, 5)}`);
*/

// https://www.food2fork.com/api/search
// https://www.food2fork.com/api/get

// APIKEY 1: 302483c930b58460ecbba917f0ee3ce8
// APIKEY 2: a6d4a138f18cee95ac4b8fdf5fc4dfdd

// https://www.food2fork.com/api/search?key=302483c930b58460ecbba917f0ee3ce8&q=chicken%20breast&page=2

import Search from './models/Search';
import * as searchView from './views/SearchView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * -Search object
 * -Current recipe object
 * -shopping list
 * -liked recipe
 */
const state = {};

const controlSearch = async () => {
  //Get the query from the view
  const query = searchView.getInput();
  console.log(query);

  if (query) {
    // 2: new search object and add it to state
    state.search = new Search(query);

    // 3: prepare UI for result
    searchView.clearInput();
    searchView.clearResList();
    renderLoader(elements.searchRes);
    // 4: Search for recipes
    await state.search.getResults();

    // 5: surrender result in UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener('submit', e => {
  // prevent browser from refreshing when search button is pressed.
  e.preventDefault();
  controlSearch();
});
