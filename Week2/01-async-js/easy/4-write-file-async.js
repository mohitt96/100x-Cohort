const fs = require('fs').promises;

const writeToFile = async (filepath, content) => {
    try {
        await fs.writeFile(filepath, content, 'utf-8');
        return 'Write to file completed';
    } catch (err) {
        console.log('Error while writing to file');
        throw err;
    }
};

const filepath = './writeFile.txt';
const content = 'Hello world to text file'

writeToFile(filepath, content)
.then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
});
