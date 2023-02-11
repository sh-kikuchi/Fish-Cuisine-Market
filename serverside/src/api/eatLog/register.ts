import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const bcrypt = require('bcrypt');
const TAG = "[api/eatLog/register.ts]"

/**
 * 新規登録処理
 * @req userData JSON
 * { email: 'test@test.com', password: 'testtest' }
 */
async function eatLogRegister(req: Request, res: Response) {
  console.log(TAG + ' is called');
  let { storeid, menuid, date, text, rating, file } = req.body;

  console.log(req);

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

  //登録処理
  pool.query(
    `select * from stores AS s
      left join menus AS m
      on s.id = m.store_id
      where s.id = $1 and m.id = $2;`,
    [storeid, menuid],
    (err: string, results: any) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: "DB接続に失敗しました" });
      }
      console.log(results.rows);
      if (results.rows.length > 0) {
        pool.query(
          `INSERT INTO eatlogs (store_id, menu_id, date, text, rating)
                VALUES ($1, $2, $3, $4, $5)`,
          [storeid, menuid, date, text, rating],
          (err: string, results: any) => {
            if (err) {
              console.log(err);
              return res.status(500).send({ message: "DB接続に失敗しました" });
            }
            console.log(results.rows);

            return res.status(200).send({ message: "定食屋の登録に成功しました" });
          }
        );
      } else {
        return res.status(400).send({ message: "定食屋またはメニューが登録されていません" });
      }
    }
  );
}
module.exports = eatLogRegister;
