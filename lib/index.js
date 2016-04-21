'use babel'

import {dirname} from 'path'

import linter from './linter'
import findConfig from './findConfig'

export default {
  activate() {
    require('atom-package-deps').install()
  },
  provideLinter() {
    const { rangeFromLineNumber } = require('atom-linter')

    return {
      name,
      grammarScopes: ['source.pug', 'source.jade'],
      scope: 'file',
      lintOnFly: true,
      lint: editor => {
        // Configure the linter
        const filePath = editor.getPath()
        linter.configure(findConfig(dirname(filePath)))

        // Lint and map the errors
        return linter.lint(editor.getText()).map(error => ({
          filePath,
          type: 'error',
          text: `${error.msg} (${error.code})`,
          range: rangeFromLineNumber(editor, error.line - 1, error.column - 1),
        }))
      },
    }
  },
}
