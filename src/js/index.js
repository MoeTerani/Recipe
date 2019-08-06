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
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * -Search object
 * -Current recipe object
 * -shopping list
 * -liked recipe
 */
const state = {};

/** Search controlller */

const controlSearch = async () => {
  //Get the query from the view
  const query = searchView.getInput();
  console.log(query);

  if (query) {
    // 2: new search object and add it to state
    state.search = new Search(query);

    // 3: prepare UI for result
    searchView.clearInput();
    searchView.clearResults();
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

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/**Recipe Controller */

const controlRecipe = async () => {
  // Get ID from url
  const id = window.location.hash.replace('#', '');

  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlight selected search item
    if (state.search) searchView.highlightSelected(id);

    // Create new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (err) {
      console.log(err);
      alert('Error processing recipe!');
    }
  }
};

/* we save the strings for these two event types into an array

and then looped over them and call window.eventListener

for each of them passing in the corresponding event.*/
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipe)
);

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
  //.btn-decrease * means any child elemnt of that class
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    // Increase button is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // Add ingredients to shopping list
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    // Like controller
    controlLike();
  }
});
