const { Queue } = require("./queue");

const bankLobby = new Queue();

bankLobby.enqueue(1);
bankLobby.enqueue(2);
bankLobby.enqueue(3);
bankLobby.enqueue(4);
bankLobby.enqueue(5);
bankLobby.enqueue(6);
bankLobby.enqueue(7);
bankLobby.enqueue(8);
bankLobby.enqueue(9);
bankLobby.enqueue(10);

function ophedianBank(queue) {
  while(queue.first !== null) {
    let paperwork = Math.random();
    if (paperwork > 0.25) {
      console.log(`Finished ${queue.first.value} with proper paperwork.`);
      queue.dequeue();
    } else {
      const noPaperwork = queue.first.value;
      console.log(`Sending ${queue.first.value} back, wrong paperwork.`);
      queue.dequeue()
      queue.enqueue(noPaperwork);
    }
  }
  return queue;
}

ophedianBank(bankLobby);