import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const bcrypt = require('bcrypt');
const TAG = "[api/mst/menu/register.ts]"

/**
 * 新規登録処理
 * @req userData JSON
 * { email: 'test@test.com', password: 'testtest' }
 */
async function mstMenuRegister(req: Request, res: Response) {
  console.log(TAG + ' is called');
  let { storeid, menuName, memo, price, option } = req.body;
  let errors: any = [];

  //ヴァリデーション
  if (!menuName) {
    errors.push({ message: "メニュー名は入力して下さい" });
  }
  if (!storeid) {
    errors.push({ message: "定食屋の登録が完了しておりません" });
  }
  console.log(errors);
  //登録処理
  if (errors.length > 0) {
    return res.status(400).send(errors[0]); //エラーの一番上のみ表示
  } else {
    //既存データの判定
    pool.query(
      `SELECT * FROM menus
        WHERE store_id = $1 and name = $2`,
      [storeid, menuName],
      (err: string, results: any) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "DB接続に失敗しました" });
        }
        console.log(results.rows);
        if (results.rows.length > 0) {
          return res.status(400).send({ message: "メニューが登録済みです" });
        } else {
          pool.query(
            `INSERT INTO menus (store_id, name, memo, price,region_flg)
                VALUES ($1, $2, $3, $4, $5)`,
            [storeid, menuName, memo, price, option],
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
      }
    );
  }
}
module.exports = mstMenuRegister;
