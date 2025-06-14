const zapatillas = [
    { nombre: "Old Skool", precio: 60000, talles: [38, 39, 40], stock: true },
    { nombre: "Sk8-Hi", precio: 70000, talles: [40, 41], stock: true },
    { nombre: "Slip-On", precio: 55000, talles: [37, 38], stock: false }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const modelosDiv = document.getElementById("modelos");
const carritoDiv = document.getElementById("carrito");
const vaciarBtn = document.getElementById("vaciarCarritoBtn");

// Función para mostrar los modelos y agregar al carrito
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

// Mostrar lo que hay en el carrito
function mostrarCarrito() {
    carritoDiv.innerHTML = "";

    if (carrito.length === 0) {
        carritoDiv.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    carrito.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `<p><strong>${item.nombre}</strong> - $${item.precio}</p>`;
        carritoDiv.appendChild(div);
    });
}

// Agregar producto al carrito y guardar en localStorage
function agregarAlCarrito(producto) {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
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
