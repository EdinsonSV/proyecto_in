import './bootstrap';
import './inicio';
import './register';
import './registrar_clientes';
import jQuery from 'jquery';
window.$ = jQuery;
import toastr from 'toastr';
import 'toastr/build/toastr.css';
window.toastr = toastr;

jQuery(function($) {
    $('#preloader_sistema').fadeOut('slow'); // Esto hace que el preloader desaparezca cuando la pagina este cargada
});