import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function($) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const fechaHoy = new Date().toISOString().split('T')[0];
        
    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReportePorCliente').val(fechaHoy);
    $('#fechaHastaReportePorCliente').val(fechaHoy);
    
    $('#idClientePorReporte').on('input', function () {
        let inputReportePorCliente = $(this).val();
        let contenedorClientes = $('#contenedorClientes');
        contenedorClientes.empty();

        if (inputReportePorCliente.length > 1 || inputReportePorCliente != ""){
            fn_TraerClientesReportePorCliente(inputReportePorCliente)
        }else{
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });

    function fn_TraerClientesReportePorCliente(inputReportePorCliente){

        // Realiza la solicitud AJAX para obtener sugerencias
        $.ajax({
            url: '/fn_consulta_TraerClientesReportePorCliente',
            method: 'GET',
            data: {
                idClientePorReporte: inputReportePorCliente,
            },
            success: function (response) {
                // Limpia las sugerencias anteriores
                let contenedorClientes = $('#contenedorClientes')
                contenedorClientes.empty();

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Iterar sobre los objetos y mostrar sus propiedades como sugerencias
                    response.forEach(function (obj) {
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

                        // Maneja el clic en la sugerencia
                        suggestion.on("click", function () {
                            // Rellena el campo de entrada con el nombre completo
                            $('#idClientePorReporte').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
                            $('#selectedIdCliente').attr("value",obj.idCliente);
                            $('#selectedCodigoCli').attr("value",obj.codigoCli);

                            // Oculta las sugerencias
                            contenedorClientes.addClass('hidden');
                        });

                        contenedorClientes.append(suggestion);
                    });

                    // Muestra las sugerencias
                    contenedorClientes.removeClass('hidden');
                } else {
                    // Oculta las sugerencias si no hay resultados
                    contenedorClientes.addClass('hidden');
                }
            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    };
    fn_TraerReportePorCliente()
    function fn_TraerReportePorCliente(){
        $.ajax({
            url: '/fn_consulta_TraerReportePorCliente',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let tbodyReportePorCliente = $('#bodyReportePorCliente');
                    tbodyReportePorCliente.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        // Crear una nueva fila
                        console.log(obj);
                        let nuevaFila = $('<tr>');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idPesada));
                        nuevaFila.append($('<td class="text-center border border-gray-400">').text(obj.fechaRegistroPes));
                        /* nuevaFila.append($('<td class="text-center border border-gray-400">').text(obj.segundaEspecie));
                        nuevaFila.append($('<td class="text-center border border-gray-400">').text(obj.terceraEspecie));
                        nuevaFila.append($('<td class="text-center border border-gray-400">').text(obj.cuartaEspecie)); */

                        // Agregar la nueva fila al tbody
                        tbodyReportePorCliente.append(nuevaFila);
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

/* let nuevaFila = $('<tr>');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idPrecio));
                        nuevaFila.append($('<td class="text-center border border-gray-400">').text(obj.primerEspecie));
                        nuevaFila.append($('<td class="text-center border border-gray-400">').text(obj.segundaEspecie));
                        nuevaFila.append($('<td class="text-center border border-gray-400">').text(obj.terceraEspecie));
                        nuevaFila.append($('<td class="text-center border border-gray-400">').text(obj.cuartaEspecie));

                        // Agregar la nueva fila al tbody
                        tbodyReportePorCliente.append(nuevaFila); */