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
      <p><strong>${zapatilla.nombre}</strong></p>
      <p>Precio: $${zapatilla.precio}</p>
      <p>Talles: ${zapatilla.talles.join(", ")}</p>
      <p>Stock: ${zapatilla.stock ? "Disponible" : "Sin stock"}</p>
      <button ${!zapatilla.stock ? "disabled" : ""} data-index="${i}">Agregar al carrito</button>
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
        confirmButtonText: "Comprar",
      }).then((result) => {
        if (result.isConfirmed) {
          carrito = [];
          localStorage.removeItem("carrito");
          mostrarCarrito();
          Swal.fire("¡Gracias por tu compra!", "Te llegará un email con el detalle", "success");
        }
      });
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

vaciarBtn.addEventListener("click", vaciarCarrito);

mostrarModelos();
mostrarCarrito();
