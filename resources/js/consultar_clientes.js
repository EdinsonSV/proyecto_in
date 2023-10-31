import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function ($) {
    
    fn_ConsultarClientes();
    fn_TraerDocumentosEditar();
    fn_TraerZonasEditar();
    fn_TraerGruposConsultarClientes();
    fn_TraerGruposConsultarClientesEditar();

    DataTableED('#tablaConsultarClientes');

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
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($(`<h5 class="max-w-[100px] m-auto px-2 overflow-hidden whitespace-nowrap text-ellipsis" x-data="tooltip()" x-spread="tooltip" x-position="top" title="${obj.nombreTipoDocumento}">`).text(obj.nombreTipoDocumento)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.numDocumentoCli)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.contactoCli)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($(`<h5 class="max-w-[100px] m-auto px-2 overflow-hidden whitespace-nowrap text-ellipsis" x-data="tooltip()" x-spread="tooltip" x-position="top" title="${obj.direccionCli}">`).text(obj.direccionCli)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($(`<h5 class="m-auto px-2 overflow-hidden whitespace-nowrap">`).text(obj.nombreZon)));
                        if (obj.estadoCliente == "ACTIVO"){
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<p class="bg-[#0FDA62] text-xs text-gray-50 rounded-xl inline-block py-1 px-4 capitalize">').text(obj.estadoCliente)));
                        }else if(obj.estadoCliente == "INHABILITADO"){
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<p class="bg-[#B9B9C0] text-xs text-gray-900 rounded-xl inline-block py-1 px-4 capitalize">').text(obj.estadoCliente)));
                        };
                        nuevaFila.append($('<td class="hidden">').text(obj.idGrupo));

                        
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

    $('#filtrarConsultarClientes, #tipoPolloConsultarClientes').on('input change', function() {
        let nombreFiltrar = $('#filtrarConsultarClientes').val().toUpperCase(); // Obtiene el valor del campo de filtro de nombre
        let tipoPolloFiltrar = $('#tipoPolloConsultarClientes').val(); // Obtiene el valor seleccionado del select
    
        // Mostrar todas las filas
        $('#tablaConsultarClientes tbody tr').show();
    
        // Filtrar por nombre si se proporciona un valor
        if (nombreFiltrar) {
            $('#tablaConsultarClientes tbody tr').each(function() {
                let nombre = $(this).find('td:eq(2)').text().toUpperCase().trim();
                if (nombre.indexOf(nombreFiltrar) === -1) {
                    $(this).hide();
                }
            });
        }
    
        // Filtrar por tipo de pollo si se selecciona un valor en el select
        if (tipoPolloFiltrar !== "0") {
            $('#tablaConsultarClientes tbody tr').each(function() {
                let columna = $(this).find('td:eq(9)').text().trim(); // Considerando que la columna es la 10 (índice 9)
                if (columna !== tipoPolloFiltrar) {
                    $(this).hide();
                }
            });
        }
    });     

    function fn_TraerGruposConsultarClientes(){
        $.ajax({
            url: '/fn_consulta_TraerGruposConsultarClientes',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let selectTipoPollo = $('#tipoPolloConsultarClientes');
                    // Vaciar el select actual, si es necesario
                    selectTipoPollo.empty();

                    // Agregar la opción inicial "Seleccione tipo"
                    selectTipoPollo.append($('<option>', {
                        value: '0',
                        text: 'Todos'
                    }));

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        let option = $('<option>', {
                            value: obj.idGrupo,
                            text: obj.nombreGrupo
                        });
                        selectTipoPollo.append(option);
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

    function fn_TraerGruposConsultarClientesEditar(){
        $.ajax({
            url: '/fn_consulta_TraerGruposConsultarClientes',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let selectTipoPolloEditar = $('#valorEditarTipoDePollo');
                    // Vaciar el select actual, si es necesario
                    selectTipoPolloEditar.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        let option = $('<option>', {
                            value: obj.idGrupo,
                            text: obj.nombreGrupo
                        });
                        selectTipoPolloEditar.append(option);
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

    function fn_TraerZonasEditar(){
        $.ajax({
            url: '/fn_consulta_TraerZonas',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let selectZona = $('#valorEditarZonaCliente');
                    
                    // Vaciar el select actual, si es necesario
                    selectZona.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        let option = $('<option>', {
                            value: obj.idZona,
                            text: obj.nombreZon
                        });
                        selectZona.append(option);
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

    function fn_TraerDocumentosEditar(){
        $.ajax({
            url: '/fn_consulta_TraerDocumentos',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let selectDocumentos = $('#valorEditarTipoDeDocumento');
                    
                    // Vaciar el select actual, si es necesario
                    selectDocumentos.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        let option = $('<option>', {
                            value: obj.idTipoDocumento,
                            text: obj.nombreTipoDocumento
                        });
                        selectDocumentos.append(option);
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

    $('.cerrarModalEditarDatosdeCliente, .modal-content').on('click', function (e) {
        if (e.target === this) {
            $('#ModalEditarDatosdeCliente').addClass('hidden');
            $('#ModalEditarDatosdeCliente').removeClass('flex');
        }
    });

    $(document).on("dblclick", "#tablaConsultarClientes tbody tr ", function() {
        let codigoCli = $(this).find('td:eq(1)').text();

        fn_TraerConsultarClienteEditar(codigoCli)

        function fn_TraerConsultarClienteEditar(codigoCli){
            $.ajax({
                url: '/fn_consulta_TraerConsultarClienteEditar',
                method: 'GET',
                data:{
                    codigoCli:codigoCli,
                },
                success: function(response) {
    
                    // Verificar si la respuesta es un arreglo de objetos
                    if (Array.isArray(response)) {
    
                        // Iterar sobre los objetos y mostrar sus propiedades
                        response.forEach(function(obj) {

                            $("#valorEditarCodigoCliente").val(obj.codigoCli);
                            $("#valorEditarTipoDePollo").val(obj.idGrupo);
                            $("#valorEditarNombresCliente").val(obj.nombresCli);
                            $("#valorEditarTipoDeDocumento").val(obj.tipoDocumentoCli);
                            $("#valorEditarNumeroDeDocumento").val(obj.numDocumentoCli);
                            $("#valorEditarNumeroDeCelular").val(obj.contactoCli);
                            $("#valorEditarDireccionCliente").val(obj.direccionCli);
                            $("#valorEditarZonaCliente").val(obj.idZona);
                            $("#valorEditarApellidoPaternoCliente").val(obj.apellidoPaternoCli);
                            $("#valorEditarApellidoMaternoCliente").val(obj.apellidoMaternoCli);
                            $("#valorEditarComentario").val(obj.comentarioCli);
                            $('#ModalEditarDatosdeCliente').addClass('flex');
                            $('#ModalEditarDatosdeCliente').removeClass('hidden');

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
    });

});