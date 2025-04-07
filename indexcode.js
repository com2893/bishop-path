const form = document.getElementById("formulacion")
tournament_name = ""
player_numbers = 0


function generate_form(){
    const formulario = document.getElementById("miFormulario");

    // Evento para agregar un nuevo input cuando se hace clic en el botón
    
        // Crear un nuevo input
        let nuevoInput = document.createElement("input");
       
        // Establecer el tipo de input (por ejemplo, un input de tipo texto)
        nuevoInput.type = "number";

        // Establecer el atributo `placeholder` para el nuevo input
        nuevoInput.placeholder = "number of players";

        // Añadir el nuevo input al formulario
        form.appendChild(nuevoInput);

        // Añadir un salto de línea (opcional)
        form.appendChild(document.createElement("br")); 

          // Crear un nuevo input
          
          // Establecer el tipo de input (por ejemplo, un input de tipo texto)
          nuevoInputu.type = "text";
  
          // Establecer el atributo `placeholder` para el nuevo input
          nuevoInputu.placeholder = "tournament name";
  
          // Añadir el nuevo input al formulario
          form.appendChild(nuevoInputu);

          
  
}