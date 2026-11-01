# Hermanos Jota — E-Commerce

![Estado TP1](https://img.shields.io/badge/TP%201%20(Sprints%201--2)-Completo-brightgreen?style=for-the-badge)
![Estado TP2](https://img.shields.io/badge/TP%202%20(Sprints%203--4)-Completo-brightgreen?style=for-the-badge)
![Estado TP3](https://img.shields.io/badge/TP%203%20(Sprints%205--6)-Completo-brightgreen?style=for-the-badge)

![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Node.js%20%7C%20Express%20%7C%20MongoDB-blue?style=for-the-badge)

Desarrollado como proyecto grupal para el **ITBA (Instituto Tecnológico de Buenos Aires)**.

> **Estado actual:** TP 1 (Sprints 1 y 2), TP 2 (Sprints 3 y 4) y TP 3 (Sprints 5 y 6) completados. El proyecto continúa en desarrollo y puede evolucionar con nuevas funcionalidades.

---

## Equipo

- Marcos Lopez
- Nehuén Peyrano
- Gastón Davalos

---

# Evolución del proyecto

## TP 1 — Sprints 1 y 2

### Sprint 1 — Estructura y diseño

Se desarrolló la primera versión visual del e-commerce utilizando:

- HTML5 semántico.
- CSS3.
- Diseño responsive.
- Flexbox y Grid.
- Identidad visual de la marca.
- Estructura de las principales páginas del sitio.

Se implementaron las páginas principales:

- Inicio.
- Catálogo.
- Detalle de producto.
- Contacto.

### Sprint 2 — Interactividad con JavaScript

Se incorporó JavaScript para convertir la interfaz estática en una aplicación interactiva.

Se implementaron:

- Catálogo dinámico.
- Arrays de objetos para representar productos.
- Renderizado dinámico.
- Buscador.
- Filtros por categoría.
- Detalle de productos.
- Carrito de compras.
- Sistema de favoritos.
- Formulario de contacto.
- Validaciones.
- Persistencia mediante `localStorage`.
- Simulación de carga asíncrona.
- Interacciones mediante eventos.

<badge>TP 1 completado</badge>

---

## TP 2 — Sprints 3 y 4

El proyecto evolucionó hacia una arquitectura separada entre frontend y backend.

### Frontend

Se incorporaron:

- React.
- Vite.
- React Router.
- Componentización.
- Hooks de React.
- Context API.
- Consumo de API mediante `fetch`.
- Estados de carga y error.
- Carrito de compras.
- Sistema de favoritos.
- Buscador.
- Formularios controlados.
- Persistencia mediante `localStorage`.

### Backend

Se incorporaron:

- Node.js.
- Express.
- Express Router.
- API REST.
- Controllers.
- Middlewares.
- Middleware global de logging.
- Middleware para rutas inexistentes.
- Manejo centralizado de errores.
- Organización del código por responsabilidades.

En esta etapa se comenzó a implementar la comunicación entre el frontend y el backend para consultar los productos mediante solicitudes HTTP.

<badge>TP 2 completado</badge>

---

## TP 3 — Sprints 5 y 6

En esta etapa se completó la integración entre frontend, backend y base de datos, incorporando un sistema de administración de productos.

### 1. Navegación y rutas dinámicas

Se implementó React Router DOM para gestionar las diferentes páginas de la aplicación.

Se incorporaron:

- Múltiples rutas para las distintas secciones.
- Rutas dinámicas para consultar productos mediante su identificador.
- Uso de `useParams()` para obtener parámetros de las rutas.
- Navegación programática mediante `useNavigate()`.
- Navegación entre el listado administrativo y los formularios de productos.

### 2. Administración de productos

Se desarrolló un panel administrativo que permite:

- Consultar el listado de productos.
- Crear nuevos productos.
- Editar productos existentes.
- Eliminar productos.

Se incorporaron formularios controlados mediante `useState`, con gestión de los valores ingresados y validaciones.

### 3. Persistencia en MongoDB Atlas

Se integró MongoDB Atlas mediante Mongoose para almacenar los productos de forma persistente.

Se implementaron:

- Conexión a MongoDB Atlas.
- Modelo `Product`.
- Esquema de validación.
- Operaciones CRUD mediante Mongoose.
- Controladores para gestionar las operaciones.
- Respuestas JSON desde la API REST.

### 4. Integración Full Stack

Se completó el recorrido de las operaciones entre las diferentes capas de la aplicación:

1. El usuario realiza una acción desde la interfaz de React.
2. El frontend envía una solicitud HTTP mediante `fetch`.
3. Express recibe la solicitud a través de sus rutas.
4. El controlador correspondiente procesa la operación.
5. Mongoose interactúa con MongoDB Atlas.
6. El backend devuelve una respuesta JSON.
7. React actualiza la interfaz según el resultado.

### 5. Pruebas realizadas

Se verificó el funcionamiento de las principales operaciones:

- Conexión del backend con MongoDB Atlas.
- Consulta de productos.
- Consulta individual mediante identificador.
- Creación de productos.
- Edición de productos.
- Eliminación de productos.
- Persistencia de los cambios al recargar la aplicación.

<badge>TP 3 completado</badge>

---

# Funcionalidades actuales

## Frontend

- Página de inicio.
- Catálogo de productos.
- Filtrado por categorías.
- Buscador de productos.
- Detalle individual de productos.
- Navegación mediante React Router.
- Rutas dinámicas.
- Carrito de compras.
- Contador de productos.
- Modificación de cantidades.
- Eliminación de productos.
- Sistema de favoritos.
- Contador de favoritos.
- Panel lateral del carrito.
- Panel lateral de favoritos.
- Formulario de contacto controlado.
- Validación de campos.
- Modal de política de privacidad.
- Mensajes de confirmación.
- Toasts de interacción.
- Persistencia del carrito y favoritos mediante `localStorage`.
- Panel administrativo de productos.
- Formularios controlados para crear y editar productos.

## Backend

La API REST permite realizar operaciones CRUD sobre los productos:

- Obtener todos los productos.
- Obtener un producto por su ID.
- Crear productos.
- Actualizar productos.
- Eliminar productos.

La información se almacena en MongoDB Atlas mediante Mongoose.

---

# Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura inicial |
| CSS3 | Diseño y responsive |
| JavaScript | Lógica de la primera versión |
| React | Desarrollo del frontend |
| Vite | Entorno de desarrollo y build |
| React Router | Navegación de la aplicación |
| Context API | Gestión de estados compartidos |
| Node.js | Runtime del backend |
| Express | Servidor y API REST |
| MongoDB Atlas | Base de datos en la nube |
| Mongoose | Modelado y persistencia de datos |
| Git | Control de versiones |
| GitHub | Repositorio y trabajo colaborativo |
| localStorage | Persistencia del carrito y favoritos |

---

# Modelo de datos

## Product

El modelo de productos utiliza los siguientes campos:

| Campo | Tipo | Descripción |
|---|---|---|
| `nombre` | String | Nombre del producto. Obligatorio. |
| `descripcion` | String | Descripción del producto. |
| `precio` | Number | Precio del producto. Obligatorio y no negativo. |
| `stock` | Number | Cantidad disponible. Por defecto, 0. |
| `imagenUrl` | String | URL o referencia de la imagen. |
| `categorias` | String | Categoría o categorías del producto. |
| `createdAt` | Date | Fecha de creación generada por Mongoose. |
| `updatedAt` | Date | Fecha de última actualización generada por Mongoose. |

El esquema utiliza `timestamps` de Mongoose para gestionar automáticamente las fechas de creación y actualización.

Las categorías disponibles en el formulario incluyen:

- `living`
- `habitacion`
- `cocina`
- `oficina`
- `casa`

---

# API REST

La API utiliza la ruta base:

```text
http://localhost:3000/api
```

## Endpoints de productos

| Método | Endpoint | Función |
|---|---|---|
| GET | `/api/productos` | Obtener todos los productos. |
| GET | `/api/productos/:id` | Obtener un producto por ID. |
| POST | `/api/productos` | Crear un producto. |
| PUT | `/api/productos/:id` | Actualizar un producto. |
| DELETE | `/api/productos/:id` | Eliminar un producto. |

### Ejemplos

Obtener todos los productos:

```http
GET /api/productos
```

Obtener un producto:

```http
GET /api/productos/ID_DEL_PRODUCTO
```

Crear un producto:

```http
POST /api/productos
Content-Type: application/json
```

Actualizar un producto:

```http
PUT /api/productos/ID_DEL_PRODUCTO
Content-Type: application/json
```

Eliminar un producto:

```http
DELETE /api/productos/ID_DEL_PRODUCTO
```

Las respuestas de la API se envían en formato JSON y utilizan códigos HTTP para indicar el resultado de las operaciones.

---

# Rutas del frontend

## Rutas públicas

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/catalogo` | Catálogo |
| `/producto/:id` | Detalle del producto |
| `/contacto` | Contacto |

También se mantienen rutas alternativas para la navegación de productos, según la configuración de React Router.

## Rutas administrativas

| Ruta | Función |
|---|---|
| `/admin/productos` | Listado y administración de productos. |
| `/admin/crear-producto` | Formulario para crear productos. |
| `/admin/editar-producto/:id` | Formulario para editar productos existentes. |

---

# Estructura del proyecto

```text
hermanos-jota/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   │
│   │   ├── controllers/
│   │   │
│   │   ├── data/
│   │   │
│   │   ├── middlewares/
│   │   │
│   │   ├── models/
│   │   │
│   │   ├── routes/
│   │   │
│   │   └── app.js
│   │
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   └── .gitignore
│
├── client/
│   ├── public/
│   │   └── assets/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── CartPanel.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   ├── FavoritesPanel.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── SearchPanel.jsx
│   │   │   └── Toast.jsx
│   │   │
│   │   ├── context/
│   │   │   └── CartContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Catalog.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── AdminProducts.jsx
│   │   │   └── AdminProductForm.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── styles/
│   │   │   └── unificado.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

> La estructura puede evolucionar a medida que se incorporen nuevas funcionalidades. Se muestra una organización representativa de las carpetas y archivos principales.

---

# Identidad de marca

El diseño sigue el Manual de Marca de Hermanos Jota.

| Color | Uso |
|---|---|
| `#A0522D` Siena Tostado | Color principal, títulos y CTAs |
| `#87A96B` Verde Salvia | Acento secundario y sustentabilidad |
| `#F5E6D3` Alabastro Cálido | Fondos |
| `#D4A437` Vara de Oro | Detalles premium y acciones principales |
| `#C47A6D` Rosa Polvoriento | Acentos y estados de error |

### Tipografía

- **Playfair Display:** títulos editoriales.
- **Inter:** cuerpo de texto e interfaz.

Las principales variables de diseño se encuentran centralizadas en:

```text
client/src/styles/unificado.css
```

---

# Configuración del entorno

Para ejecutar el proyecto es necesario contar con:

- Node.js.
- npm.
- Git.
- Una URI de conexión autorizada a MongoDB Atlas.

## Variables de entorno del backend

Crear un archivo `.env` dentro de `backend/`, tomando como referencia `.env.example`.

Contenido:

```env
MONGODB_URI=tu_uri_de_conexion_a_mongodb
PORT=3000
```

## Variables de entorno del frontend

Crear un archivo `.env` dentro de `client/`:

```env
VITE_API_URL=http://localhost:3000/api
```

> Los archivos `.env` contienen configuración local y no deben subirse al repositorio. Las credenciales de MongoDB deben mantenerse privadas. En MongoDB Atlas se deben autorizar únicamente las direcciones IP necesarias para el acceso.

---

# Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Marquitoslopez/trabajo-grupal-itba.git
```

Ingresar al proyecto:

```bash
cd trabajo-grupal-itba
```

---

# Ejecución

El frontend y el backend deben ejecutarse simultáneamente en dos terminales diferentes.

## Backend

Desde la carpeta del backend:

```bash
cd backend
npm install
npm run dev
```

El backend estará disponible en:

```text
http://localhost:3000
```

API de productos:

```text
http://localhost:3000/api/productos
```

Si la conexión es correcta, la terminal mostrará:

```text
MongoDB conectado correctamente
Servidor ejecutándose en http://localhost:3000
```

## Frontend

En otra terminal:

```bash
cd client
npm install
npm run dev
```

Vite mostrará la dirección local, normalmente:

```text
http://localhost:5173
```

Para utilizar correctamente el catálogo, los detalles y la administración de productos, el backend debe permanecer ejecutándose.

---

# Persistencia y alcance funcional

### Productos

Los productos se almacenan en MongoDB Atlas. Las operaciones administrativas de creación, consulta, edición y eliminación se realizan mediante la API REST.

### Carrito y favoritos

El carrito y los favoritos utilizan `localStorage` para conservar su información en el navegador.

Se almacenan identificadores de productos y las cantidades se representan mediante la cantidad de veces que aparece cada identificador en el carrito.

### Compras

El botón **Comprar carrito** realiza una simulación local. No procesa pagos ni registra órdenes reales en MongoDB.

---

# Objetivos de aprendizaje

El proyecto permite poner en práctica los siguientes conocimientos:

## Frontend

1. HTML5 semántico.
2. CSS3.
3. Diseño responsive.
4. Flexbox y Grid.
5. JavaScript.
6. Manipulación del DOM.
7. Arrays y objetos.
8. Programación asíncrona.
9. Eventos.
10. `localStorage`.
11. React.
12. Componentización.
13. Hooks.
14. React Router.
15. Context API.
16. Consumo de APIs REST.
17. Formularios controlados.

## Backend

18. Node.js.
19. Express.
20. Creación de APIs REST.
21. Express Router.
22. Controllers.
23. Middlewares.
24. Middleware de logging.
25. Manejo de rutas inexistentes.
26. Manejo centralizado de errores.
27. MongoDB Atlas.
28. Mongoose.
29. Modelado de datos.
30. Operaciones CRUD.
31. Variables de entorno.
32. Integración Full Stack.

## Trabajo colaborativo

33. Git.
34. GitHub.
35. Branches.
36. Merge.
37. Pull Requests.
38. Trabajo colaborativo.
39. Organización del desarrollo por sprints.

---

# Estado actual

**TP 1 — Sprints 1 y 2:** Completado.

**TP 2 — Sprints 3 y 4:** Completado.

**TP 3 — Sprints 5 y 6:** Completado.

El proyecto cuenta con una aplicación frontend en React, un backend desarrollado con Express y una base de datos MongoDB Atlas. Las operaciones CRUD de productos fueron probadas y verificadas mediante la interfaz de administración.

El desarrollo puede continuar con nuevas funcionalidades en futuras etapas.

---

# 🌐 Demo y despliegue

El proyecto cuenta con despliegue del frontend en Vercel y del backend en Render.

| Servicio | Plataforma | Enlace |
|---|---|---|
| Frontend | Vercel | [Ver aplicación](PEGAR_LINK_DE_VERCEL) |
| Backend | Render | [Ver API](PEGAR_LINK_DE_RENDER) |

**Tecnologías de despliegue:**
- Vercel: hosting del frontend desarrollado con React y Vite.
- Render: hosting del backend desarrollado con Node.js y Express.
