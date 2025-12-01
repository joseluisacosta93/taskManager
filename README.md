# TaskSync – Backend

Backend de la app móvil **TaskSync**, desarrollado con **Node.js + Express + TypeScript**.

Expone una API REST con:

- Autenticación con **JWT**.
- CRUD de tareas.
- Endpoint para “sembrar” (`seed`) una lista de tareas.
- Cada tarea puede incluir ubicación opcional (`latitude`, `longitude`).

---

## Requerimientos

- Node.js >= 18
- npm (o yarn/pnpm)
- Puerto libre `3000`

---

## Cómo correr el proyecto

1. Configurar variables de entorno

Crear un archivo `.env` en la raíz de `tasksync-backend`:

```env
PORT=3000
JWT_SECRET=super-secret-key
```

`PORT` es opcional (por defecto 3000) y `JWT_SECRET` se usa para firmar los tokens JWT.

2. Instalar dependencias

```bash
npm install
```

3. Ambiente de desarrollo

```bash
npm run dev
```

4. Producción (opcional)

```bash
npm run build
npm start
```

El backend quedará disponible en:

```text
http://localhost:3000
```

Usuario demo para login:

- **email:** `demo@tasksync.com`
- **password:** `password123`

---

## Arquitectura de carpetas

```text
tasksync-backend/
  src/
    auth.ts
    server.ts
    tasksRepository.ts
    types.ts
    index.ts
  package.json
  tsconfig.json
  .env.example (opcional)
```

- `src/types.ts`  
  Define la interfaz `Task`:

  ```ts
  export interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    latitude?: number;
    longitude?: number;
  }
  ```

- `src/tasksRepository.ts`  
  “Repositorio” en memoria con las operaciones:
  - `getAllTasks`
  - `getTaskById`
  - `createTask`
  - `updateTask`
  - `deleteTask`
  - `replaceAllTasks` (borra todas y crea desde una lista)

- `src/auth.ts`  
  Lógica de autenticación:
  - Usuario demo hardcodeado.
  - Generación de JWT usando `JWT_SECRET`.
  - Middleware `authMiddleware` que valida el token.

- `src/server.ts`  
  Configuración de Express, middlewares y definición de rutas.

- `src/index.ts`  
  Entry point mínimo que simplemente importa `./server`.

---

## Endpoints principales

### Auth

`POST /auth/login`

Request:

```json
{
  "email": "demo@tasksync.com",
  "password": "password123"
}
```

Response:

```json
{
  "token": "<jwt>"
}
```

El token se envía en el header:

```http
Authorization: Bearer <jwt>
```

### Demo item (protegido)

`GET /demo-item`

Devuelve el objeto estático pedido en la prueba:

```json
{
  "id": 1,
  "title": "Demo item",
  "description": "",
  "completed": false,
  "latitude": 0,
  "longitude": 0
}
```

### Tareas (todas protegidas con JWT)

- `GET /tasks`  
  Lista todas las tareas.

- `GET /tasks/:id`  
  Devuelve una tarea por id.

- `POST /tasks`  
  Crea una tarea.

  Body:

  ```json
  {
    "title": "Texto de la tarea",
    "description": "Detalle opcional",
    "completed": false,
    "latitude": 4.60971,
    "longitude": -74.08175
  }
  ```

- `PUT /tasks/:id`  
  Actualiza una tarea.

- `DELETE /tasks/:id`  
  Elimina una tarea.

### Seed de tareas

`POST /tasks/seed`

Recibe **directamente un array** de tareas y reemplaza todas las existentes:

```json
[
  {
    "title": "Tarea 1",
    "description": "Desc 1",
    "completed": false,
    "latitude": 4.60971,
    "longitude": -74.08175
  },
  {
    "title": "Tarea 2",
    "description": "Desc 2",
    "completed": true
  }
]
```

---

## Decisiones técnicas

- **Node.js + Express + TypeScript**  
  Permite montar rápido un backend tipado, fácil de mantener y muy estándar en entrevistas.

- **Repositorio en memoria**  
  Para mantener el foco en la lógica del API y no en la infraestructura. Los datos se pierden al reiniciar el servidor; esto es aceptable para una prueba técnica y se documenta claramente.

- **JWT para autenticación**  
  Se usa un usuario demo fijo para simplificar el flujo, pero se modela el uso real de tokens (expiración, header Authorization, etc.).

- **Modelo Task enriquecido con geolocalización**  
  Incluir `latitude` y `longitude` permite integrar de forma natural la funcionalidad nativa de geolocalización de la app móvil.

---

## Funcionalidad nativa relacionada (geolocalización)

Aunque el backend no accede directamente a APIs nativas, está preparado para recibir y almacenar:

- `latitude`
- `longitude`

Estos valores son obtenidos por la app móvil usando la API nativa de geolocalización y enviados al servidor para asociar cada tarea con la ubicación donde fue creada o editada.

---

## Posibles mejoras futuras

- Persistir los datos en una base de datos real (SQLite, PostgreSQL, MongoDB, etc.).
- Añadir endpoints de registro de usuario y refresco de tokens (refresh tokens).
- Manejo de multiusuario (cada usuario ve solo sus propias tareas).
- Validaciones más estrictas (por ejemplo, rango válido de lat/long).
- Tests automatizados (unitarios e integración) para la API.
