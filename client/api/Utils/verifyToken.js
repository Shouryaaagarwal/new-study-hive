
// }; 
 

import jwt from 'jsonwebtoken';
import { errorhandler } from './errorhandler.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; 
  if (!token) return next(errorhandler(401, 'Unauthorized As User'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorhandler(403, 'Forbidden'));
    req.user = user;
    next();
  });
};

export const verifyAdminToken = (req, res, next) => {
  const token = req.cookies.admin_token;
  if (!token) return next(errorhandler(401, 'Unauthorized As Admin'));

  jwt.verify(token, process.env.SECRET_KEY, (err, admin) => {
    if (err) return next(errorhandler(403, 'Forbidden'));
    req.admin = admin;
    next();
  });
};

