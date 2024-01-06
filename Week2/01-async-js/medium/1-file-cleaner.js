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
  
async function writeFileAsync(filePath, data) {
    try {
        await fs.writeFile(filePath, data, 'utf-8');
        console.log('File written successfully.');
    } catch (error) {
        console.error('Error writing to file:', error.message);
        throw error;
    }
}

async function removeExtraSpaces(filePath) {
    try {
        const fileContent = await readFileAsync(filePath);
        const cleanedContent = fileContent.replace(/\s+/g, ' ');
  
        await writeFileAsync(filePath, cleanedContent);
  
        console.log('Extra spaces removed and file updated successfully.');
    } catch (error) {
        console.error('Error:', error.message);
    }
}
  
const filePath = './file.txt';  
removeExtraSpaces(filePath);