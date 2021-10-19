import stream from 'stream';

const objects = [
    {
        id: 1,
        name: 'object1',
    },
    {
        id: 2,
        name: 'object2',
    },
    {
        id: 3,
        name: 'object3',
    },
    {
        id: 4,
        name: 'object4',
    },
];

class Logger extends stream.Transform {
    _transform(chunk, encoding, callback) {
        console.log(chunk);
        
        // chunk
        // line1
        // line2
        // line3

        // this.push(line1)
        // this.push(line2)
        // this.push(line3)
        // callback();
    }
}

function createLoggerStream() {
    return new Logger({ objectMode: true });
}

stream.Readable.from(objects)
    .pipe(createLoggerStream());