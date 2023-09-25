import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    fn_TraerValorConversion()

    /* ============ Eventos ============ */

    $("#DivValoresDeConversion").on("click", function () {
        let fila = $(this).closest('tr');
        let idValorConversion = fila.find('td:eq(0)').text();

        console.log(idValorConversion)

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
                        let nuevaFila = $('<tr>');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idPrecio));
                        nuevaFila.append($('<td class="text-center border border-gray-400">').text(obj.nombreCompleto)); // Reemplaza 'propiedad1' por el nombre de tu propiedad
                        nuevaFila.append($('<td class="text-center border border-gray-400 cursor-pointer editValorConversion">').text(obj.valorConversion)); // Reemplaza 'propiedad2' por el nombre de tu propiedad
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

});