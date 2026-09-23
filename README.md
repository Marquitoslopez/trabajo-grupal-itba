# 🪵 Hermanos Jota — E-Commerce

![Estado](https://img.shields.io/badge/Estado-TP%201%20--%20Completo-brightgreen?style=for-the-badge)
![Estado](https://img.shields.io/badge/Estado-TP%202%20--%20En%20desarrollo-yellow?style=for-the-badge)

![Stack](https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20JavaScript%20%7C%20Node.js%20%7C%20Express-blue?style=for-the-badge)

E-commerce para **Hermanos Jota**, mueblería argentina de piezas artesanales elaboradas con maderas nativas como algarrobo, quebracho y caldén, combinadas con cuero.

El proyecto comenzó como una fachada de cliente desarrollada con **HTML, CSS y JavaScript**, incorporando posteriormente un **backend desarrollado con Node.js y Express** para exponer los productos mediante una API REST.

Desarrollado como proyecto en equipo para el **ITBA (Instituto Tecnológico de Buenos Aires)**.

> 📌 **Estado actual:** el proyecto se encuentra en desarrollo. Los Sprints 1 y 2 corresponden a la fachada inicial del e-commerce, mientras que los Sprints 3 y 4 incorporan la arquitectura del backend y la API de productos. La migración completa del frontend a React y futuras funcionalidades continúan en desarrollo.

---

## 👥 Equipo

- _Marcos Lopez_
- _Nehuén Peyrano_
- _Gastón Davalos_
- _Villarroel Giuliana_
- _Alegre Gonzalo_

---

## 🎯 Objetivos de aprendizaje

A lo largo de los distintos sprints, el proyecto permite poner en práctica:

### Frontend - HTML5 · CSS3 · JavaScript

1. Estructuración de sitios complejos utilizando **HTML5 semántico**.
2. Diseño responsivo con **CSS3**, Flexbox y Grid.
3. Lógica de programación con **JavaScript**.
4. Manipulación del **DOM** para crear y modificar contenido dinámicamente.
5. Gestión de colecciones de datos mediante **arrays de objetos**.
6. Simulación de carga de datos **asíncrona**.
7. Interacción con el usuario mediante **eventos y `addEventListener`**.
8. Persistencia de información en el navegador mediante **localStorage**.

### Implementado

- Estructura de las páginas principales.
- Diseño responsive.
- Catálogo de productos.
- Productos mediante arrays de objetos.
- Generación dinámica de contenido.
- Buscador y filtros.
- Detalle de productos.
- Carrito de compras.
- Sistema de favoritos.
- Formulario de contacto y validaciones.
- Persistencia mediante `localStorage`.
- Carga asíncrona simulada.

### Backend - Node.js · Express

9. Desarrollo de un servidor utilizando **Node.js y Express**.
10. Creación de una **API REST**.
11. Organización del backend mediante **controllers, routes, middlewares y data**.
12. Implementación de endpoints para consultar productos.
13. Implementación de **middleware global de logging**.
14. Manejo de rutas inexistentes mediante middleware **404**.
15. Implementación de un **manejador centralizado de errores**.

### Trabajo colaborativo

16. Uso de **Git y GitHub** para el control de versiones.
17. Trabajo mediante **ramas y desarrollo colaborativo**.

---

## 🗂️ Estructura del proyecto

```text
hermanos-jota/
│
├── index.html
│
├── pages/
│   ├── catalogo.html
│   ├── contacto.html
│   └── producto.html
│
├── scripts/
│   ├── buscador.js
│   ├── carrito.js
│   ├── catalogo-data.js
│   ├── catalogo.js
│   ├── contacto.js
│   ├── favoritos.js
│   ├── index.js
│   └── producto.js
│
├── styles/
│   └── unificado.css
│
├── assets/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   └── app.js
│   │
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .gitignore
│
└── README.md


```

---

## 🎨 Identidad de marca

El diseño sigue el Manual de Marca de Hermanos Jota:

| Color                      | Uso                                |
| -------------------------- | ---------------------------------- |
| `#A0522D` Siena Tostado    | Color principal, títulos, CTAs     |
| `#87A96B` Verde Salvia     | Acento secundario, sustentabilidad |
| `#F5E6D3` Alabastro Cálido | Fondos                             |
| `#D4A437` Vara de Oro      | Detalles premium, botón "Enviar"   |
| `#C47A6D` Rosa Polvoriento | Acentos suaves, estados de error   |

**Tipografía:** [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) para títulos editoriales, [Inter](https://fonts.google.com/specimen/Inter) para cuerpo de texto e interfaz. Todas las variables de diseño (color, tipografía, espaciado, radios) están centralizadas en `styles/unificado.css`.

🚀 Ejecución - Backend

```text
cd backend
npm install
npm run dev
```

Servidor:

```text
http://localhost:3000
```

API:

```text
http://localhost:3000/api/productos
```
