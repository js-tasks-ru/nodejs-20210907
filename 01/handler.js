let i = 0;

const obj = {};

function handler(req, res) {
    obj[Math.random()] = "*".repeat(1000000).split("");

    i++;
    res.end(i.toString());
}

module.exports = handler; // require - handler
// exports.handler = handler; // require - { handler }

// COMMON JS
// ES Modules