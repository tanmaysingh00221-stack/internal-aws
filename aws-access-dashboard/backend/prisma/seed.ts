import { PrismaClient, Role } from "@prisma/client";
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
const users = [
  ['DevOps Admin','devops@example.com','Admin@123',Role.DEVOPS],
  ['Backend Developer','backend@example.com','Backend@123',Role.BACKEND],
  ['Frontend Developer','frontend@example.com','Frontend@123',Role.FRONTEND]
] as const;
for (const [name,email,password,role] of users) {
  await prisma.user.upsert({
    where:{email},
    update:{},
    create:{name,email,role,passwordHash:await bcrypt.hash(password,12)}
  });
}
await prisma.$disconnect();
