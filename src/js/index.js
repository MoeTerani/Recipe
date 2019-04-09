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

// APIKEY: 302483c930b58460ecbba917f0ee3ce8


// https://www.food2fork.com/api/search?key=302483c930b58460ecbba917f0ee3ce8&q=chicken%20breast&page=2 

import axios from 'axios';

async function getResult(query) {
    const key = '302483c930b58460ecbba917f0ee3ce8';
    try {
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query} 
    `);
        const recipeSearch = res.data.recipes;
        console.log(recipeSearch[0]);
    }
    catch (error) {
        alert(error);
    }
}
getResult('pizza');