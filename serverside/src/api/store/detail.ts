import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const bcrypt = require('bcrypt');
const TAG = "[api/mst/store/show.ts]"

/**
 * 新規登録処理
 * @req userData JSON
 * { email: 'test@test.com', password: 'testtest' }
 */
async function storeDetail(req: Request, res: Response, userid: string, storeid: string) {
  console.log(TAG + ' is called');

  pool.query(
    `SELECT  * FROM stores
        WHERE user_id = $1 AND id = $2`,
    [Number(userid), Number(storeid)],
    (err: string, results: any) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: "DB接続に失敗しました" });
      }
      return res.status(200).send({ stores: results.rows, status: 200, message: 'お店の情報取得に成功しました' });
    }
  );
}
module.exports = storeDetail;
