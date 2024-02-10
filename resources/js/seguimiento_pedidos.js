import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];

    // Asignar la fecha actual a los inputs
    $('#fechaBuscarPedidos').val(fechaHoy);
    var tipoUsuario = $('#tipoUsuario').data('id');
    fn_TraerPedidosSeguimientoClientes(fechaHoy);

    $('#filtrarPedidosFecha').on('click', function () {
        let fechaBuscarPedidos = $('#fechaBuscarPedidos').val();
        fn_TraerPedidosSeguimientoClientes(fechaBuscarPedidos);
    });

    function fn_TraerPedidosSeguimientoClientes(fechaBuscarPedidos) {
        $.ajax({
            url: '/fn_consulta_TraerPedidosSeguimientoClientes',
            method: 'GET',
            data:{
                fechaBuscarPedidos:fechaBuscarPedidos,
            },
            success: function (response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyPedidoDelCliente = $('#bodyPedidos');
                    tbodyPedidoDelCliente.empty();
                    let nuevaFila = ""

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        let totalPedidos = 0;
                        totalPedidos = parseInt(obj.cantidadPrimerEspecie) + parseInt(obj.cantidadSegundaEspecie) + parseInt(obj.cantidadTerceraEspecie) + parseInt(obj.cantidadCuartaEspecie);
                        let totalPedidosPesados = 0;
                        totalPedidosPesados = parseFloat(obj.sumaCantidadPrimerEspecie) + parseFloat(obj.sumaCantidadSegundaEspecie) + parseFloat(obj.sumaCantidadTerceraEspecie) + parseFloat(obj.sumaCantidadCuartaEspecie);

                        let totalCantidadPedidosFila = totalPedidos - totalPedidosPesados;

                        let diferenciaPrimerEspecie = 0;
                        diferenciaPrimerEspecie = parseInt(obj.cantidadPrimerEspecie) - parseFloat(obj.sumaCantidadPrimerEspecie)

                        let diferenciaSegundaEspecie = 0;
                        diferenciaSegundaEspecie = parseInt(obj.cantidadSegundaEspecie) - parseFloat(obj.sumaCantidadSegundaEspecie)

                        let diferenciaTerceraEspecie = 0;
                        diferenciaTerceraEspecie = parseInt(obj.cantidadTerceraEspecie) - parseFloat(obj.sumaCantidadTerceraEspecie)

                        let diferenciaCuartaEspecie = 0;
                        diferenciaCuartaEspecie = parseInt(obj.cantidadCuartaEspecie) - parseFloat(obj.sumaCantidadCuartaEspecie)

                        // Crear una nueva fila
                        nuevaFila = $('<tr class="bg-white text-gray-900 dark:text-white filaEditable dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                        
                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idPedido));
                        nuevaFila.append($('<td class="border-l-2 border dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').text(obj.nombreCompleto));
                        nuevaFila.append($('<td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">').text(obj.cantidadPrimerEspecie));                        
                        nuevaFila.append($('<td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">').text(obj.sumaCantidadPrimerEspecie));                        
                        nuevaFila.append($('<td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">').text(diferenciaPrimerEspecie));                        
                        nuevaFila.append($('<td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">').text(obj.cantidadSegundaEspecie));                        
                        nuevaFila.append($('<td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">').text(obj.sumaCantidadSegundaEspecie));                        
                        nuevaFila.append($('<td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">').text(diferenciaSegundaEspecie));                        
                        nuevaFila.append($('<td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">').text(obj.cantidadTerceraEspecie));                        
                        nuevaFila.append($('<td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">').text(obj.sumaCantidadTerceraEspecie));                        
                        nuevaFila.append($('<td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">').text(diferenciaTerceraEspecie));                        
                        nuevaFila.append($('<td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">').text(obj.cantidadCuartaEspecie));                    
                        nuevaFila.append($('<td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">').text(obj.sumaCantidadCuartaEspecie));                    
                        nuevaFila.append($('<td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">').text(diferenciaCuartaEspecie));
                                        
                        nuevaFila.append($('<td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">').text(totalPedidos));
                        nuevaFila.append($('<td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">').text(totalPedidosPesados));                    
                        nuevaFila.append($('<td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">').text(totalCantidadPedidosFila));  
                        nuevaFila.append($('<td class="border-r-2 border dark:border-gray-600 p-2 text-center">').text(obj.comentarioPedido));                        

                        nuevaFila.append($('<td class="hidden">').text(obj.fechaRegistroPedido));
                        nuevaFila.append($('<td class="hidden">').text(obj.codigoCliPedido));
                        // Agregar la nueva fila al tbody
                        tbodyPedidoDelCliente.append(nuevaFila);
                    });

                    if (nuevaFila == ""){
                        tbodyPedidoDelCliente.append(
                            '<tr class="rounded-lg"><td colspan="17" class="text-center border-2">No hay datos</td></tr>'
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

    $('#filtrarClientePedidos').on('input', function () {
        let nombreFiltrar = $('#filtrarClientePedidos').val().toUpperCase();
        // Ocultar todas las filas excepto las de Fecha y las filas con colspan="6"
        $('#tablaPedidos tbody tr').show();

        if (nombreFiltrar) {
            $('#tablaPedidos tbody tr').each(function() {
                let nombre = $(this).find('td:eq(1)').text().toUpperCase().trim();
                if (nombre.indexOf(nombreFiltrar) === -1) {
                    $(this).hide();
                }
            });
        }
    });

});