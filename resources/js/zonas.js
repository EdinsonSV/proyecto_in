import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    
    fn_ConsultarZonas()

    function fn_ConsultarZonas() {
        $.ajax({
        url: '/fn_consulta_ConsultarZonas',
            method: 'GET',
            success: function (response) {
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyZonas = $('#bodyConsultarZonas');
                    tbodyZonas.empty();
                    let contadorZonas = 0

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        // Crear una nueva fila
                        let nuevaFila = $('<tr class="tblZonas bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idZona));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').text(obj.nombreZon));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.cantidadClientesZona));
                        // Agregar la nueva fila al tbody
                        tbodyZonas.append(nuevaFila);
                        contadorZonas += 1
                    });
                    $("#contadorZonas").html(contadorZonas);
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
                
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

    $('.cerrarModalZonas').on('click', function (e) {
        if (e.target === this) {
            $('#ModalZonas').addClass('hidden');
            $('#ModalZonas').removeClass('flex');
        }
    });

    $('#registrar_agregarZona').on('click', function (e) {
        $('#ModalZonas').addClass('flex');
        $('#ModalZonas').removeClass('hidden');
        $('#agregarZona').focus();
    });
});