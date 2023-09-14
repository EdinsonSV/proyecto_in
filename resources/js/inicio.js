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
        }else if (horaActual >= 12 && horaActual < 19) {
            mensaje = 'Buenas tardes';
        } else if (horaActual >=19 && horaActual < 24) {
            mensaje = 'Buenas noches';
        }
    
        // Mostrar el mensaje de bienvenida
        $('#mensaje_bienvenida').text(mensaje);
    }

    $('#paraPrueba').on('click', function(event){
        event.preventDefault();
        $.ajax({
            url: '/consultar-datos',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        console.log("ID de Especie: " + obj.idEspecie);
                        console.log("Nombre de Especie: " + obj.nombreEspecie);
                    });
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function(error) {
                console.error(error);
            }
        });
    })
    
});