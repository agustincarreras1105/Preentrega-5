

const Proyecto = "Mi Control de Gastos";

let presupuesto = 0;
let saldoPresupuesto = 0;
let opc = 0;
let siguienteId = 1;

const moneda = "AR$";
const gastosRegistrados = [];

// CLASE GASTO e5

class Gasto {
    constructor(id, nombre, monto, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.monto = monto;
        this.categoria = categoria;
    }

    actualizarMonto(nuevoMonto) {
        this.monto = nuevoMonto;
    }

    mostrarInformacion() {
        return "ID: " + this.id +
            " | Nombre: " + this.nombre +
            " | Monto: " + moneda + this.monto +
            " | Categoría: " + this.categoria;
    }
}

// FUNCIONES
function calcularSaldo(presupuesto, gasto) {
    return presupuesto - gasto;
}

function mostrarSaldo(saldo) {
    console.log("\nSaldo restante: " + moneda + saldo);
}

function registrarGasto() {
    const nombre = prompt("Ingresá el nombre del gasto:");
    const monto = Number(prompt("Ingresá el importe del gasto:"));
    const categoria = prompt("Ingresá la categoría del gasto:");

    if (
        nombre === null ||
        nombre.trim() === "" ||
        categoria === null ||
        categoria.trim() === "" ||
        isNaN(monto) ||
        monto <= 0
    ) {
        alert("Los datos ingresados no son válidos.");
        return;
    }

    if (monto > saldoPresupuesto) {
        alert("El gasto supera el presupuesto disponible.");
        return;
    }

    const nuevoGasto = new Gasto(
        siguienteId,
        nombre,
        monto,
        categoria
    );

    gastosRegistrados.push(nuevoGasto);
    siguienteId = siguienteId + 1;

    saldoPresupuesto = calcularSaldo(saldoPresupuesto, monto);

    console.log("Gasto registrado correctamente.");
    console.log(nuevoGasto.mostrarInformacion());

    mostrarSaldo(saldoPresupuesto);
}

function mostrarGastos() {
    if (gastosRegistrados.length === 0) {
        console.log("Todavía no hay gastos registrados.");
        return;
    }

    console.log("\n--- LISTADO DE GASTOS ---");

    for (const gasto of gastosRegistrados) {
        console.log(gasto.mostrarInformacion());
    }
}

function buscarGasto() {
    const idBuscar = Number(prompt("Ingresá el ID del gasto que querés buscar:"));

    const gastoEncontrado = gastosRegistrados.find(
        gasto => gasto.id === idBuscar
    );

    if (gastoEncontrado) {
        console.log("Gasto encontrado:");
        console.log(gastoEncontrado.mostrarInformacion());
    } else {
        console.log("No se encontró un gasto con ese ID.");
    }
}

function modificarGasto() {
    const idModificar = Number(prompt("Ingresá el ID del gasto que querés modificar:"));

    const gastoEncontrado = gastosRegistrados.find(
        gasto => gasto.id === idModificar
    );

    if (!gastoEncontrado) {
        console.log("No se encontró el gasto.");
        return;
    }

    const nuevoMonto = Number(prompt("Ingresá el nuevo importe:"));

    const saldoDisponible = saldoPresupuesto + gastoEncontrado.monto;

    if (
        isNaN(nuevoMonto) ||
        nuevoMonto <= 0 ||
        nuevoMonto > saldoDisponible
    ) {
        alert("El nuevo importe no es válido o supera el presupuesto disponible.");
        return;
    }

    saldoPresupuesto = saldoDisponible - nuevoMonto;

    gastoEncontrado.actualizarMonto(nuevoMonto);

    console.log("Gasto modificado correctamente.");
    console.log(gastoEncontrado.mostrarInformacion());

    mostrarSaldo(saldoPresupuesto);
}

