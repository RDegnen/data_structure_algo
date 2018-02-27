function hotPotato(kids, num) {
  const queue = [];
  let count = 0;
  for (let i = 0; i < kids.length; i++) {
    queue.unshift(kids[i]);
  }
  while (queue.length > 1) {
    if (count === num) {
      queue.pop();
      count = 0;
    } else {
      queue.unshift(queue.pop());
    }
    count += 1;
  }
  return queue;
}

// Printing Queue --------------------------------------------------------------
const Printer = function(ppm) {
  this.pageRate = ppm;
  this.currentTask = null;
  this.timeRemaining = 0;
}

Printer.prototype.tick = function() {
  if (this.currentTask !== null) {
    this.timeRemaining = this.timeRemaining - 1;
    if (this.timeRemaining <= 0) {
      this.currentTask = null;
    }
  }
}

Printer.prototype.busy = function() {
  if (this.currentTask !== null) {
    return true;
  } else {
    return false;
  }
}

Printer.prototype.startNext = function(newTask) {
  this.currentTask = newTask;
  this.timeRemaining = newTask.getPages() * 60 / this.pageRate;
}

const Task = function(time) {
  this.timestamp = time;
  this.pages = Math.floor(Math.random() * (21 - 1) + 1);
}

Task.prototype.getStamp = function() {
  return this.timestamp;
}

Task.prototype.getPages = function () {
  return this.pages;
};

Task.prototype.waitTime = function (currentTime) {
  return currentTime - this.timestamp;
};

function simulation(studentsCount, numSeconds, pagesPerMinute) {
  const printer = new Printer(pagesPerMinute);
  const tasksPerSecond = tasksEverySecond(studentsCount, numSeconds);
  const printerTasks = [];
  const waitingList = [];

  for (let i = 0; i < numSeconds; i++) {
    const currentSecond = i;
    const randNum = Math.floor(Math.random() * ((tasksPerSecond + 1) - 1) + 1);
    if (randNum === tasksPerSecond) {
      printerTasks.unshift(new Task(currentSecond));
    }
    if (!printer.busy() && printerTasks.length > 0) {
      const newTask = printerTasks.pop();
      waitingList.push(newTask.waitTime(currentSecond));
      printer.startNext(newTask);
    }
    printer.tick();
  }
  const avgWait = waitingList.length > 0 ? waitingList.reduce((a, b) => a + b ) / waitingList.length : 0;
  return `Average wait is ${avgWait} seconds. ${printerTasks.length} tasks remaining`;
}

function tasksEverySecond(students, numSeconds) {
  const printJobs = students * 2;
  return numSeconds / printJobs;
}

// for (let i = 0; i < 10; i++) {
//   console.log(simulation(20, 3600, 10));
// }
// -----------------------------------------------------------------------------
function reverseFirstKElements(k, queue) {
  const kStack = [];
  for (let i = 0; i < queue.length - k; i++) {
    const item = queue.pop();
    queue.unshift(item);
  }
  for (let i = 0; i < k; i++) {
    const item = queue.pop();
    kStack.push(item);
  }
  while (kStack.length > 0) {
    const item = kStack.pop();
    queue.unshift(item);
  }
  return queue;
}

// console.log(reverseFirstKElements(6, [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]))
// console.log(reverseFirstKElements(5, [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]))
// console.log(reverseFirstKElements(9, [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]))

function circularTour(data) {
  let totalGas = 0;
  let totalDistance = 0;
  let i = 0;
  let originalIndex = 0;
  let currentRotations = 0;
  while (i < data.length - 1 && currentRotations !== data.length) {
    totalGas += data[i].g;
    totalDistance += data[i].d;
    if (totalGas - totalDistance < 0) {
      totalGas = 0;
      totalDistance = 0;
      data.push(data.shift());
      i = 0;
      originalIndex += 1;
    } else {
      i += 1;
    }
    currentRotations += 1;
  }
  return originalIndex;
}

console.log(circularTour([{g: 4, d: 6}, {g: 6, d: 5}, {g: 7, d: 3}, {g: 4, d: 5}]))
