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
    div.innerHTML = `
      <div class="card h-100 text-center">
        <img src="./assets/${zapatilla.imagen}" class="card-img-top img-fluid p-3" alt="${zapatilla.nombre}">
        <div class="card-body">
          <h5 class="card-title">${zapatilla.nombre}</h5>
          <p class="card-text">Precio: $${zapatilla.precio}</p>
          <p class="card-text">Talles: ${zapatilla.talles.join(", ")}</p>
          <p class="card-text">${zapatilla.stock ? "Disponible" : "Sin stock"}</p>
          <button ${!zapatilla.stock ? "disabled" : ""} class="btn btn-primary mt-2" data-index="${i}">
            Agregar al carrito
          </button>
        </div>
      </div>
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
    div.innerHTML = `
      <p><strong>${item.nombre}</strong> - $${item.precio}</p>
      <button class="eliminarBtn btn btn-danger btn-sm mb-2">Eliminar</button>
    `;

    const eliminarBtn = div.querySelector(".eliminarBtn");
    eliminarBtn.addEventListener("click", () => {
      eliminarDelCarrito(index);
    });

    carritoDiv.appendChild(div);
  });

  if (carrito.length > 0) {
    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);

    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `
      <p><strong>Total:</strong> $${total}</p>
      <button id="comprarBtn" class="btn btn-primary mt-2">COMPRAR</button>
    `;
    carritoDiv.appendChild(totalDiv);

    document.getElementById("comprarBtn").addEventListener("click", () => {
      mostrarFormulario();
    });
  }
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
        <label for="direccion" class="form-label">Dirección de entrega</label>
        <input type="text" class="form-control" id="direccion" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Correo electrónico</label>
        <input type="email" class="form-control" id="email" required />
      </div>
      <button type="submit" class="btn btn-success">Continuar</button>
      <button type="button" id="cancelarFormularioBtn" class="btn btn-secondary ms-2">Cancelar</button>
    </form>
  `;

  // ✅ Listeners deben estar dentro de mostrarFormulario
  document.getElementById("formularioCompra").addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const email = document.getElementById("email").value.trim();

    const soloLetras = /^[a-zA-Z\s]+$/;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!soloLetras.test(nombre)) {
      alert("El nombre solo puede contener letras.");
      return;
    }

    if (!soloLetras.test(apellido)) {
      alert("El apellido solo puede contener letras.");
      return;
    }

    if (direccion.length < 5) {
      alert("La dirección debe tener al menos 5 caracteres.");
      return;
    }

    if (!emailValido.test(email)) {
      alert("Por favor, ingresá un correo electrónico válido.");
      return;
    }

    mostrarResumenFinal(nombre, apellido, direccion, email);
  });

  document.getElementById("cancelarFormularioBtn").addEventListener("click", mostrarCarrito);
}

function mostrarResumenFinal(nombre, apellido, direccion, email) {
  const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);

  carritoDiv.innerHTML = `
    <h3>Resumen final</h3>
    <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
    <p><strong>Dirección:</strong> ${direccion}</p>
    <p><strong>Correo:</strong> ${email}</p>
    <p><strong>Cantidad de productos:</strong> ${carrito.length}</p>
    <p><strong>Total a pagar:</strong> $${total}</p>
    <p><strong>${nombre}</strong>, vas a comprar <strong>${carrito.length}</strong> zapatilla(s) por <strong>$${total}</strong> y te llegará a <strong>${direccion}</strong> en los próximos <strong>3 días hábiles</strong>.</p>
    <button id="confirmarCompraFinalBtn" class="btn btn-success">Confirmar compra</button>
    <button id="cancelarCompraFinalBtn" class="btn btn-secondary ms-2">Cancelar</button>
  `;

  document.getElementById("confirmarCompraFinalBtn").addEventListener("click", () => {
    finalizarCompra();
  });

  document.getElementById("cancelarCompraFinalBtn").addEventListener("click", mostrarCarrito);
}

function finalizarCompra() {
  carrito = [];
  localStorage.removeItem("carrito");
  mostrarCarrito();

  Swal.fire("¡Gracias por tu compra!", "Te llegará un email con el detalle. ¡Que disfrutes tus zapatillas!", "success");
}

vaciarBtn.addEventListener("click", vaciarCarrito);

mostrarModelos();
mostrarCarrito();
