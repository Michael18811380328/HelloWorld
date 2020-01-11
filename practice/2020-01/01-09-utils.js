import fs from 'fs';

export function loadJSON(filePath) {
  const json = fs.readFileSync(filePath).toString();
  return JSON.parse(json);
}

export function deleteFolder(path) {
  if (fs.existSync(path)) {
    let info = fs.statSync(path);
    if (info.isDirectory()) {
      let data = fs.readdirSync(path);
      if (data.length > 0) {
        for (let i =0; i < data.length; i++) {
          delPath(`${path}/${data[i]}`);
          if (i == data.length - 1) {
            delPath(`${path}`);
          }
        }
      } else {
        delPath(path);
      }
    } else if (info.isFile()) {
      fs.unlinkSync(path);
    }
  }
}
