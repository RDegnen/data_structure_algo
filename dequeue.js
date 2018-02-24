const Dequeue = function() {
  this.items = [];
}

Dequeue.prototype.isEmpty = function() {
  return this.items === [];
}

Dequeue.prototype.addFront = function(item) {
  this.items.push(item);
}

Dequeue.prototype.addRear = function(item) {
  this.items.unshift(item);
}

Dequeue.prototype.removeFront = function() {
  return this.items.pop();
}

Dequeue.prototype.removeRear = function() {
  return this.items.shift();
}

Dequeue.prototype.size = function() {
  return this.items.length;
}

// -----------------------------------------------------------------------------

function palindromeCheck(str) {
  const dq = new Dequeue();
  const isPalindrome = true;
  for (let ch of str) {
    dq.addRear(ch);
  };
  while (dq.size() > 1) {
    const first = dq.removeRear();
    const last = dq.removeFront();
    if (first !== last) return false;
  };
  return isPalindrome;
}

console.log(palindromeCheck('radar'));
console.log(palindromeCheck('palindrome'));
