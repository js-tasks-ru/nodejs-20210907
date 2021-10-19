let i = 0;

function handler(req, res) {
    i++;
    res.end(i.toString());
}

export default handler;

// export handler;

// module.exports = handler; // require - handler
// exports.handler = handler; // require - { handler }

// COMMON JS
// ES Modules