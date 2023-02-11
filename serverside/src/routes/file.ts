import express, { Request, Response, NextFunction } from 'express';
// const tokenVerify = require('../config/tokenVerify');
const router = express.Router();
const multer = require('multer');

/**
 * 定食屋マスタ取得
 * request : string { email: '', password: '' },
 * response:
 */
router.get(
  "/show",
  (req: Request, res: Response) => {
    const userid = req.query.userid;
    console.log(userid);
    const showFiles = require("../api/file/show");
    showFiles(req, res, userid);
  }
);
/**
 * おさかな定食ログ
 * request : string { email: '', password: '' },
 * response:
 */
router.post(
  "/register",
  (req: Request, res: Response) => {
    console.log(req);
    const fileRegister = require("../api/file/register");
    fileRegister(req, res);
  }
);


module.exports = router;
