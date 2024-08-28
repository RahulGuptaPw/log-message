const fs = require('fs');
const path = require('path');

function monitorLog(filePath, keywords) {
    
    const logFile = fs.openSync(filePath, 'r');
    let position = 0;

    function readNewLines() {
        const buffer = Buffer.alloc(1024);
        const bytesRead = fs.readSync(logFile, buffer, 0, buffer.length, position);

        if (bytesRead > 0) {
            position += bytesRead;
            const lines = buffer.toString('utf8', 0, bytesRead).split('\n');
            lines.forEach(line => {
                keywords.forEach(keyword => {
                    if (line.includes(keyword)) {
                        console.log(`Keyword '${keyword}' found: ${line}`);
                    }
                });
            });
        }
    }

    
    setInterval(readNewLines, 100);

    
    process.on('SIGINT', () => {
        fs.closeSync(logFile);
        console.log('Monitoring stopped.');
        process.exit();
    });
}


const logFilePath = path.resolve(__dirname, 'logfile.log');


const keywordsToMonitor = ['ERROR', 'WARNING', 'CRITICAL'];


monitorLog(logFilePath, keywordsToMonitor);

