import express, { Request, Response, NextFunction } from 'express';
// const tokenVerify = require('../config/tokenVerify');
const router = express.Router();
const multer = require('multer');


/**
 * おさかな定食ログ取得
 * request : string { email: '', password: '' },
 * response:
 */
router.get(
  "/detail",
  (req: Request, res: Response) => {
    const eatlogid = req.query.eatlogid;
    const referenceDetail = require("../api/reference/detail");
    referenceDetail(req, res, eatlogid);
  }
);


module.exports = router;
