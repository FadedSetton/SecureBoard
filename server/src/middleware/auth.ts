import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];



  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }

  return jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      
       res.status(403).json({ message: 'Invalid or expired token.' });
       return
    }

    (req as any).user = decoded as JwtPayload;
    next();
  });
};
