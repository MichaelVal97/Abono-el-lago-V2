# Microservices plan

## Estado actual

El backend está siendo organizado por dominios para facilitar una futura separación real de servicios. En esta fase, autenticación y usuarios quedan como el primer dominio funcional.

## Bounded contexts

- `auth`: login, roles, tokens
- `users`: perfiles, direcciones, clientes
- `catalog`: productos, categorías, inventario
- `orders`: carrito, checkout, pedidos
- `payments`: pasarela y confirmaciones
- `notifications`: emails y avisos
- `media`: imágenes y archivos con Cloudinary

## Estructura propuesta en backend

```text
backend/src/
  microservices/
    auth/
    users/
    catalog/
    orders/
    payments/
    notifications/
    media/
  common/
  config/
  database/
  shared/
```

## Regla de escalabilidad

Cada dominio debe poder convertirse después en servicio independiente sin romper el contrato del API principal.
