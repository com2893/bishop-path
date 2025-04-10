// Variables globales para almacenar el número de jugadores, nombre del torneo y los jugadores
let player_numbers = 0;
let tournament_name = "";
let players = [];  // Array para guardar los jugadores y sus puntajes

// Función para generar el formulario de entrada
function generate_form() {
    // Mostrar el indicador de carga mientras se genera el formulario
    document.getElementById("loadingIndicator").classList.add("show");

    // Limpiar cualquier contenido previo del formulario
    form.innerHTML = "";

    // Crear los inputs para el número de jugadores y nombre del torneo
    let inputNumPlayers = createInput("number", "Número de jugadores", "playerNumbers");
    let inputTournamentName = createInput("text", "Nombre del torneo", "tournamentName");

    // Agregar los inputs al formulario
    form.appendChild(inputNumPlayers);
    form.appendChild(document.createElement("br"));
    form.appendChild(inputTournamentName);
    form.appendChild(document.createElement("br"));

    // Crear el botón para generar la tabla
    let botonGenerar = document.createElement("button");
    botonGenerar.classList.add("boton");
    botonGenerar.textContent = "Generar Tabla";
    botonGenerar.onclick = generate_table;
    form.appendChild(botonGenerar);
}

// Función para crear un input de manera reutilizable
function createInput(type, placeholder, id) {
    let input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    input.id = id;
    return input;
}

// Función para generar la tabla después de completar el formulario
function generate_table() {
    // Obtener los valores de los inputs
    player_numbers = parseInt(document.getElementById("playerNumbers").value);
    tournament_name = document.getElementById("tournamentName").value;

    // Validar que ambos campos estén completos
    if (!player_numbers || player_numbers <= 0 || !tournament_name) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Eliminar el formulario y el indicador de carga
    form.innerHTML = "";
    document.getElementById("loadingIndicator").classList.remove("show");

    // Crear la tabla de torneo
    const tabla = document.createElement("table");

    // Crear la fila de cabecera con el nombre del torneo
    let filaCabecera = tabla.insertRow();
    let celdaCabecera = filaCabecera.insertCell();
    celdaCabecera.colSpan = 3 + player_numbers;  // Colspan para que ocupe toda la fila
    celdaCabecera.textContent = `Torneo: ${tournament_name}`;
    filaCabecera.style.textAlign = "center";  // Alinear el texto al centro

    // Crear la fila de los títulos (columnas)
    let filaTitulos = tabla.insertRow();
    filaTitulos.insertCell().textContent = "Nombre Jugador";
    filaTitulos.insertCell().textContent = "Puntos";

    // Añadir una celda para cada jugador (de las columnas)
    for (let i = 1; i <= player_numbers; i++) {
        let celda = filaTitulos.insertCell();
        celda.textContent = `Jugador ${i}`;
    }

    // Añadir los campos para ingresar los nombres y puntos de los jugadores
    for (let i = 0; i < player_numbers; i++) {
        let fila = tabla.insertRow();

        // Nombre del jugador
        let celdaNombre = fila.insertCell();
        let inputNombre = document.createElement("input");
        inputNombre.type = "text";
        inputNombre.placeholder = `Nombre Jugador ${i + 1}`;
        celdaNombre.appendChild(inputNombre);

        // Puntos del jugador
        let celdaPuntos = fila.insertCell();
        let inputPuntos = document.createElement("input");
        inputPuntos.type = "number";
        inputPuntos.placeholder = "0";
        inputPuntos.value = 0;  // Inicializar en 0
        celdaPuntos.appendChild(inputPuntos);

        // Añadir columna para los botones de la ronda de la partida
        for (let j = 0; j < player_numbers; j++) {
            let celdaJugador = fila.insertCell();
            let btnPartido = document.createElement("button");
            btnPartido.classList.add("match-btn");
            btnPartido.textContent = `P${i + 1} vs P${j + 1}`;
            btnPartido.onclick = function () {
                show_match_result(i, j);
            };
            celdaJugador.appendChild(btnPartido);
        }

        // Guardar los jugadores con sus puntos en el array
        players.push({
            name: "",
            points: { value: 0 }
        });
    }

    // Añadir la tabla al formulario
    form.appendChild(tabla);
}

// Función para mostrar el resultado del partido
function show_match_result(player1Index, player2Index) {
    // Mostrar el prompt para introducir el resultado del partido
    let result = prompt(`Introduce el resultado de Jugador ${player1Index + 1} vs Jugador ${player2Index + 1} (P1 gana, P2 gana, draw)`);

    if (result === null) {
        return;  // Si el usuario cancela el prompt, no hacer nada
    }

    // Normalizar y validar el resultado
    result = result.trim().toLowerCase();
    if (result !== "p1" && result !== "p2" && result !== "draw") {
        alert("Formato inválido. Usa 'P1', 'P2' o 'draw'.");
        return;
    }

    // Actualizar los puntos de los jugadores
    update_points(result, player1Index, player2Index);

    // Volver a ordenar los jugadores según sus puntos
    sort_players_by_points();

    // Actualizar la tabla
    update_table();
}

// Función para actualizar los puntos de los jugadores
function update_points(result, player1Index, player2Index) {
    if (result === "p1") {
        players[player1Index].points.value += 1;
    } else if (result === "p2") {
        players[player2Index].points.value += 1;
    } else if (result === "draw") {
        players[player1Index].points.value += 0.5;
        players[player2Index].points.value += 0.5;
    }
}

// Función para ordenar los jugadores por puntos (formato suizo)
function sort_players_by_points() {
    players.sort((a, b) => b.points.value - a.points.value);  // Ordenar de mayor a menor
}

// Función para actualizar la tabla con los puntos de los jugadores
function update_table() {
    let tabla = document.querySelector("table");
    let filas = tabla.querySelectorAll("tr");
    let jugadores = filas.length - 1;  // Descontamos la fila de los títulos

    for (let i = 0; i < jugadores; i++) {
        let fila = filas[i + 1];  // Omitir la fila de títulos
        fila.cells[0].textContent = players[i].name || `Jugador ${i + 1}`;
        fila.cells[1].textContent = players[i].points.value;

        // Actualizar los nombres y puntos de los jugadores
        fila.cells[0].querySelector("input").value = players[i].name || "";
        fila.cells[1].querySelector("input").value = players[i].points.value;
    }
}
