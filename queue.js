const { _Node } = require("./node");
const { Stack } = require("./stack");

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(data) {
    const node = new _Node(data);

    if (this.first === null) {
      this.first = node;
    }

    if (this.last) {
      this.last.next = node;
    }

    this.last = node;
    this.size++;
  }

  dequeue() {
    if (this.first === null) {
      return;
    }
    const node = this.first;
    this.first = this.first.next;

    if (node === this.last) {
      this.last = null;
    }
    this.size--;
    return node.value;
  }
}

const starTrekQ = new Queue();
starTrekQ.enqueue("Kirk");
starTrekQ.enqueue("Spock");
starTrekQ.enqueue("Uhura");
starTrekQ.enqueue("Sulu");
starTrekQ.enqueue("Checkov");

// Helper functions

function peek(queue) {
  return queue.first.value;
}

function isEmpty(queue) {
  if (!queue.first) {
    return true;
  }
  return false;
}

function display(queue) {
  if (!queue.first) {
    console.log("Queue is empty");
    return;
  }
  let current = queue.first;
  while (current !== null) {
    console.log(current.value);
    current = current.next;
  }
  return;
}

console.log("peek: ", peek(starTrekQ));
console.log("isEmpty: ", isEmpty(starTrekQ));
display(starTrekQ);

// Drills

/*
Create a queue class using Doubly linked List

Use the items listed in #6 and enqueue them to your queue.

Check to see who is first one on the Queue?
*/

class DoubleNode {
  constructor(data, next = null, previous) {
    this.value = data;
    this.next = next;
    this.previous = previous;
  }
}

class DoubleQueue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  enqueue(data) {
    const node = new DoubleNode(data);

    if (this.head === null) {
      this.head = node;
      node.previous = null;
    }

    if (this.tail) {
      node.previous = this.tail;
      this.tail.next = node;
    }
    node.previous = this.tail;
    this.tail = node;

  }

  dequeue() {
    if (this.head === null) {
      return;
    }
    const node = this.head;
    this.head = this.head.next;

    if (node === this.tail) {
      this.tail = null;
    }
    return node.value;
  }
}

const doubleQueue = new DoubleQueue();
doubleQueue.enqueue("Kirk");
doubleQueue.enqueue("Spock");
doubleQueue.enqueue("Uhura");
doubleQueue.enqueue("Sulu");
doubleQueue.enqueue("Checkov");

// console.log('double queue test: ', doubleQueue); // kirk is first, checkov is the tail

class QueueFromStacks {
  constructor() {
    this.stack1 = new Stack();
    this.stack2 = new Stack();
  }

  enqueue(data) {
    const node = new _Node(data);

    this.stack1.push(node);
  }

  dequeue() {
    if (this.stack2.top === null) {
      if (this.stack1.top === null) {
        return 'Empty queue';
      }
      while(this.stack1.top !== null) {
        let item = this.stack1.pop()
        this.stack2.push(item);
      }
    }
    return this.stack2.pop();
  }
}

/* 9. Square dance pairing
 * As people come to the dance floor, they should be paired off as quickly as possible: man with 
 * woman, man with woman, all the way down the line. If several men arrive in a row, they should 
 * be paired in the order they came, and likewise if several women do. Maintain a queue of 
 * "spares" (men for whom you have no women yet, or vice versa), and pair them as appropriate.
*/

class Dancer {
  constructor(name, sex) {
      this.name = name;
      this.sex = sex;
  }
}
function createPartners() {  
  let men = new Queue();
  let women = new Queue();
  function lineUpDancers(name, sex, men, women) {
      if (sex === "male" || sex === "man" || sex === "M") {
          men.enqueue(new Dancer(name, "Male"));
      } else if (sex === "female" || sex === "woman" || sex === "F") {
          women.enqueue(new Dancer(name, "Female"));
      } else {
          throw new Error('Must provide a valid sex of the dancer')
      }
      return { men, women }
  }
  function announcePartners(mensQueue, womensQueue) {
      while (mensQueue.first && womensQueue.first) {
          let woman = womensQueue.first.value;
          let man = mensQueue.first.value;
          console.log(`${woman.sex} dancer is ${woman.name}, ${man.sex} dancer is ${man.name}`);
          mensQueue.dequeue();
          womensQueue.dequeue();
      }
      if (mensQueue.first) {
          if (mensQueue.size === 1) {
              console.log(`${mensQueue.first.name} is waiting for a partner`)
          } else {
              console.log(`There are ${mensQueue.size} male dancers waiting to dance`)
          }
      } else if (womensQueue.first) {
          if (womensQueue.size === 1) {
              console.log(`${womensQueue.first.name} is waiting for a partner`)
          } else {
              console.log(`There are ${womensQueue.size} female dancers waiting to dance`)
          }
      } else {
          console.log('No one currently waiting to dance')
      }
  }
  lineUpDancers('Jane', 'F', men, women);
  lineUpDancers('Frank', 'M', men, women);
  lineUpDancers('John', 'M', men, women);
  lineUpDancers('Sherlock', 'M', men, women);
  lineUpDancers('Madonna', 'F', men, women);
  lineUpDancers('David', 'M', men, women);
  lineUpDancers('Christopher', 'M', men, women);
  lineUpDancers('Beyonce', 'F', men, women);
  return announcePartners(men, women);
}
createPartners();

module.exports = {
  Queue,
}