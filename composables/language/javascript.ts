import { type LanguageOption, type Parser } from '../language'
import type * as TsEslint from '@typescript-eslint/parser'
import type * as Babel from '@babel/parser'
import type * as Swc from '@swc/wasm-web'
import type * as Acorn from 'acorn'

// @unocss-include

const babel: Parser<typeof Babel, Babel.ParserOptions> = {
  id: 'babel',
  label: '@babel/parser',
  icon: 'i-vscode-icons:file-type-babel2',
  version: `@babel/parser@latest`,
  options: {
    configurable: true,
    defaultValue: {
      sourceType: 'module',
    },
    editorLanguage: 'json',
  },
  // @ts-expect-error
  init: () => import('https://cdn.jsdelivr.net/npm/@babel/parser/+esm'),
  parse(code, options) {
    return this.parse(code, { ...options })
  },
  editorLanguage(options) {
    try {
      const plugins = Array.isArray(options?.plugins) ? options!.plugins : []
      const normalizedPlugins = plugins.map((item) =>
        Array.isArray(item) ? item[0] : item
      )
      if (normalizedPlugins.includes('typescript')) return 'typescript'
    } catch {}
    return 'javascript'
  },
}

const swc: Parser<typeof Swc, Swc.ParseOptions> = {
  id: 'swc',
  label: 'SWC',
  icon: 'i-vscode-icons:file-type-swc',
  version: `@swc/parser@latest`,
  options: {
    configurable: true,
    defaultValue: {
      syntax: 'ecmascript',
    },
    editorLanguage: 'json',
  },
  init: () =>
    import(
      // @ts-expect-error
      'https://cdn.jsdelivr.net/npm/@swc/wasm-web@1.3.82/wasm-web.js'
    ).then(async (mod: typeof Swc) => {
      await mod.default()
      return mod
    }),
  parse(code, options) {
    return this.parse(code, { ...(options as any) })
  },
  editorLanguage(options) {
    return options?.syntax === 'typescript' ? 'typescript' : 'javascript'
  },
}

const acorn: Parser<typeof Acorn, Acorn.Options> = {
  id: 'acorn',
  label: 'Acorn',
  icon: 'i-vscode-icons:file-type-js-official',
  version: `acorn@latest`,
  options: {
    configurable: true,
    defaultValue: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    editorLanguage: 'json',
  },
  // @ts-expect-error
  init: () => import('https://cdn.jsdelivr.net/npm/acorn/dist/acorn.mjs'),
  parse(code, options) {
    return this.parse(code, { ...options })
  },
  editorLanguage: 'javascript',
}

const tsEslint: Parser<typeof TsEslint, TsEslint.ParserOptions> = {
  id: 'tsEslint',
  label: '@typescript-eslint/parser',
  icon: 'i-vscode-icons:file-type-eslint',
  version: `@typescript-eslint/parser@latest`,
  options: {
    configurable: true,
    defaultValue: {
      sourceType: 'module',
    },
    editorLanguage: 'json',
  },
  // @ts-expect-error
  init: () => import('https://esm.sh/@typescript-eslint/typescript-estree'),
  parse(code, options) {
    return this.parse(code, { ...options })
  },
  editorLanguage: 'typescript',
}

export const javascript: LanguageOption = {
  label: 'JavaScript',
  icon: 'i-vscode-icons:file-type-js-official',
  parsers: {
    babel,
    swc,
    acorn,
    tsEslint,
  },
}
