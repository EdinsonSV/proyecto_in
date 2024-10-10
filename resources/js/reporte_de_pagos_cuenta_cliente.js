import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function ($) {

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
    
    $('#btnBuscarCuentaDelCliente').on('click', function () {
        let fechaDesde = $('#fechaDesdeCuentaDelCliente').val();
        let fechaHasta = $('#fechaHastaCuentaDelCliente').val();
        let codigoCliente = $('#codigoClienteSeleccionado').val();
        fn_TraerCuentaDelCliente(fechaDesde,fechaHasta,codigoCliente);
    });

    
    function fn_TraerCuentaDelCliente(fechaDesde, fechaHasta, codigoCliente) {
        $.ajax({
            url: '/fn_consulta_TraerCuentaDelCliente',
            method: 'GET',
            data: {
                fechaDesde: fechaDesde,
                fechaHasta: fechaHasta,
                codigoCliente: codigoCliente,
            },
            success: function (response) {
    
                // Inicializar variables ventaAnterior y pagoAnterior con 0 si son null
                let ventaAnterior = parseFloat(response.ventaAnterior || 0);
                let pagoAnterior = parseFloat(response.pagoAnterior || 0);
                let totalVentaDescuentoAnterior = parseFloat(response.totalVentaDescuentoAnterior || 0);
                let respuestaPagosDetallados = response.pagosDetallados
                respuestaPagosDetallados = respuestaPagosDetallados.original
    
                // Crear un objeto para almacenar los datos combinados por fecha
                var combinedData = {};
    
                // Inicializar propiedades con 0 en cada iteración
                response.totalesPrimerEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0
                        };
                    }
    
                    combinedData[fecha].totalPesoPrimerEspecie = parseFloat(item.totalPesoPrimerEspecie);
                    combinedData[fecha].totalPesoDescuentoPrimerEspecie = parseFloat(item.totalPesoDescuentoPrimerEspecie);
                    combinedData[fecha].totalCantidadDescuentoPrimerEspecie = parseInt(item.totalCantidadDescuentoPrimerEspecie);
                    combinedData[fecha].totalVentaPrimerEspecie = parseFloat(item.totalVentaPrimerEspecie);
                    combinedData[fecha].totalCantidadPrimerEspecie = parseInt(item.totalCantidadPrimerEspecie);
                    combinedData[fecha].totalVentaDescuentoPrimerEspecie = parseFloat(item.totalVentaDescuentoPrimerEspecie);
                });
    
                response.totalesSegundaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0
                        };
                    }
    
                    combinedData[fecha].totalPesoSegundaEspecie = parseFloat(item.totalPesoSegundaEspecie);
                    combinedData[fecha].totalPesoDescuentoSegundaEspecie = parseFloat(item.totalPesoDescuentoSegundaEspecie);
                    combinedData[fecha].totalCantidadDescuentoSegundaEspecie = parseInt(item.totalCantidadDescuentoSegundaEspecie);
                    combinedData[fecha].totalVentaSegundaEspecie = parseFloat(item.totalVentaSegundaEspecie);
                    combinedData[fecha].totalCantidadSegundaEspecie = parseInt(item.totalCantidadSegundaEspecie);
                    combinedData[fecha].totalVentaDescuentoSegundaEspecie = parseFloat(item.totalVentaDescuentoSegundaEspecie);
                });
    
                response.totalesTerceraEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0
                        };
                    }
    
                    combinedData[fecha].totalPesoTerceraEspecie = parseFloat(item.totalPesoTerceraEspecie);
                    combinedData[fecha].totalPesoDescuentoTerceraEspecie = parseFloat(item.totalPesoDescuentoTerceraEspecie);
                    combinedData[fecha].totalCantidadDescuentoTerceraEspecie = parseInt(item.totalCantidadDescuentoTerceraEspecie);
                    combinedData[fecha].totalVentaTerceraEspecie = parseFloat(item.totalVentaTerceraEspecie);
                    combinedData[fecha].totalCantidadTerceraEspecie = parseInt(item.totalCantidadTerceraEspecie);
                    combinedData[fecha].totalVentaDescuentoTerceraEspecie = parseFloat(item.totalVentaDescuentoTerceraEspecie);
                });
    
                response.totalesCuartaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0
                        };
                    }
    
                    combinedData[fecha].totalPesoCuartaEspecie = parseFloat(item.totalPesoCuartaEspecie);
                    combinedData[fecha].totalPesoDescuentoCuartaEspecie = parseFloat(item.totalPesoDescuentoCuartaEspecie);
                    combinedData[fecha].totalCantidadDescuentoCuartaEspecie = parseInt(item.totalCantidadDescuentoCuartaEspecie);
                    combinedData[fecha].totalVentaCuartaEspecie = parseFloat(item.totalVentaCuartaEspecie);
                    combinedData[fecha].totalCantidadCuartaEspecie = parseInt(item.totalCantidadCuartaEspecie);
                    combinedData[fecha].totalVentaDescuentoCuartaEspecie = parseFloat(item.totalVentaDescuentoCuartaEspecie);
                });
    
                response.totalDescuentos.forEach(function (item) {
                    var fecha = item.fechaRegistroDesc;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0
                        };
                    }
    
                    combinedData[fecha].totalPesoDescuento = parseFloat(item.totalPesoDescuento);
                    combinedData[fecha].totalVentaDescuento = parseFloat(item.totalVentaDescuento);
                });
    
                response.totalPagos.forEach(function (item) {
                    var fecha = item.fechaOperacionPag;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0
                        };
                    }
    
                    combinedData[fecha].pagos = parseFloat(item.pagos);
                });
    
                // Ahora combinedData contiene los datos combinados por fecha
                fn_CrearTablaCuentaDelCliente(pagoAnterior, ventaAnterior, totalVentaDescuentoAnterior, combinedData, respuestaPagosDetallados);
            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    }    

    function fn_CrearTablaCuentaDelCliente (pagoAnterior,ventaAnterior,totalVentaDescuentoAnterior,combinedData, respuestaPagosDetallados){

        let bodyCuentaDelCliente="";
        let tbodyCuentaDelCliente = $('#bodyCuentaDelCliente');
        tbodyCuentaDelCliente.empty();

        let totalSaldoAnterior = ventaAnterior + parseFloat(totalVentaDescuentoAnterior)
        let totalPagos = pagoAnterior

        Object.keys(combinedData).forEach(function(fecha) { 
            bodyCuentaDelCliente += construirFilaFecha(fecha);
            let item = combinedData[fecha]
            bodyCuentaDelCliente += construirFilaDatos(item);
            bodyCuentaDelCliente += construirFilaDatosTotales(item,totalSaldoAnterior,totalPagos, fecha, respuestaPagosDetallados);
            totalPagos += parseFloat(item.pagos);
            let descuentosDePresentaciones = parseFloat(item.totalVentaDescuentoPrimerEspecie)+parseFloat(item.totalVentaDescuentoSegundaEspecie)+parseFloat(item.totalVentaDescuentoTerceraEspecie)+parseFloat(item.totalVentaDescuentoCuartaEspecie)
            totalSaldoAnterior += parseFloat(item.totalVentaPrimerEspecie)+parseFloat(item.totalVentaSegundaEspecie)+parseFloat(item.totalVentaTerceraEspecie)+parseFloat(item.totalVentaCuartaEspecie)+parseFloat(item.totalVentaDescuento)+descuentosDePresentaciones;
        });
        if (bodyCuentaDelCliente != ""){
            tbodyCuentaDelCliente.html(bodyCuentaDelCliente);
        }else{
            tbodyCuentaDelCliente.html(`
            <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="7" class="text-center">No hay datos</td></tr>
            `);
        }
    }

    // Asigna un ID único para las filas de pagos detallados
    let pagosDetalladosID = "pagosDetalles-uniqueID";

    // Agrega un evento clic a la fila "verPagosDetalles" fuera de la función
    $(document).on('click', '.verPagosDetalles', function () {
        // Selecciona todas las filas de pagos detallados usando el ID único
        let filasPagosDetallados = $("[id^=" + pagosDetalladosID + "]");

        // Verifica el estado actual de todas las filas de pagos detallados y muestra u oculta según corresponda
        if (filasPagosDetallados.is(":visible")) {
            filasPagosDetallados.hide();
        } else {
            filasPagosDetallados.show();
        }
    });

    function construirFilaDatosTotales(item, totalSaldoAnterior, totalPagos, fecha, respuestaPagosDetallados) {

        let ventasEspecies = parseFloat(item.totalVentaPrimerEspecie) + parseFloat(item.totalVentaSegundaEspecie) + parseFloat(item.totalVentaTerceraEspecie) + parseFloat(item.totalVentaCuartaEspecie)
        let descuentosVentasEspecies = parseFloat(item.totalVentaDescuentoPrimerEspecie) + parseFloat(item.totalVentaDescuentoSegundaEspecie) + parseFloat(item.totalVentaDescuentoTerceraEspecie) + parseFloat(item.totalVentaDescuentoCuartaEspecie) + parseFloat(item.totalVentaDescuento)
        let totalSaldoAnteriorV = totalSaldoAnterior - parseFloat(totalPagos)
    
        let totalVentaDelDia = ventasEspecies + (descuentosVentasEspecies)
        let totalVentaDelDiaSaldoAnterior = totalVentaDelDia + parseFloat(totalSaldoAnteriorV)
        let saldoActual = totalVentaDelDiaSaldoAnterior - parseFloat(item.pagos)
    
    
        let saldoActualFormateado = saldoActual.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });
    
        let totalVentaDelDiaSaldoAnteriorFormateado = totalVentaDelDiaSaldoAnterior.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });
    
        let totalVentaDelDiaFormateado = totalVentaDelDia.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });
    
        let totalSaldoAnteriorVFormateado = totalSaldoAnteriorV.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });
    
        let pagosFormateado = parseFloat(item.pagos).toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });
    
        let pagosDetallados = "";
        let masDeUnPago = 0;
    
        if (respuestaPagosDetallados.length > 0) {
            pagosDetallados += ``;
            respuestaPagosDetallados.forEach(function (obj) {
                if (obj.fechaOperacionPag == fecha) {
                    if (masDeUnPago == 0) {
                        pagosDetallados += `
                            <tr id="${pagosDetalladosID}-${masDeUnPago}" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" style="display:none;">
                                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                                <td class="text-center py-1 px-2 whitespace-nowrap bg-red-600 text-white">DETALLE DE PAGOS</td>
                                <td class="text-center py-1 px-2 whitespace-nowrap bg-red-600 text-white">S/. ${parseFloat(obj.cantidadAbonoPag).toFixed(2)}</td>
                                <td class="text-center py-1 px-2 whitespace-nowrap bg-red-600 text-white">${obj.fechaRegistroPag}</td>
                            </tr>`;
                        masDeUnPago += 1;
                    } else {
                        pagosDetallados += `
                            <tr id="${pagosDetalladosID}-${masDeUnPago}" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" style="display:none;">
                                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                                <td class="text-center py-1 px-2 whitespace-nowrap bg-red-600 text-white">S/. ${parseFloat(obj.cantidadAbonoPag).toFixed(2)}</td>
                                <td class="text-center py-1 px-2 whitespace-nowrap bg-red-600 text-white">${obj.fechaRegistroPag}</td>
                            </tr>`;
                        masDeUnPago += 1;
                    }
                }
            });
        }
    
        masDeUnPago = 0;
    
        let html = `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 verPagosDetalles">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">TOTAL VENTA</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVentaDelDiaFormateado}</h5></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">SALDO ANTERIOR</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalSaldoAnteriorVFormateado}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            </tr>
            <tr class="bg-white dark:bg-gray-800 h-0.5">
                <td class="text-center" colspan="2"></td>
                <td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="4"></td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">SALDO DEL DIA</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVentaDelDiaSaldoAnteriorFormateado}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 verPagosDetalles">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap flex justify-center items-center">PAGOS <svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
              </svg></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${pagosFormateado}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            </tr>
            ${pagosDetallados}
            <tr class="bg-white dark:bg-gray-800 h-0.5">
                <td class="text-center" colspan="2"></td>
                <td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="4"></td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">SALDO ACTUAL</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${saldoActualFormateado}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            </tr>
        `;
    
        return html;
    }      

    function construirFilaFecha(fecha) {
        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap">${fecha}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            </tr>
        `;
    }

    function construirFilaDatos(item) {

        let precioPrimerEspecie = 0;
        if (parseFloat(item.totalPesoPrimerEspecie) !== 0) {
            precioPrimerEspecie = (parseFloat(item.totalVentaPrimerEspecie) / parseFloat(item.totalPesoPrimerEspecie)).toFixed(2);
        }

        let precioSegundaEspecie = 0;
        if (parseFloat(item.totalPesoSegundaEspecie) !== 0) {
            precioSegundaEspecie = (parseFloat(item.totalVentaSegundaEspecie) / parseFloat(item.totalPesoSegundaEspecie)).toFixed(2);
        }

        let precioTerceraEspecie = 0;
        if (parseFloat(item.totalPesoTerceraEspecie) !== 0) {
            precioTerceraEspecie = (parseFloat(item.totalVentaTerceraEspecie) / parseFloat(item.totalPesoTerceraEspecie)).toFixed(2);
        }

        let precioCuartaEspecie = 0;
        if (parseFloat(item.totalPesoCuartaEspecie) !== 0) {
            precioCuartaEspecie = (parseFloat(item.totalVentaCuartaEspecie) / parseFloat(item.totalPesoCuartaEspecie)).toFixed(2);
        }

        let totalCantidadDescuento = 0
        let totalPesoDescuento = parseFloat(item.totalPesoDescuento)
        let totalVentaDescuento = parseFloat(item.totalVentaDescuento)

        let precioDescuentoEspecies = 0;
        if (totalPesoDescuento !== 0) {
            precioDescuentoEspecies = (totalVentaDescuento / totalPesoDescuento).toFixed(2);
        }

        let totalCantidadPrimerEspecie = parseFloat(item.totalCantidadPrimerEspecie)+parseFloat(item.totalCantidadDescuentoPrimerEspecie);
        let totalCantidadSegundaEspecie = parseFloat(item.totalCantidadSegundaEspecie)+parseFloat(item.totalCantidadDescuentoSegundaEspecie);
        let totalCantidadTerceraEspecie = parseFloat(item.totalCantidadTerceraEspecie)+parseFloat(item.totalCantidadDescuentoTerceraEspecie);
        let totalCantidadCuartaEspecie = parseFloat(item.totalCantidadCuartaEspecie)+parseFloat(item.totalCantidadDescuentoCuartaEspecie);

        let totalPesoPrimerEspecie = parseFloat(item.totalPesoPrimerEspecie)+parseFloat(item.totalPesoDescuentoPrimerEspecie);
        let totalPesoSegundaEspecie = parseFloat(item.totalPesoSegundaEspecie)+parseFloat(item.totalPesoDescuentoSegundaEspecie);
        let totalPesoTerceraEspecie = parseFloat(item.totalPesoTerceraEspecie)+parseFloat(item.totalPesoDescuentoTerceraEspecie);
        let totalPesoCuartaEspecie = parseFloat(item.totalPesoCuartaEspecie)+parseFloat(item.totalPesoDescuentoCuartaEspecie);

        let totalVentaPrimerEspecie = parseFloat(item.totalVentaPrimerEspecie)+parseFloat(item.totalVentaDescuentoPrimerEspecie);
        let totalVentaSegundaEspecie = parseFloat(item.totalVentaSegundaEspecie)+parseFloat(item.totalVentaDescuentoSegundaEspecie);
        let totalVentaTerceraEspecie = parseFloat(item.totalVentaTerceraEspecie)+parseFloat(item.totalVentaDescuentoTerceraEspecie);
        let totalVentaCuartaEspecie = parseFloat(item.totalVentaCuartaEspecie)+parseFloat(item.totalVentaDescuentoCuartaEspecie);

        let totalVentaPrimerEspecieFormateado = totalVentaPrimerEspecie.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });

        let totalVentaSegundaEspecieFormateado = totalVentaSegundaEspecie.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });

        let totalVentaTerceraEspecieFormateado = totalVentaTerceraEspecie.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });

        let totalVentaCuartaEspecieFormateado = totalVentaCuartaEspecie.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });

        let totalPesoPrimerEspecieFormateado = totalPesoPrimerEspecie.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });

        let totalPesoSegundaEspecieFormateado = totalPesoSegundaEspecie.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });

        let totalPesoTerceraEspecieFormateado = totalPesoTerceraEspecie.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });

        let totalPesoCuartaEspecieFormateado = totalPesoCuartaEspecie.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });

        let totalVentaDescuentoFormateado = totalVentaDescuento.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });

        let totalPesoDescuentoFormateado = totalPesoDescuento.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombrePrimerEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadPrimerEspecie === 1 ? totalCantidadPrimerEspecie + ' Ud.' : totalCantidadPrimerEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalPesoPrimerEspecieFormateado} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVentaPrimerEspecieFormateado}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioPrimerEspecie}/Kg.</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreSegundaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadSegundaEspecie === 1 ? totalCantidadSegundaEspecie + ' Ud.' : totalCantidadSegundaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalPesoSegundaEspecieFormateado} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVentaSegundaEspecieFormateado}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioSegundaEspecie}/Kg.</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreTerceraEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadTerceraEspecie === 1 ? totalCantidadTerceraEspecie + ' Ud.' : totalCantidadTerceraEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalPesoTerceraEspecieFormateado} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVentaTerceraEspecieFormateado}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioTerceraEspecie}/Kg.</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreCuartaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadCuartaEspecie === 1 ? totalCantidadCuartaEspecie + ' Ud.' : totalCantidadCuartaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalPesoCuartaEspecieFormateado} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVentaCuartaEspecieFormateado}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioCuartaEspecie}/Kg.</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">DESCUENTO</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadDescuento === 1 ? totalCantidadDescuento + ' Ud.' : totalCantidadDescuento + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalPesoDescuentoFormateado} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVentaDescuentoFormateado}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioDescuentoEspecies}/Kg.</td>
            </tr>
            <tr class="bg-white dark:bg-gray-800 h-0.5">
                <td class="text-center" colspan="2"></td>
                <td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="4"></td>
            </tr>
        `;
    }

    $('#minimizarPrecios').on('change',function(){
        if(this.checked){
            $('#tablaCuentaDelCliente th:nth-child(6)').hide();
            $('#tablaCuentaDelCliente td:nth-child(6)').hide();
        } else {
            $('#tablaCuentaDelCliente th:nth-child(6)').show();
            $('#tablaCuentaDelCliente td:nth-child(6)').show();
        }
    });
})
