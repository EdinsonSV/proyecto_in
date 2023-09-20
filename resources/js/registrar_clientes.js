import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    fn_traerGrupos()
    fn_TraerZonas()

    $('#codigoCli').on('input', function () {
        // Obtiene el valor actual del input
        let inputValue = $(this).val();

        // Elimina los espacios en blanco y caracteres no numéricos
        inputValue = inputValue.replace(/[^0-9]/g, '');

        // Establece el valor limpio en el input
        $(this).val(inputValue);
    });

    function fn_traerGrupos(){
        $.ajax({
            url: '/fn_consultar_TraerGrupos',
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
            url: '/fn_consultar_TraerZonas',
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

    function fn_TraerCodigoCli(){
        $.ajax({
            url: '/fn_consultar_TraerCodigoCli',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let selectCodigoCli  = $('#codigoCli');
                    
                    // Vaciar el select actual, si es necesario
                    selectCodigoCli.val('');

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {

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