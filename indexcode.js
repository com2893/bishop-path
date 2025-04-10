const form = document.getElementById("formulacion");
let tournament_name = "";
let player_numbers = 0;
let players = [];

function generate_form() {
    form.innerHTML = '';

    // Input para el número de jugadores
    let nuevoInput = document.createElement("input");
    nuevoInput.type = "number";
    nuevoInput.placeholder = "Número de jugadores";
    nuevoInput.id = "playerNumbers";
    form.appendChild(nuevoInput);

    // Salto de línea
    form.appendChild(document.createElement("br"));

    // Input para el nombre del torneo
    let nuevoInputu = document.createElement("input");
    nuevoInputu.type = "text";
    nuevoInputu.placeholder = "Nombre del torneo";
    nuevoInputu.id = "tournamentName";
    form.appendChild(nuevoInputu);

    // Salto de línea
    form.appendChild(document.createElement("br"));

    // Botón para generar la tabla
    let botonGenerar = document.createElement("button");
    botonGenerar.textContent = "Generar Tabla";
    botonGenerar.onclick = generate_table;
    form.appendChild(botonGenerar);
}

function generate_table() {
    player_numbers = document.getElementById("playerNumbers").value;
    tournament_name = document.getElementById("tournamentName").value;

    if (!player_numbers || !tournament_name) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    form.innerHTML = ''; // Limpiar el formulario

    const tabla = document.createElement("table");

    // Fila de cabecera
    let filaCabecera = tabla.insertRow();
    let celdaCabecera = filaCabecera.insertCell();
    celdaCabecera.colSpan = 3 + player_numbers;
    celdaCabecera.textContent = `Torneo: ${tournament_name}`;
    filaCabecera.style.textAlign = "center";

    // Fila de títulos
    let filaTitulos = tabla.insertRow();
    filaTitulos.insertCell().textContent = "Nombre del Jugador";
    filaTitulos.insertCell().textContent = "Puntos";

    // Añadir columnas para los jugadores
    for (let i = 1; i <= player_numbers; i++) {
        let celda = filaTitulos.insertCell();
        celda.textContent = `Jugador ${i}`;
    }

    // Añadir campos para los jugadores
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
        inputPuntos.value = 0; // Inicializar en 0
        celdaPuntos.appendChild(inputPuntos);

        // Botones para partidos
        for (let j = 0; j < player_numbers; j++) {
            let celdaJugador = fila.insertCell();
            let btnPartido = document.createElement("button");
            btnPartido.textContent = `P${i + 1} vs P${j + 1}`;
            btnPartido.className = "match-btn";
            btnPartido.onclick = function () {
                show_match_result(i, j);
            };
            celdaJugador.appendChild(btnPartido);
        }

        players.push({
            name: inputNombre,
            points: inputPuntos,
        });
    }

    form.appendChild(tabla);
}

function show_match_result(player1Index, player2Index) {
    let result = prompt(`Introduce el resultado para Jugador ${player1Index + 1} vs Jugador ${player2Index + 1} (formato: P1-P2, P1=ganador, P2=ganador, draw)`);
    
    if (result === null) {
        return;
    }

    const [p1Score, p2Score] = result.split("-");

    if (p1Score === "P1" && p2Score === "P2") {
        players[player1Index].points.value++;
    } else if (p1Score === "P2" && p2Score === "P1") {
        players[player2Index].points.value++;
    } else if (p1Score === "draw" && p2Score === "draw") {
        players[player1Index].points.value += 0.5;
        players[player2Index].points.value += 0.5;
    }

    sort_players_by_points();
    update_table();
}

function sort_players_by_points() {
    players.sort((a, b) => b.points.value - a.points.value);
}

function update_table() {
    const tabla = form.querySelector("table");
    const rows = tabla.rows;

    for (let i = 0; i < player_numbers; i++) {
        rows[i + 1].cells[1].querySelector("input").value = players[i].points.value;
        rows[i + 1].cells[0].querySelector("input").value = players[i].name.value;
    }
}
