# 🪵 Hermanos Jota — E-Commerce

![Estado TP1](https://img.shields.io/badge/Estado-TP%201%20--%20Completo-brightgreen?style=for-the-badge)
![Estado TP2](https://img.shields.io/badge/Estado-TP%202%20--%20Completo-brightgreen?style=for-the-badge)
![Estado Sprints 3-4](https://img.shields.io/badge/Estado-Sprints%203%20--%204%20--%20En%20desarrollo-yellow?style=for-the-badge)

![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Node.js%20%7C%20Express-blue?style=for-the-badge)

E-commerce desarrollado para **Hermanos Jota**, una mueblería argentina especializada en piezas artesanales elaboradas con maderas nativas como algarrobo, quebracho y caldén, combinadas con cuero.

El proyecto comenzó como una interfaz web desarrollada con **HTML, CSS y JavaScript**, y evolucionó progresivamente hacia una arquitectura basada en **React + Vite en el frontend** y **Node.js + Express en el backend**.

El backend expone los productos mediante una **API REST**, mientras que el frontend consume dicha API para renderizar el catálogo y los detalles de cada producto.

Desarrollado como proyecto grupal para el **ITBA (Instituto Tecnológico de Buenos Aires)**.

> **Estado actual:** el proyecto se encuentra en desarrollo. Los Sprints 1 y 2 corresponden a la implementación inicial del e-commerce con HTML, CSS y JavaScript. Los Sprints 3 y 4 incorporan React, Vite, Node.js, Express y una API REST de productos. La migración y evolución del proyecto continúan en desarrollo.

---

## 👥 Equipo

- **Marcos Lopez**
- **Nehuén Peyrano**
- **Gastón Davalos**
- **Villarroel Giuliana**
- **Alegre Gonzalo**

---

# 🚀 Evolución del proyecto

## Sprint 1 — Estructura y diseño

Se desarrolló la primera versión visual del e-commerce utilizando:

- HTML5 semántico.
- CSS3.
- Diseño responsive.
- Flexbox y Grid.
- Identidad visual de la marca.
- Estructura de las principales páginas del sitio.

Se implementaron las principales páginas:

- Inicio.
- Catálogo.
- Detalle de producto.
- Contacto.

---

## Sprint 2 — Interactividad con JavaScript

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

---

## Sprints 3 y 4 — React + Backend

El proyecto evoluciona hacia una arquitectura moderna basada en un frontend desarrollado con React y un backend desarrollado con Node.js y Express.

### Frontend

Se incorporan:

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

Se incorpora:

- Node.js.
- Express.
- Express Router.
- API REST.
- Controllers.
- Middleware global de logging.
- Middleware para rutas inexistentes.
- Manejador centralizado de errores.
- Archivo local de productos.
- Endpoints para consulta de productos.

---

# 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura inicial |
| CSS3 | Diseño y responsive |
| JavaScript | Lógica de la primera versión |
| React | Desarrollo del frontend actual |
| Vite | Entorno de desarrollo y build |
| React Router | Navegación de la aplicación |
| Node.js | Runtime del backend |
| Express | Servidor y API REST |
| Git | Control de versiones |
| GitHub | Repositorio y trabajo colaborativo |
| localStorage | Persistencia del carrito y favoritos |

---

# ✨ Funcionalidades

## Frontend

- Página de inicio.
- Catálogo de productos.
- Filtrado por categorías.
- Buscador de productos.
- Detalle individual de productos.
- Carrito de compras.
- Contador de productos.
- Modificación de cantidades.
- Eliminación de productos.
- Sistema de favoritos.
- Contador de favoritos.
- Panel lateral de carrito.
- Panel lateral de favoritos.
- Buscador global.
- Formulario de contacto controlado.
- Validación de campos.
- Modal de política de privacidad.
- Mensajes de confirmación.
- Toasts de interacción.
- Navegación mediante React Router.
- Persistencia del carrito mediante `localStorage`.
- Persistencia de favoritos mediante `localStorage`.

## Backend

La API permite consultar los productos mediante los siguientes endpoints:

### Obtener todos los productos

```http
GET /api/productos
```

Devuelve el listado completo de productos en formato JSON.

### Obtener un producto

```http
GET /api/productos/:id
```

Devuelve el producto correspondiente al ID indicado.

Si el producto no existe, la API devuelve:

```http
404 Not Found
```

---

# 📁 Estructura del proyecto

```text
hermanos-jota/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │
│   │   ├── data/
│   │   │
│   │   ├── middlewares/
│   │   │
│   │   ├── routes/
│   │   │
│   │   └── app.js
│   │
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
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
│   │   │   └── Contact.jsx
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

> La estructura puede continuar evolucionando a medida que se incorporen nuevas funcionalidades durante los próximos sprints.

---

# 🎨 Identidad de marca

El diseño sigue el Manual de Marca de Hermanos Jota:

| Color | Uso |
|---|---|
| `#A0522D` Siena Tostado | Color principal, títulos y CTAs |
| `#87A96B` Verde Salvia | Acento secundario y sustentabilidad |
| `#F5E6D3` Alabastro Cálido | Fondos |
| `#D4A437` Vara de Oro | Detalles premium y acciones principales |
| `#C47A6D` Rosa Polvoriento | Acentos y estados de error |

### Tipografía

- **Playfair Display** para títulos editoriales.
- **Inter** para cuerpo de texto e interfaz.

Las principales variables de diseño se encuentran centralizadas en:

```text
client/src/styles/unificado.css
```

---

# ⚙️ Requisitos

Para ejecutar el proyecto se necesita:

- Node.js
- npm
- Git

Se recomienda utilizar una versión reciente de Node.js.

---

# 📥 Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Marquitoslopez/trabajo-grupal-itba.git
```

Ingresar al proyecto:

```bash
cd trabajo-grupal-itba
```

---

# ▶️ Ejecución

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

---

## Frontend

En otra terminal:

```bash
cd client
npm install
npm run dev
```

Vite mostrará en la terminal la URL correspondiente, normalmente:

```text
http://localhost:5173
```

> Para utilizar correctamente el catálogo y los detalles de productos, el backend debe estar ejecutándose simultáneamente.

---

# 🔌 API

## Productos

### Obtener todos los productos

```http
GET /api/productos
```

### Obtener un producto por ID

```http
GET /api/productos/:id
```

Ejemplo:

```text
http://localhost:3000/api/productos
```

La API devuelve la información de los productos en formato JSON.

---

# 🧩 Arquitectura

La aplicación se divide en dos partes principales:

```text
┌───────────────────────────────┐
│           FRONTEND            │
│        React + Vite           │
│                               │
│ Components / Pages / Context  │
│ Services / React Router       │
└───────────────┬───────────────┘
                │
                │ HTTP / REST
                ▼
┌───────────────────────────────┐
│           BACKEND             │
│       Node.js + Express       │
│                               │
│ Routes / Controllers          │
│ Middlewares / Data            │
└───────────────────────────────┘
```

El frontend obtiene los productos mediante solicitudes HTTP al backend.

Por ejemplo:

```text
React
  ↓
GET /api/productos
  ↓
Express
  ↓
Data de productos
  ↓
JSON
  ↓
React
  ↓
Renderizado del catálogo
```

---

# 🌿 Trabajo colaborativo

El desarrollo se realiza mediante **Git y GitHub**, utilizando ramas para separar las distintas etapas y funcionalidades.

Las funcionalidades se desarrollan en ramas independientes y posteriormente se integran mediante **merge** o **Pull Requests**.

Ejemplo:

```text
main
 │
 ├── Sprint 1-2
 │
 ├── backend-sprint3-4
 │
 └── ramas de desarrollo individuales
```

También se utilizan ramas temporales para revisión antes de integrar cambios a las ramas principales.

---

# 📚 Objetivos de aprendizaje

El proyecto permite poner en práctica:

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
27. Organización del código por responsabilidades.

## Trabajo colaborativo

28. Git.
29. GitHub.
30. Branches.
31. Merge.
32. Pull Requests.
33. Trabajo colaborativo.
34. Organización del desarrollo por sprints.

---

# 📌 Estado actual

El proyecto se encuentra **en desarrollo activo**.

### Completado

- Sprint 1.
- Sprint 2.
- Backend inicial de productos.
- API REST de productos.
- Migración progresiva del frontend a React.
- Navegación con React Router.
- Carrito de compras.
- Sistema de favoritos.
- Buscador.
- Formulario de contacto.
- Validaciones.
- Persistencia mediante `localStorage`.
- Componentización del frontend.

### En desarrollo

- Finalización de la migración completa a React.
- Nuevas funcionalidades del e-commerce.
- Mejoras y validaciones del backend.
- Integración de futuras funcionalidades según los requisitos de los próximos sprints.

---

# 📄 Licencia

Proyecto académico desarrollado para el **ITBA (Instituto Tecnológico de Buenos Aires)**.

Uso educativo y académico.