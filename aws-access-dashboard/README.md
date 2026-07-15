# AWS Access Dashboard

Internal role-based dashboard for safely exposing approved AWS operations without sharing the AWS Console.

## Included
- React + TypeScript + Vite frontend
- Node.js + Express backend
- JWT authentication and RBAC
- Prisma user/audit schema
- Backend, Frontend and DevOps role views
- Mock mode for local development
- AWS SDK v3 adapters for Lambda, S3, CloudWatch and STS
- Docker Compose with PostgreSQL

## Quick start
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm install
npm run install:all
npm run db:push
npm run db:seed
npm run dev
```
Open http://localhost:5173

Demo accounts after seeding:
- devops@example.com / Admin@123
- backend@example.com / Backend@123
- frontend@example.com / Frontend@123

`AWS_MOCK_MODE=true` is the safe default. Set it to `false` only after configuring an IAM role ARN and least-privilege policies.
