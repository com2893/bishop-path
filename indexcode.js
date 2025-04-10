const form = document.getElementById("formulacion");
let tournament_name = "";
let player_numbers = 0;

function generate_form() {
    const formulario = document.getElementById("miFormulario");

    // Crear el primer input para el número de jugadores
    let nuevoInput = document.createElement("input");
    nuevoInput.type = "number";
    nuevoInput.placeholder = "Number of players";
    nuevoInput.id = "playerNumbers";  // Establecer un id para poder accederlo más tarde
    form.appendChild(nuevoInput);

    form.appendChild(document.createElement("br"));

    // Crear el segundo input para el nombre del torneo
    let nuevoInputu = document.createElement("input");
    nuevoInputu.type = "text";
    nuevoInputu.placeholder = "Tournament name";
    nuevoInputu.id = "tournamentName";  // Establecer un id para poder accederlo más tarde
    form.appendChild(nuevoInputu);

    form.appendChild(document.createElement("br"));

    // Crear un botón para generar la tabla
    let botonGenerar = document.createElement("button");
    botonGenerar.textContent = "Generate Table";
    botonGenerar.onclick = generate_table;
    form.appendChild(botonGenerar);
}

// Función para generar la tabla después de completar el formulario
function generate_table() {
    // Obtener los valores de los inputs
    player_numbers = document.getElementById("playerNumbers").value;
    tournament_name = document.getElementById("tournamentName").value;

    // Validar los inputs
    if (!player_numbers || !tournament_name) {
        alert("Please fill in all fields.");
        return;
    }

    // Eliminar el formulario
    form.innerHTML = "";

    // Crear la tabla
    const tabla = document.createElement("table");
    tabla.border = "1";  // Agregar borde a la tabla

    // Crear la fila de cabecera con el nombre del torneo
    let filaCabecera = tabla.insertRow();
    let celdaCabecera = filaCabecera.insertCell();
    celdaCabecera.colSpan = player_numbers;
    celdaCabecera.textContent = `Tournament: ${tournament_name}`;
    filaCabecera.style.textAlign = "center";  // Alinear texto al centro

    // Crear una fila para los jugadores
    let filaJugadores = tabla.insertRow();
    for (let i = 1; i <= player_numbers; i++) {
        let celda = filaJugadores.insertCell();
        celda.textContent = `Player ${i}`;
        celda.style.textAlign = "center";  // Alinear texto al centro
    }

    // Añadir la tabla al documento
    form.appendChild(tabla);
}
