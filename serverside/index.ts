import express from 'express'
const app: express.Express = express()
const path = require('path');
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
import multer from "multer";
const { pool } = require("../serverside/database/pool");


//env
const dotenv = require('dotenv');
dotenv.config();

//json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(flash());
app.use(cookieParser());

//CORS対応
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader('Content-Type', 'application/json');
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTION"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})

//環境変数チェック
const config = require('./src/config/config.json')[app.get('env')];
console.log(express.urlencoded(config.user));

//file
const storage = multer.diskStorage({

  destination(req, file, callback) {
    console.log(__dirname);
    callback(null, path.resolve(__dirname, "../client/src/images"));
  },
  filename(req, file, callback) {
    const uniqueSuffix = Math.random().toString(26).substring(4, 10);
    callback(null, `${Date.now()}-${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage
}).any()

app.post('/image', (req: any, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      //アップロード失敗した場合
      res.json({
        status: "error",
        error: "fail to uplord image"
      })
    } else {
      //アップロード成功した場合
      res.json({
        status: "success",
        filename: req.files[0].filename,
        message: "ファイルアップロードに成功しました"
      })
    }
  })
});

//Routes
const authRouter = require('./src/routes/auth');
const mstStoreRouter = require('./src/routes/store');
const menuRouter = require('./src/routes/menu');
const eatLogRouter = require('./src/routes/eatLog');
const fileRouter = require('./src/routes/file');
const referenceRouter = require('./src/routes/reference');
app.use('/', authRouter);
app.use('/store', mstStoreRouter);
app.use('/menu', menuRouter);
app.use('/eatLog', eatLogRouter);
app.use('/file', fileRouter);
app.use('/reference', referenceRouter);


//publicフォルダの設定
app.use("/static", express.static(path.join(__dirname, 'public')));

//アプリ起動
app.listen(3001, () => {
  console.log("Start on port 3001.")
})



module.exports = upload;
