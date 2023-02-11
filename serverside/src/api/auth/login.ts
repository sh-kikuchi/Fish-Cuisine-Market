import { Request, Response, NextFunction } from 'express';
const LocalStrategy = require("passport-local").Strategy;
const jwt = require('jsonwebtoken');
const { pool } = require("../../../database/pool");
const bcrypt = require('bcrypt');
const TAG = "[api/auth/login.ts]"

/**
 * 認証
 * @param userData JSON
 * { email: 'test@test.com', password: 'testtest' }
 */

function initialize(passport: any, req: Request, res: Response, next: NextFunction) {
  console.log(TAG + ' is initialized');
  const email = req.body.email;
  const password = req.body.password;

  // passport-jwtの設定
  const jwtSecret = process.env.JWT_SECRET;
  const jwtOptions = {
    algorithm: 'HS256',
    expiresIn: '3600s',
  };

  //ヴァリデーション
  let errors: any = [];
  if (!email || !password) {
    errors.push({ message: "全ての項目を入力してください" });
  }
  const regexp = /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  if (!regexp.test(email)) {
    errors.push({ message: "メールアドレスの形式が正しくありません" });
  }
  if (password.length < 6) {
    errors.push({ message: "パスワードは6字以上です" });
  }

  //ユーザー認証
  const authenticateUser = () => {
    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err: string, results: any) => {
        if (err) {
          return res.status(500).send({ token: null, message: 'DB接続エラーです' });
        }
        if (results.rows.length > 0) {
          const user = results.rows[0];
          bcrypt.compare(password, user.password, (err: string, isMatch: boolean) => {
            if (err) {
              console.log(err);
              return res.status(400).send({ token: null, message: 'Login failed' });
            }
            //パスワード照会
            if (isMatch) {
              console.log('password is correct');
              const token = jwt.sign(user, jwtSecret, jwtOptions);
              return res.status(200).send({ token: token, message: 'ログインに成功しました' });
            } else {
              console.log('password is incorrect');
              return res.status(400).send({ token: null, message: 'パスワードが間違っています' });
            }
          });
        } else {
          //ユーザが見つけられない場合
          return res.status(400).send({ token: null, message: '該当ユーザーが見つかりませんでした' });
        }
      }
    );
  };

  //バリデーションエラーがない場合に実行
  if (errors.length > 0) {
    return res.status(400).send(errors[0]); //エラーの一番上のみ表示
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
module.exports = initialize;
