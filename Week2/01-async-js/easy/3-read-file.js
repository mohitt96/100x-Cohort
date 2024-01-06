const fs = require('fs')

const readFile = () => {
    try {
        const data = fs.readFileSync('./test.txt', 'utf-8');
        console.log(data);
    } catch(err) {
        console.log(err);
    }
}

readFile()
