import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    
    fn_declarar_especies();
    fn_traerDatosEnTiempoReal();
    setInterval(fn_traerDatosEnTiempoReal, 2000);

    var primerEspecieGlobal = 0
    var segundaEspecieGlobal = 0
    var terceraEspecieGlobal = 0
    var cuartaEspecieGlobal = 0
    var nombrePrimerEspecieGlobal = ""
    var nombreSegundaEspecieGlobal = ""
    var nombreTerceraEspecieGlobal = ""
    var nombreCuartaEspecieGlobal = ""

    /* ============ Eventos ============ */



    /* ============ Funciones ============ */

    function fn_declarar_especies(){
        $.ajax({
            url: '/fn_consulta_DatosEspecie',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Iterar sobre los objetos y mostrar sus propiedades
                    primerEspecieGlobal = parseInt(response[0].idEspecie);
                    segundaEspecieGlobal  = parseInt(response[1].idEspecie);
                    terceraEspecieGlobal = parseInt(response[2].idEspecie);
                    cuartaEspecieGlobal = parseInt(response[3].idEspecie);

                    nombrePrimerEspecieGlobal = response[0].nombreEspecie;
                    nombreSegundaEspecieGlobal = response[1].nombreEspecie;
                    nombreTerceraEspecieGlobal = response[2].nombreEspecie;
                    nombreCuartaEspecieGlobal = response[3].nombreEspecie;
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

    function fn_traerDatosEnTiempoReal(){
        $.ajax({
            url: '/fn_consulta_TraerDatosEnTiempoReal',
            method: 'GET',
            success: function(response) {

                let cantidadPrimerEspecie = 0
                let cantidadSegundaEspecie = 0
                let cantidadTerceraEspecie = 0
                let cantidadCuartaEspecie = 0

                let pesoNetoPrimerEspecie = 0.0
                let pesoNetoSegundaEspecie = 0.0
                let pesoNetoTerceraEspecie = 0.0
                let pesoNetoCuartaEspecie = 0.0

                let pesoVivoPrimerEspecie = 0.0
                let pesoVivoSegundaEspecie = 0.0
                let pesoVivoTerceraEspecie = 0.0
                let pesoVivoCuartaEspecie = 0.0

                let cantidadTotalesEspecie = 0
                let pesoNetoTotalesEspecie = 0.0
                let pesoVivoTotalesEspecie = 0.0

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {

                        let idEspecie = parseInt(obj.idEspecie)
                        let cantidadPes = parseInt(obj.cantidadPes)
                        let pesoNetoPes = parseFloat(obj.pesoNetoPes)
                        let valorConversion = parseFloat(obj.valorConversion)

                        if (valorConversion >= 1) {
                            if (idEspecie == primerEspecieGlobal) {
                                cantidadPrimerEspecie += cantidadPes
                                pesoNetoPrimerEspecie += pesoNetoPes
                                pesoVivoPrimerEspecie += pesoNetoPes/0.88
                            }else if (idEspecie == segundaEspecieGlobal) {
                                cantidadSegundaEspecie += cantidadPes
                                pesoNetoSegundaEspecie += pesoNetoPes
                                pesoVivoSegundaEspecie += pesoNetoPes/0.88
                            }else if (idEspecie == terceraEspecieGlobal) {
                                cantidadTerceraEspecie += cantidadPes
                                pesoNetoTerceraEspecie += pesoNetoPes
                                pesoVivoTerceraEspecie += pesoNetoPes/0.88
                            }else if (idEspecie == cuartaEspecieGlobal) {
                                cantidadCuartaEspecie += cantidadPes
                                pesoNetoCuartaEspecie += pesoNetoPes
                                pesoVivoCuartaEspecie += pesoNetoPes/0.88
                            }
                            cantidadTotalesEspecie += cantidadPes
                            pesoNetoTotalesEspecie += pesoNetoPes
                            pesoVivoTotalesEspecie += pesoNetoPes/0.88
                        }else if (valorConversion < 1){
                            if (idEspecie == primerEspecieGlobal) {
                                cantidadPrimerEspecie += cantidadPes
                                pesoNetoPrimerEspecie += pesoNetoPes
                                pesoVivoPrimerEspecie += pesoNetoPes/valorConversion
                            }else if (idEspecie == segundaEspecieGlobal) {
                                cantidadSegundaEspecie += cantidadPes
                                pesoNetoSegundaEspecie += pesoNetoPes
                                pesoVivoSegundaEspecie += pesoNetoPes/valorConversion
                            }else if (idEspecie == terceraEspecieGlobal) {
                                cantidadTerceraEspecie += cantidadPes
                                pesoNetoTerceraEspecie += pesoNetoPes
                                pesoVivoTerceraEspecie += pesoNetoPes/valorConversion
                            }else if (idEspecie == cuartaEspecieGlobal) {
                                cantidadCuartaEspecie += cantidadPes
                                pesoNetoCuartaEspecie += pesoNetoPes
                                pesoVivoCuartaEspecie += pesoNetoPes/valorConversion
                            }
                            cantidadTotalesEspecie += cantidadPes
                            pesoNetoTotalesEspecie += pesoNetoPes
                            pesoVivoTotalesEspecie += pesoNetoPes/valorConversion
                        }

                    });
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }

                $('#totalUnidadesPrimerEspecie').text(cantidadPrimerEspecie + " " + (cantidadPrimerEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgNetoPrimerEspecie').text(pesoNetoPrimerEspecie.toFixed(2) + " Kg");
                $('#totalKgVivoPrimerEspecie').text(pesoVivoPrimerEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesSegundaEspecie').text(cantidadSegundaEspecie + " " + (cantidadSegundaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgNetoSegundaEspecie').text(pesoNetoSegundaEspecie.toFixed(2) + " Kg");
                $('#totalKgVivoSegundaEspecie').text(pesoVivoSegundaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesTerceraEspecie').text(cantidadTerceraEspecie + " " + (cantidadTerceraEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgNetoTerceraEspecie').text(pesoNetoTerceraEspecie.toFixed(2) + " Kg");
                $('#totalKgVivoTerceraEspecie').text(pesoVivoTerceraEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesCuartaEspecie').text(cantidadCuartaEspecie + " " + (cantidadCuartaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgNetoCuartaEspecie').text(pesoNetoCuartaEspecie.toFixed(2) + " Kg");
                $('#totalKgVivoCuartaEspecie').text(pesoVivoCuartaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesEspecies').text(cantidadTotalesEspecie + " " + (cantidadTotalesEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgNetoEspecies').text(pesoNetoTotalesEspecie.toFixed(2) + " Kg");
                $('#totalKgVivoEspecies').text(pesoVivoTotalesEspecie.toFixed(2) + " Kg");
                
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }
    
});