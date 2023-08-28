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
                $('#rutaPerfilUsu').attr('value','img/hombre.png');
            } else if ($(this).attr('id') === 'sexoUsuF') {
                $(this).next('label').addClass('bg-pink-500');
                $('#rutaPerfilUsu').attr('value','img/mujer.png');
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

    $('#toogle_bard').on('click', function(){
        $('#aside_bard').addClass('left-0');
        $('#aside_bard').addClass('md:w-[calc(3.73rem)]')
    })
    
    $('#toogle_bard2').on('click', function(){
        $('#aside_bard').removeClass('left-0');
    })

    $('#registroForm').on('submit', function (event) {
            event.preventDefault(); // Detiene el envío del formulario
            
            // Llama a tu función de validación personalizada
            if (validacionPersonalizada()) {
                // Si la validación es exitosa, realiza la acción del formulario
                this.submit(); // Envía el formulario
            } else {
                // Si la validación falla, muestra un mensaje o realiza otra acción
                toastr.error('¡Error de Credenciales!', {
                    timeOut: 500, // Duración en milisegundos (800 milisegundos en este caso)
                });
            }
        });

    // Función de validación personalizada
    function validacionPersonalizada() {
        // Aquí puedes realizar tus propias validaciones personalizadas
        
        // Por ejemplo, verifica si los campos obligatorios están completos
        var apellidoPaterno = $('#apellidoPaternoUsu').val();
        var apellidoMaterno = $('#apellidoMaternoUsu').val();
        var nombres = $('#nombresUsu').val();
        
        // Realiza tus validaciones aquí y devuelve true o false-|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
        if (apellidoPaterno && apellidoMaterno && nombres) {
            return true;
        } else {
            return false;
        }
    }

});