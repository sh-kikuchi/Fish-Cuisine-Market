import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const TAG = "[api/eatLog/show.ts]"

/**
 * 新規登録処理
 * @req userData JSON
 * { email: 'test@test.com', password: 'testtest' }
 */
async function eatLogShow(req: Request, res: Response, storeid: string, menuid: string) {
  console.log(TAG + ' is called');
  // let userid = Number(req.query.userid);

  pool.query(
    `SELECT  * FROM eatLogs
        WHERE store_id = $1 and menu_id = $2 `,
    [Number(storeid), Number(menuid)],
    (err: string, results: any) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: "DB接続に失敗しました" });
      }
      return res.status(200).send({ eatLogs: results.rows, status: 200, message: 'お店の情報取得に成功しました' });
    }
  );
}
module.exports = eatLogShow;
