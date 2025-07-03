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
      text: "Esta acción eliminará todos los productos.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setCarrito([]);
        Swal.fire("Carrito vacío", "", "success");
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
              <span>
                <strong>{item.nombre}</strong> - ${item.precio}
              </span>
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
    </div>
  );
}

export default App;
