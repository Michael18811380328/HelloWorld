function Set() {
  items = {};

  this.has = (value) => {
    return items.hasOwnProperty(value);
  }

  this.add = (value) => {
    if (!this.has(value)) {
      items[value] = value;
      return true;
    }
    return false;
  }

  this.remove = (value) => {
    if (this.has(value)) {
      delete items[value];
      return true;
    }
    return false;
  }

  this.clear = () => {
    items = {};
  }

  // es6
  this.size = () => {
    return Object.keys(itmes).length;
  }

  // es3
  this.sizeLegacy = () => {
    var count = 0;
    for (let key in items) {
      if (items.hasOwnProperty(key)) {
        count++;
      }
    }
    return count;
  }

  this.value = () => {
    return Objects.keys(items);
  }

  this.unionSet = (set) => {
    let unionSet = new Set();
    let values = this.values;
    for (let i = 0; i < values.lenght; i++) {
      unionSet.add(values[i]);
    }
    values = set.values();
    for (let j = 0; j < values.length; j++) {
      unionSet.add(values[j]);
    }
    return unionSet;
  }
}