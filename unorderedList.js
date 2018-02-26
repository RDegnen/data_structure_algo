// Unordered List
const Node = function(initData) {
  this.data = initData;
  this.next = null;
}

Node.prototype.getData = function() {
  return this.data;
}

Node.prototype.getNext = function() {
  return this.next;
}

Node.prototype.setData = function(newData) {
  this.data = newData;
}

Node.prototype.setNext = function(newNext) {
  this.next = newNext;
}

const UnorderedList = function() {
  this.head = null;
}

UnorderedList.prototype.isEmpty = function() {
  return this.head === null;
}

UnorderedList.prototype.add = function(item) {
  const temp = new Node(item);
  temp.setNext(this.head);
  this.head = temp;
}

UnorderedList.prototype.size = function() {
  let current = this.head;
  let count = 0;
  while (current !== null) {
    count += 1;
    current = current.getNext();
  }
  return count;
}

UnorderedList.prototype.search = function(data) {
  let current = this.head;
  let found = false;
  while (current !== null && !found) {
    if (current.getData() === data) {
      found = true;
    } else {
      current = current.getNext();
    }
  }
  return found;
}

UnorderedList.prototype.remove = function(data) {
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

UnorderedList.prototype.append = function(data) {
  let current = this.head;
  while (current.getNext()) {
    current = current.getNext();
  }
  current.setNext(new Node(data));
}

UnorderedList.prototype.insert = function(index, data) {
  const node = new Node(data);
  let current = this.head;
  let count = 0;
  while (count !== index - 1) {
    count += 1;
    current = current.getNext();
  }
  current.setNext(node);
  node.setNext(current.getNext());
}

UnorderedList.prototype.index = function(data) {
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

UnorderedList.prototype.pop = function() {
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

module.exports = {
  Node,
  UnorderedList,
};
