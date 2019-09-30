'use strict';

const glob = require('glob');
const path = require('path');

const filters = [/\.config\.js$/, /\/setupTests.js$/];

function getEntries(type, dirPath, globRegex) {
  const entryFiles = glob.sync(path.join(dirPath, globRegex));

  return entryFiles
    .filter(entry => filters.every(filter => !entry.match(filter)))
    .reduce((entries, entryFile) => {
      // converts entryFile path to platform specific style
      // this fixes windows/unix path inconsitence
      // because node-glob always returns path with unix style path separators
      entryFile = path.join(entryFile);

      const localPath = entryFile.split(dirPath)[1];

      let entryName = path
        // create entry name
        .join(type, localPath.split('.js')[0])
        // remove leading slash
        .replace(/^\/|\/$/g, '');

      entries[entryName] = path.join(dirPath, localPath);

      return entries;
    }, {});
}

module.exports = getEntries;