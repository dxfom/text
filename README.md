# DXF Object Model / TEXT

A low level DXF TEXT content parser.

## Installation

```bash
$ npm i dxfom/text
```

## Usage

```javascript
const { parseDxfTextContent } = require('@dxfom/text')

const content = parseDxfTextContent(
  String.raw`%%uunderline%%obothline%%uoverline%%onoline%%kstrike%%k%%c10%%p0.01%%%%%d%%975\U+d83d\U+de04`
)
console.log(content)
```

outputs:

```javascript
[
  { text: 'underline', u: 1 },
  { text: 'bothline', u: 1, o: 1 },
  { text: 'overline', o: 1 },
  { text: 'noline' },
  { text: 'strike', k: 1 },
  { text: '⌀10±0.01%°Ϗ😄' }
]
```

## License

Undecided yet.
