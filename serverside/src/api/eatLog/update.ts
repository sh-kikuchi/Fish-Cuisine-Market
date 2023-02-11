import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const bcrypt = require('bcrypt');
const fs = require('fs');
const TAG = "[api/eatLog/update.ts]"

/**
 * 新規登録処理
 * @req userData JSON
 * { email: 'test@test.com', password: 'testtest' }
 */
async function updateEatLog(req: Request, res: Response) {
  console.log(TAG + ' is called');
  let { eatlogid, storeid, menuid, date, text, rating, file } = req.body;
  storeid = Number(storeid);
  menuid = Number(menuid);
  let errors: any = [];

  //ヴァリデーション
  if (!storeid || !menuid) {
    errors.push({ message: "定食屋とメニューは入力して下さい" });
  }
  if (!text) {
    errors.push({ message: "なんか・・・書いてください" });
  }

  //既存のファイルは削除（delete/insert)
  if (file) {
    //ファイル削除
    pool.query(
      `SELECT filename FROM files WHERE eatlog_id = $1`,
      [eatlogid],
      (err: string, results: any) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "DB接続に失敗しました" });
        }
        //ファイル削除
        try {
          fs.unlinkSync('C:/Users/nbcc9/react-express/client/src/images/' + results.rows[0].filename);
          console.log('削除しました。');
        } catch (error) {
          throw error;
        }
        pool.query(
          `DELETE FROM files WHERE eatlog_id = $1`,
          [eatlogid],
          (err: string, results: any) => {
            if (err) {
              console.log(err);
              return res.status(500).send({ message: "DB接続に失敗しました" });
            }
            //登録処理
            pool.query(
              `UPDATE eatLogs SET store_id = $1, menu_id = $2, date = $3, text = $4, rating = $5 WHERE id = $6`,
              [storeid, menuid, date, text, rating, eatlogid],
              (err: string, results: any) => {
                if (err) {
                  console.log(err);
                  return res.status(500).send({ message: "DB接続に失敗しました" });
                }
                return res.status(200).send({ message: "食ログの登録に成功しました" });
              }
            );
          }
        );
      }
    );
  } else {
    //登録処理
    pool.query(
      `UPDATE eatLogs SET store_id = $1, menu_id = $2, date = $3, text = $4, rating = $5 WHERE id = $6`,
      [storeid, menuid, date, text, rating, eatlogid],
      (err: string, results: any) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "DB接続に失敗しました" });
        }
        return res.status(200).send({ message: "食ログの登録に成功しました" });
      }
    );
  }


}
module.exports = updateEatLog;

const doUpdate = () => { }
