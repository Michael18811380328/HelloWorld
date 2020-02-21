// nodeJS
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');
const JSZip = require('jszip');
const paths = require('./paths');

// utils
function isDirExist(path) {
  return fs.existSync(path);
}

function isFileExist(path, fileName) {
  return fs.readdirSync(path).includes(fileName);
}

function getAllFilePath(path) {
  if (!isDirExist(path)) {
    return false;
  }
  const moduleFileExts = ['js', 'ts', 'vue', 'css', 'sass'];
  const fileName = fs.readdirSync(path).find((item) => {
    let extension = item.substring(item.lastIndexOf('.') + 1);
    if (moduleFileExts.includes(extension)) {
      return item;
    }
  });
  if (!fileName) {
    return false;
  }
  return path.join(path, fileName);
}

function gteFileContent(path) {
  return fs.readFileSync(path, { encoding: 'utf-8' });
}

// 创建压缩实例
const zip = new JSZip();

// 读取本地配置（文件目录）
const config = { dir: paths.appBuild + '/static/' };

// 获取JS和CSS文件的路径
const jsFilePath = getAllFilePath(config.dir + 'js');
const cssFilePath = getAllFilePath(config.dir + 'css');

// 创建压缩文件夹
zip.folder('output');
zip.folder('output/media');

// 写入压缩的JS文件
zip.file('output/main.js', getFileContent(jsFilePath));

// 写入媒体文件
if (isDirExist(paths.appBuild + '/static/css') && cssFilePath) {
  zip.file('output/media/main.css', getFileContent(cssFilePath));
}

if (isFileExist(paths.pluginConfigPath, 'icon.png')) {
  const iconPath = path.join(paths.pluginConfigPath, 'icon.png');
  zip.file('output/media/icon.png', fs.readFileSync(iconPath));
}

if (isFileExist(paths.pluginConfigPath, 'image.png')) {
  const cardImagePath = path.join(paths.pluginConfigPath, 'image.png'); 
  zip.file('output/media/image.png', fs.readFileSync(cardImagePath));
}

// 获取Info文件信息
const infoPath = path.join(paths.pluginConfigPath, 'info.json');
const infoContent = JSON.parse(getFileContent(infoPath));
// 增加时间戳和自定义属性(对象)
const infoContentExpand = {
  "last_modified": moment().format(),
  "has_css": isDirExist && cssFilePath,
  "has_icon": isFileExist(paths.pluginConfigPath, 'icon.png'),
  "has_card_image": isFileExist(paths.pluginConfigPath, 'image.png')
};
// 合并成新的配置内容并写入文件
let newFileContent = Object.assign({}, infoContent, infoContentExpand);
zip.file('task/info.json', JSON.stringify(newFileContent));

zip.genarateAsync({type: "nodebuffer"}).then((content) => {
  // 异步函数压缩文件内容
  let zip = 'output.zip';
  // 将压缩后的内容写入文件
  fs.writeFile(path.zipPath + '/' + zip, content, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('zip successful');
  });
});
