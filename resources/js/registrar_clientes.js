import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    $('#codigoCli').on('input', function () {
        // Obtiene el valor actual del input
        let inputValue = $(this).val();

        // Elimina los espacios en blanco y caracteres no numéricos
        inputValue = inputValue.replace(/[^0-9]/g, '');

        // Establece el valor limpio en el input
        $(this).val(inputValue);
    });

});