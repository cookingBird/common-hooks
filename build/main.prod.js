const { merge } = require('webpack-merge');
const webpack = require('webpack');
const config = require('./webpack.prod');
const path = require('path');
const { readFile } = require('./tools/rewrite.cjs');

const inputs = process.argv.slice(2);

const buildPackage = '';
const pkgFile = readFile(path.resolve(__dirname, '../', buildPackage, 'package.json'));
if (!pkgFile.build) {
  throw Error(' build params is not nullable');
}
/**@type { import("webpack").Configuration } */
const _config = {
  experiments: {
    outputModule: false,
  },
  entry: path.resolve(__dirname, '../', buildPackage, pkgFile.build.entry),
  externals: {
    vue: 'Vue',
  },
  output: {
    path: path.resolve(__dirname, '../', buildPackage, 'dist'),
    filename: pkgFile.build.filename,
    library: {
      type: pkgFile.build.type || 'umd',
    },
  },
};
if (pkgFile.build.name) {
  // @ts-expect-error
  _config.output.library.name = pkgFile.build.name;
}
if (pkgFile.build.type === 'module') {
  // @ts-expect-error
  _config.experiments.outputModule = true;
}
module.exports = merge(config, _config);
