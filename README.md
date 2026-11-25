
# Hermanos Jota — E-Commerce

![Estado TP1](https://img.shields.io/badge/TP%201%20(Sprints%201--2)-Completo-brightgreen?style=for-the-badge)
![Estado TP2](https://img.shields.io/badge/TP%202%20(Sprints%203--4)-Completo-brightgreen?style=for-the-badge)
![Estado TP3](https://img.shields.io/badge/TP%203%20(Sprints%205--6)-Completo-brightgreen?style=for-the-badge)
![Estado TP4](https://img.shields.io/badge/TP%204%20(Sprints%207--8)-En%20desarrollo-orange?style=for-the-badge)

![Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)

E-commerce de muebles artesanales desarrollado como proyecto grupal para el **ITBA (Instituto Tecnológico de Buenos Aires)**.

El proyecto utiliza una arquitectura MERN, con React en el frontend, Node.js y Express en el backend y MongoDB como sistema de persistencia.

> **Estado actual:** TP 1, TP 2 y TP 3 completados. TP 4 en desarrollo, con autenticación, autorización por roles y gestión de pedidos implementadas en el backend.

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

**TP 1 completado.**

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

**TP 2 completado.**

---

## TP 3 — Sprints 5 y 6

En esta etapa se completó la integración entre frontend, backend y base de datos, incorporando un sistema de administración de productos.

### 1. Navegación y rutas dinámicas

Se implementó React Router DOM para gestionar las diferentes páginas de la aplicación.

Se incorporaron:

- Múltiples rutas para las distintas páginas.
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

**TP 3 completado.**

---

# Funcionalidades

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
- Mensajes de confirmación.
- Notificaciones mediante Toast.
- Persistencia del carrito y favoritos mediante `localStorage`.
- Panel administrativo de productos.
- Formularios para crear y editar productos.
- Registro e inicio de sesión.
- Persistencia y validación de sesión.
- Perfil de usuario.
- Página de consulta de pedidos.
- Rutas protegidas para usuarios autenticados.

## Backend

### Productos

- Obtener todos los productos.
- Obtener un producto por su ID.
- Crear productos.
- Actualizar productos.
- Eliminar productos.
- Validación de datos.
- Control de permisos administrativos.

### Autenticación y usuarios

- Registro de usuarios.
- Inicio de sesión.
- Encriptación de contraseñas mediante bcrypt.
- Generación y validación de JWT.
- Consulta del perfil autenticado.
- Autorización basada en roles.

### Pedidos

- Registro de pedidos asociados al usuario autenticado.
- Validación de productos y cantidades.
- Obtención de precios directamente desde MongoDB.
- Validación de stock disponible.
- Descuento de stock mediante transacciones.
- Consulta del historial de pedidos del usuario.
- Cálculo y validación de subtotales y totales.

---

# Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura |
| CSS3 | Diseño y responsive |
| JavaScript | Lógica de la aplicación |
| React | Desarrollo del frontend |
| Vite | Entorno de desarrollo y build |
| React Router | Navegación |
| Context API | Gestión de estados compartidos |
| Node.js | Runtime del backend |
| Express | Servidor y API REST |
| MongoDB Atlas | Base de datos en la nube |
| Mongoose | Modelado y persistencia |
| bcryptjs | Hash de contraseñas |
| JSON Web Token | Autenticación |
| Git | Control de versiones |
| GitHub | Repositorio y trabajo colaborativo |
| localStorage | Persistencia local del navegador |
| Vercel | Despliegue del frontend |
| Render | Despliegue del backend |

---

# Arquitectura del proyecto

La aplicación utiliza una arquitectura cliente-servidor:

```text
┌─────────────────────────────┐
│          FRONTEND           │
│                             │
│       React + Vite          │
│                             │
│  Components / Pages         │
│  Context API                │
│  React Router               │
│  Services                   │
└──────────────┬──────────────┘
               │
               │ HTTP / JSON
               │ REST API
               ▼
┌─────────────────────────────┐
│           BACKEND           │
│                             │
│       Node.js + Express     │
│                             │
│  Routes                     │
│  Middlewares                │
│  Controllers                │
│  Models                     │
│  JWT / bcrypt               │
└──────────────┬──────────────┘
               │
               │ Mongoose
               ▼
┌─────────────────────────────┐
│         DATABASE            │
│                             │
│        MongoDB Atlas        │
│                             │
│  Products                   │
│  Users                      │
│  Orders                     │
└─────────────────────────────┘
```

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
| `categorias` | String | Categoría del producto. |
| `createdAt` | Date | Fecha de creación. |
| `updatedAt` | Date | Fecha de última actualización. |

El esquema utiliza `timestamps` de Mongoose para gestionar automáticamente las fechas de creación y actualización.

## User

El modelo de usuarios utiliza los siguientes campos:

| Campo | Tipo | Descripción |
|---|---|---|
| `nombre` | String | Nombre del usuario. Obligatorio. |
| `email` | String | Correo electrónico único. |
| `password` | String | Contraseña almacenada mediante hash. |
| `rol` | String | Rol del usuario: `usuario` o `admin`. |
| `createdAt` | Date | Fecha de creación. |
| `updatedAt` | Date | Fecha de última actualización. |

El rol predeterminado es `usuario`. La contraseña no se incluye en las consultas habituales del modelo.

## Order

El modelo de pedidos utiliza los siguientes campos:

| Campo | Tipo | Descripción |
|---|---|---|
| `usuario` | ObjectId | Referencia al usuario que realizó el pedido. |
| `items` | Array | Productos incluidos en el pedido. |
| `items.producto` | ObjectId | Referencia al producto. |
| `items.nombre` | String | Nombre del producto al momento de la compra. |
| `items.precioUnitario` | Number | Precio unitario registrado. |
| `items.cantidad` | Number | Cantidad solicitada. |
| `items.subtotal` | Number | Subtotal de cada producto. |
| `total` | Number | Importe total del pedido. |
| `estado` | String | Estado del pedido. |
| `createdAt` | Date | Fecha de creación. |
| `updatedAt` | Date | Fecha de última actualización. |

Los estados disponibles son:

- `pendiente`
- `confirmado`
- `cancelado`

El modelo valida que el total coincida con la suma de los subtotales.

---

# API REST

La API utiliza la siguiente ruta base:

```text
http://localhost:3000/api
```

## Productos

| Método | Endpoint | Función | Acceso |
|---|---|---|---|
| GET | `/productos` | Obtener todos los productos. | Público |
| GET | `/productos/:id` | Obtener un producto por ID. | Público |
| POST | `/productos` | Crear un producto. | Administrador |
| PUT | `/productos/:id` | Actualizar un producto. | Administrador |
| DELETE | `/productos/:id` | Eliminar un producto. | Administrador |

## Autenticación

| Método | Endpoint | Función | Acceso |
|---|---|---|---|
| POST | `/auth/registro` | Registrar un usuario. | Público |
| POST | `/auth/login` | Iniciar sesión. | Público |
| GET | `/auth/me` | Obtener el perfil del usuario autenticado. | Autenticado |

### Registro

```http
POST /api/auth/registro
Content-Type: application/json
```

Permite crear una cuenta. Las contraseñas se almacenan mediante hash con `bcryptjs`.

Los usuarios nuevos reciben el rol `usuario` por defecto.

### Inicio de sesión

```http
POST /api/auth/login
Content-Type: application/json
```

Valida las credenciales y devuelve un JWT para autenticar las siguientes solicitudes.

### Perfil autenticado

```http
GET /api/auth/me
Authorization: Bearer <token>
```

Devuelve los datos del usuario correspondiente al token enviado.

## Pedidos

| Método | Endpoint | Función | Acceso |
|---|---|---|---|
| POST | `/pedidos` | Registrar un pedido. | Autenticado |
| GET | `/pedidos/mis-pedidos` | Consultar los pedidos propios. | Autenticado |

### Registrar un pedido

```http
POST /api/pedidos
Authorization: Bearer <token>
Content-Type: application/json
```

Ejemplo del cuerpo de la solicitud:

```json
{
  "items": [
    {
      "productId": "ID_DEL_PRODUCTO",
      "quantity": 2
    },
    {
      "productId": "ID_DE_OTRO_PRODUCTO",
      "quantity": 1
    }
  ]
}
```

El backend:

1. Verifica que exista un usuario autenticado.
2. Valida los identificadores y las cantidades recibidas.
3. Consulta los productos en MongoDB.
4. Obtiene los precios desde la base de datos, sin confiar en los valores enviados por el cliente.
5. Comprueba que exista stock suficiente.
6. Calcula subtotales y total.
7. Descuenta el stock disponible.
8. Registra el pedido asociado al usuario autenticado.

Las operaciones de creación del pedido y actualización del stock se realizan dentro de una transacción de MongoDB para mantener la consistencia de los datos.

### Consultar mis pedidos

```http
GET /api/pedidos/mis-pedidos
Authorization: Bearer <token>
```

Devuelve únicamente los pedidos correspondientes al usuario autenticado.

## Autorización mediante JWT

Los endpoints protegidos requieren el siguiente encabezado:

```http
Authorization: Bearer <token>
```

La API utiliza middlewares para verificar la identidad del usuario y controlar los permisos de acceso.

## Códigos HTTP

| Código | Significado |
|---|---|
| 200 | Solicitud procesada correctamente. |
| 201 | Recurso creado correctamente. |
| 400 | Solicitud o datos inválidos. |
| 401 | Usuario no autenticado o token inválido. |
| 403 | Usuario autenticado sin permisos suficientes. |
| 404 | Recurso no encontrado. |
| 409 | Conflicto con un recurso existente. |
| 500 | Error interno del servidor. |

---

# Autenticación y autorización

El sistema diferencia dos roles:

### Usuario

- Consultar el catálogo.
- Consultar los detalles de productos.
- Realizar operaciones de compra mediante los endpoints de pedidos.
- Consultar su perfil.
- Consultar sus propios pedidos.

### Administrador

Cuenta con los permisos de un usuario y, además, puede:

- Crear productos.
- Editar productos.
- Eliminar productos.

La autorización administrativa se verifica directamente en el backend mediante el middleware `verificarAdmin`.

La asignación del rol no se realiza desde el formulario público de registro. Los nuevos usuarios se crean con el rol `usuario` por defecto.

---

# Rutas del frontend

## Rutas públicas

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/catalogo` | Catálogo |
| `/productos` | Catálogo (ruta alternativa) |
| `/producto/:id` | Detalle del producto |
| `/contacto` | Contacto |
| `/login` | Inicio de sesión |
| `/registro` | Registro de usuario |

## Rutas protegidas

| Ruta | Página |
|---|---|
| `/perfil` | Perfil del usuario |
| `/mis-pedidos` | Historial de pedidos |
| `/admin/productos` | Listado administrativo |
| `/admin/crear-producto` | Crear producto |
| `/admin/editar-producto/:id` | Editar producto |

El componente `ProtectedRoute` controla el acceso a las rutas protegidas y redirige a `/login` cuando no existe una sesión válida.

Los permisos administrativos también se controlan desde el backend, independientemente de las restricciones visuales del frontend.

---

# Context API y estado global

Se utiliza Context API para compartir información entre los componentes de la aplicación.

## AuthContext

Centraliza la información de autenticación:

- Usuario autenticado.
- Token JWT.
- Estado de carga de sesión.
- Registro.
- Inicio de sesión.
- Cierre de sesión.
- Validación de sesión al cargar la aplicación.

El contexto consulta `/api/auth/me` para comprobar que el token almacenado siga siendo válido.

## CartContext

Centraliza el estado del carrito y los favoritos.

Permite compartir la información entre componentes sin necesidad de propagarla manualmente a través de múltiples niveles.

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
│   │   │   ├── auth.controller.js
│   │   │   ├── pedidos.controller.js
│   │   │   └── productos.controller.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── admin.middleware.js
│   │   │   ├── auth.middleware.js
│   │   │   ├── errorHandler.js
│   │   │   ├── logger.js
│   │   │   └── notFound.js
│   │   │
│   │   ├── models/
│   │   │   ├── Order.js
│   │   │   ├── Product.js
│   │   │   └── User.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── pedidos.routes.js
│   │   │   └── productos.routes.js
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
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
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

La estructura puede evolucionar a medida que se incorporen nuevas funcionalidades.

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

```env
MONGODB_URI=tu_uri_de_conexion_a_mongodb
PORT=3000
JWT_SECRET=una_clave_segura_de_al_menos_32_caracteres
CLIENT_URL=http://localhost:5173
```

`CLIENT_URL` permite configurar los orígenes autorizados para las solicitudes CORS. Se pueden indicar varios separados por comas.

## Variables de entorno del frontend

Crear un archivo `.env` dentro de `client/`:

```env
VITE_API_URL=http://localhost:3000/api
```

> Los archivos `.env` contienen configuración local y no deben subirse al repositorio. Las credenciales de MongoDB y la clave JWT deben mantenerse privadas.

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

# Ejecución local

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

Para utilizar correctamente el catálogo, la autenticación y las operaciones administrativas, el backend debe permanecer ejecutándose.

---

# Persistencia y alcance funcional

### Productos

Los productos se almacenan en MongoDB Atlas. Las operaciones de creación, consulta, edición y eliminación se realizan mediante la API REST.

### Usuarios

Los usuarios se almacenan en MongoDB Atlas. Las contraseñas se guardan mediante hash y la autenticación se gestiona con JWT.

### Carrito y favoritos

El carrito y los favoritos utilizan `localStorage` para conservar su información en el navegador.

### Pedidos

El backend dispone de endpoints para registrar pedidos asociados al usuario autenticado, validar stock, calcular importes y descontar existencias mediante transacciones.

La integración completa de estos endpoints con el flujo de checkout del frontend forma parte del trabajo de desarrollo de Sprint 7–8.

El proyecto no procesa pagos reales.

---

# Objetivos de aprendizaje

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
18. Autenticación en aplicaciones React.
19. Protección de rutas.

## Backend

20. Node.js.
21. Express.
22. Creación de APIs REST.
23. Express Router.
24. Controllers.
25. Middlewares.
26. Manejo centralizado de errores.
27. MongoDB Atlas.
28. Mongoose.
29. Modelado de datos.
30. Operaciones CRUD.
31. Variables de entorno.
32. bcrypt.
33. JSON Web Token.
34. Autenticación y autorización.
35. Control de acceso basado en roles.
36. Transacciones de MongoDB.
37. Validación de datos y stock.
38. Integración Full Stack.

## Trabajo colaborativo

39. Git.
40. GitHub.
41. Branches.
42. Merge.
43. Pull Requests.
44. Trabajo colaborativo.
45. Organización del desarrollo por sprints.

---

# Estado del proyecto

| Entrega | Estado |
|---|---|
| TP 1 — Sprints 1 y 2 | Completado |
| TP 2 — Sprints 3 y 4 | Completado |
| TP 3 — Sprints 5 y 6 | Completado |
| TP 4 — Sprints 7 y 8 | En desarrollo |

El proyecto cuenta con una aplicación frontend desarrollada en React, un backend desarrollado con Express y una base de datos MongoDB Atlas.

Durante Sprint 7–8 se incorporaron autenticación de usuarios, autorización por roles, protección de endpoints y gestión de pedidos en el backend.

Continúa el trabajo de integración entre el checkout, el carrito y el historial de pedidos del frontend, junto con las verificaciones finales de despliegue.

---

# Demo y despliegue

El proyecto cuenta con despliegues del frontend y backend.

| Servicio | Plataforma | Enlace |
|---|---|---|
| Frontend | Vercel | [Ver aplicación](https://trabajo-grupal-itba-6wgf.vercel.app/) |
| Backend | Render | [Ver API](https://trabajo-grupal-itba.onrender.com) |

**Tecnologías de despliegue:**

- Vercel: hosting del frontend desarrollado con React y Vite.
- Render: hosting del backend desarrollado con Node.js y Express.

Las variables de entorno de producción deben configurarse desde los respectivos paneles de cada plataforma.

---
