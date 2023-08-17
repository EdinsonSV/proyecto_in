import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    declarar_mensaje_bienvenida();

    function declarar_mensaje_bienvenida(){
        // Obtener la hora actual
        let horaActual = new Date().getHours();
    
        // Definir los mensajes según la hora
        let mensaje;
    
        if (horaActual >=0 && horaActual < 6) {
            mensaje = 'Has madrugado mucho hoy';
        } else if (horaActual >= 6 && horaActual < 12) {
            mensaje = 'Buenos dias';
        }else if (horaActual >= 12 && horaActual < 18) {
            mensaje = 'Buenas tardes';
        } else if (horaActual >=18 && horaActual < 24) {
            mensaje = 'Buenas noches';
        }
    
        // Mostrar el mensaje de bienvenida
        $('#mensaje_bienvenida').text(mensaje);
    }
    
});