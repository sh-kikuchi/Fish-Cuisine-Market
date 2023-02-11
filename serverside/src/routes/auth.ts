import express, { Request, Response, NextFunction } from 'express';
const tokenVerify = require('../config/tokenVerify');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const TAG = '[middlewares/auth.js]';
console.log(TAG + ' is called');

/**
 * ログイン
 * @request : string { email: '', password: '' },
 * @response -
 */
router.post(
  "/login",
  (req: Request, res: Response) => {
    const passportInitialize = require("../api/auth/login");
    passportInitialize(passport, req, res);
  }
);

/**
 * ユーザー登録
 * request : string { email: '', password: '' },
 * response:
 */
router.post(
  "/register",
  (req: Request, res: Response) => {
    const userRegister = require("../api/auth/register");
    userRegister(req, res);
  }
);

/**
 * ユーザー編集
 * request : string { email: '', password: '' },
 * response:
 */
router.post(
  "/auth/edit",
  (req: Request, res: Response) => {
    const useEdit = require("../api/auth/edit");
    useEdit(passport, req, res);
  }
);

/**
 * ユーザー情報取得
 * request : { id: '' email: '', password: '' },
 * response: { error: result, email: result.email, message: "認証エラー" }
 */
router.post(
  "/auth/show",
  (req: Request, res: Response) => {
    console.log(req.body.accessToken);
    const result = tokenVerify(req.body.accessToken, req, res);
    console.log(result);

    if (result.name && result.email) {
      res.status(200).send({ id: result.id, username: result.name, email: result.email });
    } else {
      res.status(401).send({ error: result, email: result.email, message: "認証エラー" });
    }
  }
);

module.exports = router;
