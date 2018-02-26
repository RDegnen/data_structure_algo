const { Node } = require('./unorderedList');

const OrderedList = function() {
  this.head = null;
}

OrderedList.prototype.isEmpty = function() {
  return this.head === null;
}

OrderedList.prototype.add = function(data) {
  let current = this.head;
  let previous = null;
  let stop = false;
  while (current !== null && !stop) {
    if (current.getData() > data) {
      stop = true;
    } else {
      previous = current;
      current = current.getNext();
    }
  }

  const temp = new Node(data);
  if (previous === null) {
    temp.setNext(this.head);
    this.head = temp;
  } else {
    temp.setNext(current);
    previous.setNext(temp);
  }
}

OrderedList.prototype.size = function() {
  let current = this.head;
  let count = 0;
  while (current !== null) {
    count += 1;
    current = current.getNext();
  }
  return count;
}

OrderedList.prototype.search = function(data) {
  let current = this.head;
  let found = false;
  let stop = false;
  while (current !== null && !found && !stop) {
    if (current.getData() === data) {
      found = true;
    } else {
      if (current.getData() > data) {
        stop = true;
      } else {
        current = current.getNext();
      }
    }
  }
  return found;
}

OrderedList.prototype.remove = function(data) {
  let current = this.head;
  let previous = null;
  let found = false;
  while (current !== null && !found) {
    if (current.getData() === data) {
      found = true;
    } else {
      previous = current;
      current = current.getNext();
    }
  }
  if (previous === null) {
    this.head = current.getNext();
  } else {
    previous.setNext(current.getNext());
  }
}

OrderedList.prototype.index = function(data) {
  let current = this.head;
  let count = 0;
  let found = false;
  while (current !== null && !found) {
    if (current.getData() === data) {
      found = true;
    } else {
      count += 1;
      current = current.getNext();
    }
  }
  return count;
}

OrderedList.prototype.pop = function() {
  let current = this.head;
  let previous = null;
  while (current.getNext()) {
    previous = current;
    current = current.getNext();
  }
  if (previous === null) {
    this.head = null;
  } else {
    previous.setNext(null);
  }
}

module.exports = OrderedList;
