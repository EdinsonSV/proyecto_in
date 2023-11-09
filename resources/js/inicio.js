import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    
    fn_declarar_especies();
    fn_traerDatosEnTiempoReal();
    setInterval(fn_traerDatosEnTiempoReal, 4000);

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

        var cantidadVentaTotal = 0;
        var pesoVentaTotal = 0;
        var promedioVentaTotal = 0;

        var cantidadCompraTotal = 0;
        var pesoCompraTotal = 0;
        var promedioCompraTotal = 0;

        var cantidadMermaTotal = 0;
        var pesoMermaTotal = 0;
        var promedioMermaTotal = 0;

        var cantidadMermaTotalPorcentual = 0;
        var pesoMermaTotalPorcentual = 0;
        var promedioMermaTotalPorcentual = 0;

        $.ajax({
            url: '/fn_consulta_TraerDatosEnTiempoReal',
            method: 'GET',
            success: function(response) {

                let cantidadPrimerEspecie = 0
                let cantidadSegundaEspecie = 0
                let cantidadTerceraEspecie = 0
                let cantidadCuartaEspecie = 0

                let pesoBeneficiadoPrimerEspecie = 0.0
                let pesoBeneficiadoSegundaEspecie = 0.0
                let pesoBeneficiadoTerceraEspecie = 0.0
                let pesoBeneficiadoCuartaEspecie = 0.0

                let pesoPolloVivoPrimerEspecie = 0.0
                let pesoPolloVivoSegundaEspecie = 0.0
                let pesoPolloVivoTerceraEspecie = 0.0
                let pesoPolloVivoCuartaEspecie = 0.0

                let pesoTotalPrimerEspecie = 0.0
                let pesoTotalSegundaEspecie = 0.0
                let pesoTotalTerceraEspecie = 0.0
                let pesoTotalCuartaEspecie = 0.0

                let cantidadTotalesEspecie = 0
                let pesoBeneficiadoTotalesEspecie = 0.0
                let pesoPolloVivoTotalesEspecie = 0.0
                let pesoTotalesEspecie = 0.0

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {

                        let idEspecie = parseInt(obj.idEspecie)
                        let cantidadPes = parseInt(obj.cantidadPes)
                        let pesoNetoPes = parseFloat(obj.pesoNetoPes)
                        let valorConversion = parseFloat(obj.valorConversion)
                        let idGrupo = parseInt(obj.idGrupo)

                        if (idEspecie == primerEspecieGlobal) {
                            cantidadPrimerEspecie += cantidadPes
                            if (idGrupo == 2){
                                pesoBeneficiadoPrimerEspecie += pesoNetoPes
                                pesoTotalPrimerEspecie += pesoNetoPes/0.88
                            }else if (idGrupo == 1){
                                pesoPolloVivoPrimerEspecie += pesoNetoPes/valorConversion
                                pesoTotalPrimerEspecie += pesoNetoPes/valorConversion
                            }
                        }else if (idEspecie == segundaEspecieGlobal) {
                            cantidadSegundaEspecie += cantidadPes
                            if (idGrupo == 2){
                                pesoBeneficiadoSegundaEspecie += pesoNetoPes
                                pesoTotalSegundaEspecie += pesoNetoPes/0.90
                            }else if (idGrupo == 1){
                                pesoPolloVivoSegundaEspecie += pesoNetoPes/valorConversion
                                pesoTotalSegundaEspecie += pesoNetoPes/valorConversion
                            }
                        }else if (idEspecie == terceraEspecieGlobal) {
                            cantidadTerceraEspecie += cantidadPes
                            if (idGrupo == 2){
                                pesoBeneficiadoTerceraEspecie += pesoNetoPes
                                pesoTotalTerceraEspecie += pesoNetoPes/0.90
                            }else if (idGrupo == 1){
                                pesoPolloVivoTerceraEspecie += pesoNetoPes/valorConversion
                                pesoTotalTerceraEspecie += pesoNetoPes/valorConversion
                            }
                        }else if (idEspecie == cuartaEspecieGlobal) {
                            cantidadCuartaEspecie += cantidadPes
                            if (idGrupo == 2){
                                pesoBeneficiadoCuartaEspecie += pesoNetoPes
                                pesoTotalCuartaEspecie += pesoNetoPes/0.88
                            }else if (idGrupo == 1){
                                pesoPolloVivoCuartaEspecie += pesoNetoPes/valorConversion
                                pesoTotalCuartaEspecie += pesoNetoPes/valorConversion
                            }
                        }

                    });

                    cantidadTotalesEspecie = cantidadPrimerEspecie+cantidadSegundaEspecie+cantidadTerceraEspecie+cantidadCuartaEspecie
                    pesoBeneficiadoTotalesEspecie = pesoBeneficiadoPrimerEspecie+pesoBeneficiadoSegundaEspecie+pesoBeneficiadoTerceraEspecie+pesoBeneficiadoCuartaEspecie
                    pesoPolloVivoTotalesEspecie = pesoPolloVivoPrimerEspecie+pesoPolloVivoSegundaEspecie+pesoPolloVivoTerceraEspecie+pesoPolloVivoCuartaEspecie
                    pesoTotalesEspecie = pesoTotalPrimerEspecie+pesoTotalSegundaEspecie+pesoTotalTerceraEspecie+pesoTotalCuartaEspecie

                    cantidadVentaTotal = cantidadTotalesEspecie;
                    pesoVentaTotal = pesoTotalesEspecie;
                    if (pesoTotalesEspecie != 0 && cantidadTotalesEspecie != 0) {
                        promedioVentaTotal = pesoTotalesEspecie/cantidadTotalesEspecie;
                    }else{
                        promedioVentaTotal = 0; 
                    }
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }

                $.ajax({
                    url: '/fn_consulta_TraerDatosEnTiempoRealCompra',
                    method: 'GET',
                    success: function(response) {
        
                        // Verificar si la respuesta es un arreglo de objetos
                        if (Array.isArray(response)) {
                            // Iterar sobre los objetos y mostrar sus propiedades
                            let totalCantidadGuia = parseInt(response[0].totalCantidadGuia);
                            let totalPesoGuia = parseFloat(response[0].totalPesoGuia);
                            cantidadCompraTotal = totalCantidadGuia.toFixed(2);
                            pesoCompraTotal = totalPesoGuia.toFixed(2);
        
                        } else {
                            console.log("La respuesta no es un arreglo de objetos.");
                        }

                        if (pesoCompraTotal != 0 && cantidadCompraTotal != 0){
                            promedioCompraTotal = pesoCompraTotal/cantidadCompraTotal;
                        }else{
                            promedioCompraTotal = 0
                        }
        
        
                        $('#tblCantidadCompra').text(parseInt(cantidadCompraTotal));
                        $('#tblPesoCompra').text(pesoCompraTotal);
                        $('#tblPromedioCompra').text((promedioCompraTotal).toFixed(2));
        
                        cantidadMermaTotal = cantidadCompraTotal-cantidadVentaTotal;
                        pesoMermaTotal = pesoCompraTotal-pesoVentaTotal;
                        promedioMermaTotal = promedioCompraTotal-promedioVentaTotal;
        
                        $('#tblCantidadMerma').text(cantidadMermaTotal);
                        $('#tblPesoMerma').text(pesoMermaTotal.toFixed(2));
                        $('#tblPromedioMerma').text(promedioMermaTotal.toFixed(2));
        
                        if (cantidadVentaTotal != 0 && cantidadCompraTotal != 0) {
                            cantidadMermaTotalPorcentual = ((cantidadVentaTotal-cantidadCompraTotal)/cantidadCompraTotal)*100;
                        }
                        
                        if (pesoVentaTotal != 0 && pesoCompraTotal != 0) {
                            pesoMermaTotalPorcentual = ((pesoVentaTotal-pesoCompraTotal)/pesoCompraTotal)*100;
                        }
        
                        if (promedioVentaTotal != 0 && promedioCompraTotal != 0) {
                            promedioMermaTotalPorcentual = ((promedioVentaTotal-promedioCompraTotal)/promedioCompraTotal)*100;
                        }
        
                        $('#tblCantidadMermaPor').text(cantidadMermaTotalPorcentual.toFixed(2) + " %");
                        $('#tblPesoMermaPor').text(pesoMermaTotalPorcentual.toFixed(2) + " %");
                        $('#tblPromedioMermaPor').text(promedioMermaTotalPorcentual.toFixed(2) + " %");
                        
                    },
                    error: function(error) {
                        console.error("ERROR",error);
                    }
                });

                $('#totalUnidadesPrimerEspecie').text(cantidadPrimerEspecie + " " + (cantidadPrimerEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgBeneficiadoPrimerEspecie').text(pesoBeneficiadoPrimerEspecie.toFixed(2) + " Kg");
                $('#totalKgPolloVivoPrimerEspecie').text(pesoPolloVivoPrimerEspecie.toFixed(2) + " Kg");
                $('#totalKgPrimerEspecie').text(pesoTotalPrimerEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesSegundaEspecie').text(cantidadSegundaEspecie + " " + (cantidadSegundaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgBeneficiadoSegundaEspecie').text(pesoBeneficiadoSegundaEspecie.toFixed(2) + " Kg");
                $('#totalKgPolloVivoSegundaEspecie').text(pesoPolloVivoSegundaEspecie.toFixed(2) + " Kg");
                $('#totalKgSegundaEspecie').text(pesoTotalSegundaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesTerceraEspecie').text(cantidadTerceraEspecie + " " + (cantidadTerceraEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgBeneficiadoTerceraEspecie').text(pesoBeneficiadoTerceraEspecie.toFixed(2) + " Kg");
                $('#totalKgPolloVivoTerceraEspecie').text(pesoPolloVivoTerceraEspecie.toFixed(2) + " Kg");
                $('#totalKgTerceraEspecie').text(pesoTotalTerceraEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesCuartaEspecie').text(cantidadCuartaEspecie + " " + (cantidadCuartaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgBeneficiadoCuartaEspecie').text(pesoBeneficiadoCuartaEspecie.toFixed(2) + " Kg");
                $('#totalKgPolloVivoCuartaEspecie').text(pesoPolloVivoCuartaEspecie.toFixed(2) + " Kg");
                $('#totalKgCuartaEspecie').text(pesoTotalCuartaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesEspecies').text(cantidadTotalesEspecie + " " + (cantidadTotalesEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgBeneficiadoEspecies').text(pesoBeneficiadoTotalesEspecie.toFixed(2) + " Kg");
                $('#totalKgPolloVivoEspecies').text(pesoPolloVivoTotalesEspecie.toFixed(2) + " Kg");
                $('#totalKgEspecies').text(pesoTotalesEspecie.toFixed(2) + " Kg");

                $('#tblCantidadVenta').text(cantidadVentaTotal);
                $('#tblPesoVenta').text(pesoVentaTotal.toFixed(2));
                $('#tblPromedioVenta').text(promedioVentaTotal.toFixed(2));
                
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });

    }
    
});