import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const bcrypt = require('bcrypt');
const TAG = "[api/auth/register.ts]"

/**
 * 新規登録処理
 * @req userData JSON
 * { email: 'test@test.com', password: 'testtest' }
 */
async function userRegister(req: Request, res: Response) {
  console.log(TAG + ' is called');
  let { username, email, password, passwordConfirm } = req.body;
  let errors: any = [];

  //ヴァリデーション
  if (!username || !email || !password || !passwordConfirm) {
    errors.push({ message: "全ての項目を入力してください" });
  }
  const regexp = /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  if (!regexp.test(email)) {
    errors.push({ message: "メールアドレスの形式が正しくありません" });
  }
  if (password.length < 6) {
    errors.push({ message: "パスワードは6字以上です" });
  }
  if (password !== passwordConfirm) {
    errors.push({ message: "パスワードとパスワード（確認用）が一致していません" });
  }
  console.log(errors);

  //登録処理
  if (errors.length > 0) {
    return res.status(400).send(errors[0]); //エラーの一番上のみ表示
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    //既存データの判定
    pool.query(
      `SELECT * FROM users
        WHERE email = $1`,
      [email],
      (err: string, results: any) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "DB接続に失敗しました" });
        }
        console.log(results.rows);
        if (results.rows.length > 0) {
          return res.status(400).send({ message: "メールアドレスが登録済みです" });
        } else {
          pool.query(
            `INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3)
                RETURNING id, password`,
            [username, email, hashedPassword],
            (err: string, results: any) => {
              if (err) {
                console.log(err);
                return res.status(500).send({ message: "DB接続に失敗しました" });
              }
              console.log(results.rows);
              return res.status(200).send({ message: "ユーザー登録に成功しました" });
            }
          );
        }
      }
    );
  }
}
module.exports = userRegister;
