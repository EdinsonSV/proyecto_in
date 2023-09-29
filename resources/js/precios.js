import jQuery from 'jquery';
import Swal from 'sweetalert';

window.$ = jQuery;

jQuery(function($) {
    function fn_TraerPreciosXPresentacion(){
        $.ajax({
            url: '/fn_consulta_TraerPreciosXPresentacion',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyPrecios = $('#bodyPreciosXPresentacion');
                    tbodyPrecios.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        // Crear una nueva fila
                        let nuevaFila = $('<tr class="editPrecioXPresentacion">');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idPrecio));
                        nuevaFila.append($('<td class="text-center border border-gray-400">').text(obj.nombreCompleto));
                        nuevaFila.append($('<td class="text-center border border-gray-400 cursor-pointer">').text(obj.primerEspecie));
                        nuevaFila.append($('<td class="text-center border border-gray-400 cursor-pointer">').text(obj.segundaEspecie));
                        nuevaFila.append($('<td class="text-center border border-gray-400 cursor-pointer">').text(obj.terceraEspecie));
                        nuevaFila.append($('<td class="text-center border border-gray-400 cursor-pointer">').text(obj.cuartaEspecie));

                        // Agregar la nueva fila al tbody
                        tbodyPrecios.append(nuevaFila);
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