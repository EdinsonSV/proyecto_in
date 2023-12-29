import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');
    
    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReportePorProveedor').val(fechaHoy);
    $('#fechaHastaReportePorProveedor').val(fechaHoy);
    $('#fechaRegistrarGuia').val(fechaHoy);
    $('#fechaDesdeReporteVentaDia').val(fechaHoy);

    fn_ConsultarProveedor(fechaHoy,fechaHoy);
    fn_declararEspecies();
    fn_declararProveedor();
    fn_declararProveedorEditar();
    fn_declararEspeciesEditar();
    fn_traerTotalesFechas(fechaHoy);

    $('#btnBuscarReportePorProveedor').on('click', function () {
        let fechaDesde = $('#fechaDesdeReportePorProveedor').val();
        let fechaHasta = $('#fechaHastaReportePorProveedor').val();
        fn_ConsultarProveedor(fechaDesde, fechaHasta);
    });

    function fn_ConsultarProveedor(fechaDesde, fechaHasta) {
        $.ajax({
        url: '/fn_consulta_ConsultarProveedor',
            method: 'GET',
            data:{
                fechaDesde:fechaDesde,
                fechaHasta:fechaHasta,
            },
            success: function (response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyProveedor = $('#bodyReportePorProveedor');
                    tbodyProveedor.empty();

                    let fechasUnicas = new Set();
                    let sinRepetidos = response.filter((valorActual) => {
                        let fechaInicioString = JSON.stringify(valorActual.fechaGuia);
                        if (!fechasUnicas.has(fechaInicioString)) {
                            fechasUnicas.add(fechaInicioString);
                            return true;
                        }
                        return false;
                    });

                    let nuevaFila = "";

                    // Iterar sobre los objetos y mostrar sus propiedades
                    sinRepetidos.forEach(function(item) {

                        let pagoAProveedoresPorDia = 0.00;
                        let cantidadAProveedoresPorDia = 0;
                        let pesoAProveedoresPorDia = 0.0;

                        if (sinRepetidos.length > 1) {
                            nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                            nuevaFila.append($('<td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(item.fechaGuia));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center" colspan="7">').text(""));
                            tbodyProveedor.append(nuevaFila);
                        }

                        response.forEach(function (obj) {
                            if (item.fechaGuia === obj.fechaGuia) {
                                nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                                let precioGuia = 0.00;
                                if (obj.precioGuia != "" && obj.precioGuia != null) {
                                    precioGuia = parseFloat(obj.precioGuia);
                                }
                                let promedio = parseFloat(obj.pesoGuia)/parseFloat(obj.cantidadGuia);
                                let totalAPagar = parseFloat(precioGuia)*parseFloat(obj.pesoGuia);
                                pagoAProveedoresPorDia += totalAPagar;
                                cantidadAProveedoresPorDia += parseInt(obj.cantidadGuia);
                                pesoAProveedoresPorDia += parseFloat(obj.pesoGuia);
                                let nombreEspecie = "";
                                if (obj.idProveedor == 1 || obj.idProveedor == 2 || obj.idProveedor == 3) {
                                    nombreEspecie = obj.nombreEspecieVenta;
                                }else if (obj.idProveedor == 4 || obj.idProveedor == 5){
                                    nombreEspecie = obj.nombreEspecieCompra+" "+obj.nombreEspecieVenta;
                                }
                                // Agregar las celdas con la información
                                nuevaFila.append($('<td class="hidden">').text(obj.idGuia));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.numGuia));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(nombreEspecie));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.cantidadGuia == 1 ? `${obj.cantidadGuia} Ud.` : `${obj.cantidadGuia} Uds.`));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.pesoGuia+" Kg."));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((promedio).toFixed(2)));
                                if (tipoUsuario =='Administrador'){
                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(precioGuia.toFixed(2)));
                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text("S/. "+(totalAPagar).toFixed(2)));
                                }
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white flex justify-center items-center gap-2">').append($('<button class="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-lg btnEditarReportePorProveedor">').html("<i class='bx bxs-edit text-base'></i>")).append($('<button class="bg-red-600 hover:bg-red-700 p-2 rounded-lg btnEliminarReportePorProveedor">').html("<i class='bx bxs-trash text-base' ></i>"))
                                );
                                
                                // Agregar la nueva fila al tbody
                                tbodyProveedor.append(nuevaFila);
                            }
                        });
                        if (tipoUsuario =='Administrador'){
                            nuevaFila = $('<tr class="bg-white dark:bg-gray-800 h-0.5">');
                            nuevaFila.append($('<td class="dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                            nuevaFila.append($('<td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="6">').text(""));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                            tbodyProveedor.append(nuevaFila);
                            nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text("TOTALES:"));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((cantidadAProveedoresPorDia == 1 ? `${cantidadAProveedoresPorDia} Ud.` : `${cantidadAProveedoresPorDia} Uds.`)));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(pesoAProveedoresPorDia.toFixed(2)+" Kg."));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text("S/. "+pagoAProveedoresPorDia.toFixed(2)));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                            tbodyProveedor.append(nuevaFila);
                        }
                    });
                    if (response.length == 0) {
                        tbodyProveedor.html(`<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
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

    $(document).on('input', '#valorCantidadAgregarGuia', function () {
        let inputValue = $(this).val();
        inputValue = inputValue.replace(/[^0-9]/g, '');

        $(this).val(inputValue);
    });

    function fn_declararEspecies(){
        $.ajax({
            url: '/fn_consulta_DatosEspecie',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let selectPresentacion = $('#idEspecieAgregarGuia');
                    
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

    function fn_declararEspeciesEditar(){
        $.ajax({
            url: '/fn_consulta_DatosEspecie',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let selectPresentacionEditar = $('#idEspecieAgregarGuiaEditar');
                    
                    // Vaciar el select actual, si es necesario
                    selectPresentacionEditar.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        let option = $('<option>', {
                            value: obj.idEspecie,
                            text: obj.nombreEspecie
                        });
                        selectPresentacionEditar.append(option);
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

    function fn_declararProveedor(){
        $.ajax({
            url: '/fn_consulta_DatosProveedor',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let selectPresentacion = $('#idProveedorAgregarGuia');
                    
                    // Vaciar el select actual, si es necesario
                    selectPresentacion.empty();

                    // Agregar la opción inicial "Seleccione tipo"
                    selectPresentacion.append($('<option>', {
                        value: '0',
                        text: 'Seleccione proveedor',
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

    function fn_declararProveedorEditar(){
        $.ajax({
            url: '/fn_consulta_DatosProveedor',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let selectPresentacionEditar = $('#idProveedorAgregarGuiaEditar');
                    
                    // Vaciar el select actual, si es necesario
                    selectPresentacionEditar.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        let option = $('<option>', {
                            value: obj.idEspecie,
                            text: obj.nombreEspecie
                        });
                        selectPresentacionEditar.append(option);
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

    $("#idProveedorAgregarGuia").on("change",function() {
        var selectedValue = $(this).val();
        if (selectedValue === "1" || selectedValue === "2" || selectedValue === "3") {
            $("#idEspecieAgregarGuia").val(selectedValue);
            $("#idEspecieAgregarGuia").prop("disabled", true);
        } else if (selectedValue === "4" || selectedValue === "5") {
            $("#idEspecieAgregarGuia").prop("disabled", false);
        } else {
            $("#idEspecieAgregarGuia").val("0");
            $("#idEspecieAgregarGuia").prop("disabled", true);
        }
    });

    $("#idProveedorAgregarGuiaEditar").on("change",function() {
        var selectedValue = $(this).val();
        if (selectedValue === "1" || selectedValue === "2" || selectedValue === "3") {
            $("#idEspecieAgregarGuiaEditar").val(selectedValue);
            $("#idEspecieAgregarGuiaEditar").prop("disabled", true);
        } else if (selectedValue === "4" || selectedValue === "5") {
            $("#idEspecieAgregarGuiaEditar").prop("disabled", false);
        } else {
            $("#idEspecieAgregarGuiaEditar").val("0");
            $("#idEspecieAgregarGuiaEditar").prop("disabled", true);
        }
    });

    $('.cerrarModalRegistrarGuias, .modal-content').on('click', function (e) {
        if (e.target === this) {
            $('#ModalRegistrarGuias').addClass('hidden');
            $('#ModalRegistrarGuias').removeClass('flex');
        }
    });

    $('#btnAgregarGuiasReportePorProveedor').on('click', function () {
        $('#ModalRegistrarGuias').addClass('flex');
        $('#ModalRegistrarGuias').removeClass('hidden');
        $('#valorNumeroGuiaAgregarGuia').focus();

        $('#valorNumeroGuiaAgregarGuia').val('');
        $('#fechaRegistrarGuia').val(fechaHoy);
        $('#idProveedorAgregarGuia').val($('#idProveedorAgregarGuia option:first').val());
        $('#idEspecieAgregarGuia').val($('#idEspecieAgregarGuia option:first').val());
        $('#valorCantidadAgregarGuia').val('');
        $('#valorPesoAgregarGuia').val('');
        $('#valorPrecioAgregarGuia').val('');
    });

    $('#btnGuardarRegistrarGuias').on('click', function () {
        let idProveedor = $('#idProveedorAgregarGuia').val();
        let idEspecie = $('#idEspecieAgregarGuia').val();
        let cantidadAgregarGuia = $('#valorCantidadAgregarGuia').val();
        let pesoAgregarGuia = $('#valorPesoAgregarGuia').val();
        let precioAgregarGuia = $('#valorPrecioAgregarGuia').val();
        let fechaRegistrarGuia = $('#fechaRegistrarGuia').val();
        let valorNumeroGuiaAgregarGuia = $('#valorNumeroGuiaAgregarGuia').val();
        
        fn_RegistrarGuia(idProveedor,idEspecie,cantidadAgregarGuia,pesoAgregarGuia,precioAgregarGuia,fechaRegistrarGuia,valorNumeroGuiaAgregarGuia);

    });

    $('#btnGuardarRegistrarGuiasEditar').on('click', function () {
        let idProveedorEditar = $('#idProveedorAgregarGuiaEditar').val();
        let idEspecieEditar = $('#idEspecieAgregarGuiaEditar').val();
        let cantidadAgregarGuiaEditar = $('#valorCantidadAgregarGuiaEditar').val();
        let pesoAgregarGuiaEditar = $('#valorPesoAgregarGuiaEditar').val();
        let precioAgregarGuiaEditar = $('#valorPrecioAgregarGuiaEditar').val();
        let fechaRegistrarGuiaEditar = $('#fechaRegistrarGuiaEditar').val();
        let valorNumeroGuiaAgregarGuiaEditar = $('#valorNumeroGuiaAgregarGuiaEditar').val();
        let idActualizarGuia = $('#idGuiaEditar').attr('value');
        
        fn_RegistrarGuiaEditar(idActualizarGuia,idProveedorEditar,idEspecieEditar,cantidadAgregarGuiaEditar,pesoAgregarGuiaEditar,precioAgregarGuiaEditar,fechaRegistrarGuiaEditar,valorNumeroGuiaAgregarGuiaEditar);

    });

    function fn_RegistrarGuiaEditar(idActualizarGuia,idProveedorEditar,idEspecieEditar,cantidadAgregarGuiaEditar,pesoAgregarGuiaEditar,precioAgregarGuiaEditar,fechaRegistrarGuiaEditar,valorNumeroGuiaAgregarGuiaEditar){
        $.ajax({
            url: '/fn_consulta_RegistrarGuiaEditar',
            method: 'GET',
            data: {
                idActualizarGuia:idActualizarGuia,
                idProveedorEditar: idProveedorEditar,
                idEspecieEditar: idEspecieEditar,
                cantidadAgregarGuiaEditar:cantidadAgregarGuiaEditar,
                pesoAgregarGuiaEditar:pesoAgregarGuiaEditar,
                precioAgregarGuiaEditar:precioAgregarGuiaEditar,
                fechaRegistrarGuiaEditar:fechaRegistrarGuiaEditar,
                valorNumeroGuiaAgregarGuiaEditar:valorNumeroGuiaAgregarGuiaEditar,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizo la guia correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#ModalRegistrarGuiasEditar').addClass('hidden');
                    $('#ModalRegistrarGuiasEditar').removeClass('flex');
                    $('#btnBuscarReportePorProveedor').trigger('click');
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

    function fn_RegistrarGuia(idProveedor,idEspecie,cantidadAgregarGuia,pesoAgregarGuia,precioAgregarGuia,fechaRegistrarGuia,valorNumeroGuiaAgregarGuia){
        $.ajax({
            url: '/fn_consulta_RegistrarGuia',
            method: 'GET',
            data: {
                idProveedor: idProveedor,
                idEspecie: idEspecie,
                cantidadAgregarGuia:cantidadAgregarGuia,
                pesoAgregarGuia:pesoAgregarGuia,
                precioAgregarGuia:precioAgregarGuia,
                fechaRegistrarGuia:fechaRegistrarGuia,
                valorNumeroGuiaAgregarGuia:valorNumeroGuiaAgregarGuia,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registro la guia correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#ModalRegistrarGuias').addClass('hidden');
                    $('#ModalRegistrarGuias').removeClass('flex');
                    $('#btnBuscarReportePorProveedor').trigger('click');
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

    $(document).on('click', '.btnEliminarReportePorProveedor', function () {
        let codigoGuia = $(this).closest("tr").find("td:first").text();
        let fila = $(this).closest("tr");
        fila.toggleClass('bg-gray-300 dark:bg-gray-600 bg-white dark:bg-gray-800');
        Swal.fire({
            title: '¿Desea eliminar la guia?',
            text: "¡Estas seguro de eliminar la guia!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: '¡No, cancelar!',
            confirmButtonText: '¡Si,eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
                fn_EliminarGuia(codigoGuia);
            }else{
                $('table tbody tr').removeClass('bg-gray-300 dark:bg-gray-600');
                $('table tbody tr').addClass('bg-white dark:bg-gray-800');
            }
          })
    });

    function fn_EliminarGuia(codigoGuia){
        $.ajax({
            url: '/fn_consulta_EliminarGuia',
            method: 'GET',
            data: {
                codigoGuia: codigoGuia,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se elimino la guia correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#btnBuscarReportePorProveedor').trigger('click');
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

    $(document).on('click', '.btnEditarReportePorProveedor', function () {
        let codigoGuia = $(this).closest("tr").find("td:first").text();
        let fila = $(this).closest("tr");
        fila.toggleClass('bg-gray-300 dark:bg-gray-600 bg-white dark:bg-gray-800');
        fn_EditarGuia(codigoGuia);
    });

    $('.cerrarModalRegistrarGuiasEditar, .modal-content').on('click', function (e) {
        if (e.target === this) {
            $('#ModalRegistrarGuiasEditar').addClass('hidden');
            $('#ModalRegistrarGuiasEditar').removeClass('flex');
            $('table tbody tr').removeClass('bg-gray-300 dark:bg-gray-600');
            $('table tbody tr').addClass('bg-white dark:bg-gray-800');
        }
    });

    function fn_EditarGuia(codigoGuia){
        $.ajax({
            url: '/fn_consulta_EditarGuia',
            method: 'GET',
            data: {
                codigoGuia: codigoGuia,
            },
            success: function(response) {

                response.forEach(function(obj) {

                    $('#idProveedorAgregarGuiaEditar').val(obj.idProveedor);
                    $('#idEspecieAgregarGuiaEditar').val(obj.idEspecie);
                    $('#valorCantidadAgregarGuiaEditar').val(obj.cantidadGuia);
                    $('#valorPesoAgregarGuiaEditar').val(obj.pesoGuia);
                    $('#valorPrecioAgregarGuiaEditar').val(obj.precioGuia);
                    $('#fechaRegistrarGuiaEditar').val(obj.fechaGuia);
                    $('#valorNumeroGuiaAgregarGuiaEditar').val(obj.numGuia);
                    $('#idGuiaEditar').attr("value",obj.idGuia);
                    $('#idProveedorAgregarGuiaEditar').trigger('change');

                    $('#ModalRegistrarGuiasEditar').addClass('flex');
                    $('#ModalRegistrarGuiasEditar').removeClass('hidden');

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

    function fn_traerTotalesFechas(fechaTotales) {
        $.ajax({
            url: '/fn_consulta_traerTotalesFechas',
            method: 'GET',
            data: {
                fechaTotales: fechaTotales,
            },
            success: function (response) {
                response.forEach(function (obj) {
    
                    // Formatear números con separador de miles y dos decimales
                    const compraTotalFormatted = parseFloat(obj.sumaGuias).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
    
                    const ventaTotalFormatted = (parseFloat(obj.sumaVentaDelDia) + parseFloat(obj.descuentos)).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
    
                    const diferenciaTotalFormatted = (
                        parseFloat(obj.sumaGuias) - (parseFloat(obj.sumaVentaDelDia) + parseFloat(obj.descuentos))
                    ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
    
                    $('#compraTotalFecha').text(compraTotalFormatted);
                    $('#ventaTotalFecha').text(ventaTotalFormatted);
                    $('#diferenciaTotalFecha').text(diferenciaTotalFormatted);
                });
            },
            error: function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error: Ocurrio un error inesperado durante la operacion',
                })
                console.error("ERROR", error);
            }
        });
    }
    
    // Agrega un evento onchange al input de fecha
    $('#fechaDesdeReporteVentaDia').on('change', function () {
        // Obtiene el valor seleccionado en el input de fecha
        var fechaSeleccionada = $(this).val();

        // Llama a la función fn_traerTotalesFechas con la fecha seleccionada
        fn_traerTotalesFechas(fechaSeleccionada);
    });

});
