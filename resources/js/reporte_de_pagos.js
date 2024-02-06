import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function ($) {

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');

    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReporteDePagos').val(fechaHoy);
    $('#fechaHastaReporteDePagos').val(fechaHoy);
    $('#fechaDesdeCuentaDelCliente').val(fechaHoy);
    $('#fechaHastaCuentaDelCliente').val(fechaHoy);
    $('#fechaAgregarPago').val(fechaHoy);
    $('#fechaAgregarDescuento').val(fechaHoy);
    $('#fechaDesdeCuentaDelClienteDescuentos').val(fechaHoy);
    $('#fechaHastaCuentaDelClienteDescuentos').val(fechaHoy);
    $('#fechaCambiarPrecioPesada').val(fechaHoy);

    declarar_especies();
    declarar_especies_descuentos();
    fn_declararEspeciesCambiarPrecios();
    fn_TraerPagosFechas(fechaHoy,fechaHoy);

    /* ============ Eventos ============ */

    // Eventos para abrir y cerrar modal de Agregar Pago

    $('#registrar_agregarPago_submit').on('click', function () {
        $('#ModalAgregarPagoCliente').addClass('flex');
        $('#ModalAgregarPagoCliente').removeClass('hidden');
        $('#idAgregarPagoCliente').focus();

        $('#idAgregarPagoCliente').val('');
        $('#valorAgregarPagoCliente').val('');
        $('#codAgregarPagoCliente').val('');
        $('#comentarioAgregarPagoCliente').val('');
        $('#selectedCodigoCliAgregarPagoCliente').attr('val', '');
        $('#deudaTotal').text('0.00');
        $('#fechaAgregarPago').val(fechaHoy);
        $('#formaDePago').val($('#formaDePago option:first').val());
        $('#divCodTrans').removeClass('flex').addClass('hidden');
    });

    $('.cerrarModalAgregarPagoCliente, #ModalAgregarPagoCliente .opacity-75').on('click', function (e) {
        $('#ModalAgregarPagoCliente').addClass('hidden');
        $('#ModalAgregarPagoCliente').removeClass('flex');
        $('table tbody tr').removeClass('bg-gray-300 dark:bg-gray-600');
        $('table tbody tr').addClass('bg-white dark:bg-gray-800');
    });

    // Eventos para abrir y cerrar modal de Agregar Descuento por Kilo

    $('#registrar_agregarDescuento_submit').on('click', function () {
        $('#ModalAgregarDescuentoCliente').addClass('flex');
        $('#ModalAgregarDescuentoCliente').removeClass('hidden');
        $('#idAgregarDescuentoCliente').focus();

        $('#fechaAgregarDescuento').val(fechaHoy);
        $('#presentacionAgregarDescuentoCliente').val($('#presentacionAgregarDescuentoCliente option:first').val());
        $('#selectedCodigoCliAgregarDescuentoCliente').attr('value','');
        $('#idAgregarDescuentoCliente').val('');
        $('#valorAgregarDescuentoCliente').val('');
    });

    $('.cerrarModalAgregarDescuentoCliente, #ModalAgregarDescuentoCliente .opacity-75').on('click', function (e) {
        $('#ModalAgregarDescuentoCliente').addClass('hidden');
        $('#ModalAgregarDescuentoCliente').removeClass('flex');
        $('table tbody tr').removeClass('bg-gray-300 dark:bg-gray-600');
        $('table tbody tr').addClass('bg-white dark:bg-gray-800');
    });

    // Eventos para mostrar y ocultar interfaz de Cuenta del Cliente

    $('#registrar_FiltrarPorCliente_submit').on('click', function () {
        $('#selectedCodigoCliCuentaDelCliente').attr('value','');
        $('#idCuentaDelCliente').val('');
        $('#bodyCuentaDelCliente').empty();
        $('#bodyCuentaDelCliente').append('<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="7" class="text-center">No hay datos</td></tr>');
        
        $('#primerContenedorReporteDePagos').toggle('flex hidden');
        $('#segundoContenedorReporteDePagos').toggle('flex hidden');
        $('#btnRetrocesoCuentaDelCliente').toggle('hidden');

    });

    $('#btnRetrocesoCuentaDelCliente').on('click', function () {
        $('#primerContenedorReporteDePagos').toggle('flex hidden');
        $('#segundoContenedorReporteDePagos').toggle('flex hidden');
        $('#btnRetrocesoCuentaDelCliente').toggle('hidden');
    });

    // Evento para registrar Pagos de Clientes

    $('#btnAgregarPagoCliente').on('click', function () {
        let codigoCliente = $('#selectedCodigoCliAgregarPagoCliente').attr('value');
        let montoAgregarPagoCliente = $('#valorAgregarPagoCliente').val();
        let fechaAgregarPagoCliente = $('#fechaAgregarPago').val();
        let formaDePago = $('#formaDePago').val();
        let codAgregarPagoCliente = $('#codAgregarPagoCliente').val();
        let comentarioAgregarPagoCliente = $('#comentarioAgregarPagoCliente').val();

        let todosCamposCompletos = true

        $('#divAgregarPagoCliente .validarCampo').each(function() {
            let valorCampo = $(this).val();
    
            if (valorCampo === null || valorCampo.trim() === '') {
                $(this).removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
                todosCamposCompletos = false;
            } else {
                $(this).removeClass('border-red-500').addClass('border-green-500');
            }
        });
    
        if (todosCamposCompletos) {
            let valorCampo = parseFloat($('#valorAgregarPagoCliente').val());
            if (valorCampo > 0){
                fn_AgregarPagoCliente(codigoCliente,montoAgregarPagoCliente,fechaAgregarPagoCliente,formaDePago,codAgregarPagoCliente,comentarioAgregarPagoCliente);
            }else{
                alertify.notify('El monto no puede ser 0', 'error', 3);
                $('#valorAgregarPagoCliente').removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
            }
        } else {
            // Mostrar una alerta de que debe completar los campos obligatorios
            alertify.notify('Debe rellenar todos los campos obligatorios', 'error', 3);
        }
    });

    // Evento para registrar Descuento por Cliente

    $('#btnAgregarDescuentoCliente').on('click', function () {
        let todosCamposCompletos = true

        let codigoCliente = $('#selectedCodigoCliAgregarDescuentoCliente').attr('value');
        let pesoAgregarDescuentoCliente = parseFloat($('#valorAgregarDescuentoCliente').val())*-1;
        let fechaAgregarDescuentoCliente = $('#fechaAgregarDescuento').val();
        let especieAgregarDescuentoCliente = $('#presentacionAgregarDescuentoCliente').find("option:selected").val();
        let precioPrimerEspecieDescuento = $('#precioPrimerEspecieDescuento').val();
        let precioSegundaEspecieDescuento = $('#precioSegundaEspecieDescuento').val();
        let precioTerceraEspecieDescuento = $('#precioTerceraEspecieDescuento').val();
        let precioCuartaEspecieDescuento = $('#precioCuartaEspecieDescuento').val();

        let precioAgregarDescuentoCliente = 0

        if (especieAgregarDescuentoCliente == primerEspecieGlobal){
            precioAgregarDescuentoCliente = precioPrimerEspecieDescuento
        }else if (especieAgregarDescuentoCliente == segundaEspecieGlobal){
            precioAgregarDescuentoCliente = precioSegundaEspecieDescuento
        }else if (especieAgregarDescuentoCliente == terceraEspecieGlobal){
            precioAgregarDescuentoCliente = precioTerceraEspecieDescuento
        }else if (especieAgregarDescuentoCliente == cuartaEspecieGlobal){
            precioAgregarDescuentoCliente = precioCuartaEspecieDescuento
        }

        $('#divAgregarDescuentoCliente .validarCampo').each(function() {
            let valorCampo = $(this).val();
    
            if (valorCampo === null || valorCampo.trim() === '') {
                $(this).removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
                todosCamposCompletos = false;
            } else {
                $(this).removeClass('border-red-500').addClass('border-green-500');
            }
        });
    
        // Validar que especieAgregarDescuentoCliente no sea igual a 0
        if (especieAgregarDescuentoCliente != "0") {
            if (todosCamposCompletos) {
                let valorCampo = parseFloat($('#valorAgregarDescuentoCliente').val());
                if (valorCampo > 0) {
                    fn_AgregarDescuentoCliente(codigoCliente, pesoAgregarDescuentoCliente, fechaAgregarDescuentoCliente, especieAgregarDescuentoCliente, precioAgregarDescuentoCliente);
                } else {
                    alertify.notify('El peso en Kg no puede ser 0', 'error', 3);
                    $('#valorAgregarDescuentoCliente').removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
                }
            } else {
                // Mostrar una alerta de que debe completar los campos obligatorios
                alertify.notify('Debe rellenar todos los campos obligatorios', 'error', 3);
            }
        } else {
            // Mostrar una alerta de que especieAgregarDescuentoCliente no puede ser igual a 0
            alertify.notify('Debe seleccionar una especie', 'error', 3);
            $('#presentacionAgregarDescuentoCliente').removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
        }
    });

    $('#filtrar_pagos_submit').on('click', function () {
        let fechaDesdeTraerPagos = $('#fechaDesdeReporteDePagos').val();
        let fechaHastaTraerPagos = $('#fechaHastaReporteDePagos').val();
        fn_TraerPagosFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos);
    });

    // Hace aparecer o desaparecer el div para registrar codigo de tranferencia segun sea transferencia o efectivo

    $('#formaDePago').on('change',function() {
        var selectedOption = $(this).val();
        if (selectedOption === 'Transferencia') {
            // Si se selecciona "Transferencia", muestra el div con id "codTrans"
            $('#divCodTrans').removeClass('hidden').addClass('flex');
        } else {
            // Si se selecciona cualquier otra opción, oculta el div "codTrans"
            $('#divCodTrans').removeClass('flex').addClass('hidden');
        }
    });

    // Llamar a la función para filtrar clientes en Agregar Pago

    $('#idAgregarPagoCliente').on('input', function () {
        let inputAgregarPagoCliente = $(this).val();
        let contenedorClientes = $('#contenedorClientesAgregarPagoCliente');
        contenedorClientes.empty();

        if (inputAgregarPagoCliente.length > 0 && inputAgregarPagoCliente != "") {
            fn_TraerClientesAgregarPagoCliente(inputAgregarPagoCliente);
        } else {
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });

    // Llamar a la función para filtrar clientes en Agregar Descuento por Kg

    $('#idAgregarDescuentoCliente').on('input', function () {
        let inputAgregarDescuentoCliente = $(this).val();
        let contenedorClientes = $('#contenedorClientesAgregarDescuentoCliente');
        contenedorClientes.empty();

        if (inputAgregarDescuentoCliente.length > 0 && inputAgregarDescuentoCliente != "") {
            fn_TraerClientesAgregarDescuento(inputAgregarDescuentoCliente);
        } else {
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });

    // Llamar a la función para filtrar clientes en Cuenta de Cliente

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

    /* ============ Termina Eventos ============ */


    /* ============ Funciones ============ */

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

    function fn_TraerClientesAgregarPagoCliente(inputAgregarPagoCliente) {

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
                if (Array.isArray(response) && response.length > 0) {
                    // Iterar sobre los objetos y mostrar sus propiedades como sugerencias
                    response.forEach(function (obj) {
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

                        // Maneja el clic en la sugerencia
                        suggestion.on("click", function () {
                            // Rellena el campo de entrada con el nombre completo
                            $('#idAgregarPagoCliente').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
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
                codigoCliente: codigoCliente,
            },
            success: function(response) {
    
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
    
                    // Obtener el select
                    let inputDeudaTotal = $('#deudaTotal');
                    inputDeudaTotal.empty();
    
                    let deudaTotal = parseFloat(response[0].deudaTotal);
                    let cantidadPagos = parseFloat(response[0].cantidadPagos);
                    let ventaDescuentos = parseFloat(response[0].ventaDescuentos);
    
                    let total = deudaTotal - cantidadPagos + ventaDescuentos;
    
                    // Formatear el número con punto y dos decimales
                    let formateoTotal = total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    });
    
                    // Actualizar los elementos en la página con los valores
                    $('#deudaTotal').html(formateoTotal);
    
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
    }    

    function fn_TraerClientesAgregarDescuento(inputAgregarDescuentoCliente) {

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
                if (Array.isArray(response) && response.length > 0) {
                    // Iterar sobre los objetos y mostrar sus propiedades como sugerencias
                    response.forEach(function (obj) {
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

                        // Maneja el clic en la sugerencia
                        suggestion.on("click", function () {
                            // Rellena el campo de entrada con el nombre completo
                            $('#idAgregarDescuentoCliente').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
                            $('#selectedCodigoCliAgregarDescuentoCliente').attr("value", obj.codigoCli);
                            fn_TraerPreciosClienteDescuento(obj.codigoCli)

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

    function fn_TraerPreciosClienteDescuento(codigoCliente){
        $.ajax({
            url: '/fn_consulta_TraerPreciosClienteDescuento',
            method: 'GET',
            data:{
                codigoCliente: codigoCliente,
            },
            success: function(response) {
    
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
    
                    $('#precioPrimerEspecieDescuento').val(response[0].primerEspecie)
                    $('#precioSegundaEspecieDescuento').val(response[0].segundaEspecie)
                    $('#precioTerceraEspecieDescuento').val(response[0].terceraEspecie)
                    $('#precioCuartaEspecieDescuento').val(response[0].cuartaEspecie)
    
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
    }    

    function fn_TraerClientesCuentaDelCliente(inputCuentaDelCliente) {

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
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

                        // Maneja el clic en la sugerencia
                        suggestion.on("click", function () {
                            // Rellena el campo de entrada con el nombre completo
                            $('#idCuentaDelCliente').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
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

    function fn_AgregarPagoCliente(codigoCliente,montoAgregarPagoCliente,fechaAgregarPagoCliente,formaDePago,codAgregarPagoCliente,comentarioAgregarPagoCliente){
        $.ajax({
            url: '/fn_consulta_AgregarPagoCliente',
            method: 'GET',
            data: {
                codigoCliente: codigoCliente,
                montoAgregarPagoCliente: montoAgregarPagoCliente,
                fechaAgregarPagoCliente: fechaAgregarPagoCliente,
                formaDePago:formaDePago,
                codAgregarPagoCliente:codAgregarPagoCliente,
                comentarioAgregarPagoCliente:comentarioAgregarPagoCliente,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registro el pago correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#divAgregarPagoCliente .validarCampo').each(function() {
                        $(this).removeClass('border-green-500 border-red-500').addClass('dark:border-gray-600 border-gray-300');
                    });

                    fn_TraerDeudaTotal(codigoCliente);
                    $('#filtrar_pagos_submit').trigger('click');
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

    function fn_AgregarDescuentoCliente(codigoCliente,pesoAgregarDescuentoCliente,fechaAgregarDescuentoCliente,especieAgregarDescuentoCliente,precioAgregarDescuentoCliente) {
        $.ajax({
            url: '/fn_consulta_AgregarDescuentoCliente',
            method: 'GET',
            data: {
                codigoCliente: codigoCliente,
                pesoAgregarDescuentoCliente: pesoAgregarDescuentoCliente,
                fechaAgregarDescuentoCliente: fechaAgregarDescuentoCliente,
                especieAgregarDescuentoCliente:especieAgregarDescuentoCliente,
                precioAgregarDescuentoCliente:precioAgregarDescuentoCliente,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registro el descuento correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#divAgregarDescuentoCliente .validarCampo').each(function() {
                        $(this).removeClass('border-green-500 border-red-500').addClass('dark:border-gray-600 border-gray-300');
                    });

                    $('#presentacionAgregarDescuentoCliente').removeClass('border-green-500 border-red-500').addClass('dark:border-gray-600 border-gray-300');
                    
                    fn_TraerDeudaTotal(codigoCliente)
                    $('#ModalAgregarDescuentoCliente').addClass('hidden');
                    $('#ModalAgregarDescuentoCliente').removeClass('flex');
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

    function fn_TraerPagosFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos) {
        $.ajax({
            url: '/fn_consulta_TraerPagosFechas',
            method: 'GET',
            data:{
                fechaDesdeTraerPagos:fechaDesdeTraerPagos,
                fechaHastaTraerPagos:fechaHastaTraerPagos,
            },
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let tbodyReporteDePagos = $('#bodyReporteDePagos');
                    tbodyReporteDePagos.empty();

                    let totalPago = 0;
                    let nuevaFila = "";

                    let fechasUnicas = new Set();
                    let sinRepetidos = response.filter((valorActual) => {
                        let fechaInicioString = JSON.stringify(valorActual.fechaRegistroPag);
                        if (!fechasUnicas.has(fechaInicioString)) {
                            fechasUnicas.add(fechaInicioString);
                            return true;
                        }
                        return false;
                    });

                    sinRepetidos.forEach(function(item) {

                        if (sinRepetidos.length > 1) {
                            nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                            nuevaFila.append($('<td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center hidden">').text('Fecha'));
                            nuevaFila.append($('<td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(item.fechaRegistroPag));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center" colspan="5">').text(""));
                            tbodyReporteDePagos.append(nuevaFila);
                        }
                        // Iterar sobre los objetos y mostrar sus propiedades
                        response.forEach(function(obj) {
                            if (item.fechaRegistroPag === obj.fechaRegistroPag) {
                                // Crear una nueva fila
                                nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer pagoEditarOEliminar">');
                                totalPago += parseFloat(obj.cantidadAbonoPag);
                                // Agregar las celdas con la información
                                nuevaFila.append($('<td class="hidden">').text(obj.idPagos));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').text(obj.nombreCompleto));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(parseFloat(obj.cantidadAbonoPag).toFixed(2)));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(obj.tipoAbonoPag));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(obj.codigoTransferenciaPag));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(obj.fechaRegistroPag));
                                nuevaFila.append($('<td class="px-4 py-2 text-center cursor-pointer">').text(obj.observacion));
                                // Agregar la nueva fila al tbody
                                tbodyReporteDePagos.append(nuevaFila);
                            };
                        });
                    });

                    if (response.length == 0) {
                        tbodyReporteDePagos.html(`<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
                    }else{
                        let totalPagoFormateado = totalPago.toLocaleString('es-ES', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            useGrouping: true,
                        });

                        nuevaFila = $('<tr class="class="bg-white dark:bg-gray-800 h-0.5" cursor-pointer">');
                        nuevaFila.append($('<td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="6">').text(""));
                        tbodyReporteDePagos.append(nuevaFila);

                        nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').text("TOTAL:"));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text("S/. "+totalPagoFormateado));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                        nuevaFila.append($('<td class="px-4 py-2 text-center cursor-pointer">').text(""));
                        // Agregar la nueva fila al tbody
                        tbodyReporteDePagos.append(nuevaFila);
                        $("#filtroFormaDePago").val("Efectivo Caja").trigger("change");
                    }

                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
                
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

    /* ============ Termina Funciones ============ */

    $('#formaDePagoEditar').on('change',function() {
        var selectedOption = $(this).val();
        if (selectedOption === 'Transferencia') {
            // Si se selecciona "Transferencia", muestra el div con id "codTrans"
            $('#divCodTransEditar').removeClass('hidden').addClass('flex');
        } else {
            // Si se selecciona cualquier otra opción, oculta el div "codTrans"
            $('#divCodTransEditar').removeClass('flex').addClass('hidden');
        }
    });

    $('.cerrarModalAgregarPagoClienteEditar, #ModalAgregarPagoClienteEditar .opacity-75').on('click', function (e) {
        $('#ModalAgregarPagoClienteEditar').addClass('hidden');
        $('#ModalAgregarPagoClienteEditar').removeClass('flex');
        $('table tbody tr').removeClass('bg-gray-300 dark:bg-gray-600');
        $('table tbody tr').addClass('bg-white dark:bg-gray-800');
    });

    $(document).on("dblclick", "#bodyReporteDePagos tr.pagoEditarOEliminar", function() {
        if (tipoUsuario =='Administrador'){
            let fila = $(this).closest('tr');
            fila.toggleClass('bg-gray-300 dark:bg-gray-600 bg-white dark:bg-gray-800');
            let idReporteDePago= fila.find('td:eq(0)').text();
            console.log('Report', idReporteDePago);

            $('#idReporteDePago').attr("value",idReporteDePago);
            fn_EditarPago(idReporteDePago);
            
            $('#ModalAgregarPagoClienteEditar').addClass('flex');
            $('#ModalAgregarPagoClienteEditar').removeClass('hidden');

        }
    });

    function fn_TraerDeudaTotalEditar(codigoCliente){
        $.ajax({
            url: '/fn_consulta_TraerDeudaTotal',
            method: 'GET',
            data:{
                codigoCliente: codigoCliente,
            },
            success: function(response) {
    
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
    
                    // Obtener el select
                    let inputDeudaTotal = $('#deudaTotalEditar');
                    inputDeudaTotal.empty();
    
                    let deudaTotal = parseFloat(response[0].deudaTotal);
                    let cantidadPagos = parseFloat(response[0].cantidadPagos);
                    let ventaDescuentos = parseFloat(response[0].ventaDescuentos);
    
                    let total = deudaTotal - cantidadPagos + ventaDescuentos;
    
                    // Formatear el número con punto y dos decimales
                    let formateoTotal = total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    });
    
                    // Actualizar los elementos en la página con los valores
                    $('#deudaTotalEditar').html(formateoTotal);
    
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
    }
    
    $('#btnAgregarPagoClienteEditar').on('click', function () {
        let codigoCliente = $('#selectedCodigoCliAgregarPagoClienteEditar').attr('value');
        let montoAgregarPagoCliente = $('#valorAgregarPagoClienteEditar').val();
        let fechaAgregarPagoCliente = $('#fechaAgregarPagoEditar').val();
        let formaDePago = $('#formaDePagoEditar').val();
        let codAgregarPagoCliente = $('#codAgregarPagoClienteEditar').val();
        let comentarioAgregarPagoCliente = $('#comentarioAgregarPagoClienteEditar').val();

        let idReporteDePago = $('#idReporteDePago').attr("value");

        let todosCamposCompletos = true

        $('#divAgregarPagoClienteEditar .validarCampo').each(function() {
            let valorCampo = $(this).val();
    
            if (valorCampo === null || valorCampo.trim() === '') {
                $(this).removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
                todosCamposCompletos = false;
            } else {
                $(this).removeClass('border-red-500').addClass('border-green-500');
            }
        });
    
        if (todosCamposCompletos) {
            let valorCampo = parseFloat($('#valorAgregarPagoClienteEditar').val());
            if (valorCampo > 0){
                fn_ActualizarPagoCliente(idReporteDePago,codigoCliente,montoAgregarPagoCliente,fechaAgregarPagoCliente,formaDePago,codAgregarPagoCliente,comentarioAgregarPagoCliente);
            }else{
                alertify.notify('El monto no puede ser 0', 'error', 3);
                $('#valorAgregarPagoClienteEditar').removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
            }
        } else {
            // Mostrar una alerta de que debe completar los campos obligatorios
            alertify.notify('Debe rellenar todos los campos obligatorios', 'error', 3);
        }
    });

    function fn_ActualizarPagoCliente(idReporteDePago,codigoCliente,montoAgregarPagoCliente,fechaAgregarPagoCliente,formaDePago,codAgregarPagoCliente,comentarioAgregarPagoCliente){
        $.ajax({
            url: '/fn_consulta_ActualizarPagoCliente',
            method: 'GET',
            data: {
                idReporteDePago:idReporteDePago,
                codigoCliente: codigoCliente,
                montoAgregarPagoCliente: montoAgregarPagoCliente,
                fechaAgregarPagoCliente: fechaAgregarPagoCliente,
                formaDePago:formaDePago,
                codAgregarPagoCliente:codAgregarPagoCliente,
                comentarioAgregarPagoCliente:comentarioAgregarPagoCliente,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se edito el pago correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#divAgregarPagoClienteEditar .validarCampo').each(function() {
                        $(this).removeClass('border-green-500 border-red-500').addClass('dark:border-gray-600 border-gray-300');
                    });

                    $('#ModalAgregarPagoClienteEditar').addClass('hidden');
                    $('#ModalAgregarPagoClienteEditar').removeClass('flex');
                    $('#filtrar_pagos_submit').trigger('click');
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

    function fn_EditarPago(idReporteDePago){
        $.ajax({
            url: '/fn_consulta_EditarPago',
            method: 'GET',
            data: {
                idReporteDePago: idReporteDePago,
            },
            success: function(response) {
                if (Array.isArray(response)) {
                    response.forEach(function(obj) {
                        fn_TraerDeudaTotalEditar(obj.codigoCli)
                        $('#idAgregarPagoClienteEditar').val(obj.nombreCompleto);
                        $('#selectedCodigoCliAgregarPagoClienteEditar').attr("value", obj.codigoCli);
                        $('#valorAgregarPagoClienteEditar').val(obj.cantidadAbonoPag);
                        $('#fechaAgregarPagoEditar').val(obj.fechaOperacionPag);
                        $('#formaDePagoEditar').val(obj.tipoAbonoPag);
                        if (obj.tipoAbonoPag == 'Transferencia'){
                            $('#divCodTransEditar').removeClass('hidden').addClass('flex');
                        }else{
                            $('#divCodTransEditar').removeClass('flex').addClass('hidden');
                        }
                        $('#codAgregarPagoClienteEditar').val(obj.codigoTransferenciaPag);
                        $('#comentarioAgregarPagoClienteEditar').val(obj.observacion);
                    });
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
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

    $('#idAgregarPagoClienteEditar').on('input', function () {
        let inputAgregarPagoCliente = $(this).val();
        let contenedorClientes = $('#contenedorClientesAgregarPagoClienteEditar');
        contenedorClientes.empty();

        if (inputAgregarPagoCliente.length > 1 || inputAgregarPagoCliente != "") {
            fn_TraerClientesAgregarPagoClienteEditar(inputAgregarPagoCliente);
        } else {
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });

    function fn_TraerClientesAgregarPagoClienteEditar(inputAgregarPagoCliente) {

        $.ajax({
            url: '/fn_consulta_TraerClientesAgregarPagoCliente',
            method: 'GET',
            data: {
                inputAgregarPagoCliente: inputAgregarPagoCliente,
            },
            success: function (response) {
                // Limpia las sugerencias anteriores
                let contenedorClientes = $('#contenedorClientesAgregarPagoClienteEditar')
                contenedorClientes.empty();

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Iterar sobre los objetos y mostrar sus propiedades como sugerencias
                    response.forEach(function (obj) {
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

                        // Maneja el clic en la sugerencia
                        suggestion.on("click", function () {
                            // Rellena el campo de entrada con el nombre completo
                            $('#idAgregarPagoClienteEditar').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
                            $('#selectedCodigoCliAgregarPagoClienteEditar').attr("value", obj.codigoCli);
                            fn_TraerDeudaTotalEditar(obj.codigoCli);

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

    $(document).on('contextmenu', '#bodyReporteDePagos tr.pagoEditarOEliminar', function (e) {
        e.preventDefault();
        if (tipoUsuario =='Administrador'){
            let codigoPago = $(this).closest("tr").find("td:first").text();
            let fila = $(this).closest("tr");
            fila.toggleClass('bg-gray-300 dark:bg-gray-600 bg-white dark:bg-gray-800');
            Swal.fire({
                title: '¿Desea eliminar el Registro?',
                text: "¡Estas seguro de eliminar el pago!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: '¡No, cancelar!',
                confirmButtonText: '¡Si,eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    fn_EliminarPago(codigoPago);
                }else{
                    $('table tbody tr').removeClass('bg-gray-300 dark:bg-gray-600');
                    $('table tbody tr').addClass('bg-white dark:bg-gray-800');
                }
            })
        }
    });

    function fn_EliminarPago(codigoPago){
        $.ajax({
            url: '/fn_consulta_EliminarPago',
            method: 'GET',
            data: {
                codigoPago: codigoPago,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se elimino el pago correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#filtrar_pagos_submit').trigger('click');
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

    // Manejar cambios en el select
    $('#filtroFormaDePago').on('change', function () {
        var selectedValue = $(this).val();

        // Ocultar todas las filas excepto las de Fecha y las filas con colspan="6"
        $('#bodyReporteDePagos tr:not(:contains("Fecha"))').hide();

        // Mostrar filas según el filtro seleccionado
        if (selectedValue === 'Todos') {
            $('#bodyReporteDePagos tr').show();
        } else {
            $('#bodyReporteDePagos tr:has(td:eq(3):contains("' + selectedValue + '"))').show();
        }

        // Mostrar la última fila independientemente del filtro
        $('#bodyReporteDePagos tr:last').show();
        // Mostrar la penúltima fila independientemente del filtro
        $('#bodyReporteDePagos tr:eq(-2)').show();

        // Actualizar la fila "TOTAL" según los resultados filtrados
        updateTotal();
    });

    // Función para actualizar la fila "TOTAL"
    function updateTotal() {
        var total = 0;

        // Sumar los montos de las filas visibles
        $('#bodyReporteDePagos tr:visible').each(function () {
            var monto = parseFloat($(this).find('td:eq(2)').text());
            total += isNaN(monto) ? 0 : monto;
        });

        // Actualizar el valor en la fila "TOTAL"
        let totalFormateado = total.toLocaleString('es-ES', {
            minimumFractionDigits: 2,   
            maximumFractionDigits: 2,
            useGrouping: true,
        });
        $('#bodyReporteDePagos tr:last td:eq(1)').text('S/. ' + totalFormateado);
    }

    $('#btnRetrocesoCuentaDelClienteDescuento').on('click', function () {
        $('#primerContenedorReporteDePagos').toggle('flex hidden');
        $('#tercerContenedorReporteDeDescuentos').toggle('flex hidden');
        $('#btnRetrocesoCuentaDelClienteDescuento').toggle('hidden');
    });

    $('#btnBuscarCuentaDelClienteDescuentos').on('click', function () {
        let fechaDesdeTraerDescuentos = $('#fechaDesdeCuentaDelClienteDescuentos').val();
        let fechaHastaTraerDescuentos = $('#fechaHastaCuentaDelClienteDescuentos').val();
        fn_RegistroDescuentos(fechaDesdeTraerDescuentos, fechaHastaTraerDescuentos);
    });

    $('#descuento_FiltrarPorCliente_submit').on('click', function () {
        $('#selectedCodigoCliCuentaDelClienteDescuentos').attr('value','');
        $('#idCuentaDelClienteDescuentos').val('');
        
        $('#primerContenedorReporteDePagos').toggle('flex hidden');
        $('#tercerContenedorReporteDeDescuentos').toggle('flex hidden');
        $('#btnRetrocesoCuentaDelClienteDescuento').toggle('hidden');
        fn_RegistroDescuentos(fechaHoy,fechaHoy);
        $('#fechaDesdeCuentaDelClienteDescuentos').val(fechaHoy);
        $('#fechaHastaCuentaDelClienteDescuentos').val(fechaHoy);
    });

    function fn_RegistroDescuentos(fechaDesdeTraerDescuentos,fechaHastaTraerDescuentos) {
        $.ajax({
            url: '/fn_consulta_RegistroDescuentos',
            method: 'GET',
            data:{
                fechaDesdeTraerDescuentos:fechaDesdeTraerDescuentos,
                fechaHastaTraerDescuentos:fechaHastaTraerDescuentos,
            },
            success: function (response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyCuentaDelClienteDescuentos = $('#bodyCuentaDelClienteDescuentos');
                    tbodyCuentaDelClienteDescuentos.empty();
                    let nuevaFila = ""

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        // Crear una nueva fila
                        nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idDescuento));

                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">').text(obj.nombreCompleto));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(parseFloat(obj.pesoDesc).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.nombreEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(parseFloat(obj.precioDesc).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.fechaRegistroDesc));
                        
                        // Agregar la nueva fila al tbody
                        tbodyCuentaDelClienteDescuentos.append(nuevaFila);
                    });

                    if (nuevaFila == ""){
                        tbodyCuentaDelClienteDescuentos.append(
                            '<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="6" class="text-center">No hay datos</td></tr>'
                        );
                    }

                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }

            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

    $(document).on("dblclick", "#bodyCuentaDelClienteDescuentos tr", function() {
        let codigoDescuento = $(this).find('td:eq(0)').text();
        fn_ConsultarEditarDescuento(codigoDescuento)
    });

    function fn_ConsultarEditarDescuento(codigoDescuento){
        $.ajax({
            url: '/fn_consulta_EditarDescuentos',
            method: 'GET',
            data: {
                codigoDescuento:codigoDescuento,
            },
            success: function(response) {
                response.forEach(function(obj){
                    //console.log(obj)
                    let pesoDesc = parseFloat(obj.pesoDesc)*-1
                    $('#idEditarNombreDeClienteDescuento').attr("value",obj.codigoCli)
                    $('#valorEditarDescuentoCliente').attr("value",obj.idDescuento);
                    $('#idEditarNombreDescuentoCliente').val(obj.nombreCompleto);
                    $('#editarPresentacionDescuentoCliente').val(obj.especieDesc);
                    $('#fechaPagoEditarDescuento').val(obj.fechaRegistroDesc);
                    $("#valorClienteEditarDescuento").val(pesoDesc.toFixed(2));
                    $('#valorPrecioEditarDescuento').val(parseFloat(obj.precioDesc).toFixed(2));
                    
                    $('#ModalEditarDescuentoClienteEditar').addClass('flex');
                    $('#ModalEditarDescuentoClienteEditar').removeClass('hidden');

                });
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

    function declarar_especies_descuentos(){
        $.ajax({
            url: '/fn_consulta_DatosEspecie',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    
                    // Obtener el select
                    let selectPresentacion = $('#editarPresentacionDescuentoCliente');
                    
                    // Vaciar el select actual, si es necesario
                    selectPresentacion.empty();

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

    $('#btnEditarDescuentoClienteEditar').on('click', function () {
        let idDescuento = $('#valorEditarDescuentoCliente').attr("value");
        let nombreClienteEditar = $('#idEditarNombreDeClienteDescuento').attr('value');
        let fechaRegistroDesc = $('#fechaPagoEditarDescuento').val();
        let nombreEspecie = $('#editarPresentacionDescuentoCliente').val();
        let pesoDesc = $('#valorClienteEditarDescuento').val();
        pesoDesc = parseFloat(pesoDesc)*-1;
        let precioDescuento = $('#valorPrecioEditarDescuento').val();
        fn_ConsultarEditarDescuentoCliente(idDescuento, nombreClienteEditar, fechaRegistroDesc, nombreEspecie, pesoDesc,precioDescuento);
    });

    function fn_ConsultarEditarDescuentoCliente(idDescuento, nombreClienteEditar, fechaRegistroDesc, nombreEspecie, pesoDesc,precioDescuento){
        $.ajax({
            url: '/fn_consulta_EditarDescuentoCliente',
            method: 'GET',
            data: {
                idDescuento:idDescuento,
                nombreClienteEditar: nombreClienteEditar,
                fechaRegistroDesc: fechaRegistroDesc,
                nombreEspecie: nombreEspecie,
                pesoDesc: pesoDesc,
                precioDescuento:precioDescuento,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizo el descuento correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#btnBuscarCuentaDelClienteDescuentos').trigger('click');
                    $('#ModalEditarDescuentoClienteEditar').addClass('hidden');
                    $('#ModalEditarDescuentoClienteEditar').removeClass('flex');
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

    $(document).on('contextmenu', '#bodyCuentaDelClienteDescuentos tr', function (e) {
        e.preventDefault();
        let codigoDescuento = $(this).closest("tr").find("td:first").text();
        Swal.fire({
            title: '¿Desea eliminar el Registro?',
            text: "¡Estas seguro de eliminar el pago!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: '¡No, cancelar!',
            confirmButtonText: '¡Si,eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                fn_EliminarDescuento(codigoDescuento);
            }
        })
    });

    function fn_EliminarDescuento(codigoDescuento){
        $.ajax({
            url: '/fn_consulta_EliminarDescuento',
            method: 'GET',
            data: {
                codigoDescuento: codigoDescuento,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se elimino el pago correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#btnBuscarCuentaDelClienteDescuentos').trigger('click');
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

    $('.cerrarModalEditarDescuento, #ModalEditarDescuentoClienteEditar .opacity-75').on('click', function (e) {
        $('#ModalEditarDescuentoClienteEditar').addClass('hidden');
        $('#ModalEditarDescuentoClienteEditar').removeClass('flex');
    });

    // ===================================================================

    $('.cerrarModalCambiarPrecioPesada, #ModalCambiarPrecioPesada .opacity-75').on('click', function (e) {
        $('#ModalCambiarPrecioPesada').addClass('hidden');
        $('#ModalCambiarPrecioPesada').removeClass('flex');
    });

    $(document).on("click", "#btnCambiarPrecioPesadas", function() {      
        $('#ModalCambiarPrecioPesada').addClass('flex');
        $('#ModalCambiarPrecioPesada').removeClass('hidden');
        $('#selectedCodigoCliCambiarPrecioPesada').attr('value',"");
        $('#fechaCambiarPrecioPesada').val(fechaHoy);
        $('#especiesCambioPrecioPesadas').val(0);
        $('#nuevoPrecioCambiarPesadas').val("");
        $('#idCambiarPrecioPesadaCliente').val("");
        $("#nuevoPrecioCambiarPesadas").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
        $("#especiesCambioPrecioPesadas").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
        $("#idCambiarPrecioPesadaCliente").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
    });

    $('#idCambiarPrecioPesadaCliente').on('input', function () {
        let inputCambiarPrecioCliente = $(this).val();
        let contenedorClientes = $('#contenedorClientesCambiarPrecioPesada');
        contenedorClientes.empty();

        if (inputCambiarPrecioCliente.length > 0 && inputCambiarPrecioCliente != "") {
            fn_TraerClientesCambiarPrecios(inputCambiarPrecioCliente);
        } else {
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });

    function fn_TraerClientesCambiarPrecios(inputAgregarPagoCliente) {

        $.ajax({
            url: '/fn_consulta_TraerClientesAgregarPagoCliente',
            method: 'GET',
            data: {
                inputAgregarPagoCliente: inputAgregarPagoCliente,
            },
            success: function (response) {
                // Limpia las sugerencias anteriores
                let contenedorClientes = $('#contenedorClientesCambiarPrecioPesada')
                contenedorClientes.empty();

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response) && response.length > 0) {
                    // Iterar sobre los objetos y mostrar sus propiedades como sugerencias
                    response.forEach(function (obj) {
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

                        // Maneja el clic en la sugerencia
                        suggestion.on("click", function () {
                            // Rellena el campo de entrada con el nombre completo
                            $('#idCambiarPrecioPesadaCliente').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
                            $('#selectedCodigoCliCambiarPrecioPesada').attr("value", obj.codigoCli);

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

    function fn_declararEspeciesCambiarPrecios(){
        $.ajax({
            url: '/fn_consulta_DatosEspecie',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    
                    // Obtener el select
                    let selectPresentacion = $('#especiesCambioPrecioPesadas');
                    
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

    $('#btnCambiarPrecioPesada').on('click', function () {
        let codigoCliente = $('#selectedCodigoCliCambiarPrecioPesada').attr('value');
        let fechaCambioPrecio = $('#fechaCambiarPrecioPesada').val();
        let especieCambioPrecio = $('#especiesCambioPrecioPesadas').val();
        let nuevoPrecio = $('#nuevoPrecioCambiarPesadas').val();

        let contadorErrores = 0

        if (codigoCliente == 0 || codigoCliente == ""){
            contadorErrores++;
            $("#idCambiarPrecioPesadaCliente").removeClass('dark:border-gray-600 border-gray-300').addClass('border-red-500');
        }else{
            $("#idCambiarPrecioPesadaCliente").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
        }
        if (especieCambioPrecio == 0 || especieCambioPrecio == "" || especieCambioPrecio === null){
            contadorErrores++;
            $("#especiesCambioPrecioPesadas").removeClass('dark:border-gray-600 border-gray-300').addClass('border-red-500');
        }else{
            $("#especiesCambioPrecioPesadas").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
        }
        if(nuevoPrecio == ""){
            contadorErrores++;
            $("#nuevoPrecioCambiarPesadas").removeClass('dark:border-gray-600 border-gray-300').addClass('border-red-500');
        }else{
            $("#nuevoPrecioCambiarPesadas").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
        }

        if (contadorErrores <= 0){
            Swal.fire({
                title: '¿Desea cambiar los registros?',
                text: "¡Estas seguro de cambiar el precio de las pesadas!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: '¡No, cancelar!',
                confirmButtonText: '¡Si, cambiar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    fn_CambiarPrecioPesadas(codigoCliente, fechaCambioPrecio, especieCambioPrecio, nuevoPrecio);
                }
            })
        }else{
            alertify.notify('Debe rellenar todos los campos.', 'error', 3);
        }

    });

    function fn_CambiarPrecioPesadas(codigoCliente, fechaCambioPrecio, especieCambioPrecio, nuevoPrecio){
        $.ajax({
            url: '/fn_consulta_CambiarPrecioPesadas',
            method: 'GET',
            data: {
                codigoCliente: codigoCliente,
                fechaCambioPrecio : fechaCambioPrecio,
                especieCambioPrecio: especieCambioPrecio,
                nuevoPrecio: nuevoPrecio,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se cambio los precios correctamente.',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#selectedCodigoCliCambiarPrecioPesada').attr('value',"");
                    $('#fechaCambiarPrecioPesada').val(fechaHoy);
                    $('#especiesCambioPrecioPesadas').val(0);
                    $('#nuevoPrecioCambiarPesadas').val("");
                    $('#idCambiarPrecioPesadaCliente').val("");
                    $('#ModalCambiarPrecioPesada').addClass('hidden');
                    $('#ModalCambiarPrecioPesada').removeClass('flex');

                    $('#btnBuscarCuentaDelCliente').trigger('click');
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

})
