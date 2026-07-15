import { prisma } from '../utils/prisma.js';
export async function audit(userId:string,action:string,resource:string,result='SUCCESS',metadata?:object){
  return prisma.auditLog.create({data:{userId,action,resource,result,metadata}});
}
