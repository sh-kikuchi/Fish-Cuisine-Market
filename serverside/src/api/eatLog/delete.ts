import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const trashFiles = require('../../functions/trashFiles');
const TAG = "[api/eatLog/delete.ts]"

/**
 * 削除処理
 * @req userData JSON
 * { email: 'test@test.com', password: 'testtest' }
 */
async function deleteEatLog(req: Request, res: Response) {
  console.log(TAG + ' is called');
  let { eatlogidArray } = req.body;
  let errors: any = [];

  for (let i = 0; i < eatlogidArray.length; i++) {
    pool.query(
      `select filename
            from files as f
            left join eatlogs as e
            on f.eatlog_id = e.id
            where e.id = $1;`,
      [eatlogidArray[i]],
      (err: string, results: any) => {
        console.log(results.rows);
        /*****【NG:ERR】******/
        if (err) {
          errors.push(err);
        }
        /*****【OK:FUNCTION】******/
        if (results !== undefined || results !== null) {
          trashFiles(results.rows);
        }
        pool.query(
          `DELETE FROM eatlogs where id = $1;`,
          [eatlogidArray[i]],
          (err: string) => {
            if (err) {
              errors.push(err);
            }
            //Delete files associated with stores

          }
        )
      }
    )
  }

  if (errors.length !== 0) {
    return res.status(500).send({ status: 500, message: "DB接続に失敗しました" });
  }

  return res.status(200).send({ status: 200, message: "定食屋の削除に成功しました" });

}
module.exports = deleteEatLog;
