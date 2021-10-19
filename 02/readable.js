const fs = require('fs');

const stream = fs.createReadStream('hello.txt', {
  highWaterMark: 9,
  // encoding: 'utf-8'
});

// stream.setEncoding('utf-8');

const body = [];
stream.on('data', (chunk) => {
  body.push(chunk);
  console.log(chunk, chunk.byteLength);
});

stream.on('end', () => {
  // console.log(str);
  const str = Buffer.concat(body).toString('utf-8');
  console.log(str);
});
