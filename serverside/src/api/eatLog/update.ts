import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const bcrypt = require('bcrypt');
const trashFiles = require('../../functions/trashFiles');
const TAG = "[api/eatLog/update.ts]"

/**
 * イートログ更新処理
 * @params userData JSON
 * @returns message, status
 */
async function updateEatLog(req: Request, res: Response) {
  console.log(TAG + ' is called');
  let { eatlogid, storeid, menuid, date, text, rating, file } = req.body;
  storeid = Number(storeid);
  menuid = Number(menuid);
  let errors: any = [];
  //ヴァリデーション
  if (!storeid || !menuid) {
    errors.push({ message: "定食屋とメニューは入力して下さい" });
  }
  if (!text) {
    errors.push({ message: "なんか・・・書いてください" });
  }
  //既存のファイルは削除（delete/insert)

  const pgClient = await pool.connect();
  await pgClient.query("begin");
  //ファイル削除
  pool.query(
    `SELECT filename FROM files WHERE eatlog_id = $1`,
    [eatlogid],
    async (err: string, results: any) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: "DB接続に失敗しました" });
      }
      console.log(Object.keys(file).length);
      if (Object.keys(file).length !== 0) {
        /*****【Func】ファイル削除******/
        trashFiles(results.rows);
        try {
          await pgClient.query(
            `DELETE FROM files WHERE eatlog_id = $1`,
            [eatlogid],
            async (err: string, results: any) => {
              if (err) {
                console.log(err);
              }
              //更新処理
              await pgClient.query(
                `UPDATE eatLogs SET store_id = $1, menu_id = $2, date = $3, text = $4, rating = $5 WHERE id = $6`,
                [storeid, menuid, date, text, rating, eatlogid],
                (err: string, results: any) => {
                  if (err) {
                    errors.push(err);
                  }

                  pgClient.query("commit");
                }
              );
            }
          );
        } catch (err) {
          await pgClient.query("rollback");
          errors.push(err);
        } finally {
          if (errors.length !== 0) {
            return res.status(500).send({ message: "DB接続に失敗しました" });
          }
          return res.status(200).send({ message: "定食屋の更新に成功しました" });
        }
      } else {
        try {
          //更新処理
          await pgClient.query(
            `UPDATE eatLogs SET store_id = $1, menu_id = $2, date = $3, text = $4, rating = $5 WHERE id = $6`,
            [storeid, menuid, date, text, rating, eatlogid],
            (err: string, results: any) => {
              if (err) {
                errors.push(err);
              }
              pgClient.query("commit");
            }
          );
        } catch (err) {
          await pgClient.query("rollback");
          errors.push(err);
        } finally {
          if (errors.length !== 0) {
            return res.status(500).send({ message: "DB接続に失敗しました" });
          }
          return res.status(200).send({ message: "定食屋の更新に成功しました" });
        }
      }
    }
  );

}
module.exports = updateEatLog;
