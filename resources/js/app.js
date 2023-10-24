import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    declarar_mensaje_bienvenida();

    function declarar_mensaje_bienvenida(){
        // Obtener la hora actual
        let horaActual = new Date().getHours();
    
        // Definir los mensajes según la hora
        let mensaje;
    
        if (horaActual >=0 && horaActual < 6) {
            mensaje = 'Has madrugado mucho hoy';
        } else if (horaActual >= 6 && horaActual < 12) {
            mensaje = 'Buenos dias';
        }else if (horaActual >= 12 && horaActual < 19) {
            mensaje = 'Buenas tardes';
        } else if (horaActual >=19 && horaActual < 24) {
            mensaje = 'Buenas noches';
        }
    
        // Mostrar el mensaje de bienvenida
        $('#mensaje_bienvenida').text(mensaje);
    }

    $('#preloader_sistema').fadeOut('slow');

    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // El navegador está en modo oscuro
        $('.base_swith').addClass('bg-green-500');
        $('.base_swith').removeClass('bg-slate-700');
        $('.circulo_swith').addClass('prendido');
        $('html').addClass('dark');
    } else {
        // El navegador no está en modo oscuro
        $('.base_swith').removeClass('bg-green-500');
        $('.base_swith').addClass('bg-slate-700');
        $('.circulo_swith').removeClass('prendido');
        $('html').removeClass('dark');
    }

    if(localStorage.getItem('modoOscuro') === 'true') {
        // Aplicar el modo oscuro
        $('html').addClass('dark');
        $('.base_swith').addClass('bg-green-500');
        $('.base_swith').removeClass('bg-slate-700');
        $('.circulo_swith').addClass('prendido');
    }else{
        $('html').removeClass('dark');
        $('.base_swith').removeClass('bg-green-500');
        $('.base_swith').addClass('bg-slate-700');
        $('.circulo_swith').removeClass('prendido');
    }

    $('#swith_modo_oscuro').on('click', function(){
        $('.base_swith').toggleClass('bg-green-500 bg-slate-700');
        $('.circulo_swith').toggleClass('prendido');
        $('html').toggleClass('dark');
        localStorage.setItem('modoOscuro', $('html').hasClass('dark'));
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