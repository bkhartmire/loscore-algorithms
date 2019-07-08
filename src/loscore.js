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
      return result;
    };
  }

  memoize(func) {
    // YOUR CODE HERE
    const cache = {};
    return function(arg) {
      const arrayKeys = Object.keys(cache);
      if (arrayKeys.includes(JSON.stringify(arg))) {
        return cache[arg];
      }
      cache[arg] = func(arg);
      return cache[arg];
    };
  }

  invoke(collection, functionOrKey) {
    // YOUR CODE HERE
    const result = [];
    for (const item of collection) {
      let func;
      if (typeof functionOrKey !== "string") {
        func = functionOrKey;
      } else if (Array.isArray(item)) {
        func = Array.prototype[functionOrKey];
      } else if (typeof item === "string") {
        func = String.prototype[functionOrKey];
      } else if (typeof item === "object") {
        func = Object.prototype[functionOrKey];
      }
      result.push(func.apply(item));
    }
    return result;
  }

  /**
  | ADVANCED REQUIREMENTS
  |~~~~~~~~~~~~~
  * */

  sortBy(collection, sorter) {
    // YOUR CODE HERE
    const result = [];
    const indexAndProperties = {};
    for (let i = 0; i < collection.length; i++) {
      if (typeof collection[i] !== "object") {
        result.push(sorter(collection[i]));
      } else {
        indexAndProperties[i] = collection[i][sorter];
      }
    }
    const sortedProperties = Object.values(indexAndProperties).sort();
    const indexArr = Object.keys(indexAndProperties);
    for (const value of sortedProperties) {
      const index = indexArr.find(
        (index) => value === indexAndProperties[index]
      );
      result.push(collection[index]);
    }
    return typeof collection[0] === "object" ? result : result.sort();
  }

  zip(...collections) {
    // YOUR CODE HREE
    const result = [];
    for (let i = 0; i < collections[0].length; i++) {
      const item = [];
      for (const collection of collections) {
        item.push(collection[i]);
      }
      result.push(item);
    }
    return result;
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
