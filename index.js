import { obtenerProductos } from './productos.js';

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const modelosDiv = document.getElementById("modelos");
const carritoDiv = document.getElementById("carrito");
const vaciarBtn = document.getElementById("vaciarCarritoBtn");

async function mostrarModelos() {
  const zapatillas = await obtenerProductos();
  modelosDiv.innerHTML = "";

  zapatillas.forEach((zapatilla, i) => {
    const div = document.createElement("div");
    div.classList.add("col-md-4");
    div.innerHTML = `
      <img src="./assets/${zapatilla.imagen}" alt="${zapatilla.nombre}" class="img-fluid rounded mx-auto d-block" style="max-width: 200px; height: auto;">
      <p><strong>${zapatilla.nombre}</strong></p>
      <p>Precio: $${zapatilla.precio}</p>
      <p>Talles: ${zapatilla.talles.join(", ")}</p>
      <p>Stock: ${zapatilla.stock ? "Disponible" : "Sin stock"}</p>
      <button ${!zapatilla.stock ? "disabled" : ""} data-index="${i}" class="btn btn-primary">Agregar al carrito</button>
    `;
    modelosDiv.appendChild(div);
  });

  const botones = modelosDiv.querySelectorAll("button");
  botones.forEach(btn => {
    btn.addEventListener("click", async () => {
      const index = btn.getAttribute("data-index");
      const productos = await obtenerProductos();
      agregarAlCarrito(productos[index]);
    });
  });
}

function mostrarCarrito() {
  carritoDiv.innerHTML = "";

  if (carrito.length === 0) {
    carritoDiv.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  carrito.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-2");
    div.innerHTML = `
      <p><strong>${item.nombre}</strong> - $${item.precio}</p>
      <button class="eliminarBtn btn btn-sm btn-danger">Eliminar</button>
    `;

    const eliminarBtn = div.querySelector(".eliminarBtn");
    eliminarBtn.addEventListener("click", () => {
      eliminarDelCarrito(index);
    });

    carritoDiv.appendChild(div);
  });

  const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);

  const totalDiv = document.createElement("div");
  totalDiv.classList.add("mt-3");
  totalDiv.innerHTML = `
    <p><strong>Total:</strong> $${total}</p>
    <button id="comprarBtn" class="btn btn-success">COMPRAR</button>
  `;
  carritoDiv.appendChild(totalDiv);

  document.getElementById("comprarBtn").addEventListener("click", mostrarResumenCompra);
}

function mostrarResumenCompra() {
  carritoDiv.innerHTML = `
    <h3>Resumen de compra</h3>
    <ul>
      ${carrito.map(item => `<li>${item.nombre} - $${item.precio}</li>`).join('')}
    </ul>
    <p><strong>Total a pagar:</strong> $${carrito.reduce((acc, prod) => acc + prod.precio, 0)}</p>
    <button id="confirmarCompraBtn" class="btn btn-primary">Confirmar compra</button>
    <button id="cancelarCompraBtn" class="btn btn-secondary ms-2">Cancelar</button>
  `;

  document.getElementById("confirmarCompraBtn").addEventListener("click", mostrarFormulario);
  document.getElementById("cancelarCompraBtn").addEventListener("click", mostrarCarrito);
}

function mostrarFormulario() {
  carritoDiv.innerHTML = `
    <h3>Complete sus datos</h3>
    <form id="formularioCompra">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="nombre" required />
      </div>
      <div class="mb-3">
        <label for="apellido" class="form-label">Apellido</label>
        <input type="text" class="form-control" id="apellido" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Correo electrónico</label>
        <input type="email" class="form-control" id="email" required />
      </div>
      <button type="submit" class="btn btn-primary">Finalizar compra</button>
      <button type="button" id="cancelarFormularioBtn" class="btn btn-secondary ms-2">Cancelar</button>
    </form>
  `;

  document.getElementById("formularioCompra").addEventListener("submit", (e) => {
    e.preventDefault();
    finalizarCompra();
  });

  document.getElementById("cancelarFormularioBtn").addEventListener("click", mostrarCarrito);
}

function finalizarCompra() {
  Swal.fire({
    icon: 'success',
    title: '¡Gracias por tu compra!',
    text: 'Te llegará un email con el detalle.',
  });

  carrito = [];
  localStorage.removeItem("carrito");
  mostrarCarrito();
  mostrarModelos();
}

function agregarAlCarrito(producto) {
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();

  Swal.fire({
    title: "Agregado al carrito",
    text: `${producto.nombre} fue agregado correctamente.`,
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
  });
}

function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function vaciarCarrito() {
  Swal.fire({
    title: "¿Vaciar carrito?",
    text: "Se eliminarán todos los productos del carrito",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, vaciar",
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = [];
      localStorage.removeItem("carrito");
      mostrarCarrito();
      Swal.fire("Carrito vacío", "", "success");
    }
  });
}

vaciarBtn.addEventListener("click", vaciarCarrito);

mostrarModelos();
mostrarCarrito();
