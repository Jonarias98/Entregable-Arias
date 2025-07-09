# Vans Store - Simulador de Ecommerce

Este proyecto es un simulador interactivo de una tienda online de zapatillas **Vans**, desarrollado como entrega final del curso de JavaScript en Coderhouse.

## 📌 Descripción

La aplicación simula el circuito completo de una compra online en un ecommerce real. El usuario puede:

- Ver un listado de productos obtenidos desde un archivo `.json`
- Agregar productos al carrito
- Visualizar el total de la compra
- Eliminar productos del carrito o vaciarlo completamente
- Confirmar la compra y recibir un mensaje de agradecimiento
- Retomar una compra interrumpida gracias al uso de `localStorage`

## 🧠 Tecnologías utilizadas

- HTML5  
- CSS3  
- JavaScript (ES6+)  
- Librería externa: [SweetAlert2](https://sweetalert2.github.io/)  
- Almacenamiento local con `localStorage`

## 🗂 Estructura del proyecto

front/
├── index.html
├── index.js
├── productos.js
├── productos.json
├── style.css
├── package.json
└── readme.md


> 📁 `back/` contiene archivos opcionales de entorno (`node_modules`, etc.), pero no es necesario para correr el simulador.

## 🚀 Cómo usarlo

1. **Abrí el archivo `index.html`** con doble clic o, idealmente, con extensión como **Live Server** si usás VS Code.  
2. El sistema cargará los productos dinámicamente desde `productos.json`.  
3. Interactuá con los botones para agregar productos, ver el carrito y realizar la compra.

> ⚠️ El proyecto debe ejecutarse en un entorno que permita **cargar archivos locales**. Si abrís el HTML directamente y los productos no cargan, usá Live Server o similar.

## ✅ Requisitos cumplidos (según consigna)

- Estructura con carpetas separadas para HTML, CSS, JS y JSON  
- Productos cargados dinámicamente desde `.json` con `fetch`  
- Interacción mediante DOM y eventos  
- Uso de `localStorage` para persistir el carrito  
- Librería externa integrada (SweetAlert2)  
- Código limpio, sin JS embebido en el HTML  
- Proceso de compra completo simulado

## 👨‍💻 Autor

Jonathan Arias - Proyecto para Coderhouse
