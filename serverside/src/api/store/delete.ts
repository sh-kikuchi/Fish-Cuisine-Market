import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const trashFiles = require('../../functions/trashFiles');
const TAG = "[api/store/delete.ts]"
/**
 * Delete Stores
 * @req Request
 * @res Response
 * @return status, message
 */
async function deleteStore(req: Request, res: Response) {
  console.log(TAG + ' is called');
  let { storeidArray } = req.body;
  let errors: any = [];
  const pgClient = await pool.connect();
  try {
    await pgClient.query("begin");
    for (let i = 0; i < storeidArray.length; i++) {
      //Delete files associated with stores
      await pgClient.query(
        `select filename
            from files as f
            left join eatlogs as e
            on f.eatlog_id = e.id
            left join stores as s
            on e.store_id = s.id;
            where s.id = $1;`,
        [storeidArray[i]],
        async (err: string, results: any) => {
          /*****【NG:ERR】******/
          if (err) {
            errors.push(err);
          }
          /*****【OK:FUNCTION】******/
          if (results !== undefined && results !== null) {
            trashFiles(results.rows);
          }
          /*****【OK:DELETE EATLOGS】******/
          await pgClient.query(
            `DELETE FROM eatlogs where store_id = $1;`,
            [storeidArray[i]],
            async (err: string) => {
              /*****【NG:ERR】******/
              if (err) {
                errors.push(err);
              }
              /*****【OK:DELETE MENUS】******/
              await pgClient.query(
                `DELETE FROM menus where store_id = $1;`,
                [storeidArray[i]],
                async (err: string) => {
                  /*****【NG:ERR】******/
                  if (err) {
                    errors.push(err);
                  }
                  /*****【OK:DELETE STORES】******/
                  await pgClient.query(
                    `DELETE FROM stores where id = $1;`,
                    [storeidArray[i]],
                    (err: string) => {
                      /*****【NG:ERR】******/
                      if (err) {
                        errors.push(err);
                      }
                    }
                  )
                }
              )
              await pgClient.query("commit");
            }
          )
        }
      )
    }

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
module.exports = deleteStore;
