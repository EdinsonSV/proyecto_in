import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function ($) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const fechaHoy = new Date().toISOString().split('T')[0];

    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReportePorCliente').val(fechaHoy);
    $('#fechaHastaReportePorCliente').val(fechaHoy);

    declarar_especies();

    var primerEspecieGlobal = 0
    var segundaEspecieGlobal = 0
    var terceraEspecieGlobal = 0
    var cuartaEspecieGlobal = 0

    var nombrePrimerEspecieGlobal = ""
    var nombreSegundaEspecieGlobal = ""
    var nombreTerceraEspecieGlobal = ""
    var nombreCuartaEspecieGlobal = ""

    function declarar_especies(){
        $.ajax({
            url: '/fn_consulta_DatosEspecie',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Iterar sobre los objetos y mostrar sus propiedades
                    primerEspecieGlobal = parseInt(response[0].idEspecie);
                    segundaEspecieGlobal  = parseInt(response[1].idEspecie);
                    terceraEspecieGlobal = parseInt(response[2].idEspecie);
                    cuartaEspecieGlobal = parseInt(response[3].idEspecie);

                    nombrePrimerEspecieGlobal = response[0].nombreEspecie;
                    nombreSegundaEspecieGlobal = response[1].nombreEspecie;
                    nombreTerceraEspecieGlobal = response[2].nombreEspecie;
                    nombreCuartaEspecieGlobal = response[3].nombreEspecie;
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

    $('#idClientePorReporte').on('input', function () {
        let inputReportePorCliente = $(this).val();
        let contenedorClientes = $('#contenedorClientes');
        contenedorClientes.empty();

        if (inputReportePorCliente.length > 1 || inputReportePorCliente != "") {
            fn_TraerClientesReportePorCliente(inputReportePorCliente)
        } else {
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });
    
    $('#btnBuscarReportePorCliente').on('click', function () {
        let inputReportePorCliente = $('#idClientePorReporte').val();
        if (inputReportePorCliente.length > 1 || inputReportePorCliente != "") {
            let fechaDesde = $('#fechaDesdeReportePorCliente').val();
            let fechaHasta = $('#fechaHastaReportePorCliente').val();
            let codigoCliente = $('#selectedCodigoCli').attr("value");
            fn_TraerReportePorCliente(fechaDesde,fechaHasta,codigoCliente)
        } else {
            alertify.notify('Debe seleccionar un cliente.', 'error', 2);
        }
    });

    function fn_TraerClientesReportePorCliente(inputReportePorCliente) {

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
                            $('#selectedIdCliente').attr("value", obj.idCliente);
                            $('#selectedCodigoCli').attr("value", obj.codigoCli);

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

    function fn_TraerReportePorCliente(fechaDesde,fechaHasta,codigoCliente) {
        $.ajax({
            url: '/fn_consulta_TraerReportePorCliente',
            method: 'GET',
            data: {
                fechaDesde : fechaDesde,
                fechaHasta : fechaHasta,
                codigoCliente : codigoCliente,
            },
            success: function (response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    let bodyReportePorCliente="";

                    let tbodyReportePorCliente = $('#bodyReportePorCliente');
                    tbodyReportePorCliente.empty();

                    let fechasUnicas = new Set();
                    let sinRepetidos = response.filter((valorActual) => {
                        let fechaInicioString = JSON.stringify(valorActual.fechaRegistroPes);
                        if (!fechasUnicas.has(fechaInicioString)) {
                            fechasUnicas.add(fechaInicioString);
                            return true;
                        }
                        return false;
                    });

                    sinRepetidos.forEach(function (item) {
                        let totalPesoPrimerEspecie = 0;
                        let totalPesoSegundaEspecie = 0;
                        let totalPesoTerceraEspecie = 0;
                        let totalPesoCuartaEspecie = 0;

                        let totalCantidadPrimerEspecie = 0;
                        let totalCantidadSegundaEspecie = 0;
                        let totalCantidadTerceraEspecie = 0;
                        let totalCantidadCuartaEspecie = 0;

                        let ventaTotalCantidadNeto = 0;
                        let ventaTotalPesoNeto = 0;
                        let ventaTotalPesoVivo = 0;
                        bodyReportePorCliente += construirFilaFecha(item);

                        response.forEach(function (subItem) {
                            if (item.fechaRegistroPes === subItem.fechaRegistroPes) {
                                bodyReportePorCliente += construirFilaDatos(subItem);

                                let nombreEspecie = subItem.nombreEspecie;
                                let cantidadPes = parseInt(subItem.cantidadPes);
                                let pesoNetoPes = parseFloat(subItem.pesoNetoPes).toFixed(2);
                                let valorConversion = parseFloat(subItem.valorConversion).toFixed(3);

                                if (nombreEspecie == nombrePrimerEspecieGlobal) {
                                    totalPesoPrimerEspecie += parseFloat(pesoNetoPes);
                                    totalCantidadPrimerEspecie += cantidadPes;
                                } else if (nombreEspecie == nombreSegundaEspecieGlobal) {
                                    totalPesoSegundaEspecie += parseFloat(pesoNetoPes);
                                    totalCantidadSegundaEspecie += cantidadPes;
                                } else if (nombreEspecie == nombreTerceraEspecieGlobal) {
                                    totalPesoTerceraEspecie += parseFloat(pesoNetoPes);
                                    totalCantidadTerceraEspecie += cantidadPes;
                                } else if (nombreEspecie == nombreCuartaEspecieGlobal) {
                                    totalPesoCuartaEspecie += parseFloat(pesoNetoPes);
                                    totalCantidadCuartaEspecie += cantidadPes;
                                }

                                ventaTotalCantidadNeto += cantidadPes;
                                ventaTotalPesoNeto += parseFloat(pesoNetoPes);
                                ventaTotalPesoVivo += parseFloat(pesoNetoPes) / parseFloat(valorConversion);
                            }
                        });
                        bodyReportePorCliente += `
                            <tr class="bg-white dark:bg-gray-800 h-0.5">
                                <td class="text-center" colspan="2"></td>
                                <td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="4"></td>
                            </tr>
                        `
                        bodyReportePorCliente += construirFilaTotales(
                            totalPesoPrimerEspecie,
                            totalPesoSegundaEspecie,
                            totalPesoTerceraEspecie,
                            totalPesoCuartaEspecie,
                            totalCantidadPrimerEspecie,
                            totalCantidadSegundaEspecie,
                            totalCantidadTerceraEspecie,
                            totalCantidadCuartaEspecie,
                            ventaTotalCantidadNeto,
                            ventaTotalPesoNeto,
                            ventaTotalPesoVivo
                        );
                    });

                    if (response.length > 0) {
                        tbodyReportePorCliente.html(bodyReportePorCliente);
                    }else {
                        tbodyReportePorCliente.html(`<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="7" class="text-center">No hay datos</td></tr>`);
                        alertify.notify('No se encontraron registros.', 'error', 2);
                    }


                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }

            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    }

    function construirFilaFecha(item) {
        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${item.fechaRegistroPes}</h5></td>
                <td class="text-center py-1 px-2"></td>
                <td class="text-center py-1 px-2"></td>
                <td class="text-center py-1 px-2"></td>
                <td class="text-center py-1 px-2"></td>
                <td class="text-center py-1 px-2"></td>
            </tr>
        `;
    }

    function construirFilaDatos(item) {
        let horaPes = item.horaPes
        let nombreEspecie = item.nombreEspecie
        let cantidadPes = parseInt(item.cantidadPes)
        let pesoNetoPes = parseFloat(item.pesoNetoPes).toFixed(2)

        let promedio = (pesoNetoPes / cantidadPes).toFixed(2);
        let observacionPes = item.observacionPes
        observacionPes = ""

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="hidden">${item.idPesada}</td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${observacionPes}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${horaPes}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${nombreEspecie}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${cantidadPes}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${pesoNetoPes}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${promedio}</h5></td>
            </tr>
        `;
    }

    function construirFilaTotales(
        totalPesoPrimerEspecie,
        totalPesoSegundaEspecie,
        totalPesoTerceraEspecie,
        totalPesoCuartaEspecie,
        totalCantidadPrimerEspecie,
        totalCantidadSegundaEspecie,
        totalCantidadTerceraEspecie,
        totalCantidadCuartaEspecie,
        ventaTotalCantidadNeto,
        ventaTotalPesoNeto,
        ventaTotalPesoVivo) 
    {
        let filas = [];
    
        function construirFila(nombreEspecie, totalCantidad, totalPeso) {
            if (totalCantidad !== 0 || totalPeso !== 0) {       
                return `
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td class="text-center py-1 px-2"></td>
                        <td class="text-center py-1 px-2"></td>
                        <td class="text-center py-1 px-2"><h5 class="min-w-max">TOTAL ${nombreEspecie}:</h5></td>
                        <td class="text-center py-1 px-2"><h5 class="min-w-max">${totalCantidad === 1 ? `${totalCantidad} Ud.` : `${totalCantidad} Uds.`}</h5></td>
                        <td class="text-center py-1 px-2"><h5 class="min-w-max">${totalPeso.toFixed(2)} Kg.</h5></td>
                        <td class="text-center py-1 px-2"></td>
                    </tr>
                `;
            } else {
                return '';
            }
        }        
    
        filas.push(construirFila(nombrePrimerEspecieGlobal, totalCantidadPrimerEspecie, totalPesoPrimerEspecie));
        filas.push(construirFila(nombreSegundaEspecieGlobal, totalCantidadSegundaEspecie, totalPesoSegundaEspecie));
        filas.push(construirFila(nombreTerceraEspecieGlobal, totalCantidadTerceraEspecie, totalPesoTerceraEspecie));
        filas.push(construirFila(nombreCuartaEspecieGlobal, totalCantidadCuartaEspecie, totalPesoCuartaEspecie));
        
        filas.push(`
            <tr class="bg-white dark:bg-gray-800 h-0.5">
                <td class="text-center" colspan="2"></td>
                <td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="4"></td>
            </tr>
        `);

        filas.push(`
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2"></td>
                <td class="text-center py-1 px-2"></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">TOTAL NETO:</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${ventaTotalCantidadNeto === 1 ? `${ventaTotalCantidadNeto} Ud.` : `${ventaTotalCantidadNeto} Uds.`}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${ventaTotalPesoNeto.toFixed(2)} Kg.</h5></td>
                <td class="text-center py-1 px-2"></td>
            </tr>
        `);

        filas.push(`
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="text-center py-1 px-2"></td>
            <td class="text-center py-1 px-2"></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max">PESO VIVO:</h5></td>
            <td class="text-center py-1 px-2"></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max">${ventaTotalPesoVivo.toFixed(2)} Kg.</h5></td>
            <td class="text-center py-1 px-2"></td>
        </tr>
        `);

        return filas.join('');
    }

});