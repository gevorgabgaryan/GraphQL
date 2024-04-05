import jwt from 'jsonwebtoken';
import config from '../config';

export const checkAuthorization = (req, res, next) => {
    const token = req.headers.authorization || req.headers.Authorization;
    if (!token || !token.startsWith('Bearer ')) {
      return next();
    }
    try {
      const tokenArray = token.split(' ');
      if (tokenArray.length !== 2) {
        return next();
      }
      const decodedToken = jwt.verify(tokenArray[1], config.JWTSecret);
      const { userId, role } = decodedToken;
      req.user = { userId, role };
      next();
    } catch (e) {
      next()
    }
};
