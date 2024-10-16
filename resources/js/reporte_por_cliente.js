import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function ($) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];

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

    $('#btnExportarExcelReportePorCliente').on('click', function () {
        // Obtener los valores de los inputs
        var cliente = $('#inputNombreClientes').val();
        var fechaDesde = $('#fechaDesdeReportePorCliente').val();
        var fechaHasta = $('#fechaHastaReportePorCliente').val();
    
        // Obtener la tabla
        var tabla = document.getElementById("tablaReportePorCliente");
    
        // Crear un nuevo libro de Excel
        var workbook = XLSX.utils.book_new();
    
        // Construir matriz de datos
        var dataMatrix = [
            [''],
            ['', 'Cliente:', cliente],
            ['', 'Fecha Desde:', fechaDesde, 'Fecha Hasta:', fechaHasta],
            ['']
        ];
    
        // Obtener las filas de la tabla
        var filas = tabla.rows;
    
        // Recorrer las filas de la tabla y agregar a la matriz de datos
        for (var i = 0; i < filas.length; i++) {
            var celdas = filas[i].cells;
            var row = [];
            for (var j = 1; j < celdas.length; j++) {
                var cellText = celdas[j].textContent;
                row.push(cellText);
            }
            dataMatrix.push(['', ...row]);
        }              
    
        // Crear la hoja de cálculo
        var sheet = XLSX.utils.aoa_to_sheet(dataMatrix);
    
        // Ajustar el ancho de las columnas al contenido
        var range = XLSX.utils.decode_range(sheet["!ref"]);
        for (var col = 1; col <= range.e.c; col++) {
            sheet["!cols"] = sheet["!cols"] || [];
            sheet["!cols"][col] = { wch: 15 }; // Ajusta el ancho a un valor fijo, puedes ajustar según tus necesidades
            if (sheet["!cols"][col].wch < 20) {
                sheet["!cols"][col].wch = 20; // Establecer el ancho mínimo
            }
        }
    
        // Agregar la hoja al libro
        XLSX.utils.book_append_sheet(workbook, sheet, "ReportePorCliente");
    
        // Generar un archivo Excel y descargarlo
        XLSX.writeFile(workbook, "Reporte_de_cliente_"+cliente+".xlsx");
    });              
    
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
    
    $('#btnBuscarReportePorCliente').on('click', function () {
        let inputReportePorCliente = $('#inputNombreClientes').val();
        if (inputReportePorCliente.length > 1 || inputReportePorCliente != "") {
            let fechaDesde = $('#fechaDesdeReportePorCliente').val();
            let fechaHasta = $('#fechaHastaReportePorCliente').val();
            let codigoCliente = $('#codigoClienteSeleccionado').val();
            fn_TraerReportePorCliente(fechaDesde,fechaHasta,codigoCliente)
        } else {
            alertify.notify('Debe seleccionar un cliente.', 'error', 2);
        }
    });

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
                <td class="text-center py-1 px-2 hidden"></td>
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
        if (pesoNetoPes !== 0 && cantidadPes !== 0) {
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
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 filaEditable">
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
                let promedio = 0
                if (totalPeso !== 0 && totalCantidad !== 0) {
                    promedio = (totalPeso / totalCantidad).toFixed(2);
                }
                
                let totalPesoFormateado = totalPeso.toLocaleString('es-ES', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true,
                });
                
                return `
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td class="text-center py-1 px-2 hidden"></td>
                        <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                        <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                        <td class="text-center py-1 px-2 whitespace-nowrap">TOTAL ${nombreEspecie.replace("POLLO", "").trim()}:</td>
                        <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad === 1 ? `${totalCantidad} Ud.` : `${totalCantidad} Uds.`}</td>
                        <td class="text-center py-1 px-2 whitespace-nowrap">${totalPesoFormateado} Kg.</td>
                        <td class="text-center py-1 px-2 whitespace-nowrap">${promedio}</td>
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
                let promedio = 0
                if (totalPeso !== 0 && totalCantidad !== 0) {
                    promedio = (totalPeso / totalCantidad).toFixed(2);
                }
                let totalPesoFormateado = totalPeso.toLocaleString('es-ES', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true,
                });    
                return `
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td class="text-center py-1 px-2 hidden"></td>
                        <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                        <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                        <td class="text-center py-1 px-2 whitespace-nowrap">TOTAL VIVO ${nombreEspecie.replace("POLLO", "").trim()}:</td>
                        <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad === 1 ? `${totalCantidad} Ud.` : `${totalCantidad} Uds.`}</td>
                        <td class="text-center py-1 px-2 whitespace-nowrap">${totalPesoFormateado} Kg.</td>
                        <td class="text-center py-1 px-2 whitespace-nowrap">${promedio}</td>
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

        let promedioNeto = 0
        if (ventaPesoTotalNeto !== 0 && ventaCantidadTotal !== 0) {
            promedioNeto = (ventaPesoTotalNeto / ventaCantidadTotal).toFixed(2);
        }
        
        let ventaPesoTotalNetoFormateado = ventaPesoTotalNeto.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        }); 

        filas.push(`
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 hidden"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">TOTAL NETO:</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${ventaCantidadTotal === 1 ? `${ventaCantidadTotal} Ud.` : `${ventaCantidadTotal} Uds.`}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${ventaPesoTotalNetoFormateado} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${promedioNeto}</td>
            </tr>
        `);

        let promedioVivo = 0
        if (ventaPesoTotalVivo !== 0 && ventaCantidadTotal !== 0) {
            promedioVivo = (ventaPesoTotalVivo / ventaCantidadTotal).toFixed(2);
        } 

        let ventaPesoTotalVivoFormateado = ventaPesoTotalVivo.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        }); 

        filas.push(`
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="text-center py-1 px-2 hidden"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap">TOTAL VIVO:</td>
            <td class="text-center py-1 px-2 whitespace-nowrap">${ventaCantidadTotal === 1 ? `${ventaCantidadTotal} Ud.` : `${ventaCantidadTotal} Uds.`}</td>
            <td class="text-center py-1 px-2 whitespace-nowrap">${ventaPesoTotalVivoFormateado} Kg.</td>
            <td class="text-center py-1 px-2 whitespace-nowrap">${promedioVivo}</td>
        </tr>
        `);

        return filas.join('');
    }

    $('.cerrarModalCantidadReportePorCliente, #ModalCantidadReportePorCliente .opacity-75').on('click', function (e) {
        $('#ModalCantidadReportePorCliente').addClass('hidden');
        $('#ModalCantidadReportePorCliente').removeClass('flex');
        $('table tbody tr').removeClass('bg-gray-300 dark:bg-gray-600');
        $('table tbody tr').addClass('bg-white dark:bg-gray-800');
    });

    $('.cerrarModalPesoReportePorCliente, #ModalPesoReportePorCliente .opacity-75').on('click', function (e) {
        $('#ModalPesoReportePorCliente').addClass('hidden');
        $('#ModalPesoReportePorCliente').removeClass('flex');
        $('table tbody tr').removeClass('bg-gray-300 dark:bg-gray-600');
        $('table tbody tr').addClass('bg-white dark:bg-gray-800');
    });

    $(document).on('input', '#nuevoCantidadReportePorCliente', function () {
        let inputValue = $(this).val();
        inputValue = inputValue.replace(/[^0-9-]/g, '');

        $(this).val(inputValue);
    });

    $(document).on('input', '#nuevoPesoReportePorCliente', function () {
        // Obtiene el valor actual del input
        let inputValue = $(this).val();
        
        // Elimina todos los caracteres excepto los dígitos y un punto decimal
        inputValue = inputValue.replace(/[^0-9-.]/g, '');
    
        // Verifica si ya hay un punto decimal presente
        if (inputValue.indexOf('.') !== -1) {
            // Si ya hay un punto, elimina los puntos adicionales
            inputValue = inputValue.replace(/(\..*)\./g, '$1');
            
            // Limita el número de decimales a tres
            let decimalPart = inputValue.split('.')[1];
            if (decimalPart && decimalPart.length > 2) {
                decimalPart = decimalPart.substring(0, 2);
                inputValue = inputValue.split('.')[0] + '.' + decimalPart;
            }
        }
        
        // Establece el valor limpio en el input
        $(this).val(inputValue);
    });

    $(document).on("dblclick", "#tablaReportePorCliente tr td.cantidadReportePorCliente", function() {
        if (tipoUsuario =='Administrador'){
            let fila = $(this).closest('tr');
            fila.toggleClass('bg-gray-300 dark:bg-gray-600 bg-white dark:bg-gray-800');
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
            fila.toggleClass('bg-gray-300 dark:bg-gray-600 bg-white dark:bg-gray-800');
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
    
        if (nuevoCantidadReportePorCliente === null || nuevoCantidadReportePorCliente.trim() === '') {
            alertify.notify('La cantidad no puede ser vacia', 'error', 3);
        } else {
            fn_ActualizarCantidadReportePorCliente(idCodigoPesada, nuevoCantidadReportePorCliente);
        }
    });

    $('#btnActualizarPesoReportePorCliente').on('click', function () {
        let idCodigoPesada = $('#idPesoReportePorCliente').attr("value");
        let nuevoPesoReportePorCliente = $('#nuevoPesoReportePorCliente').val();

        if (nuevoPesoReportePorCliente === null || nuevoPesoReportePorCliente.trim() === '') {
            alertify.notify('El peso no debe ser vacio', 'error', 3);
        } else {
            fn_ActualizarPesoReportePorCliente(idCodigoPesada, nuevoPesoReportePorCliente);
        }
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

    $(document).on('contextmenu', '#tablaReportePorCliente tbody tr.filaEditable', function (e) {
        e.preventDefault();
        if (tipoUsuario =='Administrador'){
            let codigoPesada = $(this).closest("tr").find("td:first").text();
            let fila = $(this).closest("tr")
            fila.toggleClass('bg-gray-300 dark:bg-gray-600 bg-white dark:bg-gray-800');
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
                }else{
                    $('table tbody tr').removeClass('bg-gray-300 dark:bg-gray-600');
                    $('table tbody tr').addClass('bg-white dark:bg-gray-800');
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

    // Primer filtro Nombre

    let selectedIndex = -1;

    $('#inputNombreClientes').on('input', function () {
        $('#codigoClienteSeleccionado').val(0);
        $("#clienteSeleccionadoCorrecto").removeClass("flex");
        $("#clienteSeleccionadoCorrecto").addClass("hidden");
        const searchTerm = $(this).val().toLowerCase();
        const $filtrarClientes = $("#inputNombreClientes").val();
        const filteredClientes = clientesArreglo.filter(cliente =>
            cliente.nombreCompleto.toLowerCase().includes(searchTerm)
        );
        if ($filtrarClientes.length > 0) {
            displayClientes(filteredClientes);
            selectedIndex = -1; // Reset index when the input changes
        } else {
            const $contenedorDeClientes = $("#contenedorDeClientes")
            $contenedorDeClientes.addClass('hidden');
        }
    });
    
    $('#inputNombreClientes').on('keydown', function (event) {
        const $options = $('#contenedorDeClientes .option');
        if ($options.length > 0) {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                selectedIndex = (selectedIndex + 1) % $options.length;
                updateSelection($options);
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                selectedIndex = (selectedIndex - 1 + $options.length) % $options.length;
                updateSelection($options);
            } else if (event.key === 'Enter') {
                event.preventDefault();
                if (selectedIndex >= 0) {
                    $options.eq(selectedIndex).click();
                    $("#clienteSeleccionadoCorrecto").removeClass("hidden");
                    $("#clienteSeleccionadoCorrecto").addClass("flex");
                }
            }
        }
    });
    
    function updateSelection($options) {
        $options.removeClass('bg-gray-200 dark:bg-gray-700');
        if (selectedIndex >= 0) {
            $options.eq(selectedIndex).addClass('bg-gray-200 dark:bg-gray-700');
        }
    }
    
    function displayClientes(clientesArreglo) {
        const $contenedor = $('#contenedorDeClientes');
        $contenedor.empty();
        if (clientesArreglo.length > 0) {
            $contenedor.removeClass('hidden');
            clientesArreglo.forEach(cliente => {
                const $div = $('<div class="text-gray-800 text-sm dark:text-white font-medium cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis dark:hover:bg-gray-700 hover:bg-gray-200"></div>')
                    .text(cliente.nombreCompleto)
                    .addClass('option p-2')
                    .on('click', function () {
                        selectCliente(cliente);
                    });
                $contenedor.append($div);
            });
        } else {
            $contenedor.addClass('hidden');
        }
    }
    
    function selectCliente(cliente) {
        $('#inputNombreClientes').val(cliente.nombreCompleto);
        $('#codigoClienteSeleccionado').val(cliente.codigoCli);
        $('#contenedorDeClientes').addClass('hidden');
        $("#clienteSeleccionadoCorrecto").removeClass("hidden");
        $("#clienteSeleccionadoCorrecto").addClass("flex");
        selectedIndex = -1;
    }

    $(document).on('click', function (event) {
        if (!$(event.target).closest('.relative').length) {
            $('#contenedorDeClientes').addClass('hidden');
            selectedIndex = -1;
        }
    });

});
