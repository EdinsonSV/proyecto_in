import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function ($) {
    
    fn_ConsultarClientes()

    function fn_ConsultarClientes() {
        $.ajax({
            url: '/fn_consulta_ConsultarClientes',
            method: 'GET',
            success: function (response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyConsultarClientes = $('#bodyConsultarClientes');
                    tbodyConsultarClientes.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        // Crear una nueva fila
                        let nuevaFila = $('<tr class="editPrecioXPresentacion bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idCliente));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').text(obj.codigoCli));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">').append($('<h5 class="min-w-max px-2">').text(obj.nombreCompleto)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center flex justify-center">').append($('<h5 class="max-w-[100px] px-2 overflow-hidden whitespace-nowrap text-ellipsis">').text(obj.nombreTipoDocumento)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.numDocumentoCli)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.contactoCli)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center flex justify-center">').append($('<h5 class="max-w-[100px] px-2 overflow-hidden whitespace-nowrap text-ellipsis">').text(obj.direccionCli)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="max-w-[100px] px-2 overflow-hidden whitespace-nowrap text-ellipsis">').text(obj.nombreZon)));
                        if (obj.estadoCliente == "ACTIVO"){
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<p class="bg-[#0FDA62] text-xs text-gray-50 rounded-xl inline-block py-1 px-4 capitalize">').text(obj.estadoCliente)));
                        }else if(obj.estadoCliente == "SUSPENDIDO"){
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<p class="bg-[#E8DF13] text-xs text-gray-900 rounded-xl inline-block py-1 px-4 capitalize">').text(obj.estadoCliente)));
                        }else if(obj.estadoCliente == "INHABILITADO"){
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<p class="bg-[#B9B9C0] text-xs text-gray-900 rounded-xl inline-block py-1 px-4 capitalize">').text(obj.estadoCliente)));
                        };

                        
                        // Agregar la nueva fila al tbody
                        tbodyConsultarClientes.append(nuevaFila);
                    });
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }

            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    }
});