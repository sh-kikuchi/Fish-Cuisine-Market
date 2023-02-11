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
  "/show",
  (req: Request, res: Response) => {
    const storeid = req.query.storeid;
    const menuid = req.query.menuid;
    const eatLogShow = require("../api/eatLog/show");
    eatLogShow(req, res, storeid, menuid);
  }
);

/**
 * おさかな定食ログ取得
 * request : string { email: '', password: '' },
 * response:
 */
router.get(
  "/detail",
  (req: Request, res: Response) => {
    const storeid = req.query.storeid;
    const menuid = req.query.menuid;
    const eatlogid = req.query.eatlogid;
    const eatLogDetail = require("../api/eatLog/detail");
    eatLogDetail(req, res, storeid, menuid, eatlogid);
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
    const eatLogRegister = require("../api/eatLog/register");
    eatLogRegister(req, res);
  }
);

/**
 * おさかな定食ログ
 * request : string { email: '', password: '' },
 * response:
 */
router.post(
  "/update",
  (req: Request, res: Response) => {
    const eatLogUpdate = require("../api/eatLog/update");
    eatLogUpdate(req, res);
  }
);

/**
 * delete a eatLog
 * request : string { email: '', password: '' },
 * response:
 */
router.post(
  "/delete",
  (req: Request, res: Response) => {
    const deleteEatlog = require("../api/eatLog/delete");
    deleteEatlog(req, res);
  }
);




module.exports = router;
