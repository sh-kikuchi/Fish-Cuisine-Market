import express, { Request, Response, NextFunction } from 'express';
// const tokenVerify = require('../config/tokenVerify');
const router = express.Router();


/**
 * Get menu master list
 * request : string { email: '', password: '' },
 * response:
 */
router.get(
  "/show",
  (req: Request, res: Response) => {
    const storeid = req.query.storeid;
    console.log(storeid);
    const showMenu = require("../api/menu/show");
    showMenu(req, res, storeid);
  }
);

/**
 * Get menu master list
 * request : string { email: '', password: '' },
 * response:
 */
router.get(
  "/detail",
  (req: Request, res: Response) => {
    const storeid = req.query.storeid;
    const menuid = req.query.menuid;
    const menuDetail = require("../api/menu/detail");
    menuDetail(req, res, storeid, menuid);
  }
);

/**
 * Register a menu
 * request : string { email: '', password: '' },
 * response:
 */
router.post(
  "/register",
  (req: Request, res: Response) => {
    const registerMenu = require("../api/menu/register");
    registerMenu(req, res);
  }
);

/**
 * Update a menu
 * request : string { email: '', password: '' },
 * response:
 */
router.post(
  "/update",
  (req: Request, res: Response) => {
    const updateMenu = require("../api/menu/update");
    updateMenu(req, res);
  }
);

/**
 * Delete a menu
 * request : string { email: '', password: '' },
 * response:
 */
router.post(
  "/delete",
  (req: Request, res: Response) => {
    const deleteMenu = require("../api/menu/delete");
    deleteMenu(req, res);
  }
);
module.exports = router;
