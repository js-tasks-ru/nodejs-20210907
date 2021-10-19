const http = require('http');
const fs = require('fs');
const path = require('path');
const LimitSizeStream = require('./LimitSizeStream');
const stream = require('stream');

const server = new http.Server();

server.on('request', (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname.slice(1);

    if (pathname.includes('/') || pathname.includes('..')) {
        res.statusCode = 400;
        res.end('Nested paths are not allowed');
        return;
    }

    const filepath = path.join(__dirname, 'files', pathname);

    switch (req.method) {
        case 'GET':
            const readStream = fs.createReadStream(filepath);
            readStream.pipe(res);

            readStream.on('error', (error) => {
                if (error.code === 'ENOENT') {
                    res.statusCode = 404;
                    res.end('file not found');
                    return;
                }
                res.statusCode = 500;
                res.end('internal error');
            });
            break;
        case 'POST':

            const writeStream = fs.createWriteStream(filepath, {
                flags: 'wx'
            });
            const limitSizeStream = new LimitSizeStream({ limit: 10 });

            req.pipe(limitSizeStream).pipe(writeStream);

            writeStream.on('finish', () => {
                res.end('file saved');
            });

            limitSizeStream.on('error', (error) => {
                if (error.code === 'LIMIT_EXCEEDED') {
                    res.statusCode = 413;
                    res.end('file is too big');
                } else {
                    res.statusCode = 500;
                    res.end('internal error');
                }

                writeStream.destroy();
                fs.unlink(filepath, error => {});
            });

            writeStream.on('error', (error) => {
                console.log(error);
                if (error.code === 'EEXIST') {
                    res.statusCode = 409;
                    res.end('file already exists');
                    return;
                }
                res.statusCode = 500;
                res.end('internal error');
            });

            req.on('aborted', () => {
                limitSizeStream.destroy();
                writeStream.destroy();
                fs.unlink(filepath, error => {});
            });

            break;
        case 'DELETE':
            fs.unlink(filepath, (error) => {
                if (!error) {
                    res.end('all good');
                } else {
                    if (error.code === 'ENOENT') {
                        res.statusCode = 404;
                        res.end('file not found');
                    } else {
                        res.statusCode = 500;
                        res.end('error');
                    }
                }
            });
            break;
        default:
            res.statusCode = 501;
            res.end('Not implemented');
    }
});

module.exports = server;
