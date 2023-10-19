import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function ($) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const fechaHoy = new Date().toISOString().split('T')[0];

    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReporteDePagos').val(fechaHoy);
    $('#fechaHastaReporteDePagos').val(fechaHoy);
    $('#fechaDesdeCuentaDelCliente').val(fechaHoy);
    $('#fechaHastaCuentaDelCliente').val(fechaHoy);

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

    $('#valorAgregarPagoCliente').on('input', function () {
        // Obtiene el valor actual del input
        let inputValue = $(this).val();
    
        // Elimina todos los caracteres excepto un punto decimal
        inputValue = inputValue.replace(/[^0-9.]/g, '');
    
        // Verifica si ya hay un punto decimal presente
        if (inputValue.indexOf('.') !== -1) {
            // Si ya hay un punto, elimina los puntos adicionales
            inputValue = inputValue.replace(/(\..*)\./g, '$1');
        }
    
        // Establece el valor limpio en el input
        $(this).val(inputValue);
    });

    $('#formaDePago').on('change',function() {
        var selectedOption = $(this).val();
        if (selectedOption === 'Transferencia') {
            // Si se selecciona "Transferencia", muestra el div con id "codTrans"
            $('#DivCodTrans').removeClass('hidden').addClass('flex');
        } else {
            // Si se selecciona cualquier otra opción, oculta el div "codTrans"
            $('#DivCodTrans').removeClass('flex').addClass('hidden');
        }
    });

    $('#idAgregarPagoCliente').on('input', function () {
        let inputAgregarPagoCliente = $(this).val();
        let contenedorClientes = $('#contenedorClientesAgregarPagoCliente');
        contenedorClientes.empty();

        if (inputAgregarPagoCliente.length > 1 || inputAgregarPagoCliente != "") {
            fn_TraerClientesAgregarPagoCliente(inputAgregarPagoCliente);
        } else {
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });

    $('#registrar_agregarPago_submit').on('click', function (e) {
        $('#ModalAgregarPagoCliente').addClass('flex');
        $('#ModalAgregarPagoCliente').removeClass('hidden');
        $('#idAgregarPagoCliente').focus();
    });

    $('.cerrarModalAgregarPagoCliente, .modal-content').on('click', function (e) {
        if (e.target === this) {
            $('#ModalAgregarPagoCliente').addClass('hidden');
            $('#ModalAgregarPagoCliente').removeClass('flex');
        }
    });

    function fn_TraerClientesAgregarPagoCliente(inputAgregarPagoCliente) {

        // Realiza la solicitud AJAX para obtener sugerencias
        $.ajax({
            url: '/fn_consulta_TraerClientesAgregarPagoCliente',
            method: 'GET',
            data: {
                inputAgregarPagoCliente: inputAgregarPagoCliente,
            },
            success: function (response) {
                // Limpia las sugerencias anteriores
                let contenedorClientes = $('#contenedorClientesAgregarPagoCliente')
                contenedorClientes.empty();

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Iterar sobre los objetos y mostrar sus propiedades como sugerencias
                    response.forEach(function (obj) {
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

                        // Maneja el clic en la sugerencia
                        suggestion.on("click", function () {
                            // Rellena el campo de entrada con el nombre completo
                            $('#idAgregarPagoCliente').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
                            $('#selectedIdClienteAgregarPagoCliente').attr("value", obj.idCliente);
                            $('#selectedCodigoCliAgregarPagoCliente').attr("value", obj.codigoCli);
                            fn_TraerDeudaTotal(obj.codigoCli)

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

    function fn_TraerDeudaTotal(codigoCliente){
        $.ajax({
            url: '/fn_consulta_TraerDeudaTotal',
            method: 'GET',
            data:{
                codigoCliente:codigoCliente,
            },
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let inputDeudaTotal = $('#deudaTotal');
                    inputDeudaTotal.empty();

                    let deudaTotal = 0
                    let cantidadPagos = 0

                    deudaTotal = parseFloat(response[0].deudaTotal);
                    cantidadPagos = parseFloat(response[0].cantidadPagos);

                    let Total = deudaTotal - cantidadPagos

                    // Actualizar los elementos en la página con los valores
                    $('#deudaTotal').html(Total);

                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
                
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

    fn_declarar_especies()

    function fn_declarar_especies(){
        $.ajax({
            url: '/fn_consulta_DatosEspecie',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let selectPresentacion = $('#presentacionAgregarDescuentoCliente');
                    
                    // Vaciar el select actual, si es necesario
                    selectPresentacion.empty();

                    // Agregar la opción inicial "Seleccione tipo"
                    selectPresentacion.append($('<option>', {
                        value: '0',
                        text: 'Seleccione presentación',
                        disabled: true,
                        selected: true
                    }));

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        let option = $('<option>', {
                            value: obj.idEspecie,
                            text: obj.nombreEspecie
                        });
                        selectPresentacion.append(option);
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

    $('#idAgregarDescuentoCliente').on('input', function () {
        let inputAgregarDescuentoCliente = $(this).val();
        let contenedorClientes = $('#contenedorClientesAgregarDescuentoCliente');
        contenedorClientes.empty();

        if (inputAgregarDescuentoCliente.length > 1 || inputAgregarDescuentoCliente != "") {
            fn_TraerClientesAgregarDescuento(inputAgregarDescuentoCliente);
        } else {
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });

    function fn_TraerClientesAgregarDescuento(inputAgregarDescuentoCliente) {

        // Realiza la solicitud AJAX para obtener sugerencias
        $.ajax({
            url: '/fn_consulta_TraerClientesAgregarDescuento',
            method: 'GET',
            data: {
                idAgregarDescuento: inputAgregarDescuentoCliente,
            },
            success: function (response) {
                // Limpia las sugerencias anteriores
                let contenedorClientes = $('#contenedorClientesAgregarDescuentoCliente')
                contenedorClientes.empty();

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Iterar sobre los objetos y mostrar sus propiedades como sugerencias
                    response.forEach(function (obj) {
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

                        // Maneja el clic en la sugerencia
                        suggestion.on("click", function () {
                            // Rellena el campo de entrada con el nombre completo
                            $('#idAgregarDescuentoCliente').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
                            $('#selectedIdClienteAgregarDescuentoCliente').attr("value", obj.idCliente);
                            $('#selectedCodigoCliAgregarDescuentoCliente').attr("value", obj.codigoCli);

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

    $('#valorAgregarDescuentoCliente').on('input', function () {
        // Obtiene el valor actual del input
        let inputValue = $(this).val();
    
        // Elimina todos los caracteres excepto un punto decimal
        inputValue = inputValue.replace(/[^0-9.]/g, '');
    
        // Verifica si ya hay un punto decimal presente
        if (inputValue.indexOf('.') !== -1) {
            // Si ya hay un punto, elimina los puntos adicionales
            inputValue = inputValue.replace(/(\..*)\./g, '$1');
        }
    
        // Establece el valor limpio en el input
        $(this).val(inputValue);
    });

    $('#registrar_agregarDescuento_submit').on('click', function () {
        $('#ModalAgregarDescuentoCliente').addClass('flex');
        $('#ModalAgregarDescuentoCliente').removeClass('hidden');
        $('#idAgregarDescuentoCliente').focus();
    });

    $('.cerrarModalAgregarDescuentoCliente, .modal-content').on('click', function (e) {
        if (e.target === this) {
            $('#ModalAgregarDescuentoCliente').addClass('hidden');
            $('#ModalAgregarDescuentoCliente').removeClass('flex');
        }
    });

    $('#registrar_FiltrarPorCliente_submit').on('click', function () {
        $('#primerContenedorReporteDePagos').toggle('flex hidden');
        $('#segundoContenedorReporteDePagos').toggle('flex hidden');
        $('#btnRetrocesoCuentaDelCliente').toggle('hidden');
    });

    $('#btnRetrocesoCuentaDelCliente').on('click', function () {
        $('#primerContenedorReporteDePagos').toggle('flex hidden');
        $('#segundoContenedorReporteDePagos').toggle('flex hidden');
        $('#btnRetrocesoCuentaDelCliente').toggle('hidden');
    });

    $('#idCuentaDelCliente').on('input', function () {
        let inputCuentaDelCliente = $(this).val();
        let contenedorClientes = $('#contenedorClientesCuentaDelCliente');
        contenedorClientes.empty();

        if (inputCuentaDelCliente.length > 1 || inputCuentaDelCliente != "") {
            fn_TraerClientesCuentaDelCliente(inputCuentaDelCliente)
        } else {
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });

    function fn_TraerClientesCuentaDelCliente(inputCuentaDelCliente) {

        // Realiza la solicitud AJAX para obtener sugerencias
        $.ajax({
            url: '/fn_consulta_TraerClientesCuentaDelCliente',
            method: 'GET',
            data: {
                idCuentaDelCliente: inputCuentaDelCliente,
            },
            success: function (response) {
                // Limpia las sugerencias anteriores
                let contenedorClientes = $('#contenedorClientesCuentaDelCliente')
                contenedorClientes.empty();

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Iterar sobre los objetos y mostrar sus propiedades como sugerencias
                    response.forEach(function (obj) {
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

                        // Maneja el clic en la sugerencia
                        suggestion.on("click", function () {
                            // Rellena el campo de entrada con el nombre completo
                            $('#idCuentaDelCliente').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
                            $('#selectedIdClienteCuentaDelCliente').attr("value", obj.idCliente);
                            $('#selectedCodigoCliCuentaDelCliente').attr("value", obj.codigoCli);

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

    $('#btnBuscarCuentaDelCliente').on('click', function () {
        let fechaDesde = $('#fechaDesdeCuentaDelCliente').val();
        let fechaHasta = $('#fechaHastaCuentaDelCliente').val();
        let codigoCliente = $('#selectedCodigoCliCuentaDelCliente').attr("value");
        fn_TraerCuentaDelCliente(fechaDesde,fechaHasta,codigoCliente);
    });

    
    function fn_TraerCuentaDelCliente(fechaDesde,fechaHasta,codigoCliente) {
        $.ajax({
            url: '/fn_consulta_TraerCuentaDelCliente',
            method: 'GET',
            data: {
                fechaDesde : fechaDesde,
                fechaHasta : fechaHasta,
                codigoCliente : codigoCliente,
            },
            success: function (response) {
                console.log(response);
                let ventaAnterior = 0;
                let pagoAnterior = 0;
                // Verificar si ventaAnterior es null y reemplazarlo con 0
                if (response.ventaAnterior === null) {
                    response.ventaAnterior = 0;
                    ventaAnterior = response.ventaAnterior;
                }else{
                    ventaAnterior = response.ventaAnterior
                }

                if (response.pagoAnterior === null) {
                    response.pagoAnterior = 0;
                    pagoAnterior = response.pagoAnterior;
                }else{
                    pagoAnterior = response.pagoAnterior
                }
    
                // Crear un objeto para almacenar los datos combinados por fecha
                var combinedData = {};
    
                // Combinar totalesPrimerEspecie
                response.totalesPrimerEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {};
                    }
                    combinedData[fecha].totalPesoPrimerEspecie = parseFloat(item.totalPesoPrimerEspecie);
                    combinedData[fecha].totalDescuentoPrimerEspecie = parseFloat(item.totalDescuentoPrimerEspecie);
                    combinedData[fecha].totalVentaPrimerEspecie = parseFloat(item.totalVentaPrimerEspecie);
                    combinedData[fecha].totalCantidadPrimerEspecie = parseInt(item.totalCantidadPrimerEspecie);
                });
    
                // Combinar totalesSegundaEspecie
                response.totalesSegundaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {};
                    }
                    combinedData[fecha].totalPesoSegundaEspecie = parseFloat(item.totalPesoSegundaEspecie);
                    combinedData[fecha].totalDescuentoSegundaEspecie = parseFloat(item.totalDescuentoSegundaEspecie);
                    combinedData[fecha].totalVentaSegundaEspecie = parseFloat(item.totalVentaSegundaEspecie);
                    combinedData[fecha].totalCantidadSegundaEspecie = parseInt(item.totalCantidadSegundaEspecie);
                });

                // Combinar totalesSegundaEspecie
                response.totalesTerceraEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {};
                    }
                    combinedData[fecha].totalPesoTerceraEspecie = parseFloat(item.totalPesoTerceraEspecie);
                    combinedData[fecha].totalDescuentoTerceraEspecie = parseFloat(item.totalDescuentoTerceraEspecie);
                    combinedData[fecha].totalVentaTerceraEspecie = parseFloat(item.totalVentaTerceraEspecie);
                    combinedData[fecha].totalCantidadTerceraEspecie = parseInt(item.totalCantidadTerceraEspecie);
                });

                // Combinar totalesSegundaEspecie
                response.totalesCuartaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {};
                    }
                    combinedData[fecha].totalPesoCuartaEspecie = parseFloat(item.totalPesoCuartaEspecie);
                    combinedData[fecha].totalDescuentoCuartaEspecie = parseFloat(item.totalDescuentoCuartaEspecie);
                    combinedData[fecha].totalVentaCuartaEspecie = parseFloat(item.totalVentaCuartaEspecie);
                    combinedData[fecha].totalCantidadCuartaEspecie = parseInt(item.totalCantidadCuartaEspecie);
                });
    
                // Combinar totalDescuentos
                response.totalDescuentos.forEach(function (item) {
                    var fecha = item.fechaRegistroDesc;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {};
                    }
                    combinedData[fecha].totalDescuentoPrimerEspecie = parseFloat(item.totalDescuentoPrimerEspecie);
                    combinedData[fecha].totalDescuentoSegundaEspecie = parseFloat(item.totalDescuentoSegundaEspecie);
                    combinedData[fecha].totalDescuentoTerceraEspecie = parseFloat(item.totalDescuentoTerceraEspecie);
                    combinedData[fecha].totalDescuentoCuartaEspecie = parseFloat(item.totalDescuentoCuartaEspecie);
                    combinedData[fecha].totalPesoDescuento = parseFloat(item.totalPesoDescuento);
                    combinedData[fecha].totalVentaDescuento = parseFloat(item.totalVentaDescuento);
                });
    
                // Combinar totalPagos
                response.totalPagos.forEach(function (item) {
                    var fecha = item.fechaOperacionPag;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {};
                    }
                    combinedData[fecha].pagos = parseFloat(item.pagos);
                });
    
                // Ahora combinedData contiene los datos combinados por fecha
                fn_CrearTablaCuentaDelCliente(pagoAnterior,ventaAnterior,combinedData);
    
                // Puedes iterar sobre combinedData para hacer lo que necesites con los datos combinados.
            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    }

    function fn_CrearTablaCuentaDelCliente (pagoAnterior,ventaAnterior,combinedData){
        console.log("Llegaron : ",pagoAnterior,ventaAnterior,combinedData);

        Object.keys(combinedData).forEach(function(fecha) {
            console.log("Fecha:", fecha);
            // Accede a los datos directamente
            console.log(combinedData[fecha]);
            // Y así sucesivamente para otras propiedades
        });
    }

})