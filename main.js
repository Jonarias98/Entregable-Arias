const zapatillas = [
    { nombre: "Old Skool", precio: 60000, talles: [38, 39, 40], stock: true },
    { nombre: "Sk8-Hi", precio: 70000, talles: [40, 41], stock: true },
    { nombre: "Slip-On", precio: 55000, talles: [37, 38], stock: false }
];

function mostrarTalles(tallesArray) {
    let resultado = "";

    for (let i = 0; i < tallesArray.length; i++) {
    resultado += tallesArray[i];

    if (i < tallesArray.length - 1) {
        resultado += ", ";
    }
}

return resultado;
}

function buscarModelo() {
    let modelo = prompt("¿Qué modelo de Vans querés buscar?");
    let resultado = null;

    for (let i = 0; i < zapatillas.length; i++) {
        if (zapatillas[i].nombre.toLowerCase() === modelo.toLowerCase()) {
            resultado = zapatillas[i];
    }
}

if (resultado !== null) {
    let tallesTexto = mostrarTalles(resultado.talles);
    let stockTexto = resultado.stock ? "Disponible" : "Sin stock";
    
    alert(
        "Modelo: " + resultado.nombre +
        "\nPrecio: $" + resultado.precio +
        "\nTalles disponibles: " + tallesTexto +
        "\nStock: " + stockTexto
    );
} else {
    alert("Ese modelo no se encuentra en nuestra tienda.");
}
}

function mostrarTodos() {
    console.log("Modelos disponibles:");
    for (let i = 0; i < zapatillas.length; i++) {
        console.log("- " + zapatillas[i].nombre);
    }
}

function iniciarSimulador() {
    let opcion = prompt("Bienvenido a Vans Store\n1: Buscar un modelo\n2: Ver todos los modelos");
    
    if (opcion === "1") {
    buscarModelo();
}   
else if (opcion === "2") {
    mostrarTodos();
} else {
    alert("Opción inválida.");
}
}

iniciarSimulador();
