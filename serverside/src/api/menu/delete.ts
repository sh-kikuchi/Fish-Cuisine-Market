import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const trashFiles = require('../../functions/trashFiles');
const TAG = "[api/menu/delete.ts]"

/**
 * 削除処理
 * @req userData JSON
 * { email: 'test@test.com', password: 'testtest' }
 */
async function deleteMenu(req: Request, res: Response) {
  console.log(TAG + ' is called');
  let { menuidArray } = req.body;
  let errors: any = [];
  for (let i = 0; i < menuidArray.length; i++) {
    //Delete files associated with stores
    pool.query(
      `select filename
            from files as f
            left join eatlogs as e
            on f.eatlog_id = e.id
            left join menus as m
            on e.menu_id = m.id;
            where m.id = $1;`,
      [menuidArray[i]],
      (err: string, results: any) => {
        /*****【NG:ERR】******/
        if (err) {
          errors.push(err);
        }
        /*****【OK:FUNCTION】******/
        if (results !== undefined) {
          trashFiles(results.rows);
        }
        /******Delete******/
        pool.query(
          `DELETE FROM eatlogs where menu_id = $1;`,
          [menuidArray[i]],
          (err: string) => {
            if (err) {
              errors.push(err);
            }
            /******Delete******/
            pool.query(
              `DELETE FROM menus where id = $1;`,
              [menuidArray[i]],
              (err: string) => {
                if (err) {
                  errors.push(err);
                }
              }
            )
          }
        )
      }
    );
  }
  if (errors.length !== 0) {
    return res.status(500).send({ status: 500, message: "DB接続に失敗しました" });
  }
  return res.status(200).send({ status: 200, message: "定食屋の削除に成功しました" });
}
module.exports = deleteMenu;
