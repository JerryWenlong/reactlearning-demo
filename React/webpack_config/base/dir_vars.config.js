var path = require('path');
var moduleExports = {};

// 源文件目录
moduleExports.staticRootDir = path.resolve(__dirname, '../../www'); // 项目根目录
moduleExports.srcRootDir = path.resolve(moduleExports.staticRootDir, './src'); // 项目业务代码根目录
moduleExports.pagesDir = path.resolve(moduleExports.srcRootDir, './pages');
moduleExports.buildDir = path.resolve(moduleExports.staticRootDir, './dist');
module.exports = moduleExports;