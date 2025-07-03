const zapatillas = [
    { nombre: "Old Skool", precio: 60000, talles: [38, 39, 40], stock: true },
    { nombre: "Sk8-Hi", precio: 70000, talles: [40, 41], stock: true },
    { nombre: "Slip-On", precio: 55000, talles: [37, 38], stock: false }
];

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const modelosDiv = document.getElementById("modelos");
const carritoDiv = document.getElementById("carrito");
const vaciarBtn = document.getElementById("vaciarCarritoBtn");


function mostrarModelos() {
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
        btn.addEventListener("click", () => {
            const index = btn.getAttribute("data-index");
            agregarAlCarrito(zapatillas[index]);
        });
    });
}


function mostrarCarrito() {
    carritoDiv.innerHTML = "";

    if (carrito.length === 0) {
        carritoDiv.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    carrito.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `<p><strong>${item.nombre}</strong> - $${item.precio}
        </p>`;
        // <button class="eliminarBtn" > Eliminar </button>
        carritoDiv.appendChild(div);
        const eliminarProducto = div.querySelector("eliminarBtn"); 
        eliminarProducto.addEventListener("click", () => 
            {eliminarDelCarrito(index)
})
carritoDiv.appendChild(div)
    });
}


function agregarAlCarrito(producto) {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function eliminarDelCarrito (indice){ 
    carrito.splice(indice,1);
    mostrarCarrito()

}

// Vaciar el carrito y actualizar localStorage
function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

vaciarBtn.addEventListener("click", vaciarCarrito);

mostrarModelos();
mostrarCarrito();





const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('¡Hola desde el servidor!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});