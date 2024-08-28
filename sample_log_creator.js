const fs = require('fs');
const path = require('path');

function createSampleLog(filePath) {
    const sampleLogEntries = [
        'INFO: Application started',
        'WARNING: Low memory',
        'ERROR: File not found',
        'INFO: Application running',
        'CRITICAL: System failure'
    ];

    fs.writeFileSync(filePath, sampleLogEntries.join('\n') + '\n');
}


const logFilePath = path.resolve(__dirname, 'logfile.log');


createSampleLog(logFilePath);
