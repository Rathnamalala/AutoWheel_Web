import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';



export const verifyToken = (req, res, next) => {
 const token = req.cookies.access_token;

 if (!token) return next (errorHandler(401, 'Unauthorized'));

 jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
  if (err) return next(errorHandler(403, 'Forbidden'));	

  req.user =user;
  next();
  });
};


export const verifyAdmin = (req, res, next) => {
 const token = req.cookies.admin_token;

 if (!token) return next (errorHandler(401, 'Unauthorized'));

 jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
  if (err) return next(errorHandler(403, 'Forbidden'));	

  req.user =user;
  next();
  });
};

export const verifySeller = (req, res, next) => {
  const token = req.cookies.admin_seller;
 
  if (!token) return next (errorHandler(401, 'Unauthorized'));
 
  jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
   if (err) return next(errorHandler(403, 'Forbidden'));	
 
   req.user =user;
   next();
   });
 };



export const requireSignIn = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
      return next(errorHandler(401, 'Unauthorized'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
          return next(errorHandler(403, 'Forbidden'));
      }

      req.user = user;
      next();
  });
};





