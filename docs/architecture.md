# Arquitectura inicial

## Propuesta de carpetas

```text
backend/
  src/
    modules/
      auth/
      users/
      products/
      orders/
      categories/
      uploads/
      contact/
      mail/
    common/
    config/
    database/
frontend/
  src/
    app/
    components/
    pages/
    features/
    services/
    styles/
```

## Flujo de variables de entorno

- `backend/.env`: credenciales de infraestructura y secretos
- `frontend/.env`: URL de la API y flags públicos
