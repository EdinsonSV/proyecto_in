import jQuery from 'jquery';
import Swal from 'sweetalert';

window.$ = jQuery;

jQuery(function($) {

    fn_TraerValorConversion()

    /* ============ Eventos ============ */

    $(document).on("dblclick", "#valoresDeConversiones .editValorConversion", function() {
        let fila = $(this).closest('tr');
        let idValorConversion = fila.find('td:eq(0)').text();
        let valorConversion = fila.find('td:eq(2)').text();
        //$("#defaultModal").modal("show");
        // fn_ActualizarValorConversion(idValorConversion,valorConversion);
    });

    /* ============ Funciones ============ */

    function fn_TraerValorConversion(){
        $.ajax({
            url: '/fn_consulta_TraerValorConversion',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyConversiones = $('#valoresDeConversiones');
                    tbodyConversiones.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        // Crear una nueva fila
                        let nuevaFila = $('<tr class="editValorConversion">');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idPrecio));
                        nuevaFila.append($('<td class="text-center border border-gray-400">').text(obj.nombreCompleto)); // Reemplaza 'propiedad1' por el nombre de tu propiedad
                        nuevaFila.append($('<td class="text-center border border-gray-400 cursor-pointer">').text(obj.valorConversion)); // Reemplaza 'propiedad2' por el nombre de tu propiedad
                        // ... Agrega más celdas según las propiedades

                        // Agregar la nueva fila al tbody
                        tbodyConversiones.append(nuevaFila);
                    });
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
                
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

    function fn_ActualizarValorConversion(idValorConversion,valorConversion){
        $.ajax({
            url: '/fn_consulta_ActualizarValorConversion',
            method: 'GET',
            data: {
                idValorConversion: idValorConversion,
                valorConversion: valorConversion,
            },
            success: function(response) {
                if (response.success) {
                    Swal({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registro al cliente correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    fn_TraerValorConversion()
                }
            },
            error: function(error) {
                Swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error: Ocurrio un error inesperado durante la operacion',
                  })
                console.error("ERROR",error);
            }
        });
    }

});