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

function infixToPostfix(exp) {
  const opStack = [];
  const output = [];
  const infixArr = exp.split(' ');
  const operands = 'ABCDEFG';
  const operators = ['*','/','+','-','('];

  for (let i = 0; i < infixArr.length; i++) {
    const token = infixArr[i];
    if (operands.includes(token)) {
      output.push(token);
    } else if (token === '(') {
      opStack.push(token);
    } else if (token === ')') {
      let opToken = opStack.pop();
      while (opToken !== '(') {
        output.push(opToken);
        opToken = opStack.pop();
      }
    } else if (operators.includes(token)) {
      while (opStack.length > 0 && operators.indexOf(token) >= operators.indexOf(opStack[opStack.length - 1])) {
        output.push(opStack.pop());
      }
      opStack.push(token)
    }
  }
  if (opStack.length > 0) {
    for (let i = 0; i < opStack.length + 1; i++) {
      output.push(opStack.pop());
    }
  }
  return output.join(' ');
}

// console.log(infixToPostfix('A * B + C * D'));
// console.log(infixToPostfix('( A + B ) * C - ( D - E ) * ( F + G )'));

function nextGreatestElement(arr) {
  const output = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] < arr[j]) {
        output.push(arr[j]);
        break;
      } else if (j === arr.length -1) {
        output.push(-1);
      }
    }
  };
  return output;
}

// console.log(nextGreatestElement([4, 5, 2, 25]))
// console.log(nextGreatestElement([13, 7, 6, 12]))
