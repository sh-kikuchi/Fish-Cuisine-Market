import { Request, Response } from 'express';
const TAG = "[functions/trashFiles.ts]"
const fs = require('fs');
/**
 * Trash image files
 * @params targetFiles
 * @return -
 */
const trashFiles = (targetFiles: Array<any>) => {
  console.log(TAG + 'begin');
  try {
    for (let i = 0; i < targetFiles.length; i++) {
      fs.unlinkSync('C:/Users/nbcc9/react-express/client/src/images/' + targetFiles[i].filename);
      console.log('削除しました。');
    }
  } catch (error) {
    throw error;
  }
  console.log(TAG + 'end');
}
module.exports = trashFiles;
