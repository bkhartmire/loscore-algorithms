// Let's make an object and start adding methods to it!
class LoScore {
  identity(val) {
    return val;
  }

  /**
  | ARRAYS
  |~~~~~~~~~~
  * */
  uniq(array) {
    // YOUR CODE HERE
    const result = [];
    for (const item of array) {
      if (!result.includes(item)) {
        result.push(item);
      }
    }
    return result;
  }

  /**
  | COLLECTIONS
  |~~~~~~~~~~
  * */
  each(collection, iterator) {
    if (collection instanceof Array) {
      for (let i = 0; i < collection.length; i += 1) {
        iterator(collection[i], i, collection);
      }
    } else {
      const keys = Object.keys(collection);
      for (let i = 0; i < keys.length; i += 1) {
        iterator(collection[keys[i]], keys[i], collection);
      }
    }
  }

  map(collection, iteratee) {
    // YOUR CODE HERE
    const result = [];
    this.each(collection, (item) => {
      result.push(iteratee(item));
    });
    return result;
  }

  filter(collection, test) {
    const result = [];
    this.each(collection, (val) => test(val) && result.push(val));
    return result;
  }

  reject(collection, test) {
    return this.filter(collection, (item) => {
      return !test(item);
    });
  }

  reduce(collection, iterator, accumulator) {
    // YOUR CODE HERE
    let newCollection;
    if (accumulator === undefined) {
      newCollection = collection.slice(1);
      accumulator = collection[0];
    } else {
      newCollection = collection;
    }
    this.each(newCollection, (item) => {
      accumulator = iterator(accumulator, item);
    });
    return accumulator;
  }

  every(collection, test) {
    // YOUR CODE HERE
    if (test === undefined) {
      return this.reduce(collection, (accumulator, item) => item);
    }
    return this.reduce(
      collection,
      (accumulator, item) => {
        if (!test(item)) {
          accumulator = false;
        }
        return accumulator;
      },
      true
    );
  }

  /**
  | OBJECTS
  |~~~~~~~~~~
  * */
  extend(firstObj, ...objs) {
    // YOUR CODE HERE
    this.each(objs, (obj) => {
      for (const key in obj) {
        firstObj[key] = obj[key];
      }
    });
    return firstObj;
  }

  /**
  | FUNCTIONS
  |~~~~~~~~~~
  * */

  once(func) {
    // YOUR CODE HERE
    const result = func();
    return function() {
      // if (func) {
      //   func = null;
      // }
      return result;
    };
  }

  memoize(func) {
    // YOUR CODE HERE
  }

  invoke(collection, functionOrKey) {
    // YOUR CODE HERE
  }

  /**
  | ADVANCED REQUIREMENTS
  |~~~~~~~~~~~~~
  * */

  sortBy() {
    // YOUR CODE HERE
  }

  zip() {
    // YOUR CODE HREE
  }

  delay() {
    // YOUR CODE HERE
  }

  defaults() {
    // YOUR CODE HERE
  }

  throttle() {
    // YOUR CODE HERE
  }
}

module.exports = new LoScore();
