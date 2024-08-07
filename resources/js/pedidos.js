import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];

    // Asignar la fecha actual a los inputs
    $('#fechaBuscarPedidos').val(fechaHoy);
    $('#fechaAgregarPedido').val(fechaHoy);
    $('#fechaAgregarPedidoEditar').val(fechaHoy);
    $('#fechaTraerPedido').val(fechaHoy);
    $('#fechaRegistrarPedidoADia').val(fechaHoy);
    fn_TraerPedidosClientes(fechaHoy);
    DataTableED('#tablaPedidos');
    var tipoUsuario = $('#tipoUsuario').data('id');
    
    fn_declarar_especies();
    var primerEspecieGlobal = 0
    var segundaEspecieGlobal = 0
    var terceraEspecieGlobal = 0
    var cuartaEspecieGlobal = 0
    var nombrePrimerEspecieGlobal = ""
    var nombreSegundaEspecieGlobal = ""
    var nombreTerceraEspecieGlobal = ""
    var nombreCuartaEspecieGlobal = ""

    function fn_declarar_especies(){
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

    $('.cerrarModalAgregarPedido, #ModalAgregarPedido .opacity-75').on('click', function (e) {
        $('#ModalAgregarPedido').addClass('hidden');
        $('#ModalAgregarPedido').removeClass('flex');
    });

    $('.cerrarModalAgregarPedidoEditar, #ModalAgregarPedidoEditar .opacity-75').on('click', function (e) {
        $('#ModalAgregarPedidoEditar').addClass('hidden');
        $('#ModalAgregarPedidoEditar').removeClass('flex');
    });

    $(document).on("click", "#registrarPedidoCliente", function() {
        $('#ModalAgregarPedido').addClass('flex');
        $('#ModalAgregarPedido').removeClass('hidden');
        $('#idRegistrarPedidoCliente').focus();

        $('#idRegistrarPedidoCliente').val("");
        $('#selectedCodigoCliPedidos').attr("value", "");
        $('#idRegistrarPrimerEspeciePedido').val("");
        $('#idRegistrarSegundaEspeciePedido').val("");
        $('#idRegistrarTerceraEspeciePedido').val("");
        $('#idRegistrarCuartaEspeciePedido').val("");
        $('#comentarioAgregarPedido').val("");
        $('#idRegistrarPedidoCliente').addClass('border-green-500 dark:border-gray-600 border-gray-300').removeClass('border-red-500');
        $('#filtrarPedidosFecha').trigger('click');
    });

    $('#idRegistrarPedidoCliente').on('input', function () {
        let inputAgregarPagoCliente = $(this).val();
        let contenedorClientes = $('#contenedorClientesPedidos');
        contenedorClientes.empty();

        if (inputAgregarPagoCliente.length > 0 && inputAgregarPagoCliente != "") {
            fn_TraerClientesAgregarPedido(inputAgregarPagoCliente);
        } else {
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });

    function fn_TraerClientesAgregarPedido(inputAgregarPagoCliente) {

        $.ajax({
            url: '/fn_consulta_TraerClientesAgregarPagoCliente',
            method: 'GET',
            data: {
                inputAgregarPagoCliente: inputAgregarPagoCliente,
            },
            success: function (response) {
                // Limpia las sugerencias anteriores
                let contenedorClientes = $('#contenedorClientesPedidos')
                contenedorClientes.empty();

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response) && response.length > 0) {
                    // Iterar sobre los objetos y mostrar sus propiedades como sugerencias
                    response.forEach(function (obj) {
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

                        // Maneja el clic en la sugerencia
                        suggestion.on("click", function () {
                            // Rellena el campo de entrada con el nombre completo
                            $('#idRegistrarPedidoCliente').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
                            $('#selectedCodigoCliPedidos').attr("value", obj.codigoCli);

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

    $('#filtrarPedidosFecha').on('click', function () {
        let fechaBuscarPedidos = $('#fechaBuscarPedidos').val();
        fn_TraerPedidosClientes(fechaBuscarPedidos);
    });

    function fn_TraerPedidosClientes(fechaBuscarPedidos) {
        $.ajax({
            url: '/fn_consulta_TraerPedidosClientes',
            method: 'GET',
            data:{
                fechaBuscarPedidos:fechaBuscarPedidos,
            },
            success: function (response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyPedidoDelCliente = $('#bodyPedidos');
                    let TtotalesPedidos = $('#headerPedidos');
                    TtotalesPedidos.empty();
                    TtotalesPedidos.append(`<tr>
                        <th class="hidden">Id</th>
                        <th class="px-2 py-4 text-center md:px-4 whitespace-nowrap">TOTAL</th>
                        <th class="px-2 py-4 text-left">Nombre de Cliente</th>
                        <th class="px-2 py-4 text-center md:px-4 md:whitespace-nowrap">POLLO YUGO</th>
                        <th class="px-2 py-4 text-center md:px-4 md:whitespace-nowrap">POLLO PERLA</th>
                        <th class="px-2 py-4 text-center md:px-4 md:whitespace-nowrap">POLLO CHIMU</th>
                        <th class="px-2 py-4 text-center md:px-4 md:whitespace-nowrap">POLLO XX</th>
                        <th class="px-2 py-4 text-center">COMENTARIO</th>
                        <th class="hidden"></th>
                        <th class="hidden"></th>
                    </tr>`);
                    tbodyPedidoDelCliente.empty();
                    let nuevaFila = ""
                    let totalPedidosFinal = 0;
                    let totalPedido1 = 0;
                    let totalPedido2 = 0;
                    let totalPedido3 = 0;
                    let totalPedido4 = 0;

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        // Crear una nueva fila
                        nuevaFila = $('<tr class="bg-white filaEditable border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        let totalPedidos = 0;
                        totalPedidos = parseInt(obj.cantidadPrimerEspecie) + parseInt(obj.cantidadSegundaEspecie) + parseInt(obj.cantidadTerceraEspecie) + parseInt(obj.cantidadCuartaEspecie);
                        totalPedidosFinal += totalPedidos;
                        totalPedido1 += parseInt(obj.cantidadPrimerEspecie);
                        totalPedido2 += parseInt(obj.cantidadSegundaEspecie);
                        totalPedido3 += parseInt(obj.cantidadTerceraEspecie);
                        totalPedido4 += parseInt(obj.cantidadCuartaEspecie);

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idPedido));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(totalPedidos));                        
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 dark:text-white">').text(obj.nombreCompleto));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').text(obj.cantidadPrimerEspecie));                        
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').text(obj.cantidadSegundaEspecie));                        
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').text(obj.cantidadTerceraEspecie));                        
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').text(obj.cantidadCuartaEspecie));
                        
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.comentarioPedido));                        
                        nuevaFila.append($('<td class="hidden">').text(obj.fechaRegistroPedido));
                        nuevaFila.append($('<td class="hidden">').text(obj.codigoCliPedido));
                        // Agregar la nueva fila al tbody
                        tbodyPedidoDelCliente.append(nuevaFila);
                    });

                    if (nuevaFila == ""){
                        tbodyPedidoDelCliente.append(
                            '<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="6" class="text-center">No hay datos</td></tr>'
                        );
                    }else{
                        let totalPedidoFormateado = totalPedidosFinal.toLocaleString('es-ES', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            useGrouping: true,
                        });

                        nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                        nuevaFila.append($('<td class="hidden">').text(""));
                        // nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center font-bold whitespace-nowrap">').text("TOTAL:"));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(totalPedidoFormateado));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(totalPedido1));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(totalPedido2));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(totalPedido3));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(totalPedido4));
                        nuevaFila.append($('<td class="hidden">').text(""));
                        nuevaFila.append($('<td class="hidden">').text(""));
                        nuevaFila.append($('<td class="px-4 py-2 text-center cursor-pointer">').text(""));
                        // Agregar la nueva fila al tbody
                        TtotalesPedidos.append(nuevaFila);

                        nuevaFila = $('<tr class="class="bg-white dark:bg-gray-800 h-0.5" cursor-pointer">');
                        nuevaFila= ($('<td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="7">').text(""));
                        TtotalesPedidos.append(nuevaFila);
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

    $('#btnAgregarPedido').on('click', function () {
        let selectedCodigoCliPedidos = $('#selectedCodigoCliPedidos').attr("value");
        let fechaAgregarPedido = $('#fechaAgregarPedido').val();

        let todosCamposCompletos = true

        if (selectedCodigoCliPedidos === null || selectedCodigoCliPedidos.trim() === '') {
            $('#idRegistrarPedidoCliente').removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
            todosCamposCompletos = false;
        } else {
            $('#idRegistrarPedidoCliente').removeClass('border-red-500').addClass('border-green-500');
        }
        if (todosCamposCompletos) {
            fn_VerificarPedido(selectedCodigoCliPedidos,fechaAgregarPedido);
        }else {
            // Mostrar una alerta de que debe completar los campos obligatorios
            alertify.notify('Debe seleccionar Cliente', 'error', 3);
        }

    });
    
    function fn_VerificarPedido(selectedCodigoCliPedidos,fechaAgregarPedido){
        $.ajax({
            url: '/fn_consulta_VerificarPedido',
            method: 'GET',
            data: {
                selectedCodigoCliPedidos: selectedCodigoCliPedidos,
                fechaAgregarPedido: fechaAgregarPedido,
            },
            success: function(response) {
                if(response.existePedido == true){
                    alertify.notify('El pedido del cliente ya existe.', 'error', 3);
                    $('#idRegistrarPedidoCliente').val("");
                    $('#selectedCodigoCliPedidos').attr("value", "");
                }else{
                    let selectedCodigoCliPedidos = $('#selectedCodigoCliPedidos').attr("value");
                    let idRegistrarPrimerEspeciePedido = $('#idRegistrarPrimerEspeciePedido').val();
                    let idRegistrarSegundaEspeciePedido = $('#idRegistrarSegundaEspeciePedido').val();
                    let idRegistrarTerceraEspeciePedido = $('#idRegistrarTerceraEspeciePedido').val();
                    let idRegistrarCuartaEspeciePedido = $('#idRegistrarCuartaEspeciePedido').val();
                    let comentarioAgregarPedido = $('#comentarioAgregarPedido').val();
                    let fechaAgregarPedido = $('#fechaAgregarPedido').val();

                    let todosCamposCompletos = true

                    if (selectedCodigoCliPedidos === null || selectedCodigoCliPedidos.trim() === '') {
                        $('#idRegistrarPedidoCliente').removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
                        todosCamposCompletos = false;
                    } else {
                        $('#idRegistrarPedidoCliente').removeClass('border-red-500').addClass('border-green-500');
                    }
                
                    if (todosCamposCompletos) {
                        fn_AgregarPedidoCliente(selectedCodigoCliPedidos,idRegistrarPrimerEspeciePedido,idRegistrarSegundaEspeciePedido,idRegistrarTerceraEspeciePedido,idRegistrarCuartaEspeciePedido,comentarioAgregarPedido,fechaAgregarPedido);
                    } else {
                        // Mostrar una alerta de que debe completar los campos obligatorios
                        alertify.notify('Debe seleccionar Cliente', 'error', 3);
                    }
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

    function fn_AgregarPedidoCliente(selectedCodigoCliPedidos,idRegistrarPrimerEspeciePedido,idRegistrarSegundaEspeciePedido,idRegistrarTerceraEspeciePedido,idRegistrarCuartaEspeciePedido,comentarioAgregarPedido,fechaAgregarPedido){
        $.ajax({
            url: '/fn_consulta_AgregarPedidoCliente',
            method: 'GET',
            data: {
                selectedCodigoCliPedidos: selectedCodigoCliPedidos,
                idRegistrarPrimerEspeciePedido: idRegistrarPrimerEspeciePedido,
                idRegistrarSegundaEspeciePedido: idRegistrarSegundaEspeciePedido,
                idRegistrarTerceraEspeciePedido: idRegistrarTerceraEspeciePedido,
                idRegistrarCuartaEspeciePedido: idRegistrarCuartaEspeciePedido,
                comentarioAgregarPedido: comentarioAgregarPedido,
                fechaAgregarPedido: fechaAgregarPedido,
            },
            success: function(response) {
                if (response.success) {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registro el pedido correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#ModalAgregarPedido').addClass('hidden');
                    $('#ModalAgregarPedido').removeClass('flex');
                    $('#filtrarPedidosFecha').trigger('click');
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

    $(document).on('contextmenu', '#tablaPedidos tbody tr.filaEditable', function (e) {
        e.preventDefault();
        if (tipoUsuario =='Administrador'){
            let codigoPedido = $(this).closest("tr").find("td:first").text();
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
                    fn_EliminarPedido(codigoPedido);
                }else{
                    $('table tbody tr').removeClass('bg-gray-300 dark:bg-gray-600');
                    $('table tbody tr').addClass('bg-white dark:bg-gray-800');
                }
            })
        }
    });

    function fn_EliminarPedido(codigoPedido){
        $.ajax({
            url: '/fn_consulta_EliminarPedido',
            method: 'GET',
            data: {
                codigoPedido: codigoPedido,
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
                    $('#filtrarPedidosFecha').trigger('click');
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

    $('#filtrarClientePedidos').on('input', function () {
        let nombreFiltrar = $('#filtrarClientePedidos').val().toUpperCase();
        // Ocultar todas las filas excepto las de Fecha y las filas con colspan="6"
        $('#tablaPedidos tbody tr').show();

        if (nombreFiltrar) {
            $('#tablaPedidos tbody tr').each(function() {
                let nombre = $(this).find('td:eq(2)').text().toUpperCase().trim();
                if (nombre.indexOf(nombreFiltrar) === -1) {
                    $(this).hide();
                }
            });
        }

        // Actualizar la fila "TOTAL" según los resultados filtrados
        updateTotal();
    });

    // Función para actualizar la fila "TOTAL"
    function updateTotal() {
        let total1 = 0;
        let total2 = 0;
        let total3 = 0;
        let total4 = 0;
        let total5 = 0;

        // Sumar los montos de las filas visibles
        $('#bodyPedidos tr.filaEditable:visible').each(function () {
            let monto1 = parseFloat($(this).find('td:eq(3)').text());
            total1 += isNaN(monto1) ? 0 : monto1;
            let monto2 = parseFloat($(this).find('td:eq(4)').text());
            total2 += isNaN(monto2) ? 0 : monto2;
            let monto3 = parseFloat($(this).find('td:eq(5)').text());
            total3 += isNaN(monto3) ? 0 : monto3;
            let monto4 = parseFloat($(this).find('td:eq(6)').text());
            total4 += isNaN(monto4) ? 0 : monto4;
            let monto5 = parseFloat($(this).find('td:eq(1)').text());
            total5 += isNaN(monto5) ? 0 : monto5;
        });

        // Actualizar el valor en la fila "TOTAL"
        let totalFormateado1 = total1.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });
        let totalFormateado2 = total2.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });
        let totalFormateado3 = total3.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });
        let totalFormateado4 = total4.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });
        let totalFormateado5 = total5.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });

        $('#headerPedidos tr:last td:eq(3)').text(totalFormateado1);
        $('#headerPedidos tr:last td:eq(4)').text(totalFormateado2);
        $('#headerPedidos tr:last td:eq(5)').text(totalFormateado3);
        $('#headerPedidos tr:last td:eq(6)').text(totalFormateado4);
        $('#headerPedidos tr:last td:eq(1)').text(totalFormateado5);
    };

    $(document).on('dblclick', '#tablaPedidos tbody tr.filaEditable', function (e) {
        e.preventDefault();
        if (tipoUsuario =='Administrador'){
            let fila = $(this).closest('tr');
            let idPedido = fila.find('td:eq(0)').text();
            let nombreCliente = fila.find('td:eq(2)').text();
            let pedidoPrimerEspecie = fila.find('td:eq(3)').text();
            let pedidoSegundaEspecie = fila.find('td:eq(4)').text();
            let pedidoTerceraEspecie = fila.find('td:eq(5)').text();
            let pedidoCuartaEspecie = fila.find('td:eq(6)').text();
            let comentarioPedido = fila.find('td:eq(7)').text();
            let fechaPedido = fila.find('td:eq(8)').text();
            let codigoCliente = fila.find('td:eq(9)').text();

            $('#idPedidosEditar').attr("value", idPedido)
            $('#idRegistrarPedidoClienteEditar').val(nombreCliente);
            $('#selectedCodigoCliPedidosEditar').attr("value", codigoCliente);
            $('#idRegistrarPrimerEspeciePedidoEditar').val(pedidoPrimerEspecie);
            $('#idRegistrarSegundaEspeciePedidoEditar').val(pedidoSegundaEspecie);
            $('#idRegistrarTerceraEspeciePedidoEditar').val(pedidoTerceraEspecie);
            $('#idRegistrarCuartaEspeciePedidoEditar').val(pedidoCuartaEspecie);
            $('#comentarioAgregarPedidoEditar').val(comentarioPedido);
            $('#fechaAgregarPedidoEditar').val(fechaPedido);

            $('#ModalAgregarPedidoEditar').addClass('flex');
            $('#ModalAgregarPedidoEditar').removeClass('hidden');
        }
    });

    $('#btnActualizarPedido').on('click', function () {
        let idRegistrarPrimerEspeciePedido = $('#idRegistrarPrimerEspeciePedidoEditar').val();
        let idRegistrarSegundaEspeciePedido = $('#idRegistrarSegundaEspeciePedidoEditar').val();
        let idRegistrarTerceraEspeciePedido = $('#idRegistrarTerceraEspeciePedidoEditar').val();
        let idRegistrarCuartaEspeciePedido = $('#idRegistrarCuartaEspeciePedidoEditar').val();
        let comentarioAgregarPedido = $('#comentarioAgregarPedidoEditar').val();
        let fechaAgregarPedido = $('#fechaAgregarPedidoEditar').val();
        let idPedidoCliente = $('#idPedidosEditar').attr("value");

        fn_ActualizarPedidoCliente(idRegistrarPrimerEspeciePedido,idRegistrarSegundaEspeciePedido,idRegistrarTerceraEspeciePedido,idRegistrarCuartaEspeciePedido,comentarioAgregarPedido,fechaAgregarPedido,idPedidoCliente);

    });  

    function fn_ActualizarPedidoCliente(idRegistrarPrimerEspeciePedido,idRegistrarSegundaEspeciePedido,idRegistrarTerceraEspeciePedido,idRegistrarCuartaEspeciePedido,comentarioAgregarPedido,fechaAgregarPedido,idPedidoCliente){
        $.ajax({
            url: '/fn_consulta_ActualizarPedidoCliente',
            method: 'GET',
            data: {
                idRegistrarPrimerEspeciePedido: idRegistrarPrimerEspeciePedido,
                idRegistrarSegundaEspeciePedido: idRegistrarSegundaEspeciePedido,
                idRegistrarTerceraEspeciePedido: idRegistrarTerceraEspeciePedido,
                idRegistrarCuartaEspeciePedido: idRegistrarCuartaEspeciePedido,
                comentarioAgregarPedido: comentarioAgregarPedido,
                fechaAgregarPedido: fechaAgregarPedido,
                idPedidoCliente: idPedidoCliente,
            },
            success: function(response) {
                if (response.success) {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizo el pedido correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#ModalAgregarPedidoEditar').addClass('hidden');
                    $('#ModalAgregarPedidoEditar').removeClass('flex');
                    $('#filtrarPedidosFecha').trigger('click');
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

    var arrayPedidos = [];
    var arrayPedidosActual = [];
    var arrayPedidosRevisar = [];

    $(document).on("click", "#traerPedidosAnteriores", function() {
        $('#ModalTraerPedido').addClass('flex');
        $('#ModalTraerPedido').removeClass('hidden');
        arrayPedidos = [];
        arrayPedidosActual = [];
        arrayPedidosRevisar = [];
        $('#fechaTraerPedido').val(fechaHoy);
        $('#fechaRegistrarPedidoADia').val(fechaHoy);
        $('#cantidadRegistrosPedidos').text('0 registros.');
        $('#cantidadRegistrosRegistrar').text('0 pedidos.');
    });

    $('.cerrarModalTraerPedido, #ModalTraerPedido .opacity-75').on('click', function (e) {
        $('#ModalTraerPedido').addClass('hidden');
        $('#ModalTraerPedido').removeClass('flex');
    });

    $('#filtrarTraerPedidosFecha').on('click', function () {
        let fechaTraerPedido = $('#fechaTraerPedido').val();
        fn_TraerPedidosAnteriores(fechaTraerPedido);
    });

    function fn_TraerPedidosAnteriores(fechaTraerPedido){
        $.ajax({
            url: '/fn_consulta_TraerPedidosAnteriores',
            method: 'GET',
            data: {
                fechaTraerPedido: fechaTraerPedido,
            },
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    let contadorPedidos = 0;

                    arrayPedidos = [];

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        contadorPedidos++;
                        arrayPedidos.push(obj);
                    });

                    $('#cantidadRegistrosPedidos').text(contadorPedidos === 1 ? `${contadorPedidos} registro.` : `${contadorPedidos} registros.`);

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

    $('#btnFechaRegistrarPedidoADia').on('click', function () {
        let fechaRegistrarPedidoADia = $('#fechaRegistrarPedidoADia').val();
        fn_TraerPedidosActual(fechaRegistrarPedidoADia);
    });

    function fn_TraerPedidosActual(fechaTraerPedido){
        $.ajax({
            url: '/fn_consulta_TraerPedidosAnteriores',
            method: 'GET',
            data: {
                fechaTraerPedido: fechaTraerPedido,
            },
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    arrayPedidosActual = [];

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        arrayPedidosActual.push(obj);
                    });

                    fn_revisarDuplicados();

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

    function fn_revisarDuplicados() {
        arrayPedidosRevisar = arrayPedidos;
        let arrayPedidosActualRevisar = arrayPedidosActual;

        // Filtrar el arrayPedidosRevisar para eliminar elementos que coincidan con arrayPedidosActualRevisar
        arrayPedidosRevisar = arrayPedidosRevisar.filter(function(pedidoRevisar) {
            // Verificar si el pedido revisar existe en arrayPedidosActualRevisar
            return !arrayPedidosActualRevisar.some(function(pedidoActual) {
                return pedidoRevisar.codigoCliPedido == pedidoActual.codigoCliPedido;
            });
        });
    
        let contadorPedidosRegistrar = arrayPedidosRevisar.length;
        if (contadorPedidosRegistrar > 0) {
            $('#cantidadRegistrosRegistrar').text(contadorPedidosRegistrar === 1 ? `${contadorPedidosRegistrar} pedido.` : `${contadorPedidosRegistrar} pedidos.`);
        }else{
            $('#cantidadRegistrosRegistrar').text(contadorPedidosRegistrar === 1 ? `${contadorPedidosRegistrar} pedido.` : `${contadorPedidosRegistrar} pedidos.`);
            alertify.notify('No hay pedidos que registrar.', 'error', 3);
        }
    }      

    var totalConsultas = 0;
    var consultasCompletadas = 0;
    var timerInterval;

    $('#btnTraerPedido').on('click', function () {
        consultasCompletadas = 0;
        totalConsultas = arrayPedidosRevisar.length;
        if(arrayPedidosRevisar.length > 0) {
            Swal.fire({
                title: '¡Registrando Pedidos!',
                html: 'Espere mientras se están registrando los pedidos.',
                timer: 999999999, // Establece un valor grande para que parezca indefinido
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            })
            // Recorrer ArrayPedidosRevisar
            let fechaRegistrarPedidoADia = $('#fechaRegistrarPedidoADia').val();
            arrayPedidosRevisar.forEach(function(pedido) {
                fn_AgregarPedidoClienteDespuesDeRevisar(pedido.codigoCliPedido, pedido.cantidadPrimerEspecie, pedido.cantidadSegundaEspecie, pedido.cantidadTerceraEspecie, pedido.cantidadCuartaEspecie, pedido.comentarioPedido, fechaRegistrarPedidoADia);
            });
        }else{
            alertify.notify('No hay pedidos que registrar.', 'error', 3);
        }
    });

    function fn_AgregarPedidoClienteDespuesDeRevisar(selectedCodigoCliPedidos,idRegistrarPrimerEspeciePedido,idRegistrarSegundaEspeciePedido,idRegistrarTerceraEspeciePedido,idRegistrarCuartaEspeciePedido,comentarioAgregarPedido,fechaAgregarPedido){
        $.ajax({
            url: '/fn_consulta_AgregarPedidoCliente',
            method: 'GET',
            data: {
                selectedCodigoCliPedidos: selectedCodigoCliPedidos,
                idRegistrarPrimerEspeciePedido: idRegistrarPrimerEspeciePedido,
                idRegistrarSegundaEspeciePedido: idRegistrarSegundaEspeciePedido,
                idRegistrarTerceraEspeciePedido: idRegistrarTerceraEspeciePedido,
                idRegistrarCuartaEspeciePedido: idRegistrarCuartaEspeciePedido,
                comentarioAgregarPedido: comentarioAgregarPedido,
                fechaAgregarPedido: fechaAgregarPedido,
            },
            success: function(response) {
                if (response.success) {
                    consultasCompletadas++;
                    if (consultasCompletadas === totalConsultas) {
                        clearInterval(timerInterval);
                        Swal.close();
                        $('#ModalTraerPedido').addClass('hidden');
                        $('#ModalTraerPedido').removeClass('flex');
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Se registraron los pedidos correctamente',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        $('#filtrarPedidosFecha').trigger('click');
                    }
                }
            },
            error: function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Error: se completaron solo ${consultasCompletadas === 1 ? `${consultasCompletadas} registro.` : `${consultasCompletadas} registros.`}`,
                })
                clearInterval(timerInterval);
                Swal.close();
                console.error("ERROR",error);
            }
        });
    }

    $("#exportarExcelPedidos").on("click", function () {
        // Obtener los valores de los inputs
        var fechaReportePedidos = $("#fechaBuscarPedidos").val();

        // Obtener la tabla
        var tabla = document.getElementById("tablaPedidos");

        // Crear un nuevo libro de Excel
        var workbook = XLSX.utils.book_new();

        // Construir matriz de datos
        var dataMatrix = [[""]];

        // Obtener las filas de la tabla
        var filas = tabla.rows;

        // Recorrer las filas de la tabla y agregar a la matriz de datos
        for (var i = 0; i < filas.length; i++) {
            var celdas = filas[i].cells;
            var row = [];
            for (var j = 1; j < celdas.length - 2; j++) {
                var cellText = celdas[j].textContent;
                row.push(cellText);
            }
            dataMatrix.push(["", ...row]);
        }

        // Crear la hoja de cálculo
        var sheet = XLSX.utils.aoa_to_sheet(dataMatrix);

        // Ajustar el ancho de las columnas al contenido
        var range = XLSX.utils.decode_range(sheet["!ref"]);
        range.e.c = range.e.c - 2; // Restar 2 para excluir las dos últimas columnas
        for (var col = 1; col <= range.e.c; col++) {
            sheet["!cols"] = sheet["!cols"] || [];
            sheet["!cols"][col] = { wch: 15 }; // Ajusta el ancho a un valor fijo, puedes ajustar según tus necesidades
            if (sheet["!cols"][col].wch < 20) {
                sheet["!cols"][col].wch = 20; // Establecer el ancho mínimo
            }
        }

        // Agregar la hoja al libro
        XLSX.utils.book_append_sheet(workbook, sheet, "ReporteDePedidos");

        // Generar un archivo Excel y descargarlo
        XLSX.writeFile(
            workbook,
            "Reporte_de_Pedidos_" + fechaReportePedidos + ".xlsx"
        );
    });
});