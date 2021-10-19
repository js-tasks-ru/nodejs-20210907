const assert = require('assert');
const server = require('../server');
const http = require('http');
const fs = require('fs');

describe('server tests', () => {
    before('start server', (done) => {
        server.listen(3000, done);
    });

    after('stop server', (done) => {
        server.close(done);
    });

    describe('POST', () => {
        it('should handle aborted requests', (done) => {
            const req = http.request('http://localhost:3000/abort.txt', {
                method: 'POST',
            }, () => {});

            req.on('error', (error) => {
                // console.log(error);
            });

            req.on('close', () => {
                const e = fs.existsSync('abort.txt');
                assert.strictEqual(e, false);
                done();
            });

            req.write('hello');

            setTimeout(() => {
                req.destroy();
            }, 400);
        });

        it('should handle too big files', (done) => {
            const req = http.request('http://localhost:3000/too-big.txt', {
                method: 'POST',
            }, (res) => {
               assert.strictEqual(res.statusCode, 413);
               const e = fs.existsSync('too-big.txt');
               assert.strictEqual(e, false);
               done();
            });

            req.write('hello');
            
            setTimeout(() => {
                req.write('world!!');
            }, 100);
        });
    });
});