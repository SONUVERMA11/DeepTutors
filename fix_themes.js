const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, 'src', 'app'),
  path.join(__dirname, 'src', 'components')
];

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      if (dirFile.includes("node_modules") || dirFile.includes(".next")) continue;
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.module.css')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
};

const allFiles = directories.flatMap(dir => walkSync(dir));

const patterns = [
  { filter: /background:[\s]*#(0[B|7]1021|070D1F|0[B|8]0C1A);/gi, replace: 'background: var(--bg-main);' },
  { filter: /color:[\s]*var\(--white\);/gi, replace: 'color: var(--text-main);' },
  { filter: /color:[\s]*white;/gi, replace: 'color: var(--text-main);' },
  { filter: /color:[\s]*var\(--gray-(300|400|500|600)\);/gi, replace: 'color: var(--text-muted);' },
  { filter: /color:[\s]*rgba\(255,\s*255,\s*255,\s*(0\.\d+)\);/gi, replace: 'color: var(--text-muted);' },
  { filter: /border-top:[\s]*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.05\);/gi, replace: 'border-top: 1px solid var(--card-border);' },
  { filter: /border-bottom:[\s]*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.05\);/gi, replace: 'border-bottom: 1px solid var(--card-border);' },
  { filter: /border:[\s]*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.(05|08|1)\);/gi, replace: 'border: 1px solid var(--card-border);' },
  { filter: /background:[\s]*rgba\(255,\s*255,\s*255,\s*0\.(02|03|05)\);/gi, replace: 'background: var(--card-bg);' },
  { filter: /#070D1F/gi, replace: 'var(--bg-main)' },
];

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  patterns.forEach(({ filter, replace }) => {
    content = content.replace(filter, replace);
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
console.log('Theme fix completely applied across all CSS Modules.');
