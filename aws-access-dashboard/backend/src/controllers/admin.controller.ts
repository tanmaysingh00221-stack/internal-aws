import type { Request, Response } from 'express';
import { prisma } from '../utils/prisma.js';
export async function users(_req:Request,res:Response){res.json(await prisma.user.findMany({select:{id:true,name:true,email:true,role:true,active:true,createdAt:true},orderBy:{createdAt:'desc'}}));}
export async function audits(_req:Request,res:Response){res.json(await prisma.auditLog.findMany({take:50,orderBy:{createdAt:'desc'},include:{user:{select:{name:true,email:true}}}}));}
