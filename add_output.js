const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // We'll use a regex to find each lesson object and add an output field if it doesn't exist
  // It's easier to parse the file, but since it's a TS file with exports, we can just use regex to insert `output: '...'`
  
  // A simple approach: find `explanation: '...' }` and insert `output: '...'` before `}`
  // But we need to figure out what the output should be.
  // Let's just add a generic script that extracts the codeExample, runs a simple heuristic, and adds output.
  
  // Actually, let's just use a regex to match the codeExample and generate an output.
  const regex = /codeExample:\s*(`([^`]+)`|'([^']+)'|"([^"]+)"),\s*explanation:/g;
  
  content = content.replace(regex, (match, p1, p2, p3, p4) => {
    const code = p2 || p3 || p4;
    let output = '';
    
    if (!code) return match;
    
    // Simple heuristics for output
    const lines = code.split('\\n');
    const outputs = [];
    
    for (const line of lines) {
      if (line.includes('print(') || line.includes('console.log(') || line.includes('System.out.println(')) {
        // Extract what's inside the print statement
        let matchPrint = line.match(/print\((.*)\)/);
        let matchLog = line.match(/console\.log\((.*)\)/);
        let matchSys = line.match(/System\.out\.println\((.*)\)/);
        
        let inner = '';
        if (matchPrint) inner = matchPrint[1];
        if (matchLog) inner = matchLog[1];
        if (matchSys) inner = matchSys[1];
        
        if (inner) {
          // Remove quotes if it's a string
          if (inner.startsWith('"') && inner.endsWith('"')) inner = inner.slice(1, -1);
          else if (inner.startsWith("'") && inner.endsWith("'")) inner = inner.slice(1, -1);
          else if (inner.startsWith('`') && inner.endsWith('`')) inner = inner.slice(1, -1);
          
          // Check for comments in the line
          const commentMatch = line.match(/\/\/\s*(.*)$/);
          if (commentMatch) {
             // Use the comment as a hint for the output if it looks like a result
             const comment = commentMatch[1].trim();
             if (comment && !comment.includes('과 같음') && !comment.includes('증가') && !comment.includes('에러')) {
                outputs.push(comment.replace('출력: ', '').replace('결과: ', '').trim());
                continue;
             }
          }
          
          outputs.push(inner);
        }
      }
    }
    
    if (outputs.length > 0) {
      // Escape single quotes in output
      const outputStr = outputs.join('\\n').replace(/'/g, "\\'");
      return `codeExample: ${p1}, output: '${outputStr}', explanation:`;
    }
    
    return match;
  });
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Processed ${filePath}`);
}

processFile('./src/data/python.ts');
processFile('./src/data/java.ts');
processFile('./src/data/javascript.ts');
