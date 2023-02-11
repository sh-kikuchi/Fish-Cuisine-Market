import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const TAG = "[api/eatLog/show.ts]"

/**
 * 新規登録処理
 * @req userData JSON
 * { email: 'test@test.com', password: 'testtest' }
 */
async function eatLogDetail(req: Request, res: Response, storeid: string, menuid: string, eatlogid: string) {
  console.log(TAG + ' is called');

  pool.query(
    `SELECT  * FROM eatLogs
        WHERE store_id = $1 AND menu_id = $2 AND id = $3`,
    [Number(storeid), Number(menuid), Number(eatlogid)],
    (err: string, results: any) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: "DB接続に失敗しました" });
      }
      return res.status(200).send({ eatLogs: results.rows, status: 200, message: 'お店の情報取得に成功しました' });
    }
  );
}
module.exports = eatLogDetail;
