import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const TAG = "[api/reference/show.ts]"

/**
 * 新規登録処理
 * @req userData JSON
 * { email: 'test@test.com', password: 'testtest' }
 */
async function referenceDetail(req: Request, res: Response, eatlogid: string) {
  console.log(TAG + ' is called');

  pool.query(
    `SELECT
        s.name as storeName,
        m.name as MenuName,
        e.text,
        e.date,
        e.rating,
        f.filename
      FROM eatlogs as e
      JOIN menus   as m on m.id = e.menu_id
      JOIN stores  as s on s.id = e.store_id
      JOIN files   as f on e.id = f.eatlog_id
      WHERE e.id = $1;`,
    [Number(eatlogid)],
    (err: string, results: any) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: "DB接続に失敗しました" });
      }
      return res.status(200).send({ reference: results.rows, status: 200, message: 'お店の情報取得に成功しました' });
    }
  );
}
module.exports = referenceDetail;
