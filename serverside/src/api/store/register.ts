import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const TAG = "[api/auth/register.ts]"
/**
 * 新規登録処理
 * @req userData JSON
 * { email: 'test@test.com', password: 'testtest' }
 */
async function registerStore(req: Request, res: Response) {
  console.log(TAG + ' is called');
  let { userid, storeName, address1, address2, option } = req.body;
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
    const pgClient = await pool.connect();
    try {
      await pgClient.query("begin");
      await pgClient.query(
        `SELECT * FROM stores
        WHERE name = $1`,
        [storeName],
        async (err: string, results: any) => {
          if (err) {
            errors.push(err);
          }
          if (results.rows.length > 0) {
            return res.status(400).send({ message: "定食屋が登録済みです" });
          } else {
            await pgClient.query(
              `INSERT INTO stores (user_id, name, address1, address2, toyosu_flg)
                VALUES ($1, $2, $3, $4, $5)`,
              [userid, storeName, address1, address2, option],
              (err: string, results: any) => {
                if (err) {
                  errors.push(err);
                }
              }
            );
            await pgClient.query("commit");
          }
        }
      );
    } catch (err) {
      await pgClient.query("rollback");
      errors.push(err);
    } finally {
      if (errors.length !== 0) {
        return res.status(500).send({ message: "DB接続に失敗しました" });
      }
      return res.status(200).send({ message: "定食屋の登録に成功しました" });
    }
  }
}
module.exports = registerStore;
