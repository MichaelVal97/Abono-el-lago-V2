# Auth

## Alcance del primer bloque

- registro con email y contraseña
- login con email y contraseña
- login con Google
- sesión/tokens
- roles base
- protección de rutas

## Decisiones iniciales

- backend NestJS
- base de datos PostgreSQL
- contraseña hasheada con `bcrypt`
- JWT para autenticación
- OAuth de Google para acceso social

## Google OAuth

- Client ID: configurado en `.env`
- Callback autorizado: `http://localhost:3001/api/auth/google/callback`
- Redirección al frontend tras login: `http://localhost:5173/login?token=...`

## Pendientes de implementación real

- esquema de base de datos
- service/controller reales
- guards y estrategias
- endpoints públicos y protegidos
