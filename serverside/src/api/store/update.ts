import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const TAG = "[api/auth/update.ts]"

/**
 * 新規登録処理
 * @req userData JSON
 * { email: 'test@test.com', password: 'testtest' }
 */
async function updateStore(req: Request, res: Response) {
  console.log(TAG + ' is called');
  let { storeid, userid, storeName, address1, address2 } = req.body;
  storeid = Number(storeid);
  userid = Number(userid);

  let errors: any = [];

  //ヴァリデーション
  if (!storeName || !address1) {
    errors.push({ message: "定食屋と都道府県名は入力して下さい" });
  }

  //登録処理
  if (errors.length > 0) {
    return res.status(400).send(errors[0]); //エラーの一番上のみ表示
  } else {
    //既存データの判定
    pool.query(`UPDATE stores SET user_id = $1, name = $2, address1 = $3, address2 = $4, WHERE id = $5`,
      [userid, storeName, address1, address2, storeid],
      (err: string, results: any) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "DB接続に失敗しました" });
        }
        console.log(results.rows);
        return res.status(200).send({ message: "定食屋の更新に成功しました" });
      }
    );

  }
}
module.exports = updateStore;
