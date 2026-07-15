import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs'; import jwt from 'jsonwebtoken'; import { z } from 'zod';
import { prisma } from '../utils/prisma.js';
const schema=z.object({email:z.string().email(),password:z.string().min(8)});
export async function login(req:Request,res:Response){
 const p=schema.safeParse(req.body); if(!p.success)return res.status(400).json({message:'Invalid credentials format'});
 const user=await prisma.user.findUnique({where:{email:p.data.email}}); if(!user||!user.active||!(await bcrypt.compare(p.data.password,user.passwordHash)))return res.status(401).json({message:'Email or password is incorrect'});
 const payload={id:user.id,name:user.name,email:user.email,role:user.role};
 const token=jwt.sign(payload,process.env.JWT_SECRET!,{expiresIn:'8h'}); res.json({token,user:payload});
}
export function me(req:Request,res:Response){res.json({user:req.user});}
