const fs = require('fs').promises;

async function readFileAsync(filePath) {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      console.log('File content:', data);
      return data;
    } catch (error) {
      console.error('Error reading file:', error.message);
      throw error;
    }
  }
  
const filePath = './test.txt';
  
readFileAsync(filePath)
.then(() => {
    console.log('File reading completed.');
})
.catch((error) => {
    console.error('Error:', error.message);
});

let sum=0;
for(let i=1; i<10000000000; i++) {
   sum+=i;
}
console.log('Expensive operation completed')