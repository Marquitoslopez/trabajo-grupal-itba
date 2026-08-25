# 🪵 Hermanos Jota — E-Commerce

![Estado](https://img.shields.io/badge/Estado-En%20Curso-yellow?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)

Fachada e-commerce para **Hermanos Jota**, mueblería argentina de piezas artesanales en maderas nativas (algarrobo, quebracho, caldén) y cueros. El proyecto simula una experiencia de compra completa —catálogo, detalle de producto, carrito y contacto— **sin conexión a backend**: todo el catálogo se gestiona en el cliente con JavaScript.

Desarrollado como proyecto en equipo para el **ITBA** (Instituto Tecnológico de Buenos Aires).

> 📌 **Alcance de esta entrega:** este README describe únicamente lo construido en **Sprint 1 y 2** (la fachada de cliente). El panel de administración y la persistencia real en backend son parte de una etapa posterior del proyecto y todavía no están implementados.

---

## 👥 Equipo

| Integrante |
|---|---|
| _Marcos Lopez_ |
| _Nehuén Peyrano_ |
| _Gastón Davalos_ |
| _Villarroel Giuliana_ |
| _Alegre Gonzalo_ |

---

## 🎯 Objetivos de aprendizaje

Este sprint pone en práctica:

1. Estructurar un sitio complejo con **HTML5 semántico**.
2. Estilos y diseño responsivo con **CSS3**, mobile-first, dominando Box Model y Flexbox/Grid.
3. Lógica de programación con **JavaScript** para una experiencia dinámica.
4. Manipulación del **DOM** para crear y modificar contenido.
5. Gestión de colecciones de datos con **arrays de objetos**.
6. Simulación de una petición de datos **asíncrona** para cargar el catálogo.
7. Interacción del usuario mediante **eventos** (`addEventListener`).
8. Trabajo colaborativo con **Git y GitHub**.

---

## 🗂️ Estructura del proyecto

```
hermanos-jota/
├── index.html                 # Página de inicio
├── pages/
│   ├── catalogo.html          # Catálogo de productos
│   ├── producto.html          # Detalle de producto
│   └── contacto.html          # Formulario de contacto
│
├── styles/
│   ├── general.css            # Variables de marca, reset, tipografía, botones
│   ├── header.css             # Header + menú hamburguesa (mobile first)
│   ├── footer.css             # Footer (mobile first)
│   ├── components.css         # Componentes compartidos (product-card, etc.)
│   ├── index.css               # Estilos exclusivos de la home
│   ├── catalogo.css            # Estilos exclusivos del catálogo
│   ├── producto.css            # Estilos exclusivos del detalle de producto
│   └── contacto.css            # Estilos exclusivos de contacto
│
├── scripts/
│   ├── productos.js            # ⏳ Array de objetos con el catálogo (pendiente)
│   ├── catalogo.js             # ⏳ Render dinámico + carga asíncrona + carrito (pendiente)
│   └── contacto.js             # Validación del formulario + modal de privacidad
│
└── assets/
    ├── logo.svg
    └── *.png                   # Fotos de producto y banners
```

---

## 🎨 Identidad de marca

El diseño sigue el Manual de Marca de Hermanos Jota:

| Color | Uso |
|---|---|
| `#A0522D` Siena Tostado | Color principal, títulos, CTAs |
| `#87A96B` Verde Salvia | Acento secundario, sustentabilidad |
| `#F5E6D3` Alabastro Cálido | Fondos |
| `#D4A437` Vara de Oro | Detalles premium, botón "Enviar" |
| `#C47A6D` Rosa Polvoriento | Acentos suaves, estados de error |

**Tipografía:** [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) para títulos editoriales, [Inter](https://fonts.google.com/specimen/Inter) para cuerpo de texto e interfaz. Todas las variables de diseño (color, tipografía, espaciado, radios) están centralizadas en `styles/general.css`.

---

## 🚀 Cómo ver el proyecto

No requiere instalación ni build: es HTML/CSS/JS puro.

1. Cloná el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd hermanos-jota
   ```
2. Abrí `index.html` directamente en el navegador, **o** serví la carpeta con un servidor local (recomendado, para que las rutas relativas de `pages/` y `assets/` funcionen igual que en producción):
   ```bash
   # con la extensión Live Server de VS Code, o:
   npx serve .
   ```

---

## 📄 Licencia / uso

Proyecto académico desarrollado en el marco de la carrera en el **ITBA**. Todo el contenido de marca (nombre, logo, textos) es ficticio y pertenece al ejercicio del curso.
