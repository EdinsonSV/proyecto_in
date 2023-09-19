import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    traerGrupos()

    $('#codigoCli').on('input', function () {
        // Obtiene el valor actual del input
        let inputValue = $(this).val();

        // Elimina los espacios en blanco y caracteres no numéricos
        inputValue = inputValue.replace(/[^0-9]/g, '');

        // Establece el valor limpio en el input
        $(this).val(inputValue);
    });

    function traerGrupos(){
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

});