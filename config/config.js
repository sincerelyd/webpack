const fs = require('fs');
// 获取所有页面 生成多页面的集合
const getFileNameList = path => {
  let fileList = [];
  let dirList = fs.readdirSync(path);
  dirList.forEach(item => {
    if (item.indexOf('html') > -1) {
      fileList.push(item.split('.')[0]);
    }
  });
  return fileList;
};
let HTMLDirs = getFileNameList('./app/html');
module.exports = {
  HTMLDirs:HTMLDirs,
  common: 'common',
};
