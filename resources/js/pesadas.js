import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    
    fn_Consultarpesadas()

    function fn_Consultarpesadas() {

        // Realiza la solicitud AJAX para obtener sugerencias
        $.ajax({
            url: '/fn_consulta_ConsultarPesadas',
            method: 'GET',
            success: function (response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyConsultarPesadas = $('#bodyConsultarPesadas');
                    tbodyConsultarPesadas.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        // Crear una nueva fila
                        let nuevaFila = $('<tr class="Pesadas bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idPesada));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">').append($('<h5 class="min-w-max px-2">').text(obj.nombreCompleto)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.cantidadPes)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.precioPes)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.horaPes)));
                        
                        // Agregar la nueva fila al tbody
                        tbodyConsultarPesadas.append(nuevaFila);
                    });
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }

            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });

    };
});