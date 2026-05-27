const fs = require('fs');

const filePath = 'src/index.css';
let content = fs.readFileSync(filePath, 'utf8');

// The corrupted block starts with "/ *   N o B r o k e r" and ends right before "/* Simple Property Card */"
const startMarkerIndex = content.indexOf('/ *   N o B r o k e r');
const endMarkerIndex = content.indexOf('/* Simple Property Card */');

if (startMarkerIndex !== -1 && endMarkerIndex !== -1 && endMarkerIndex > startMarkerIndex) {
    const cleanedContent = content.substring(0, startMarkerIndex) + content.substring(endMarkerIndex);
    fs.writeFileSync(filePath, cleanedContent, 'utf8');
    console.log('Successfully removed the corrupted NoBroker CSS block.');
} else {
    console.log('Could not find the exact markers for the corrupted block. Looking for spaces pattern...');
    
    // Fallback: Remove lines that look like " . n b -"
    const lines = content.split('\n');
    let inCorruptedBlock = false;
    const cleanedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('/ *   N o B r o k e r')) {
            inCorruptedBlock = true;
        }
        
        if (line.includes('/* Simple Property Card */')) {
            inCorruptedBlock = false;
        }
        
        if (!inCorruptedBlock) {
            cleanedLines.push(line);
        }
    }
    
    fs.writeFileSync(filePath, cleanedLines.join('\n'), 'utf8');
    console.log('Cleaned using line-by-line method.');
}
