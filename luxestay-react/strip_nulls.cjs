const fs = require('fs');

const filePath = 'src/index.css';
const buffer = fs.readFileSync(filePath);

// Filter out null bytes (0x00)
const cleanedBuffer = Buffer.from(buffer.filter(byte => byte !== 0));

fs.writeFileSync(filePath, cleanedBuffer);
console.log('Stripped null bytes from index.css');
