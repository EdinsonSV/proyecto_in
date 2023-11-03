import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const fechaHoy = new Date().toISOString().split('T')[0];

    // Asignar la fecha actual a los inputs
    $('#fechaDesdePesadas').val(fechaHoy);
    $('#fechaHastaPesadas').val(fechaHoy);
    
    fn_ConsultarPesadasDesdeHasta(fechaHoy,fechaHoy);
    DataTableED('#tablaConsultarPesadas');

    $('#filtroNombrePesadas, #filtroCantidadPesadas, #filtrarPesadasEliminadas').on('input change', function() {
        let nombreFiltrar = $('#filtroNombrePesadas').val().toUpperCase();
        let cantidadFiltrar = $('#filtroCantidadPesadas').val().replace(/[^0-9]/g, '');
        let filtrarEliminadas = $('#filtrarPesadasEliminadas').is(':checked');

        $('#filtroCantidadPesadas').val(cantidadFiltrar); // Actualiza el campo de cantidad con el valor filtrado

        $('#tablaConsultarPesadas tbody tr').show();

        if (nombreFiltrar) {
            $('#tablaConsultarPesadas tbody tr').each(function() {
                let nombre = $(this).find('td:eq(1)').text().toUpperCase().trim();
                if (nombre.indexOf(nombreFiltrar) === -1) {
                    $(this).hide();
                }
            });
        }

        if (cantidadFiltrar) {
            $('#tablaConsultarPesadas tbody tr').each(function() {
                let cantidad = $(this).find('td:eq(3)').text().trim();
                if (cantidad !== cantidadFiltrar) {
                    $(this).hide();
                }
            });
        }

        if (filtrarEliminadas) {
            $('#tablaConsultarPesadas tbody tr').each(function() {
                let columna9 = $(this).find('td:eq(9)').text().trim();
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
                            if (parseInt(obj.cantidadPes) <= 0 && parseInt(obj.numeroJabasPes) > 0){
                                nuevaFila = $('<tr class="Pesadas bg-[#2A80BF] border-b dark:border-gray-700 hover:bg-[#2877B0] cursor-pointer text-gray-50">');
                            }else{
                                nuevaFila = $('<tr class="Pesadas bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">');
                            }
                            // Agregar las celdas con la información
                            nuevaFila.append($('<td class="hidden">').text(obj.idPesada));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium whitespace-nowrap">').append($('<h5 class="min-w-max px-2">').text(obj.nombreCompleto)));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.nombreEspecie)));
                            if (parseInt(obj.cantidadPes) <= 0 && parseInt(obj.numeroJabasPes) > 0){
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.numeroJabasPes+" T")));
                            }else{
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.cantidadPes)));
                            }
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.pesoNetoPes)));
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
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.nombreEspecie)));
                                if (parseInt(obj.cantidadPes) <= 0 && parseInt(obj.numeroJabasPes) > 0){
                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.numeroJabasPes+" T")));
                                }else{
                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.cantidadPes)));
                                }
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.pesoNetoPes)));
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