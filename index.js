"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dxfTextControlCodeSymbolMap = {
    d: '°',
    c: '⌀',
    p: '±',
};
exports.parseDxfTextContent = (text) => {
    text = text.replace(/\\[uU]\+([0-9a-fA-F]{4})/g, (_, codePoint) => String.fromCodePoint(parseInt(codePoint, 16)));
    let currentContent = { text: '' };
    const contents = [currentContent];
    let previousIndex = 0;
    for (const match of text.matchAll(/%%(\d\d\d|.)/g)) {
        currentContent.text += text.slice(previousIndex, match.index);
        const c = match[1];
        const code = c.toLowerCase();
        const symbol = dxfTextControlCodeSymbolMap[code];
        if (symbol) {
            currentContent.text += symbol;
        }
        else if (code.length === 3) {
            currentContent.text += String.fromCodePoint(+code);
        }
        else if (code === 'k' || code === 'o' || code === 'u') {
            currentContent = { ...currentContent, text: '' };
            if (currentContent[code]) {
                delete currentContent[code];
            }
            else {
                currentContent[code] = 1;
            }
            contents.push(currentContent);
        }
        else {
            currentContent.text += code;
        }
        previousIndex = match.index + match[0].length;
    }
    currentContent.text += text.slice(previousIndex);
    return contents.filter(content => content.text);
};
