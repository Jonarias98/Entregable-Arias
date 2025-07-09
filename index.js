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
  div.classList.add("col-md-4", "mb-4"); // Bootstrap grid para 3 columnas por fila

  div.innerHTML = `
    <div class="card h-100 text-center">
      <img src="./assets/${zapatilla.imagen}" 
           alt="${zapatilla.nombre}" 
           class="card-img-top img-fluid"
           style="max-height: 200px; object-fit: cover;">
      <div class="card-body d-flex flex-column justify-content-between">
        <h5 class="card-title">${zapatilla.nombre}</h5>
        <p class="card-text">Precio: $${zapatilla.precio}</p>
        <p class="card-text">Talles: ${zapatilla.talles.join(", ")}</p>
        <p class="card-text">${zapatilla.stock ? "Disponible" : "Sin stock"}</p>
        <button class="btn btn-primary mt-2" ${!zapatilla.stock ? "disabled" : ""} data-index="${i}">
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
      <button class="eliminarBtn">Eliminar</button>
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
    totalDiv.innerHTML = `<p><strong>Total:</strong> $${total}</p>
      <button id="comprarBtn">COMPRAR</button>`;
    carritoDiv.appendChild(totalDiv);

    document.getElementById("comprarBtn").addEventListener("click", () => {
      Swal.fire({
        title: "¿Confirmar compra?",
        text: `Total a pagar: $${total}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Continuar",
      }).then((result) => {
        if (result.isConfirmed) {
          mostrarFormularioCompra();
        }
      });
    });
  }
}

function mostrarFormularioCompra() {
  carritoDiv.innerHTML = `
    <h3>Datos del comprador</h3>
    <form id="formCompra">
      <label>Nombre y apellido:<br>
        <input type="text" name="nombre" placeholder="Ingresá tu nombre y apellido" required />
      </label><br><br>

      <label>Email:<br>
        <input type="email" name="email" placeholder="Ingresá tu correo" required />
      </label><br><br>

      <label>Dirección:<br>
        <input type="text" name="direccion" placeholder="Ingresá tu dirección" />
      </label><br><br>

      <button type="submit">Finalizar compra</button>
    </form>
  `;

  document.getElementById("formCompra").addEventListener("submit", function (e) {
    e.preventDefault();
    carrito = [];
    localStorage.removeItem("carrito");

    Swal.fire("¡Gracias por tu compra!", "Te llegará un mail con el detalle.", "success");
    modelosDiv.innerHTML = "";
    mostrarModelos();
    mostrarCarrito();
  });
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
