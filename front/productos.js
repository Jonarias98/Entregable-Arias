async function obtenerProductos() {
  try {
    const respuesta = await fetch('./productos.json');
    if (!respuesta.ok) throw new Error("Error al cargar productos");
    const productos = await respuesta.json();
    return productos;
  } catch {
    return [];
  }
}
