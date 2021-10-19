// banana -> apple

import stream from 'stream';
import fs from 'fs';

class ReplaceStream extends stream.Transform {
    constructor(from, to, options) {
        super(options);

        this.from = from;
        this.to = to;
    }

    _transform(chunk, _, callback) {
        const str = chunk.toString('utf-8');
        setTimeout(() => {
            callback(null, str.replaceAll(this.from, this.to));
        }, 1000);
    }

    _flush(callback) {
        console.log('_flush');
    }
}

fs.createReadStream('fruits111.txt')
    .pipe(new ReplaceStream('pineapple', 'orange', { emitClose: true }))
    .pipe(fs.createWriteStream('frites.txt.out'));

