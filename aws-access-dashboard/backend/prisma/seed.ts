import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const users = [
  {
    name: "DevOps Admin",
    email: "devops@example.com",
    password: "Admin@123",
    role: Role.DEVOPS,
  },
  {
    name: "Backend Developer",
    email: "backend@example.com",
    password: "Backend@123",
    role: Role.BACKEND,
  },
  {
    name: "Frontend Developer",
    email: "frontend@example.com",
    password: "Frontend@123",
    role: Role.FRONTEND,
  },
];

async function main() {
  for (const user of users) {
    const passwordHash = await bcrypt.hash(user.password, 12);

    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        role: user.role,
        passwordHash,
      },
    });

    console.log(`✅ Seeded: ${user.email}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });