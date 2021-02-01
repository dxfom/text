const e={d:"°",c:"⌀",p:"±"}
export const decodeDxfTextCharacterCodes=(e,t)=>(e=decodeDxfTextUnicodeCodePoints(e),t?decodeDxfTextMbcsCharacterCodes(e,t):e)
export const decodeDxfTextUnicodeCodePoints=e=>e.replace(/\\[uU]\+([0-9a-fA-F]{4})/g,((e,t)=>String.fromCodePoint(parseInt(t,16))))
export const decodeDxfTextMbcsCharacterCodes=(e,t)=>{let o=t instanceof TextDecoder?t:void 0
return e.replace(/\\[mM]\+1([0-9a-fA-F]{2})([0-9a-fA-F]{2})/g,((e,d,n)=>(o=o||new TextDecoder(t)).decode(new Uint8Array([parseInt(d,16),parseInt(n,16)]))))}
export const parseDxfTextContent=(t,o)=>{t=decodeDxfTextCharacterCodes(t,o?.encoding)
let d=0,n={text:""}
const c=[n]
for(const o of t.matchAll(/%%(\d\d\d|.)/g)){n.text+=t.slice(d,o.index)
const r=o[1].toLowerCase(),x=e[r]
x?n.text+=x:3===r.length?n.text+=String.fromCodePoint(+r):"k"===r||"o"===r||"u"===r?(n={...n,text:""},n[r]?delete n[r]:n[r]=1,c.push(n)):n.text+=r,d=o.index+o[0].length}return n.text+=t.slice(d),c.filter((e=>e.text))}
