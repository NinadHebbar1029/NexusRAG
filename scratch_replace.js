const fs = require('fs');
const path = require('path');

const old1 = "Knowledge Base Platform";
const old2 = "Knowledge-Base-Platform";
const newName = "NexusRAG";

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (file === '.git' || file === 'node_modules' || file === 'venv') continue;
        
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDir(fullPath);
        } else if (stat.isFile()) {
            if (/\.(py|ts|tsx|html|md|toml|json|sh|conf|txt|dev|webmanifest)$/i.test(file) || file === 'Dockerfile') {
                try {
                    let content = fs.readFileSync(fullPath, 'utf8');
                    if (content.includes(old1) || content.includes(old2)) {
                        content = content.replace(new RegExp(old1, 'g'), newName);
                        content = content.replace(new RegExp(old2, 'g'), newName);
                        fs.writeFileSync(fullPath, content, 'utf8');
                        console.log(`Updated ${fullPath}`);
                    }
                } catch (e) {
                    // Ignore
                }
            }
        }
    }
}

processDir(__dirname);
