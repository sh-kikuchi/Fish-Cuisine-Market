import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const TAG = "[api/mst/menu/update.ts]"

/**
 * 新規登録処理
 * @req userData JSON
 * { email: 'test@test.com', password: 'testtest' }
 */
async function updateMenu(req: Request, res: Response) {
  console.log(TAG + ' is called');
  let { menuid, storeid, menuName, memo, price, option } = req.body;
  let errors: any = [];

  //ヴァリデーション
  if (!menuName) {
    errors.push({ message: "メニュー名は入力して下さい" });
  }
  if (!storeid) {
    errors.push({ message: "定食屋の登録が完了しておりません" });
  }
  //登録処理
  if (errors.length > 0) {
    return res.status(400).send(errors[0]); //エラーの一番上のみ表示
  } else {
    const pgClient = await pool.connect();
    try {
      await pgClient.query("begin");
      await pgClient.query(
        `UPDATE menus SET store_id = $1, name = $2, memo = $3, price = $4, region_flg = $5 WHERE id = $6`,
        [storeid, menuName, memo, price, option, menuid],
        async (err: string, results: any) => {
          if (err) {
            errors.push(err);
          }
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
module.exports = updateMenu;
