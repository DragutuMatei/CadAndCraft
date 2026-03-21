const fs = require('fs');
const html = fs.readFileSync('c:/D/osfiir/PR/site/public/Handbook2026_PENTRUziuaevent_.html', 'utf8');
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
const bodyContent = bodyMatch ? bodyMatch[1] : html;
const text = bodyContent.replace(/<[^>]+>/g, '\n').replace(/\n\s*\n/g, '\n').trim();
fs.writeFileSync('c:/D/osfiir/PR/site/tmp.txt', text);