function eliminarGasto() {
    if (gastosRegistrados.length === 0) {
        console.log("No hay gastos para eliminar.");
        return;
    }

    const idEliminar = Number(prompt("Ingresá el ID del gasto que querés eliminar:"));

    const posicion = gastosRegistrados.findIndex(
        gasto => gasto.id === idEliminar
    );

    if (posicion === -1) {
        console.log("No se encontró el gasto.");
        return;
    }

    const gastoEliminado = gastosRegistrados.splice(posicion, 1)[0];

    saldoPresupuesto = saldoPresupuesto + gastoEliminado.monto;

    console.log("Se eliminó el siguiente gasto:");
    console.log(gastoEliminado.mostrarInformacion());

    mostrarSaldo(saldoPresupuesto);
}

// INSTANCIAS DE LA CLASE GASTO e5

const gastoComida = new Gasto(1, "Supermercado", 25000, "Alimentación");
const gastoTransporte = new Gasto(2, "Combustible", 15000, "Transporte");
const gastoServicios = new Gasto(3, "Internet", 12000, "Servicios");


gastosRegistrados.push(gastoComida);
gastosRegistrados.push(gastoTransporte);
gastosRegistrados.push(gastoServicios);

siguienteId = 4;

// VERIFICACIÓN DE OBJETOS Y MÉTODOS e5

console.log("--- OBJETOS CREADOS ---");

console.log(gastoComida.mostrarInformacion());
console.log(gastoTransporte.mostrarInformacion());
console.log(gastoServicios.mostrarInformacion());

// PRUEBA DEL MÉTODO MODIFICADOR e5

console.log("\n--- PRUEBA DE ACTUALIZACIÓN DE MONTO ---");

gastoComida.actualizarMonto(28000);

console.log("Gasto comida actualizado:");
console.log(gastoComida.mostrarInformacion());

// INICIO 

alert("¡Bienvenido a " + Proyecto + "!");

presupuesto = Number(prompt("¿Cuánto dinero dispondrás para tu presupuesto?"));

while (isNaN(presupuesto) || presupuesto <= 0) {
    presupuesto = Number(prompt("Ingresá un presupuesto válido mayor a cero:"));
}

saldoPresupuesto = calcularSaldo(
    presupuesto,
    gastoComida.monto + gastoTransporte.monto + gastoServicios.monto
);

if (saldoPresupuesto < 0) {
    alert("Los gastos iniciales superan el presupuesto. Ingresá un presupuesto mayor.");

    presupuesto = Number(prompt("Ingresá un nuevo presupuesto:"));

    while (
        isNaN(presupuesto) ||
        presupuesto <= 0 ||
        presupuesto < gastoComida.monto + gastoTransporte.monto + gastoServicios.monto
    ) {
        presupuesto = Number(prompt("El presupuesto debe cubrir los gastos iniciales. Intentá nuevamente:"));
    }

    saldoPresupuesto = calcularSaldo(
        presupuesto,
        gastoComida.monto + gastoTransporte.monto + gastoServicios.monto
    );
}

console.log("Presupuesto establecido: " + moneda + presupuesto);
mostrarSaldo(saldoPresupuesto);

// MENU

do {
    opc = Number(prompt(
        "MENÚ PRINCIPAL\n\n" +
        "1. Registrar gasto.\n" +
        "2. Consultar saldo.\n" +
        "3. Mostrar gastos registrados.\n" +
        "4. Buscar gasto por ID.\n" +
        "5. Modificar gasto.\n" +
        "6. Eliminar gasto.\n" +
        "7. Salir."
    ));

    switch (opc) {
        case 1:
            registrarGasto();
            break;

        case 2:
            mostrarSaldo(saldoPresupuesto);
            break;

        case 3:
            mostrarGastos();
            break;

        case 4:
            buscarGasto();
            break;

        case 5:
            modificarGasto();
            break;

        case 6:
            eliminarGasto();
            break;

        case 7:
            console.log("Gracias por utilizar " + Proyecto + ".");
            break;

        default:
            alert("Opción no válida. Intentá nuevamente.");
    }

} while (opc !== 7);
