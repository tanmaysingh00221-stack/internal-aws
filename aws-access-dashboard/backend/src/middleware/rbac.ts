import type { Role } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
export const allowRoles=(...roles:Role[]) => (req:Request,res:Response,next:NextFunction) => {
  if(!req.user || !roles.includes(req.user.role)) return res.status(403).json({message:'Insufficient permissions'});
  next();
};
