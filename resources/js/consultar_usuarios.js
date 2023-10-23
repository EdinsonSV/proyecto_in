import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    fn_ConsultarUsuarios()

    function fn_ConsultarUsuarios() {
        $.ajax({
        url: '/fn_consulta_ConsultarUsuarios',
            method: 'GET',
            success: function (response) {

            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }
});