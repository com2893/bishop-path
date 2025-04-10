let player_numbers = 0;
let tournament_name = "";
let players = []; // Array para almacenar los jugadores y sus puntos

const form = document.getElementById("formulacion");

// Genera el formulario de entrada de jugadores y nombre del torneo
function generate_form() {
    document.getElementById("loadingIndicator").classList.add("show");
    form.innerHTML = "";  // Limpiar el formulario previo

    // Crear input para el número de jugadores
    let inputNumPlayers = createInput("number", "Número de jugadores", "playerNumbers");

    // Crear input para el nombre del torneo
    let inputTournamentName = createInput("text", "Nombre del torneo", "tournamentName");

    // Crear botón para generar la tabla
    let botonGenerar = document.createElement("button");
    botonGenerar.textContent = "Generar Tabla";
    botonGenerar.classList.add("boton");
    botonGenerar.onclick = generate_table;

    form.appendChild(inputNumPlayers);
    form.appendChild(inputTournamentName);
    form.appendChild(botonGenerar);
}

// Crear un input de forma reutilizable
function createInput(type, placeholder, id) {
    let input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    input.id = id;
    return input;
}

// Generar la tabla de jugadores y las partidas
function generate_table() {
    player_numbers = parseInt(document.getElementById("playerNumbers").value);
    tournament_name = document.getElementById("tournamentName").value;

    // Validar que ambos campos están completos
    if (!player_numbers || player_numbers <= 0 || !tournament_name) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Limpiar el formulario y quitar indicador de carga
    form.innerHTML = "";
    document.getElementById("loadingIndicator").classList.remove("show");

    // Crear la tabla
    const tabla = document.createElement("table");

    // Fila de cabecera
    let filaCabecera = tabla.insertRow();
    let celdaCabecera = filaCabecera.insertCell();
    celdaCabecera.colSpan = 3 + player_numbers; // Colspan para que ocupe toda la fila
    celdaCabecera.textContent = `Torneo: ${tournament_name}`;
    filaCabecera.style.textAlign = "center";

    // Fila de títulos de la tabla
    let filaTitulos = tabla.insertRow();
    filaTitulos.insertCell().textContent = "Nombre Jugador";
    filaTitulos.insertCell().textContent = "Puntos";
    for (let i = 1; i <= player_numbers; i++) {
        let celda = filaTitulos.insertCell();
        celda.textContent = `Jugador ${i}`;
    }

    // Crear las filas de jugadores
    for (let i = 0; i < player_numbers; i++) {
        let fila = tabla.insertRow();

        // Nombre del jugador
        let celdaNombre = fila.insertCell();
        let inputNombre = document.createElement("input");
        inputNombre.type = "text";
        inputNombre.placeholder = `Jugador ${i + 1}`;
        celdaNombre.appendChild(inputNombre);

        // Puntos del jugador
        let celdaPuntos = fila.insertCell();
        let inputPuntos = document.createElement("input");
        inputPuntos.type = "number";
        inputPuntos.value = 0;
        celdaPuntos.appendChild(inputPuntos);

        // Crear botones para cada partido (partidas aleatorias)
        for (let j = 0; j < player_numbers; j++) {
            if (i !== j) {
                let celdaJugador = fila.insertCell();
                let btnPartido = document.createElement("button");
                btnPartido.classList.add("match-btn");
                btnPartido.textContent = `P${i + 1} vs P${j + 1}`;
                btnPartido.onclick = function () {
                    show_match_result(i, j);
                };
                celdaJugador.appendChild(btnPartido);
            }
        }

        // Guardar los jugadores con sus puntos
        players.push({
            name: "",
            points: 0
        });
    }

    // Agregar la tabla al DOM
    form.appendChild(tabla);
}

// Mostrar el resultado de un partido
function show_match_result(player1Index, player2Index) {
    let result = prompt(`Resultado de Jugador ${player1Index + 1} vs Jugador ${player2Index + 1} (P1 gana, P2 gana, draw)`);

    if (result === null) return;

    result = result.trim().toLowerCase();
    if (result === "p1") {
        players[player1Index].points++;
    } else if (result === "p2") {
        players[player2Index].points++;
    } else if (result === "draw") {
        players[player1Index].points += 0.5;
        players[player2Index].points += 0.5;
    }

    // Actualizar la tabla con los nuevos puntos
    update_table();
}

// Actualizar la tabla con los nuevos puntos
function update_table() {
    let tabla = document.querySelector("table");
    let filas = tabla.querySelectorAll("tr");

    for (let i = 0; i < player_numbers; i++) {
        let fila = filas[i + 1];  // Omitir la fila de títulos
        fila.cells[0].textContent = players[i].name || `Jugador ${i + 1}`;
        fila.cells[1].textContent = players[i].points;
    }
}
