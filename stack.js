const { _Node } = require("./node");

class Stack {
  constructor() {
    this.top = null;
  }

  push(data) {
    if (this.top === null) {
      this.top = new _Node(data);
      return;
    }
    const newNode = new _Node(data, this.top);
    this.top = newNode;
    return;
  }

  pop() {
    if (this.top === null) {
      console.log("Stack is empty");
      return;
    }
    const node = this.top;
    this.top = node.next;
    return node.value;
  }
}

const starTrek = new Stack();
starTrek.push("Kirk");
starTrek.push("Spock");
starTrek.push("McCoy");
starTrek.push("Scotty");

console.log("starTrek after pushing: ", JSON.stringify(starTrek));

// Helper functions

function peek(stack) {
  return stack.top.value;
}

function isEmpty(stack) {
  if (!stack.top) {
    return true;
  }
  return false;
}

function display(stack) {
  if (!stack.top) {
    console.log("Stack is empty");
    return;
  }
  let current = stack.top;
  while (current !== null) {
    console.log(current.value);
    current = current.next;
  }
  return;
}

console.log("peek: ", peek(starTrek));
console.log("isEmpty: ", isEmpty(starTrek));
const emptyStack = new Stack();
display(emptyStack);
display(starTrek);

// Drills

/*
Check for palindromes using a stack
A palindrome is a word, phrase, or number that is spelled the same forward and backward. For example, 
“dad” is a palindrome; “A man, a plan, a canal: Panama” is a palindrome if you take out the spaces and 
ignore the punctuation; and 1,001 is a numeric palindrome. We can use a stack to determine whether or not 
a given string is a palindrome.

Write an algorithm that uses a stack to determine whether a given input is palindrome or not. Use the 
following template as a starting point.
*/

function isPalindrome(string) {
  string = string.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  const testStack = new Stack();

  for (let i = 0; i < string.length; i++) {
    testStack.push(string[i]);
  }

  let palindrome = true;
  let i = 0;

  while (testStack.top !== null) {
    const testItem = testStack.pop();
    if (testItem !== string[i]) {
      palindrome = false;
      break;
    }
    i++;
  }

  return palindrome;
}

// True, true, true, false
console.log("**** isPalindrome test cases ****");
console.log(isPalindrome("dad"));
console.log(isPalindrome("A man, a plan, a canal: Panama"));
console.log(isPalindrome("1001"));
console.log(isPalindrome("Tauhida"));

/*
Matching parentheses in an expression

A stack can be used to ensure that an arithmetic expression has balanced parentheses. Write a function 
that takes an arithmetic expression as an argument and returns true or false based on matching parenthesis. 
As a bonus provide a meaningful error message to the user as to what's missing. For example, you 
are missing a ( or missing a ")".

For version 1, the parentheses you need to consider are ( and ). Finding a close parenthesis without an 
open parenthesis is an error (report the location of the close); reaching the end of the string while 
still "holding" an open parenthesis is also an error (report the location of the open).

Extension exercise: Recognize 3 pairs of brackets: (), [], and {}. These must be correctly nested; 
"([)]" is incorrect, and should report an error at the ), stating that you were expecting a ] but found 
a ). If this is starting to look and sound very familiar, congratulations - you're beginning to write a 
simple language parser!

Extension extension exercise: Also recognize 2 types of quote character: "" and ''. 
Inside quotes, brackets aren't counted at all - in fact, nothing is counted until you reach the 
corresponding close quote.
*/

function matchParens(expression) {
  const testStack = new Stack();

  const testPunctuation = {
    '(' : ')',
    '{' : '}',
    '[' : ']',
  };

  for(let i = 0; i < expression.length; i++) {
    if(expression[i] === '(' || expression[i] === '{' || expression[i] === '[' ) {
      testStack.push(expression[i]);
    } else {
      let last = testStack.pop();
      if (expression[i] !== testPunctuation[last]) {
        return false;
      }
    }
  }
  if (testStack.top !== null) {
    return false;
  }
  return true;
}

console.log('**** matchParens test cases ****');
console.log(matchParens('({})')); // true
console.log(matchParens('(})[')); // false
console.log(matchParens('(){}[({})]')) // true

/*
 * Sort stack
 *
 * Write a program to sort a stack such that the smallest items are on the top (in ascending order). 
 * You can use an additional stack, but you may not use any other data structure (such as an array, or 
 *  linked list).
*/

function stackSort(stack) {
  const tempStack = new Stack();

  while(!isEmpty(stack)) {

    let tempItem = stack.pop();

    while(!isEmpty(tempStack) && peek(tempStack) < tempItem) {
      stack.push(tempStack.pop())
    }

    tempStack.push(tempItem)
  }

  return tempStack;
}

const numStack = new Stack();
numStack.push(4);
numStack.push(90);
numStack.push(39);
numStack.push(42);
numStack.push(2);
numStack.push(55);
console.log('**** stackSort test case ****');
console.log(JSON.stringify(stackSort(numStack)));

module.exports = {
  Stack,
}