import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const TAG = "[api/file/register.ts]"
/**
 * 新規登録処理
 * @req userData JSON
 * { email: 'test@test.com', password: 'testtest' }
 */
async function registerFile(req: Request, res: Response) {
  console.log(TAG + ' is called');
  let { storeid, menuid, userid, filename } = req.body;
  let errors: any = [];
  //登録処理
  if (errors.length > 0) {
    return res.status(400).send(errors[0]); //エラーの一番上のみ表示
  } else {
    const pgClient = await pool.connect();
    try {
      //既存データの判定
      await pgClient.query(
        `SELECT id FROM eatLogs
        WHERE store_id = $1 and menu_id = $2  ORDER BY id DESC LIMIT 1`,
        [storeid, menuid],
        async (err: string, results: any) => {
          if (err) {
            errors.push(err);
          }
          await pgClient.query(
            `INSERT INTO files (user_id, eatlog_id, filename)
                VALUES ($1, $2, $3)`,
            [userid, results.rows[0].id, filename],
            (err: string, results: any) => {
              if (err) {
                errors.push(err);
              }
              console.log(results.rows);
            }
          );
          await pgClient.query("commit");
        }
      );
    } catch (err) {
      await pgClient.query("rollback");
      errors.push(err);
    } finally {
      if (errors.length !== 0) {
        return res.status(500).send({ status: 500, message: "DB接続に失敗しました" });
      }
      return res.status(200).send({ status: 200, message: "お店の削除に成功しました" });
    }
  }
}
module.exports = registerFile;
