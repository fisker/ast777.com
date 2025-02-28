# <img src="./public/logo.svg" /> AST Explorer

AST Explorer - A web tool to explore the ASTs generated by parsers.

- Stable Release: [ast.sxzz.dev](https://ast.sxzz.dev/)
- Dev Channel: [ast-explorer.vercel.app](https://ast-explorer.vercel.app/)

Feel free to add more languages and parsers via PR!

<div align="center">
  <img alt="Screenshot" src="./.github/screenshot.png" width="800px" />
</div>

## Features

- 🦾 Enable code highlighting, suggestions, and formatting with Monaco Editor.
- 🤩 Support most popular front-end languages and parsers.
- 🗒️ Save your code via URL. No database, no server downtime.
- 🐙 Customize parser version via CDN, e.g., `@babel/parser` alpha.
- 🌈 Set custom parser options with a GUI.
- 🌚 Good-looking dark mode theme.
- 📱 Even compatible with mobile devices.

## Languages and Parsers

- JavaScript / TypeScript
  - [Babel](https://babel.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Oxc](https://oxc.rs/docs/guide/usage/parser.html)
  - [SWC](https://swc.rs/docs/usage/core#parse)
  - [Acron](https://github.com/acornjs/acorn)
  - [Espree](https://github.com/eslint/espree)
  - [TypeScript ESLint](https://typescript-eslint.io/packages/parser/)
  - [Esprima Next](https://github.com/node-projects/esprima-next)
  - [Flow](https://github.com/facebook/flow/tree/main/packages/flow-parser)
  - [Hermes](https://github.com/facebook/hermes)
- [Vue](https://vuejs.org/)
- [Svelte](https://svelte.dev/)
- CSS
  - [csstree](https://github.com/csstree/csstree)
  - [PostCSS](https://postcss.org/)
  - [Lightning CSS](https://lightningcss.dev/)
- HTML
  - [htmlparser2](https://feedic.com/htmlparser2/)
  - [rehype](https://github.com/rehypejs/rehype)
- JSON
  - [json-to-ast](https://github.com/vtrushin/json-to-ast)
- [WXML](https://github.com/wxmlfile/wxml-parser)
- Markdown
  - [remark](https://github.com/remarkjs/remark)
- YAML
  - [yaml](https://eemeli.org/yaml/)
- SQL
  - [sql-parser-cst](https://github.com/nene/sql-parser-cst)

## URL Encode Algorithm

The input code and options are stored in the URL as a hash fragment,
which is the string following the `#` symbol
and is not transmitted to the server.

#### Implementation

```ts
const code = 'code'
const parserId = 'acorn'
const optionsString = JSON.stringify({
  ecmaVersion: 'latest',
  sourceType: 'module',
})
const serialized = utoa(
  // utoa, or compress() if want to compress the data
  JSON.stringify({
    c: code,
    p: parserId,
    o: optionsString,
  }),
)
const url = `https://ast.sxzz.dev/#${serialized}`

// no compress
function utoa(data: string): string {
  return btoa(unescape(encodeURIComponent(data)))
}

// compress is optional
import { strFromU8, strToU8, unzlibSync, zlibSync } from 'fflate'
function compress(data: string) {
  const buffer = strToU8(data)
  const zipped = zlibSync(buffer, { level: 9 })
  const binary = strFromU8(zipped, true)
  return btoa(binary)
}
```

## Contributing

To contribute to the project, see [Contribution Guide](https://github.com/sxzz/contribute).

## Credits

- https://astexplorer.net/
- https://play.swc.rs/

## License

[AGPL-3.0](./LICENSE) License © 2023-PRESENT [三咲智子](https://github.com/sxzz)
