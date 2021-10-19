const fs = require('fs');

// nodejs: v8 + libUV (i/o)

// nextTick queue  []
// microtask queue []
// task queue      [task-1]

console.log('start'); // 1

new Promise((resolve, reject) => {
  console.log('new Promise'); // 2
  resolve();
})
.then(_ => console.log('then-1')) // 6
.then(_ => console.log('then-2')); // 7

fs.open(__filename, _ => {
  console.log('fs.open'); // 8
  queueMicrotask(_ => {
    console.log('queueMicrotask-1'); // 9
  });
});

process.nextTick(_ => {
  console.log('nextTick-1'); // 4
  process.nextTick(_ => console.log('nextTick-2')); // 5
});

console.log('end'); // 3
