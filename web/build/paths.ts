export const fs = require('fs');
export const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const appSrc = resolveApp(`src`);
const node_modules = resolveApp(`node_modules`);


module.exports = {
  appSrc,
  node_modules
}