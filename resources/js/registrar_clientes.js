import jQuery from 'jquery';
import Swal from 'sweetalert';

window.$ = jQuery;

jQuery(function($) {

    fn_traerGrupos()
    fn_TraerZonas()
    fn_TraerCodigoCli()
    fn_TraerDocumentos()

    function fn_traerGrupos(){
        $.ajax({
            url: '/fn_consulta_TraerGrupos',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let selectTipoPollo = $('#tipoPollo');
                    
                    // Vaciar el select actual, si es necesario
                    selectTipoPollo.empty();

                    // Agregar la opción inicial "Seleccione tipo"
                    selectTipoPollo.append($('<option>', {
                        value: '0',
                        text: 'Seleccione tipo',
                        disabled: true,
                        selected: true
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

    function fn_TraerZonas(){
        $.ajax({
            url: '/fn_consulta_TraerZonas',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let selectZona = $('#zonaPollo');
                    
                    // Vaciar el select actual, si es necesario
                    selectZona.empty();

                    // Agregar la opción inicial "Seleccione tipo"
                    selectZona.append($('<option>', {
                        value: '0',
                        text: 'Seleccione zona',
                        disabled: true,
                        selected: true
                    }));

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

    function fn_TraerDocumentos(){
        $.ajax({
            url: '/fn_consulta_TraerDocumentos',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let selectDocumentos = $('#tipoDocumentoCli');
                    
                    // Vaciar el select actual, si es necesario
                    selectDocumentos.empty();

                    // Agregar la opción inicial "Seleccione tipo"
                    selectDocumentos.append($('<option>', {
                        value: '0',
                        text: 'Seleccione tipo de documento',
                        disabled: true,
                        selected: true
                    }));

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

    function fn_TraerCodigoCli(){
        $.ajax({
            url: '/fn_consulta_TraerCodigoCli',
            method: 'GET',
            success: function(response) {
                let codigoCli = response.codigoCli; // Obtener el valor de codigoCli
    
                // Verificar si codigoCli es un número
                if (typeof codigoCli === 'number') {
                    // Sumarle 1 al valor de codigoCli
                    let nuevoCodigoCli = codigoCli + 1;
                    let selectCodigoCli = $('#codigoCli');
                    selectCodigoCli.val(nuevoCodigoCli);
                } else {
                    console.log("El valor de codigoCli no es un número.");
                }
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }    

    $('#contactoCli').on('input', function () {
        // Obtiene el valor actual del input
        let inputValue = $(this).val();
    
        // Elimina los espacios en blanco y caracteres no numéricos excepto el +
        inputValue = inputValue.replace(/[^0-9+]/g, '');
    
        // Establece el valor limpio en el input
        $(this).val(inputValue);
    });

    $('#registrar_usuario_submit').on('click', function () {
        let todosCamposCompletos = true;

        let tipoPollo = $('#tipoPollo').val();
        let codigoCli = $('#codigoCli').val();
        let zonaPollo = $('#zonaPollo').val();
        let nombresCli = $('#nombresCli').val().toUpperCase();
        let apellidoPaternoCli = $('#apellidoPaternoCli').val().toUpperCase();
        let apellidoMaternoCli = $('#apellidoMaternoCli').val().toUpperCase();
        let tipoDocumentoCli = $('#tipoDocumentoCli').val();
        let documentoCli = $('#documentoCli').val().toUpperCase();
        let contactoCli = $('#contactoCli').val();
        let direccionCli = $('#direccionCli').val();
        let comentarioCli = $('#comentarioCli').val();
        let estadoCli = 1
        let usuarioRegistroCli = $('#usuarioRegistroCli').data('id');
    
        $('#registroClientes .validarCampo').each(function() {
            let valorCampo = $(this).val();
    
            if (valorCampo === null || valorCampo.trim() === '') {
                $(this).removeClass('border-green-500 dark:border-gray-600').addClass('border-red-500');
                todosCamposCompletos = false;
            } else {
                $(this).removeClass('border-red-500').addClass('border-green-500');
            }
        });
    
        if (todosCamposCompletos) {
            // Llamar a tu función aquí
            fn_RegistrarCliente(apellidoPaternoCli,apellidoMaternoCli,nombresCli,tipoDocumentoCli,documentoCli,contactoCli,direccionCli,estadoCli,usuarioRegistroCli,codigoCli,tipoPollo,comentarioCli,zonaPollo);
        } else {
            // Mostrar una alerta de que debe completar los campos obligatorios
            alertify.notify('Debe rellenar todos los campos obligatorios', 'error', 3);
        }
    });

    function fn_RegistrarCliente(apellidoPaternoCli,apellidoMaternoCli,nombresCli,tipoDocumentoCli,documentoCli,contactoCli,direccionCli,estadoCli,usuarioRegistroCli,codigoCli,tipoPollo,comentarioCli,zonaPollo){
        $.ajax({
            url: '/fn_consulta_RegistrarCliente',
            method: 'GET',
            data: {
                apellidoPaternoCli: apellidoPaternoCli,
                apellidoMaternoCli: apellidoMaternoCli,
                nombresCli:nombresCli,
                tipoDocumentoCli:tipoDocumentoCli,
                documentoCli:documentoCli,
                contactoCli:contactoCli,
                direccionCli:direccionCli,
                estadoCli:estadoCli,
                usuarioRegistroCli:usuarioRegistroCli,
                codigoCli:codigoCli,
                idGrupo:tipoPollo,
                comentarioCli:comentarioCli,
                zonaPollo:zonaPollo
            },
            success: function(response) {
                if (response.success) {
                    Swal({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registro al cliente correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#registroClientes input, #registroClientes select, #registroClientes textarea').val('');
                    fn_traerGrupos();
                    fn_TraerZonas();
                    fn_TraerCodigoCli();
                    fn_TraerDocumentos();
                }
            },
            error: function(error) {
                Swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error:'+error.responseText,
                  })
                console.error("ERROR",error);
            }
        });
    }

});