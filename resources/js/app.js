import './bootstrap';
import './register';

import jQuery from 'jquery';
window.$ = jQuery;

import toastr from 'toastr';
import 'toastr/build/toastr.css';
window.toastr = toastr;

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
        }else if (horaActual >= 12 && horaActual < 19) {
            mensaje = 'Buenas tardes';
        } else if (horaActual >=19 && horaActual < 24) {
            mensaje = 'Buenas noches';
        }
    
        // Mostrar el mensaje de bienvenida
        $('#mensaje_bienvenida').text(mensaje);
    }

    $('#preloader_sistema').fadeOut('slow'); // Esto hace que el preloader desaparezca cuando la pagina este cargada

});