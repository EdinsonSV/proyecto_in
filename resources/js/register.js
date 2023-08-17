import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    $(document).on("keypress", "#dniUsu", function (e) {
        let key = e.key; // Obtener la tecla presionada
        console.log("Hola")

        if (
            (key < "0" || key > "9") && // Números del 0 al 9
            //key !== "." && // Punto decimal
            key !== "Backspace" && // Tecla de retroceso (backspace)
            key !== "Delete" // Tecla de anulación
            //key !== "-" // Signo de menos (opcional para valores negativos)
        ) {
            e.preventDefault(); // Evitar que se ingrese el carácter no permitido
        }
    });
});