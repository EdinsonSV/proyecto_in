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
        let codigoCliente = $('#selectedCodigoCliCuentaDelCliente').attr("value");
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
                    combinedData[fecha].totalVentaDescuentoPrimerEspecie = parseInt(item.totalVentaDescuentoPrimerEspecie);
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
                    combinedData[fecha].totalVentaDescuentoSegundaEspecie = parseInt(item.totalVentaDescuentoSegundaEspecie);
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
                    combinedData[fecha].totalVentaDescuentoTerceraEspecie = parseInt(item.totalVentaDescuentoTerceraEspecie);
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
                    combinedData[fecha].totalVentaDescuentoCuartaEspecie = parseInt(item.totalVentaDescuentoCuartaEspecie);
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
    
                    combinedData[fecha].totalPesoDescuentoCuartaEspeciePrimerEspecie = parseFloat(item.totalPesoDescuentoCuartaEspeciePrimerEspecie);
                    combinedData[fecha].totalPesoDescuentoCuartaEspecieSegundaEspecie = parseFloat(item.totalPesoDescuentoCuartaEspecieSegundaEspecie);
                    combinedData[fecha].totalPesoDescuentoCuartaEspecieTerceraEspecie = parseFloat(item.totalPesoDescuentoCuartaEspecieTerceraEspecie);
                    combinedData[fecha].totalPesoDescuentoCuartaEspecieCuartaEspecie = parseFloat(item.totalPesoDescuentoCuartaEspecieCuartaEspecie);
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
                fn_CrearTablaCuentaDelCliente(pagoAnterior, ventaAnterior, totalVentaDescuentoAnterior, combinedData);
            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    }    

    function fn_CrearTablaCuentaDelCliente (pagoAnterior,ventaAnterior,totalVentaDescuentoAnterior,combinedData){

        let bodyCuentaDelCliente="";
        let tbodyCuentaDelCliente = $('#bodyCuentaDelCliente');
        tbodyCuentaDelCliente.empty();

        let totalSaldoAnterior = ventaAnterior + parseFloat(totalVentaDescuentoAnterior)
        let totalPagos = pagoAnterior

        Object.keys(combinedData).forEach(function(fecha) { 
            bodyCuentaDelCliente += construirFilaFecha(fecha);
            let item = combinedData[fecha]
            bodyCuentaDelCliente += construirFilaDatos(item);
            bodyCuentaDelCliente += construirFilaDatosTotales(item,totalSaldoAnterior,totalPagos);
            totalPagos += parseFloat(item.pagos);
            let descuentosDePresentaciones = parseFloat(item.totalVentaDescuentoPrimerEspecie)+parseFloat(item.totalVentaDescuentoSegundaEspecie)+parseFloat(item.totalVentaDescuentoTerceraEspecie)+parseFloat(item.totalVentaDescuentoCuartaEspecie)
            totalSaldoAnterior += parseFloat(item.totalVentaPrimerEspecie)+parseFloat(item.totalVentaSegundaEspecie)+parseFloat(item.totalVentaTerceraEspecie)+parseFloat(item.totalVentaCuartaEspecie)+parseFloat(item.totalVentaDescuento)+descuentosDePresentaciones;
        });

        tbodyCuentaDelCliente.html(bodyCuentaDelCliente);
    }

    function construirFilaDatosTotales(item,totalSaldoAnterior,totalPagos) {

        let ventasEspecies = parseFloat(item.totalVentaPrimerEspecie)+parseFloat(item.totalVentaSegundaEspecie)+parseFloat(item.totalVentaTerceraEspecie)+parseFloat(item.totalVentaCuartaEspecie)
        let descuentosVentasEspecies = parseFloat(item.totalVentaDescuentoPrimerEspecie)+parseFloat(item.totalVentaDescuentoSegundaEspecie)+parseFloat(item.totalVentaDescuentoTerceraEspecie)+parseFloat(item.totalVentaDescuentoCuartaEspecie)+parseFloat(item.totalVentaDescuento)
        let totalSaldoAnteriorV = totalSaldoAnterior - parseFloat(totalPagos)

        let totalVentaDelDia = ventasEspecies+(descuentosVentasEspecies)
        let totalVentaDelDiaSaldoAnterior = totalVentaDelDia + parseFloat(totalSaldoAnteriorV)
        let saldoActual = totalVentaDelDiaSaldoAnterior - parseFloat(item.pagos)

        return `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max">TOTAL VENTA</h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max">S/. ${parseFloat(totalVentaDelDia).toFixed(2)}</h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max">SALDO ANTERIOR</h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max">S/. ${parseFloat(totalSaldoAnteriorV).toFixed(2)}</h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
        </tr>
        <tr class="bg-white dark:bg-gray-800 h-0.5">
            <td class="text-center" colspan="2"></td>
            <td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="4"></td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max">SALDO DEL DIA</h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max">S/. ${parseFloat(totalVentaDelDiaSaldoAnterior).toFixed(2)}</h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max">PAGOS</h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max">S/. ${parseFloat(item.pagos).toFixed(2)}</h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
        </tr>
        <tr class="bg-white dark:bg-gray-800 h-0.5">
            <td class="text-center" colspan="2"></td>
            <td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="4"></td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max">SALDO ACTUAL</h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max">S/. ${parseFloat(saldoActual).toFixed(2)}</h5></td>
            <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
        </tr>
        `;
    }

    function construirFilaFecha(fecha) {
        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${fecha}</h5></td>
                <td class="text-center py-1 px-2"></td>
                <td class="text-center py-1 px-2"></td>
                <td class="text-center py-1 px-2"></td>
                <td class="text-center py-1 px-2"></td>
                <td class="text-center py-1 px-2"></td>
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

        let totalCantidadDescuento = parseFloat(item.totalCantidadDescuentoPrimerEspecie)+parseFloat(item.totalCantidadDescuentoSegundaEspecie)+parseFloat(item.totalCantidadDescuentoTerceraEspecie)+parseFloat(item.totalCantidadDescuentoCuartaEspecie)
        let totalPesoDescuento = parseFloat(item.totalPesoDescuentoPrimerEspecie)+parseFloat(item.totalPesoDescuentoSegundaEspecie)+parseFloat(item.totalPesoDescuentoTerceraEspecie)+parseFloat(item.totalPesoDescuentoCuartaEspecie)+parseFloat(item.totalPesoDescuento)
        let totalVentaDescuento = parseFloat(item.totalVentaDescuentoPrimerEspecie)+parseFloat(item.totalVentaDescuentoSegundaEspecie)+parseFloat(item.totalVentaDescuentoTerceraEspecie)+parseFloat(item.totalVentaDescuentoCuartaEspecie)+parseFloat(item.totalVentaDescuento)

        let precioDescuentoEspecies = 0;
        if (totalPesoDescuento !== 0) {
            precioDescuentoEspecies = (totalVentaDescuento / totalPesoDescuento).toFixed(2);
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${nombrePrimerEspecieGlobal}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${item.totalCantidadPrimerEspecie === 1 ? item.totalCantidadPrimerEspecie + ' Ud.' : item.totalCantidadPrimerEspecie + ' Uds.'}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${parseFloat(item.totalPesoPrimerEspecie).toFixed(2)} Kg.</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">S/. ${parseFloat(item.totalVentaPrimerEspecie).toFixed(2)}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">S/. ${precioPrimerEspecie}/Kg.</h5></td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${nombreSegundaEspecieGlobal}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${item.totalCantidadSegundaEspecie === 1 ? item.totalCantidadSegundaEspecie + ' Ud.' : item.totalCantidadSegundaEspecie + ' Uds.'}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${parseFloat(item.totalPesoSegundaEspecie).toFixed(2)} Kg.</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">S/. ${parseFloat(item.totalVentaSegundaEspecie).toFixed(2)}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">S/. ${precioSegundaEspecie}/Kg.</h5></td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${nombreTerceraEspecieGlobal}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${item.totalCantidadTerceraEspecie === 1 ? item.totalCantidadTerceraEspecie + ' Ud.' : item.totalCantidadTerceraEspecie + ' Uds.'}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${parseFloat(item.totalPesoTerceraEspecie).toFixed(2)} Kg.</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">S/. ${parseFloat(item.totalVentaTerceraEspecie).toFixed(2)}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">S/. ${precioTerceraEspecie}/Kg.</h5></td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${nombreCuartaEspecieGlobal}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${item.totalCantidadCuartaEspecie === 1 ? item.totalCantidadCuartaEspecie + ' Ud.' : item.totalCantidadCuartaEspecie + ' Uds.'}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${parseFloat(item.totalPesoCuartaEspecie).toFixed(2)} Kg.</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">S/. ${parseFloat(item.totalVentaCuartaEspecie).toFixed(2)}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">S/. ${precioCuartaEspecie}/Kg.</h5></td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2"><h5 class="min-w-max"></h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">DESCUENTO</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${totalCantidadDescuento === 1 ? totalCantidadDescuento + ' Ud.' : totalCantidadDescuento + ' Uds.'}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">${parseFloat(totalPesoDescuento).toFixed(2)} Kg.</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">S/. ${parseFloat(totalVentaDescuento).toFixed(2)}</h5></td>
                <td class="text-center py-1 px-2"><h5 class="min-w-max">S/. ${precioDescuentoEspecies}/Kg.</h5></td>
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