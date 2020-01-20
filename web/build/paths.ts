export const fs = require('fs');
export const path = require('path');
export const systemConfig = require(path.resolve(process.cwd(),'config/index'));
export const appDirectory = fs.realpathSync(process.cwd());
export const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
export const { systemPath } = systemConfig;

const appSrc = resolveApp(`src`);
const node_modules = resolveApp(`node_modules`);
const appExcludeCssModule = systemPath.appExcludeCssModule&&systemPath.appExcludeCssModule.map((path,index)=>new RegExp(`[\\\\/]node_modules[\\\\/].*${path}`));

module.exports = {
  appSrc,
  node_modules,
  appExcludeCssModule
}