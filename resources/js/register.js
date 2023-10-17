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

    $('#registroForm .entradaEnMayusculas').on('input', function() {
        // Obtiene el valor actual del campo
        let valorCampo = $(this).val();
    
        // Convierte el valor a mayúsculas
        valorCampo = valorCampo.toUpperCase();
    
        // Establece el valor modificado en el campo
        $(this).val(valorCampo);
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

    $('#registroForm').on('submit', function (event) {
        event.preventDefault(); // Detiene el envío del formulario
        let todosCamposCompletos = true;

        $('#registroForm .validarCampo').each(function() {
            let valorCampo = $(this).val();
    
            if (valorCampo === null || valorCampo.trim() === '') {
                $(this).removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
                todosCamposCompletos = false;
            } else {
                $(this).removeClass('border-red-500').addClass('border-green-500');
            }
        });
        
        // Llama a tu función de validación personalizada
        if (todosCamposCompletos) {
            this.submit(); // Envía el formulario
        } else {
            // Si la validación falla, muestra un mensaje o realiza otra acción
            alertify.notify('Debe rellenar todos los campos', 'error', 3);
        }
    });

    fn_RolesUsuario()

    function fn_RolesUsuario() {
        $.ajax({
            url: '/fn_consulta_RolesUsuario',
            method: 'GET',
            success: function (response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let rolesUsuario = $('#RolesUsuarios');
                    rolesUsuario.empty();
                    let nuevaFila = ""

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        // Crear una nueva fila
                        if (parseInt(obj.idSubMenu) == 1){

                            nuevaFila = $(`<div class="flex items-center gap-2 px-5 py-1 bg-gray-800 dark:bg-gray-900 rounded-xl">
                            <input disabled checked id="${obj.idSubMenu}" data="${obj.idMenu}" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="${obj.idSubMenu}" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">${obj.nombreSubMenu}</label>
                            </div>`);

                        }else{
                            nuevaFila = $(`<div class="flex items-center gap-2 px-5 py-1 bg-gray-800 dark:bg-gray-900 rounded-xl">
                            <input id="${obj.idSubMenu}" data="${obj.idMenu}" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="${obj.idSubMenu}" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">${obj.nombreSubMenu}</label>
                            </div>`);
                        }

                        rolesUsuario.append(nuevaFila);
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