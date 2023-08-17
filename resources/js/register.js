import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    // Cuando se cambie la selección de un input radio
    $('#sexoUsuM, #sexoUsuF').on("change", function () {
        // Remueve las clases de fondo de todos los labels
        $('label').removeClass('bg-sky-600 bg-pink-500');
        
        // Agrega la clase de fondo apropiada al label asociado
        if (this.checked) {
            if ($(this).attr('id') === 'sexoUsuM') {
                $(this).next('label').addClass('bg-sky-600');
            } else if ($(this).attr('id') === 'sexoUsuF') {
                $(this).next('label').addClass('bg-pink-500');
            }
        }
    });

    $('#celularUsu').on('input', function () {
        // Obtiene el valor actual del input
        let inputValue = $(this).val();

        // Elimina los espacios en blanco y caracteres no numéricos
        inputValue = inputValue.replace(/[^0-9]/g, '');
        
        // Divide el valor en grupos de tres caracteres
        const groups = inputValue.match(/.{1,3}/g);
        
        // Si hay grupos, une con espacios y establece el valor en el input
        if (groups) {
            inputValue = groups.join(' ');
        }
        
        // Limita la entrada a 11 caracteres (incluyendo espacios)
        if (inputValue.length > 9) {
            inputValue = inputValue.substr(0, 11);
        }

        // Establece el valor limpio en el input
        $(this).val(inputValue);
    });

    $('#dniUsu').on('input', function () {
        // Obtiene el valor actual del input
        let inputValue = $(this).val();

        // Elimina los espacios en blanco y caracteres no numéricos
        inputValue = inputValue.replace(/[^0-9]/g, '');
        
        // Limita la entrada a 8 caracteres
        if (inputValue.length > 8) {
            inputValue = inputValue.substr(0, 8);
        }

        // Establece el valor limpio en el input
        $(this).val(inputValue);
    });
    
    $('#passwordMos').on('click', function(){
        $('#password').attr('type', 'text');
        $('#passwordMosl').addClass('hidden');
        $('#passwordOcul').removeClass('hidden');
    })

    $('#passwordOcu').on('click', function(){
        $('#password').attr('type', 'password');
        $('#passwordOcul').addClass('hidden');
        $('#passwordMosl').removeClass('hidden');
    })
});