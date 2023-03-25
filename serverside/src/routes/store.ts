import express, { Request, Response, NextFunction } from 'express';
// const tokenVerify = require('../config/tokenVerify');
const router = express.Router();

/**
 * マスタ取得
 * request : string { email: '', password: '' },
 * response:
 */
router.get(
  "/show",
  (req: Request, res: Response) => {
    const userid = req.query.userid;
    const showStores = require("../api/store/show");
    showStores(req, res, userid);
  }
);
/**
 * 詳細取得
 * request : string { email: '', password: '' },
 * response:
 */
router.get(
  "/detail",
  (req: Request, res: Response) => {
    const userid = req.query.userid;
    const storeid = req.query.storeid;
    const storeDetail = require("../api/store/detail");
    storeDetail(req, res, userid, storeid);
  }
);
/**
 * マスタ登録
 * request : string { email: '', password: '' },
 * response:
 */
router.post(
  "/register",
  (req: Request, res: Response) => {
    const registerStore = require("../api/store/register");
    registerStore(req, res);
  }
);
/**
 * マスタ更新
 * request : string { email: '', password: '' },
 * response:
 */
router.post(
  "/update",
  (req: Request, res: Response) => {
    const updateStore = require("../api/store/update");
    updateStore(req, res);
  }
);
/**
 * マスタ削除
 * request : string { email: '', password: '' },
 * response:
 */
router.post(
  "/delete",
  (req: Request, res: Response) => {
    const deleteStore = require("../api/store/delete");
    deleteStore(req, res);
  }
);
module.exports = router;
