const fs = require('fs');
const path = require('path');

const targetFiles = [
    'page.tsx',
    'connections/page.tsx',
    'finances/page.tsx',
    'patients/page.tsx',
    'reports/page.tsx',
    'reviews/page.tsx',
    'services/page.tsx',
    'store/page.tsx',
    'prescriptions/page.tsx'
];

targetFiles.forEach(subPath => {
    const fullPath = path.join(__dirname, 'src/app/dashboard', subPath);
    if (!fs.existsSync(fullPath)) {
        console.log('Skipping missing file:', fullPath);
        return;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    if (content.includes('requireProvider')) {
         console.log('Already injected:', fullPath);
         return;
    }

    content = `import { requireProvider } from '@/lib/auth';\n` + content;
    
    const regex = /export default (async )?function [^\{]+\{/;
    const match = content.match(regex);
    if (match) {
        let modifiedMatch = match[0];
        if (!modifiedMatch.includes('async')) {
            modifiedMatch = modifiedMatch.replace('function', 'async function');
            content = content.replace(match[0], modifiedMatch);
        }
        
        const insertPos = content.indexOf('{', match.index) + 1;
        content = content.slice(0, insertPos) + '\n    await requireProvider();' + content.slice(insertPos);
        
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Successfully injected into:', fullPath);
    } else {
        console.log('Could not find function declaration for:', fullPath);
    }
});
