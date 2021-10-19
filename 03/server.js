const http = require('http');

const server = new http.Server();

server.on('request', async (req, res) => {
    const body = [];

    for await (const chunk of req) {
        body.push(chunk);
    }

    const request = JSON.parse(Buffer.concat(body).toString('utf-8'));

    res.end(request.message);
});

server.listen(3000);