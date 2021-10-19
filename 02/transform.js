import zlib from 'zlib';
import fs from 'fs';
import stream from 'stream';

fs.createReadStream('image11.png')
    .on('error', (err) => console.log(err))
    .pipe(zlib.createGzip())
    .on('error', (err) => console.log(err))
    .pipe(fs.createWriteStream('image.png.gz'))
    .on('error', (err) => console.log(err));

// stream.pipeline(
//     fs.createReadStream('image11.png'),
//     zlib.createGzip(),
//     fs.createWriteStream('image.png.gz'),
//     (err) => {
//         if (err) {
//             console.log('err', err);
//             return;
//         }
//         console.log('done');
//     }
// );