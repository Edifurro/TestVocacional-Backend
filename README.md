# Test Vocacional Backend

API REST para el test vocacional de la universidad. Permite registro y login de aspirantes, gestión de resultados y administración de usuarios.

## Tecnologías
- Node.js
- Express
- Sequelize (MySQL)
- JWT para autenticación

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/Edifurro/TestVocacional-Backend.git
   ```
2. Instala dependencias:
   ```
   npm install
   ```
3. Configura tu archivo `.env` (no lo subas a GitHub):
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=test_vocacional
   DB_PORT=3306
   JWT_SECRET= preguntame we 
   ```

## Uso

1. Inicia el servidor:
   ```
   npm start
   ```
2. Endpoints principales:
   - `POST /api/users/register` — Registro de aspirantes
   - `POST /api/users/login` — Login y obtención de token JWT
   - `GET /api/users/profile` — Perfil protegido (requiere token)

## Estructura

```
src/
  app.js
  server.js
  config/
    db.js
  modules/
    users/
      user.model.js
      user.controller.js
      user.service.js
      user.routes.js
    results/
      result.model.js
      result.routes.js
  middlewares/
    auth.middleware.js
```

## Notas

- El archivo `.env` debe estar en la raíz y nunca subirse al repositorio.
- Solo el administrador puede editar información de aspirantes.
- La CURP se valida por formato y es única por usuario.

## Autor

Edison Robñes
