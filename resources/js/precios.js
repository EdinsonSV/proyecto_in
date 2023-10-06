import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function($) {

    fn_TraerPreciosXPresentacion()

    /* ============ Eventos ============ */

    $(document).on("dblclick", "#tablaPreciosXPresentacion #bodyPreciosXPresentacion tr td.precioColumna", function() {
        let fila = $(this).closest('tr');
        let idPrecioXPresentacion = fila.find('td:eq(0)').text();
        let nombrePrecioXPresentacion = fila.find('td:eq(1)').text();
        let nuevoPrecioXPresentacion = $(this).text();
        let idPresentacion = $(this).data('columna');
        let nombreColumna = $(this).closest('table').find('th:eq(' + (parseInt(idPresentacion)+1) + ')').text();
        
        $('#ModalPreciosXPresentacion').removeClass('hidden');
        $('#ModalPreciosXPresentacion').addClass('flex');
        $('#nombrePrecioXPresentacion').html(nombrePrecioXPresentacion);
        $('#nombrePresentacionModal').html(nombreColumna);

        $('#nuevoValorPrecioXPresentacion').val(nuevoPrecioXPresentacion);
        $('#idClientePrecioXPresentacion').attr("value",idPrecioXPresentacion);
        $('#idEspeciePrecioXActualizar').attr("value",idPresentacion);
        $('#nuevoValorPrecioXPresentacion').focus();
    });

    $('.cerrarModalPreciosXPresentacion, .modal-content').on('click', function (e) {
        if (e.target === this) {
            $('#ModalPreciosXPresentacion').addClass('hidden');
            $('#ModalPreciosXPresentacion').removeClass('flex');
        }
    });

    $('#btnActualizarPreciosXPresentacion').on('click', function () {

        let idClienteActualizarPrecioXPresentacion = $('#idClientePrecioXPresentacion').attr("value");
        let valorActualizarPrecioXPresentacion = $('#nuevoValorPrecioXPresentacion').val();
        let numeroEspeciePrecioXPresentacion = $('#idEspeciePrecioXActualizar').attr("value");

        console.log(idClienteActualizarPrecioXPresentacion, valorActualizarPrecioXPresentacion,numeroEspeciePrecioXPresentacion);
        
        fn_ActualizarPrecioXPresentacion(idClienteActualizarPrecioXPresentacion, valorActualizarPrecioXPresentacion,numeroEspeciePrecioXPresentacion);
        $('#ModalPreciosXPresentacion').addClass('hidden');
        $('#ModalPreciosXPresentacion').removeClass('flex');
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
                        nuevaFila.append($('<td class="text-center border border-gray-400">').append($('<h5 class="min-w-max px-2">').text(obj.nombreCompleto)));
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

    function fn_ActualizarPrecioXPresentacion(idClienteActualizarPrecioXPresentacion, valorActualizarPrecioXPresentacion,numeroEspeciePrecioXPresentacion){
        $.ajax({
            url: '/fn_consulta_ActualizarPrecioXPresentacion',
            method: 'GET',
            data: {
                idClienteActualizarPrecioXPresentacion: idClienteActualizarPrecioXPresentacion,
                valorActualizarPrecioXPresentacion: valorActualizarPrecioXPresentacion,
                numeroEspeciePrecioXPresentacion: numeroEspeciePrecioXPresentacion,
            },
            success: function(response) {
                if (response.success) {
                    $('#bodyPreciosXPresentacion tr').each(function () {
                        let idFila = $(this).find('td:eq(0)').text();
                        if (idFila == idClienteActualizarPrecioXPresentacion) {
                            $(this).find('td:eq(' + (parseInt(numeroEspeciePrecioXPresentacion)+1) + ')').text(parseFloat(valorActualizarPrecioXPresentacion).toFixed(2));
                            return false;
                        }
                    });                    
                    
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizo el precio correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            },
            error: function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error: Ocurrio un error inesperado durante la operacion',
                  })
                console.error("ERROR",error);
            }
        });
    }

});