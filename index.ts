// https://knowledge.autodesk.com/ja/support/autocad/learn-explore/caas/CloudHelp/cloudhelp/2019/JPN/AutoCAD-Core/files/GUID-968CBC1D-BA99-4519-ABDD-88419EB2BF92-htm.html
// https://knowledge.autodesk.com/ja/support/autocad/learn-explore/caas/CloudHelp/cloudhelp/2019/JPN/AutoCAD-Core/files/GUID-518E1A9D-398C-4A8A-AC32-2D85590CDBE1-htm.html

export interface DxfTextContentElement {
  /** text content */
  text: string
  /** strike-through */
  k?: 1
  /** overscore */
  o?: 1
  /** underscore */
  u?: 1
}

const dxfTextControlCodeSymbolMap: { [c in string]?: string } = {
  d: '°',
  c: '⌀',
  p: '±',
}

export const parseDxfTextContent = (text: string): DxfTextContentElement[] => {
  text = text.replace(/\\[uU]\+([0-9a-fA-F]{4})/g, (_, codePoint) => String.fromCodePoint(parseInt(codePoint, 16)))
  let previousIndex = 0
  let currentContent: DxfTextContentElement = { text: '' }
  const contents = [currentContent]
  for (const match of text.matchAll(/%%(\d\d\d|.)/g)) {
    currentContent.text += text.slice(previousIndex, match.index)
    const c = match[1]
    const code = c.toLowerCase()
    const symbol = dxfTextControlCodeSymbolMap[code]
    if (symbol) {
      currentContent.text += symbol
    } else if (code.length === 3) {
      currentContent.text += String.fromCodePoint(+code)
    } else if (code === 'k' || code === 'o' || code === 'u') {
      currentContent = { ...currentContent, text: '' }
      if (currentContent[code]) {
        delete currentContent[code]
      } else {
        currentContent[code] = 1
      }
      contents.push(currentContent)
    } else {
      currentContent.text += code
    }
    previousIndex = match.index! + match[0].length
  }
  currentContent.text += text.slice(previousIndex)
  return contents.filter(content => content.text)
}
