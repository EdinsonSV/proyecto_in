import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const fechaHoy = new Date().toISOString().split('T')[0];

    // Asignar la fecha actual a los inputs
    $('#fechaDesdePesadas').val(fechaHoy);
    $('#fechaHastaPesadas').val(fechaHoy);
    
    fn_ConsultarPesadas()

    function fn_ConsultarPesadas() {

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
                    let tipoUsuario = $('#tipoUsuario').data('id');

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        // Crear una nueva fila
                        let nuevaFila = ""
                        if (obj.estadoPes == 1){
                            nuevaFila = $('<tr class="Pesadas bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">');
                            // Agregar las celdas con la información
                            nuevaFila.append($('<td class="hidden">').text(obj.idPesada));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium whitespace-nowrap">').append($('<h5 class="min-w-max px-2">').text(obj.nombreCompleto)));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.cantidadPes)));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.precioPes)));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.horaPes)));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.fechaRegistroPes)));
                            if (tipoUsuario == 'Administrador'){
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.precioPes)));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.valorConversion)));
                            }
                            nuevaFila.append($('<td class="hidden">').text(obj.estadoPes));
                        }else{
                            if(tipoUsuario =='Administrador'){
                                nuevaFila = $('<tr class="Pesadas bg-red-500 border-b dark:border-gray-700 hover:bg-red-600 cursor-pointer text-gray-50">');

                                // Agregar las celdas con la información
                                nuevaFila.append($('<td class="hidden">').text(obj.idPesada));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium whitespace-nowrap">').append($('<h5 class="min-w-max px-2">').text(obj.nombreCompleto)));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.cantidadPes)));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.precioPes)));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.horaPes)));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.fechaRegistroPes)));
                                if (tipoUsuario == 'Administrador'){
                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.precioPes)));
                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.valorConversion)));
                                }
                                nuevaFila.append($('<td class="hidden">').text(obj.estadoPes));
                            }
                        }
                        
                        // Agregar la nueva fila al tbody
                        tbodyConsultarPesadas.append(nuevaFila);
                    });

                    if (response.length == 0) {
                        tbodyConsultarPesadas.html(`<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
                    }

                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }

            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });

    };

    $('#filtroNombrePesadas, #filtroCantidadPesadas, #filtrarPesadasEliminadas').on('input change', function() {
        var nombreFiltrar = $('#filtroNombrePesadas').val().toUpperCase(); // Obtiene el valor del campo de filtro de nombre
        var cantidadFiltrar = $('#filtroCantidadPesadas').val(); // Obtiene el valor del campo de filtro de cantidad
        var filtrarEliminadas = $('#filtrarPesadasEliminadas').is(':checked'); // Verifica si el checkbox está marcado
    
        // Mostrar todas las filas
        $('#tablaConsultarPesadas tbody tr').show();
    
        // Filtrar por nombre si se proporciona un valor
        if (nombreFiltrar) {
            $('#tablaConsultarPesadas tbody tr').each(function() {
                var nombre = $(this).find('td:eq(1)').text().toUpperCase().trim();
                if (nombre.indexOf(nombreFiltrar) === -1) {
                    $(this).hide();
                }
            });
        }
    
        // Filtrar por cantidad si se proporciona un valor
        if (cantidadFiltrar) {
            $('#tablaConsultarPesadas tbody tr').each(function() {
                var cantidad = $(this).find('td:eq(2)').text().trim();
                if (cantidad !== cantidadFiltrar) {
                    $(this).hide();
                }
            });
        }
    
        // Filtrar pesadas eliminadas si el checkbox está marcado
        if (filtrarEliminadas) {
            $('#tablaConsultarPesadas tbody tr').each(function() {
                var columna9 = $(this).find('td:eq(8)').text().trim(); // Considerando que la columna es la 9 (índice 8)
                if (columna9 !== '0') {
                    $(this).hide();
                }
            });
        }
    });    

    $('#filtrarPesadasDesdeHasta').on('click', function () {
        let fechaDesdePesadas = $('#fechaDesdePesadas').val();
        let fechaHastaPesadas = $('#fechaHastaPesadas').val();
        fn_ConsultarPesadasDesdeHasta(fechaDesdePesadas,fechaHastaPesadas);
        $('#filtroNombrePesadas').val("");
        $('#filtroCantidadPesadas').val("");

    });
    
    function fn_ConsultarPesadasDesdeHasta(fechaDesdePesadas,fechaHastaPesadas) {

        // Realiza la solicitud AJAX para obtener sugerencias
        $.ajax({
            url: '/fn_consulta_ConsultarPesadasDesdeHasta',
            method: 'GET',
            data:{
                fechaDesde : fechaDesdePesadas,
                fechaHasta : fechaHastaPesadas,
            },
            success: function (response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyConsultarPesadas = $('#bodyConsultarPesadas');
                    tbodyConsultarPesadas.empty();
                    let tipoUsuario = $('#tipoUsuario').data('id');

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        // Crear una nueva fila
                        let nuevaFila = ""
                        if (obj.estadoPes == 1){
                            nuevaFila = $('<tr class="Pesadas bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">');
                            // Agregar las celdas con la información
                            nuevaFila.append($('<td class="hidden">').text(obj.idPesada));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium whitespace-nowrap">').append($('<h5 class="min-w-max px-2">').text(obj.nombreCompleto)));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.cantidadPes)));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.precioPes)));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.horaPes)));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.fechaRegistroPes)));
                            if (tipoUsuario == 'Administrador'){
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.precioPes)));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.valorConversion)));
                            }
                            nuevaFila.append($('<td class="hidden">').text(obj.estadoPes));
                        }else{
                            if(tipoUsuario =='Administrador'){
                                nuevaFila = $('<tr class="Pesadas bg-red-500 border-b dark:border-gray-700 hover:bg-red-600 cursor-pointer text-gray-50">');

                                // Agregar las celdas con la información
                                nuevaFila.append($('<td class="hidden">').text(obj.idPesada));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium whitespace-nowrap">').append($('<h5 class="min-w-max px-2">').text(obj.nombreCompleto)));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.cantidadPes)));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.precioPes)));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.horaPes)));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.fechaRegistroPes)));
                                if (tipoUsuario == 'Administrador'){
                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.precioPes)));
                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.valorConversion)));
                                }
                                nuevaFila.append($('<td class="hidden">').text(obj.estadoPes));
                            }
                        }
                        
                        // Agregar la nueva fila al tbody
                        tbodyConsultarPesadas.append(nuevaFila);
                    });

                    if (response.length == 0) {
                        tbodyConsultarPesadas.html(`<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
                    }

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