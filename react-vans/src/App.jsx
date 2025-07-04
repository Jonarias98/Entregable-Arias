import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./App.css";

const zapatillas = [
  { nombre: "Old Skool", precio: 60000, talles: [38, 39, 40], stock: true },
  { nombre: "Sk8-Hi", precio: 70000, talles: [40, 41], stock: true },
  { nombre: "Slip-On", precio: 55000, talles: [37, 38], stock: false },
];

function App() {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [pago, setPago] = useState("");

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    Swal.fire({
      title: "Agregado al carrito",
      text: `${producto.nombre} fue agregado correctamente.`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const eliminarDelCarrito = (index) => {
    Swal.fire({
      title: "¿Eliminar producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevoCarrito = carrito.filter((_, i) => i !== index);
        setCarrito(nuevoCarrito);
        Swal.fire("Eliminado", "Producto eliminado del carrito.", "success");
      }
    });
  };

  const vaciarCarrito = () => {
    Swal.fire({
      title: "¿Vaciar carrito?",
      text: "Esto eliminará todos los productos.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar",
    }).then((result) => {
      if (result.isConfirmed) {
        setCarrito([]);
        Swal.fire("Carrito vacío", "", "success");
      }
    });
  };

  const finalizarCompra = () => {
    if (!nombre || !email || !direccion || !pago) {
      Swal.fire("Faltan datos", "Completá todos los campos antes de continuar", "error");
      return;
    }

    if (carrito.length === 0) {
      Swal.fire("Carrito vacío", "Agregá al menos un producto", "info");
      return;
    }

    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);

    Swal.fire({
      title: "¿Confirmar compra?",
      html: `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Dirección:</strong> ${direccion}</p>
        <p><strong>Método de pago:</strong> ${pago}</p>
        <p><strong>Total:</strong> $${total}</p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        setCarrito([]);
        setNombre("");
        setEmail("");
        setDireccion("");
        setPago("");

        localStorage.removeItem("carrito");

        Swal.fire({
          title: "¡Compra realizada!",
          text: "Gracias por tu compra. Te llegará un email con la información.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="App" style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>Vans Store</h1>

      <section>
        <h2>Modelos disponibles</h2>
        {zapatillas.map((z, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
              opacity: z.stock ? 1 : 0.5,
            }}
          >
            <p><strong>{z.nombre}</strong></p>
            <p>Precio: ${z.precio}</p>
            <p>Talles: {z.talles.join(", ")}</p>
            <p>Stock: {z.stock ? "Disponible" : "Sin stock"}</p>
            <button
              onClick={() => agregarAlCarrito(z)}
              disabled={!z.stock}
              style={{ marginTop: 5 }}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </section>

      <section>
        <h2>Carrito de compras</h2>
        {carrito.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          carrito.map((item, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #888",
                marginBottom: 5,
                padding: 5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span><strong>{item.nombre}</strong> - ${item.precio}</span>
              <button onClick={() => eliminarDelCarrito(i)}>Eliminar</button>
            </div>
          ))
        )}
        {carrito.length > 0 && (
          <button
            onClick={vaciarCarrito}
            style={{
              marginTop: 10,
              backgroundColor: "red",
              color: "white",
              padding: "6px 12px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Vaciar carrito
          </button>
        )}
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>Finalizar compra</h2>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />
        <input
          type="text"
          placeholder="Dirección de envío"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />
        <select
          value={pago}
          onChange={(e) => setPago(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        >
          <option value="">Seleccionar método de pago</option>
          <option value="Tarjeta de crédito">Tarjeta de crédito</option>
          <option value="Transferencia">Transferencia</option>
          <option value="Efectivo">Efectivo</option>
        </select>
        <button
          onClick={finalizarCompra}
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 16px",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Finalizar compra
        </button>
      </section>
    </div>
  );
}

export default App;
