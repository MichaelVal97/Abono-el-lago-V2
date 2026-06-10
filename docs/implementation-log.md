# Implementation log

## Auth block

- NestJS backend initialized with modular auth and users domains
- PostgreSQL container added with Docker Compose
- Prisma schema defined for `User`
- JWT login/register flow added
- Google OAuth routes added
- React auth screens created for login and register
- Shared API client created in frontend

## Notes

- Dependencies still need to be installed locally before running the project.
- Prisma migration should be executed after setting `DATABASE_URL`.
