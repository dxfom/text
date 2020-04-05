const t={d:"°",c:"⌀",p:"±"}
export const parseDxfTextContent=e=>{e=e.replace(/\\[uU]\+([0-9a-fA-F]{4})/g,(t,e)=>String.fromCodePoint(parseInt(e,16)))
let o=0,n={text:""}
const r=[n]
for(const x of e.matchAll(/%%(\d\d\d|.)/g)){n.text+=e.slice(o,x.index)
const s=x[1].toLowerCase(),c=t[s]
c?n.text+=c:3===s.length?n.text+=String.fromCodePoint(+s):"k"===s||"o"===s||"u"===s?(n={...n,text:""},n[s]?delete n[s]:n[s]=1,r.push(n)):n.text+=s,o=x.index+x[0].length}return n.text+=e.slice(o),r.filter(t=>t.text)}
