import * as jwt from 'jsonwebtoken';

/**
 * トークン認証
 * @param accessToken string
 */
function tokenVerify(accessToken: string, req: Request, res: Response) {
  let result = "";
  let jwtSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
  jwt.verify(accessToken, jwtSecret, (err: any, decoded: any) => {
    if (err) {
      console.log(`ERROR: err.message=[${err.message}]`);
      result = err;
    } else {
      console.log(`OK: decoded.email=[${decoded.email}], name=[${decoded.name}]`);
      result = decoded;
    }
  });
  console.log(result);
  return result;
}

module.exports = tokenVerify;
