const fs = require('fs');

function foo() {
    return new Promise((resolve, reject) => {
        fs.readFile(__filename, (err, content) => {
            if (err) {
                reject(err);
            } else {
                resolve(content);
            }
        });
    });
}

// foo() -> tasks queue

async function main() {
    const content = await foo();
}