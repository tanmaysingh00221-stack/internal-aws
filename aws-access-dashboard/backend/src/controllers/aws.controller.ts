import type { Request, Response } from 'express';
import { dashboardSummary, listLambda, listLogs, listS3 } from '../aws/resources.js';
import { audit } from '../services/audit.service.js';
export async function summary(req:Request,res:Response){res.json(await dashboardSummary());}
export async function lambdas(req:Request,res:Response){const data=await listLambda(); await audit(req.user!.id,'LIST','LAMBDA'); res.json(data);}
export async function buckets(req:Request,res:Response){const data=await listS3(); await audit(req.user!.id,'LIST','S3'); res.json(data);}
export async function logs(req:Request,res:Response){const data=await listLogs(); await audit(req.user!.id,'LIST','CLOUDWATCH_LOGS'); res.json(data);}
