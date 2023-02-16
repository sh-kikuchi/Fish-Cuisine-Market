import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const bcrypt = require('bcrypt');
const TAG = "[api/auth/delete.ts]"

/**
 * 削除処理
 * @req userData JSON
 * { email: 'test@test.com', password: 'testtest' }
 */
async function deleteEatLog(req: Request, res: Response) {
  console.log(TAG + ' is called');
  let { eatlogidArray } = req.body;

  console.log(eatlogidArray);

  let errors: any = [];

  for (let i = 0; i < eatlogidArray.length; i++) {
    pool.query(
      `DELETE FROM eatlogs where id = $1;`,
      [eatlogidArray[i]],
      (err: string) => {
        if (err) {
          errors.push(err);
        }
      }
    )
  }

  if (errors.length !== 0) {
    return res.status(500).send({ status: 500, message: "DB接続に失敗しました" });
  }

  return res.status(200).send({ status: 200, message: "定食屋の削除に成功しました" });

}
module.exports = deleteEatLog;
