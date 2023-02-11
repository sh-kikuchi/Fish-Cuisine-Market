import express, { Request, Response, NextFunction } from 'express';
// const tokenVerify = require('../config/tokenVerify');
const router = express.Router();

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
    const showStores = require("../api/store/show");
    showStores(req, res, userid);
  }
);

/**
 * 定食屋マスタ取得
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
 * 定食屋マスタ登録
 * request : string { email: '', password: '' },
 * response:
 */
router.post(
  "/register",
  (req: Request, res: Response) => {
    console.log(req);
    const mstStoreRegister = require("../api/store/register");
    mstStoreRegister(req, res);
  }
);
/**
 * 定食屋マスタ更新
 * request : string { email: '', password: '' },
 * response:
 */
router.post(
  "/update",
  (req: Request, res: Response) => {
    console.log(req);
    const updateStore = require("../api/store/update");
    updateStore(req, res);
  }
);
/**
 * 定食屋削除
 * request : string { email: '', password: '' },
 * response:
 */
router.post(
  "/delete",
  (req: Request, res: Response) => {
    console.log(req);
    const deleteStore = require("../api/store/delete");
    deleteStore(req, res);
  }
);


module.exports = router;
