import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function($) {

    fn_TraerPreciosXPresentacion()

    /* ============ Eventos ============ */

    $(document).on("dblclick", "#tablaPreciosXPresentacion #bodyPreciosXPresentacion tr td.precioColumna", function() {
        let fila = $(this).closest('tr');
        let idPrecioXPresentacion = fila.find('td:eq(0)').text();
        let nombrevalorConversion = fila.find('td:eq(1)').text();
        let nuevoPrecioXPresentacion = $(this).text();
        let idPresentacion = $(this).data('columna');
        let nombreColumna = $(this).closest('table').find('th:eq(' + (parseInt(idPresentacion)+1) + ')').text();
        
        $('#ModalPreciosXPresentacion').removeClass('hidden');
        $('#ModalPreciosXPresentacion').addClass('flex');
        $('#nombrePrecioXPresentacion').html(nombrevalorConversion);
        $('#idClientePrecioXPresentacion').val(idPrecioXPresentacion);
        $('#nuevoValorPrecioXPresentacion').val(nuevoPrecioXPresentacion);
        $('#idEspeciePrecioXActualizar').val(idPresentacion);
        $('#nombrePresentacionModal').html(nombreColumna);
        $('#nuevoValorPrecioXPresentacion').focus();
    });

    $('.cerrarModalPreciosXPresentacion, .modal-content').on('click', function (e) {
        if (e.target === this) {
            $('#ModalPreciosXPresentacion').addClass('hidden');
            $('#ModalPreciosXPresentacion').removeClass('flex');
        }
    });

    /* ============ Funciones ============ */

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
                        nuevaFila.append($('<td class="text-center border border-gray-400 cursor-pointer precioColumna" data-columna="1">').text(obj.primerEspecie));
                        nuevaFila.append($('<td class="text-center border border-gray-400 cursor-pointer precioColumna" data-columna="2">').text(obj.segundaEspecie));
                        nuevaFila.append($('<td class="text-center border border-gray-400 cursor-pointer precioColumna" data-columna="3">').text(obj.terceraEspecie));
                        nuevaFila.append($('<td class="text-center border border-gray-400 cursor-pointer precioColumna" data-columna="4">').text(obj.cuartaEspecie));

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