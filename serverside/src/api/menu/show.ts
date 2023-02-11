import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const TAG = "[api/mst/store/show.ts]"

/**
 * 新規登録処理
 * @req userData JSON
 * { email: 'test@test.com', password: 'testtest' }
 */
async function menuShow(req: Request, res: Response, storeid: string) {
  console.log(TAG + ' is called');

  pool.query(
    `SELECT  * FROM menus
        WHERE store_id = $1`,
    [Number(storeid)],
    (err: string, results: any) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: "DB接続に失敗しました" });
      }
      return res.status(200).send({ menus: results.rows, status: 200, message: 'メニューの情報取得に成功しました' });
    }
  );
}
module.exports = menuShow;
