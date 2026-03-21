const fs = require('fs');
let text = fs.readFileSync('c:/D/osfiir/PR/site/tmp.txt', 'utf8');
const entities = {
    '&#259;': 'ă', '&#537;': 'ș', '&#539;': 'ț', '&nbsp;': ' ', '&rdquo;': '”', '&ldquo;': '“',
    '&acirc;': 'â', '&icirc;': 'î', '&mdash;': '—', '&amp;': '&', '&#39;': "'", '&#10071;': '❗',
    '&rsquo;': '’'
};
for (const [entity, char] of Object.entries(entities)) {
    text = text.replace(new RegExp(entity, 'g'), char);
}
fs.writeFileSync('c:/D/osfiir/PR/site/tmp_decoded.txt', text);
