import fs from 'fs';

function processFile(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const regex = /codeExample:\s*(`([^`]+)`|'([^']+)'|"([^"]+)"),\s*explanation:/g;
  
  content = content.replace(regex, (match, p1, p2, p3, p4) => {
    const code = p2 || p3 || p4;
    let output = '';
    
    if (!code) return match;
    
    const lines = code.split('\\n');
    const outputs: string[] = [];
    
    for (const line of lines) {
      if (line.includes('print(') || line.includes('console.log(') || line.includes('System.out.println(')) {
        let matchPrint = line.match(/print\((.*)\)/);
        let matchLog = line.match(/console\.log\((.*)\)/);
        let matchSys = line.match(/System\.out\.println\((.*)\)/);
        
        let inner = '';
        if (matchPrint) inner = matchPrint[1];
        if (matchLog) inner = matchLog[1];
        if (matchSys) inner = matchSys[1];
        
        if (inner) {
          if (inner.startsWith('"') && inner.endsWith('"')) inner = inner.slice(1, -1);
          else if (inner.startsWith("'") && inner.endsWith("'")) inner = inner.slice(1, -1);
          else if (inner.startsWith('`') && inner.endsWith('`')) inner = inner.slice(1, -1);
          
          const commentMatch = line.match(/\/\/\s*(.*)$/) || line.match(/#\s*(.*)$/);
          if (commentMatch) {
             const comment = commentMatch[1].trim();
             if (comment && !comment.includes('과 같음') && !comment.includes('증가') && !comment.includes('에러')) {
                outputs.push(comment.replace('출력: ', '').replace('결과: ', '').replace('나머지 ', '').trim());
                continue;
             }
          }
          
          // Clean up f-strings or template literals
          inner = inner.replace(/^f"/, '').replace(/^f'/, '').replace(/\$\{([^}]+)\}/g, '$1').replace(/\{([^}]+)\}/g, '$1');
          
          outputs.push(inner);
        }
      }
    }
    
    if (outputs.length > 0) {
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
