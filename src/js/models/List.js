import uniqid from 'uniqid';

export default class List {
  constructor() {
    //empty array to add it itme in later on
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    };
    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    // index return the index of the itmes that matches the id we passed in
    const index = this.items.findIndex(el => el.id === id);
    // [2,4,8] splice(1, 2) -> returns [4, 8], original array is [2]- mutate the original array
    // [2,4,8] slice(1, 2) -> returns 4, original array is [2,4,8]- NOT mutate the originla array
    this.items.splice(index, 1);
  }

  updateCount(id, newCount) {
    this.items.find(el => el.id === id).count = newCount;
  }
}
