import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function($) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];
        
    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReportePorCliente').val(today);
    $('#fechaHastaReportePorCliente').val(today);

    $('#idClientePorReporte').on('input', function () {
        let idClientePorReporte = $('#idClientePorReporte').val();
        if(idClientePorReporte.length > 0) {
            console.log('Cliente:', idClientePorReporte)
            fn_TraerClientesReportePorCliente(idClientePorReporte)         
        }
    });

    function fn_TraerClientesReportePorCliente(idClientePorReporte){
        $.ajax({
            url: '/fn_consulta_TraerClientesReportePorCliente',
            method: 'GET',
            data: {
                idClientePorReporte: idClientePorReporte,
            },
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        console.log(obj);
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