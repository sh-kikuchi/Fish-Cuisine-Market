import { Request, Response } from 'express';
const LocalStrategy = require("passport-local").Strategy;
const jwt = require('jsonwebtoken');
const { pool } = require("../../../database/pool");
const bcrypt = require('bcrypt');
const TAG = "[api/auth/edit.js]"

function useEdit(passport: any, req: Request, res: Response) {
  console.log(TAG + 'start');
  let { userid, username, email, password, newPassword } = req.body;
  let errors: any = [];
  let hashedPassword = '';

  // passport-jwtの設定
  const jwtSecret = process.env.JWT_SECRET;
  const jwtOptions = {
    algorithm: 'HS256',
    expiresIn: '3600s',
  };

  //ヴァリデーション
  if (!username || !email) {
    errors.push({ message: "名前またはEメールが未入力です" });
  }
  const regexp = /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  if (!regexp.test(email)) {
    errors.push({ message: "メールアドレスの形式が正しくありません" });
  }
  if ((!newPassword && password) || (newPassword && !password)) {
    errors.push({ message: "現在のパスワードと新パスワードの両方を入力してください" });
  }

  const authenticateUser = async () => {
    //SQL
    const sql = `SELECT * FROM users WHERE id = $1`;

    //パスワード更新の有無によって使い分け
    const upd1 = `UPDATE users SET name = $2, email = $3, password = $4 WHERE id = $1`;
    const upd2 = `UPDATE users SET name = $2, email = $3 WHERE id = $1`;

    //ハッシュ化
    if (newPassword) {
      hashedPassword = await bcrypt.hash(newPassword, 10);
    }

    //更新処理
    await pool.query(sql, [userid],
      (err: any, results: any) => {
        if (err) {
          res.status(400).send({ token: null, message: '該当ユーザーが見つかりませんでした' });
        }
        //新パスワードが入力されている場合
        if (newPassword) {
          //既存のパスワードチェック
          bcrypt.compare(password, results.rows[0].password, (err: any, isMatch: boolean) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              //更新処理
              pool.query(
                upd1, [userid, username, email, hashedPassword],
                (err: any, results: any) => {
                  if (err) {
                    return res.status(200).send({ message: 'DB接続エラーです' });
                  }
                  pool.query(sql, [userid],
                    (err: any, results: any) => {
                      const userUpdate = results.rows[0];
                      const token = jwt.sign(userUpdate, jwtSecret, jwtOptions);
                      return res.status(200).send({ token: token, message: 'ユーザー情報の更新に成功しました' });
                    }
                  )
                });
            } else {
              return res.status(400).send({ message: "現在のパスワードが間違っています" });
            };
          });
        } else {
          pool.query(
            upd2, [userid, username, email],
            (err: any, results: any) => {
              if (err) {
                throw err;
              }
              pool.query(sql, [userid],
                (err: any, results: any) => {
                  const userUpdate = results.rows[0];
                  const token = jwt.sign(userUpdate, jwtSecret, jwtOptions);
                  return res.status(200).send({ token: token, message: 'ユーザー情報の更新に成功しました' });
                }
              )
            }
          );
        }
      }
    );
  }

  if (errors.length > 0) {
    //ヴァリデーションエラーがある場合
    return res.status(400).send(errors[0]);
  } else {
    authenticateUser();
  }

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );
}
module.exports = useEdit;
