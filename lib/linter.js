'use babel'

import Linter from 'pug-lint'

const linter = new Linter

export default {
  lint(source) {
    // Catch unhandled errors when the linter doesn't find any.
    // TODO reproduce again and fill a bug
    try {
      return linter.checkString(source)
    } catch (e) {
      return []
    }
  },
  configure(config) {
    linter.configure(config)
  },
}
