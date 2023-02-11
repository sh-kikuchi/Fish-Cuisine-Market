import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const bcrypt = require('bcrypt');
const TAG = "[api/file/register.ts]"

/**
 * 新規登録処理
 * @req userData JSON
 * { email: 'test@test.com', password: 'testtest' }
 */
async function fileRegister(req: Request, res: Response) {
  console.log(TAG + ' is called');
  let { storeid, menuid, userid, filename } = req.body;
  let errors: any = [];

  //登録処理
  if (errors.length > 0) {
    return res.status(400).send(errors[0]); //エラーの一番上のみ表示
  } else {
    //既存データの判定
    pool.query(
      `SELECT id FROM eatLogs
        WHERE store_id = $1 and menu_id = $2  ORDER BY id DESC LIMIT 1`,
      [storeid, menuid],
      (err: string, results: any) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "DB接続に失敗しました" });
        }
        pool.query(
          `INSERT INTO files (user_id, eatlog_id, filename)
                VALUES ($1, $2, $3)`,
          [userid, results.rows[0].id, filename],
          (err: string, results: any) => {
            if (err) {
              console.log(err);
              return res.status(500).send({ message: "DB接続に失敗しました" });
            }
            console.log(results.rows);
            return res.status(200).send({ message: "メニューの登録に成功しました" });
          }
        );
      }
    );
  }
}
module.exports = fileRegister;
