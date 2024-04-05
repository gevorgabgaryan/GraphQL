import jwt from 'jsonwebtoken';
import config from '../config';

export const checkAuthorization = (req, res, next) => {
    const token = req.headers.authorization || req.headers.Authorization;
    if (!token || !token.startsWith('Bearer ')) {
      return next();
    }
    try {
      const decodedToken = jwt.verify(token.split(' ')[1], config.JWTSecret);
      const { userId, role } = decodedToken;
      req.user = { userId, role };
      next();
    } catch (e) {
      console.log(e);
      next(e)
    }
};
