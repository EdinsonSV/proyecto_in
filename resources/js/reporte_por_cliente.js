import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function ($) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const fechaHoy = new Date().toISOString().split('T')[0];

    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReportePorCliente').val(fechaHoy);
    $('#fechaHastaReportePorCliente').val(fechaHoy);
    var tipoUsuario = $('#tipoUsuario').data('id');

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
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

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

                        let ventaTotalPesoVivoPrimerEspecie = 0;
                        let ventaTotalPesoVivoSegundaEspecie = 0;
                        let ventaTotalPesoVivoTerceraEspecie = 0;
                        let ventaTotalPesoVivoCuartaEspecie = 0;

                        let ventaPesoTotalNeto = 0
                        let ventaPesoTotalVivo = 0
                        let ventaCantidadTotal = 0

                        bodyReportePorCliente += construirFilaFecha(item);

                        response.forEach(function (subItem) {
                            if (item.fechaRegistroPes === subItem.fechaRegistroPes) {
                                bodyReportePorCliente += construirFilaDatos(subItem);

                                let nombreEspecie = subItem.nombreEspecie;
                                let cantidadPes = parseInt(subItem.cantidadPes);
                                let pesoNetoPes = parseFloat(subItem.pesoNetoPes).toFixed(2);
                                let valorConversion = parseFloat(subItem.valorConversion).toFixed(3);

                                if (nombreEspecie == nombrePrimerEspecieGlobal) {
                                    totalCantidadPrimerEspecie += cantidadPes;
                                    totalPesoPrimerEspecie += parseFloat(pesoNetoPes);
                                    ventaTotalPesoVivoPrimerEspecie += parseFloat(pesoNetoPes) / parseFloat(valorConversion);
                                } else if (nombreEspecie == nombreSegundaEspecieGlobal) {
                                    totalCantidadSegundaEspecie += cantidadPes;
                                    totalPesoSegundaEspecie += parseFloat(pesoNetoPes);
                                    ventaTotalPesoVivoSegundaEspecie += parseFloat(pesoNetoPes) / parseFloat(valorConversion);
                                } else if (nombreEspecie == nombreTerceraEspecieGlobal) {
                                    totalCantidadTerceraEspecie += cantidadPes;
                                    totalPesoTerceraEspecie += parseFloat(pesoNetoPes);
                                    ventaTotalPesoVivoTerceraEspecie += parseFloat(pesoNetoPes) / parseFloat(valorConversion);
                                } else if (nombreEspecie == nombreCuartaEspecieGlobal) {
                                    totalCantidadCuartaEspecie += cantidadPes;
                                    totalPesoCuartaEspecie += parseFloat(pesoNetoPes);
                                    ventaTotalPesoVivoCuartaEspecie += parseFloat(pesoNetoPes) / parseFloat(valorConversion);
                                }
                                ventaPesoTotalNeto += parseFloat(pesoNetoPes);
                                ventaPesoTotalVivo += parseFloat(pesoNetoPes) / parseFloat(valorConversion);
                                ventaCantidadTotal += cantidadPes;
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
                            ventaTotalPesoVivoPrimerEspecie,
                            ventaTotalPesoVivoSegundaEspecie,
                            ventaTotalPesoVivoTerceraEspecie,
                            ventaTotalPesoVivoCuartaEspecie,
                            ventaPesoTotalNeto,
                            ventaPesoTotalVivo,
                            ventaCantidadTotal
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
                <td class="text-center py-1 px-2 whitespace-nowrap">${item.fechaRegistroPes}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            </tr>
        `;
    }

    function construirFilaDatos(item) {
        let horaPes = item.horaPes
        let nombreEspecie = item.nombreEspecie
        let cantidadPes = parseInt(item.cantidadPes)
        let pesoNetoPes = parseFloat(item.pesoNetoPes).toFixed(2)

        let promedio = 0;
        if (pesoNetoPes !== 0) {
            promedio = (pesoNetoPes / cantidadPes).toFixed(2);
        }
        let observacionPes = item.observacionPes
        if (observacionPes != ""){
            observacionPes = `
            <div class="observacionPesHover relative">       
                <button type="button" class="text-gray-900 dark:text-gray-400"><i class='bx bx-info-circle'></i></button>
                <div class="absolute z-[1000000] top-0 right-0 max-w-[256px] w-full text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                    <div class="px-3 py-2">
                        <p>${observacionPes}</p>
                    </div>
                </div>
            </div>`
        }else{
            observacionPes = "";
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="hidden">${item.idPesada}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${observacionPes}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${horaPes}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreEspecie}</td>
                <td class="text-center py-1 px-2 cantidadReportePorCliente whitespace-nowrap">${cantidadPes}</td>
                <td class="text-center py-1 px-2 pesoReportePorCliente whitespace-nowrap">${pesoNetoPes}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${promedio}</td>
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
        ventaTotalPesoVivoPrimerEspecie,
        ventaTotalPesoVivoSegundaEspecie,
        ventaTotalPesoVivoTerceraEspecie,
        ventaTotalPesoVivoCuartaEspecie,
        ventaPesoTotalNeto,
        ventaPesoTotalVivo,
        ventaCantidadTotal)
    {
        let filas = [];
    
        function construirFila(nombreEspecie, totalCantidad, totalPeso) {
            if (totalCantidad !== 0 || totalPeso !== 0) {       
                return `
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                        <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                        <td class="text-center py-1 px-2 whitespace-nowrap">TOTAL ${nombreEspecie.replace("POLLO", "").trim()}:</td>
                        <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad === 1 ? `${totalCantidad} Ud.` : `${totalCantidad} Uds.`}</td>
                        <td class="text-center py-1 px-2 whitespace-nowrap">${totalPeso.toFixed(2)}</td>
                        <td class="text-center py-1 px-2 whitespace-nowrap"></td>
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

        function construirFilaVivo(nombreEspecie, totalCantidad, totalPeso) {
            if (totalCantidad !== 0 || totalPeso !== 0) {       
                return `
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                        <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                        <td class="text-center py-1 px-2 whitespace-nowrap">TOTAL VIVO ${nombreEspecie.replace("POLLO", "").trim()}:</td>
                        <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad === 1 ? `${totalCantidad} Ud.` : `${totalCantidad} Uds.`}</td>
                        <td class="text-center py-1 px-2 whitespace-nowrap">${totalPeso.toFixed(2)} Kg.</td>
                        <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                    </tr>
                `;
            } else {
                return '';
            }
        }
        
        filas.push(construirFilaVivo(nombrePrimerEspecieGlobal, totalCantidadPrimerEspecie, ventaTotalPesoVivoPrimerEspecie));
        filas.push(construirFilaVivo(nombreSegundaEspecieGlobal, totalCantidadSegundaEspecie, ventaTotalPesoVivoSegundaEspecie));
        filas.push(construirFilaVivo(nombreTerceraEspecieGlobal, totalCantidadTerceraEspecie, ventaTotalPesoVivoTerceraEspecie));
        filas.push(construirFilaVivo(nombreCuartaEspecieGlobal, totalCantidadCuartaEspecie, ventaTotalPesoVivoCuartaEspecie));

        filas.push(`
            <tr class="bg-white dark:bg-gray-800 h-0.5">
                <td class="text-center" colspan="2"></td>
                <td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="4"></td>
            </tr>
        `);

        filas.push(`
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">TOTAL NETO:</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${ventaCantidadTotal === 1 ? `${ventaCantidadTotal} Ud.` : `${ventaCantidadTotal} Uds.`}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${ventaPesoTotalNeto.toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            </tr>
        `);

        filas.push(`
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap">TOTAL VIVO:</td>
            <td class="text-center py-1 px-2 whitespace-nowrap">${ventaCantidadTotal === 1 ? `${ventaCantidadTotal} Ud.` : `${ventaCantidadTotal} Uds.`}</td>
            <td class="text-center py-1 px-2 whitespace-nowrap">${ventaPesoTotalVivo.toFixed(2)} Kg.</td>
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
        </tr>
        `);

        return filas.join('');
    }

    $('.cerrarModalCantidadReportePorCliente, .modal-content').on('click', function (e) {
        if (e.target === this) {
            $('#ModalCantidadReportePorCliente').addClass('hidden');
            $('#ModalCantidadReportePorCliente').removeClass('flex');
        }
    });

    $('.cerrarModalPesoReportePorCliente, .modal-content').on('click', function (e) {
        if (e.target === this) {
            $('#ModalPesoReportePorCliente').addClass('hidden');
            $('#ModalPesoReportePorCliente').removeClass('flex');
        }
    });

    $(document).on('input', '#nuevoCantidadReportePorCliente', function () {
        let inputValue = $(this).val();
        inputValue = inputValue.replace(/[^0-9]/g, '');

        $(this).val(inputValue);
    });

    $(document).on("dblclick", "#tablaReportePorCliente tr td.cantidadReportePorCliente", function() {
        if (tipoUsuario =='Administrador'){
            let fila = $(this).closest('tr');
            let idCantidadReportePorCliente = fila.find('td:eq(0)').text();
            let cantidadReportePorCliente = fila.find('td:eq(4)').text();
            
            $('#ModalCantidadReportePorCliente').addClass('flex');
            $('#ModalCantidadReportePorCliente').removeClass('hidden');
    
            $('#idCantidadReportePorCliente').attr("value",idCantidadReportePorCliente);
            $('#nuevoCantidadReportePorCliente').val(cantidadReportePorCliente);
            $('#nuevoCantidadReportePorCliente').focus();
        }
    });

    $(document).on("dblclick", "#tablaReportePorCliente tr td.pesoReportePorCliente", function() {
        if (tipoUsuario =='Administrador'){
            let fila = $(this).closest('tr');
            let idPesoReportePorCliente = fila.find('td:eq(0)').text();
            let pesoReportePorCliente = fila.find('td:eq(5)').text();
            
            $('#ModalPesoReportePorCliente').addClass('flex');
            $('#ModalPesoReportePorCliente').removeClass('hidden');

            $('#idPesoReportePorCliente').attr("value",idPesoReportePorCliente);
            $('#nuevoPesoReportePorCliente').val(pesoReportePorCliente);
            $('#nuevoPesoReportePorCliente').focus();
        }
    });

    $('#btnActualizarCantidadReportePorCliente').on('click', function () {
        let idCodigoPesada = $('#idCantidadReportePorCliente').attr("value");
        let nuevoCantidadReportePorCliente = $('#nuevoCantidadReportePorCliente').val();
        fn_ActualizarCantidadReportePorCliente(idCodigoPesada, nuevoCantidadReportePorCliente);
    });

    $('#btnActualizarPesoReportePorCliente').on('click', function () {
        let idCodigoPesada = $('#idPesoReportePorCliente').attr("value");
        let nuevoPesoReportePorCliente = $('#nuevoPesoReportePorCliente').val();
        fn_ActualizarPesoReportePorCliente(idCodigoPesada, nuevoPesoReportePorCliente);
    });

    function fn_ActualizarCantidadReportePorCliente(idCodigoPesada, nuevoCantidadReportePorCliente){
        $.ajax({
            url: '/fn_consulta_ActualizarCantidadReportePorCliente',
            method: 'GET',
            data: {
                idCodigoPesada: idCodigoPesada,
                nuevoCantidadReportePorCliente: nuevoCantidadReportePorCliente,
            },
            success: function(response) {
                if (response.success) {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizo la cantidad correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#ModalCantidadReportePorCliente').addClass('hidden');
                    $('#ModalCantidadReportePorCliente').removeClass('flex');
                    $('#btnBuscarReportePorCliente').trigger('click');
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

    function fn_ActualizarPesoReportePorCliente(idCodigoPesada, nuevoPesoReportePorCliente){
        $.ajax({
            url: '/fn_consulta_ActualizarPesoReportePorCliente',
            method: 'GET',
            data: {
                idCodigoPesada: idCodigoPesada,
                nuevoPesoReportePorCliente: nuevoPesoReportePorCliente,
            },
            success: function(response) {
                if (response.success) {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizo el peso correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#ModalPesoReportePorCliente').addClass('hidden');
                    $('#ModalPesoReportePorCliente').removeClass('flex');
                    $('#btnBuscarReportePorCliente').trigger('click');
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

    $(document).on('contextmenu', '#tablaReportePorCliente tbody tr', function (e) {
        e.preventDefault();
        if (tipoUsuario =='Administrador'){
            let codigoPesada = $(this).closest("tr").find("td:first").text();
            Swal.fire({
                title: '¿Desea eliminar el Registro?',
                text: "¡Estas seguro de eliminar el registro!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: '¡No, cancelar!',
                confirmButtonText: '¡Si,eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                fn_EliminarPesada(codigoPesada);
                }
            })
        }
    });

    function fn_EliminarPesada(codigoPesada){
        $.ajax({
            url: '/fn_consulta_EliminarPesada',
            method: 'GET',
            data: {
                codigoPesada: codigoPesada,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se elimino el registro correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#btnBuscarReportePorCliente').trigger('click');
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