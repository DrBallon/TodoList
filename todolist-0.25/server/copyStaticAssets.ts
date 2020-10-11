import fs, { stat } from 'fs';
import path from 'path';

import shell from 'shelljs';

shell.cp('-R', path.resolve(__dirname, 'src/public'), path.resolve(__dirname, 'dist/public'));

function copyFile(srcPath: string, tarPath, cb?: Function) {
  if (!fs.existsSync(path.dirname(tarPath)))
    fs.mkdir(path.dirname(tarPath), (err) => {
      if (err) cb && cb(err);
    });
  const rs = fs.createReadStream(srcPath);
  rs.on('error', (err) => {
    if (err) {
      cb && cb(err);
    }
  });
  const ws = fs.createWriteStream(tarPath);
  ws.on('error', (err) => {
    if (err) {
      cb && cb(err);
    }
  });
  ws.on('close', (ex) => cb && cb(ex));
  rs.pipe(ws);
}
function copyFolder(srcPath: string, tarPath?: string, cb?: Function) {
  fs.readdir(srcPath, (err, files) => {
    if (err) {
      cb && cb(err);
      return;
    }
    files.forEach((file) => {
      const tempSrcPath = path.resolve(srcPath, file);
      const tempTarPath = path.resolve(tarPath, file);
      fs.stat(tempSrcPath, (err, stats) => {
        if (err) {
          cb && cb(err);
          return;
        }
        if (stats.isDirectory()) {
          copyFolder(tempSrcPath, tempTarPath, cb);
        } else {
          copyFile(tempSrcPath, tempTarPath, cb);
        }
      });
    });
  });
}

// copyFile(path.resolve(__dirname, 'src/public/test.jpg'), path.resolve(__dirname, 'dist/public/test.jpg'), (err) => {
//   console.log(err);
// });

// copyFolder(path.resolve(__dirname, 'src/public'), path.resolve(__dirname, 'dist/public'), (err) => {
//   if (err) console.log(err);
// });
