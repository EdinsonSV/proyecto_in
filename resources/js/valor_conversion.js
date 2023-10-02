import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function($) {

    fn_TraerValorConversion()

    /* ============ Eventos ============ */

    $(document).on("dblclick", "#valoresDeConversiones .editValorConversion", function() {
        let fila = $(this).closest('tr');
        let idValorConversion = fila.find('td:eq(0)').text();
        let nombrevalorConversion = fila.find('td:eq(1)').text();
        let valorConversion = fila.find('td:eq(2)').text();
        
        $('#ModalValorDeConversion').removeClass('hidden');
        $('#ModalValorDeConversion').addClass('flex');
        $('#nombreClienteValorDeConversion').html(nombrevalorConversion);
        $('#idClienteValorDeConversion').val(idValorConversion);
        $('#nuevoValorDeConversion').val(valorConversion);
        $('#nuevoValorDeConversion').focus();
    });

    $('.cerrarModalValorDeConversion, .modal-content').on('click', function (e) {
        if (e.target === this) {
            $('#ModalValorDeConversion').addClass('hidden');
            $('#ModalValorDeConversion').removeClass('flex');
        }
    });

    $('#btnActualizarValorDeConversion').on('click', function () {
        let idClienteActualizarConversion = $('#idClienteValorDeConversion').val();
        let valorActualizarConversion = $('#nuevoValorDeConversion').val();
        fn_ActualizarValorConversion(idClienteActualizarConversion, valorActualizarConversion);
        $('#ModalValorDeConversion').addClass('hidden');
        $('#ModalValorDeConversion').removeClass('flex');
    });

    $('#nuevoValorDeConversion').on('input', function() {
        let inputValue = $(this).val();
    
        // Remover caracteres que no sean números o puntos
        inputValue = inputValue.replace(/[^0-9.]/g, '');
    
        // Asegurarse de que no haya más de un punto decimal
        inputValue = inputValue.replace(/(\..*)\./g, '$1');
    
        // Separar parte entera y decimal
        let parts = inputValue.split('.');
    
        // Si hay más de tres dígitos en la parte decimal, recortar a tres
        if (parts[1] && parts[1].length > 3) {
            parts[1] = parts[1].slice(0, 3);
        }
    
        // Si hay más de un punto en la cadena, mantener solo el primero
        if (parts.length > 2) {
            parts = [parts[0], parts.slice(1).join('.')];
        }
    
        // Si la parte decimal está vacía y hay más de un dígito en la parte entera, agregar punto decimal
        if (!parts[1] && parts[0].length > 1) {
            parts = [parts[0].slice(0, -1), parts[0].slice(-1)];
        }
    
        // Actualizar el valor del input
        inputValue = parts.join('.');
        $(this).val(inputValue);
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
                        nuevaFila.append($('<td class="text-center border border-gray-400">').text(obj.nombreCompleto));
                        nuevaFila.append($('<td class="text-center border border-gray-400 cursor-pointer">').text(obj.valorConversion));
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
                    $('#valoresDeConversiones tr').each(function () {
                        let idFila = $(this).find('td:eq(0)').text();
                        if (idFila === idValorConversion) {
                            $(this).find('td:eq(2)').text(parseFloat(valorConversion).toFixed(3));
                            return false;
                        }
                    });                    
                    
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizo el valor de conversión correctamente',
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