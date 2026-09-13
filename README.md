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

- *Marcos Lopez*
- *Nehuén Peyrano*
- *Gastón Davalos*
- *Villarroel Giuliana*
- *Alegre Gonzalo*

---

## 🎯 Objetivos de aprendizaje

A lo largo de los distintos sprints, el proyecto permite poner en práctica:

### Frontend

1. Estructuración de sitios complejos utilizando **HTML5 semántico**.
2. Diseño responsivo con **CSS3**, Flexbox y Grid.
3. Lógica de programación con **JavaScript**.
4. Manipulación del **DOM** para crear y modificar contenido dinámicamente.
5. Gestión de colecciones de datos mediante **arrays de objetos**.
6. Simulación de carga de datos **asíncrona**.
7. Interacción con el usuario mediante **eventos y `addEventListener`**.
8. Persistencia de información en el navegador mediante **localStorage**.

### Backend

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
├── index.html                    # Página de inicio
│
├── pages/
│   ├── catalogo.html             # Catálogo de productos
│   ├── contacto.html             # Formulario de contacto
│   └── producto.html             # Detalle de producto
│
├── scripts/
│   ├── buscador.js               # Buscador reutilizable
│   ├── carrito.js                # Lógica del carrito
│   ├── catalogo-data.js          # Datos del catálogo inicial
│   ├── catalogo.js               # Lógica del catálogo
│   ├── contacto.js               # Validación del formulario
│   ├── favoritos.js              # Gestión de productos favoritos
│   ├── index.js                  # Lógica de la página de inicio
│   └── producto.js               # Lógica del detalle de producto
│
├── styles/
│   └── unificado.css             # Estilos generales y componentes
│
├── assets/                       # Imágenes, iconos y recursos gráficos
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── productos.controller.js
│   │   │
│   │   ├── data/
│   │   │   └── productos.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── logger.js
│   │   │   ├── notFound.js
│   │   │   └── errorHandler.js
│   │   │
│   │   ├── routes/
│   │   │   └── productos.routes.js
│   │   │
│   │   └── app.js
│   │
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .gitignore
│
└── README.md                    # Documentación del proyecto