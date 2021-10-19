const http = require('http');

const server = new http.Server();


// req -> res 3000sec


// task queue: [timeout1, timeout2, timeout3]

// req1 - 3s
// req2 - 3s
// req3 - 3s
server.on('request', async (req, res) => {
    const now = Date.now();
    while (Date.now() - now < 3000) {
        // ...
    }

    // setTimeout(() => {
    //     res.end('hello world');
    // }, 3000);

    // const data = await fetchData();
});

server.listen(3000);