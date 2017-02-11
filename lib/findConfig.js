'use babel'

import {readFileSync} from 'fs'

const resource = '.pug-lintrc.json'

export default (fromDir) => {
  // Find the config file upwards
  const findParentDir = require('find-parent-dir')
  const configFilename = findParentDir.sync(fromDir, resource)
  if (!configFilename) {
    return {}
  }

  try {
    // Parse config file
    let buffer = readFileSync(configFilename + resource)
    return JSON.parse(buffer.toString())
  } catch (e) {
    return {}
  }
}
