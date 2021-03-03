// todo akicha: use LinkedList

class Queue {
  constructor() {
    this.queue = []
  }

  enqueue(item) {
    this.queue.push(item)

    return this
  }

  dequeue() {
    this.queue.shift()

    return this
  }

  read() {
    return this.queue[0]
  }
}

module.exports = Queue
