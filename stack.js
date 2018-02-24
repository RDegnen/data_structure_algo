#!/usr/bin/env node
function checkSymbols(symArr) {
  const opens = ['(', '{', '['];
  const close = [')', '}', ']'];
  const stack = [];
  for (let i = 0; i < symArr.length; i++) {
    if (opens.includes(symArr[i])) {
      stack.push(symArr[i]);
    } else {
      const last = stack.pop();
      if (close.indexOf(symArr[i]) === opens.indexOf(last)) {
        console.log('continuing');
      } else {
        return false;
      }
    }
  }
  return true;
}

function baseConverter(num, base) {
  const remStack = [];
  const binArr = [];
  while (num > 1) {
    const rem = num % base;
    remStack.push(parseInt(rem));
    num = num / base;
  };
  const l = remStack.length;
  for (let i = 0; i < l; i++) {
    const rem = remStack.pop();
    binArr.push(rem);
  }
  return binArr.join('');
}

function postfixEval(exp) {
  const expArr = exp.split(' ');
  const opStack = [];
  const operators = '*/+-';
  const operands = '1234567890';

  for (let i = 0; i < expArr.length; i++) {
    if (operands.includes(expArr[i])) {
      opStack.push(expArr[i]);
    } else {
      const op1 = opStack.pop();
      const op2 = opStack.pop();
      const result = math(expArr[i], parseInt(op2), parseInt(op1));
      opStack.push(result);
    }
  }
  return opStack.pop();
}

function math(opr, op1, op2) {
  if (opr === '*') {
    return op1 * op2;
  } else if (opr === '/') {
    return op1 / op2;
  } else if (opr === '+') {
    return op1 + op2;
  } else if (opr === '-') {
    return op1 - op2;
  }
}

console.log(postfixEval('17 10 + 3 * 9 /'));
