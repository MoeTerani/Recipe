import axios from 'axios';


export default class Search {
    constructor(query) {
        this.query = query;
    }

    async  getResults() {
        const key = '302483c930b58460ecbba917f0ee3ce8';
        const key2 = 'a6d4a138f18cee95ac4b8fdf5fc4dfdd';
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key2}&q=${this.query} 
        `);
            this.result = res.data.recipes;
        }
        catch (error) {
            alert(error);
        }
    }
}


