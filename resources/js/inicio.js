import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    
    fn_declarar_especies();
    fn_traerDatosEnTiempoReal();
    setInterval(fn_traerDatosEnTiempoReal, 30000);

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];


    // Asignar la fecha actual a los inputs
    $('#fechaProduccionAnterior').val(fechaHoy);

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
        
                        let cantidadCompraTotalFormateado = parseFloat(cantidadCompraTotal).toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
                        let pesoCompraTotalFormateado = parseFloat(pesoCompraTotal).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });

                        $('#tblCantidadCompra').text(cantidadCompraTotalFormateado);
                        $('#tblPesoCompra').text(pesoCompraTotalFormateado);
                        $('#tblPromedioCompra').text((promedioCompraTotal).toFixed(2));
        
                        cantidadMermaTotal = cantidadCompraTotal-cantidadVentaTotal;
                        pesoMermaTotal = pesoCompraTotal-pesoVentaTotal;
                        promedioMermaTotal = promedioCompraTotal-promedioVentaTotal;

                        let cantidadMermaTotalFormateado = parseFloat(cantidadMermaTotal).toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
                        let pesoMermaTotalFormateado = parseFloat(pesoMermaTotal).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
        
                        $('#tblCantidadMerma').text(cantidadMermaTotalFormateado);
                        $('#tblPesoMerma').text(pesoMermaTotalFormateado);
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
                let cantidadPrimerEspecieFormateado = cantidadPrimerEspecie.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
                let cantidadSegundaEspecieFormateado = cantidadSegundaEspecie.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
                let cantidadTerceraEspecieFormateado = cantidadTerceraEspecie.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
                let cantidadCuartaEspecieFormateado = cantidadCuartaEspecie.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
                let cantidadTotalesEspecieFormateado = cantidadTotalesEspecie.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
                
                let pesoBeneficiadoPrimerEspecieFormateado = pesoBeneficiadoPrimerEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoBeneficiadoSegundaEspecieFormateado = pesoBeneficiadoSegundaEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoBeneficiadoTerceraEspecieFormateado = pesoBeneficiadoTerceraEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoBeneficiadoCuartaEspecieFormateado = pesoBeneficiadoCuartaEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoBeneficiadoTotalesEspecieFormateado = pesoBeneficiadoTotalesEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                
                let pesoPolloVivoPrimerEspecieFormateado = pesoPolloVivoPrimerEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoPolloVivoSegundaEspecieFormateado = pesoPolloVivoSegundaEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoPolloVivoTerceraEspecieFormateado = pesoPolloVivoTerceraEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoPolloVivoCuartaEspecieFormateado = pesoPolloVivoCuartaEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoPolloVivoTotalesEspecieFormateado = pesoPolloVivoTotalesEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                
                let pesoTotalPrimerEspecieFormateado = pesoTotalPrimerEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoTotalSegundaEspecieFormateado = pesoTotalSegundaEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoTotalTerceraEspecieFormateado = pesoTotalTerceraEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoTotalCuartaEspecieFormateado = pesoTotalCuartaEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoTotalesEspecieFormateado = pesoTotalesEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });

                $('#totalUnidadesPrimerEspecie').text(cantidadPrimerEspecieFormateado + " " + (cantidadPrimerEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgBeneficiadoPrimerEspecie').text(pesoBeneficiadoPrimerEspecieFormateado + " Kg");
                $('#totalKgPolloVivoPrimerEspecie').text(pesoPolloVivoPrimerEspecieFormateado + " Kg");
                $('#totalKgPrimerEspecie').text(pesoTotalPrimerEspecieFormateado + " Kg");

                $('#totalUnidadesSegundaEspecie').text(cantidadSegundaEspecieFormateado + " " + (cantidadSegundaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgBeneficiadoSegundaEspecie').text(pesoBeneficiadoSegundaEspecieFormateado + " Kg");
                $('#totalKgPolloVivoSegundaEspecie').text(pesoPolloVivoSegundaEspecieFormateado + " Kg");
                $('#totalKgSegundaEspecie').text(pesoTotalSegundaEspecieFormateado + " Kg");

                $('#totalUnidadesTerceraEspecie').text(cantidadTerceraEspecieFormateado + " " + (cantidadTerceraEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgBeneficiadoTerceraEspecie').text(pesoBeneficiadoTerceraEspecieFormateado + " Kg");
                $('#totalKgPolloVivoTerceraEspecie').text(pesoPolloVivoTerceraEspecieFormateado + " Kg");
                $('#totalKgTerceraEspecie').text(pesoTotalTerceraEspecieFormateado + " Kg");

                $('#totalUnidadesCuartaEspecie').text(cantidadCuartaEspecieFormateado + " " + (cantidadCuartaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgBeneficiadoCuartaEspecie').text(pesoBeneficiadoCuartaEspecieFormateado + " Kg");
                $('#totalKgPolloVivoCuartaEspecie').text(pesoPolloVivoCuartaEspecieFormateado + " Kg");
                $('#totalKgCuartaEspecie').text(pesoTotalCuartaEspecieFormateado + " Kg");

                $('#totalUnidadesEspecies').text(cantidadTotalesEspecieFormateado + " " + (cantidadTotalesEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgBeneficiadoEspecies').text(pesoBeneficiadoTotalesEspecieFormateado + " Kg");
                $('#totalKgPolloVivoEspecies').text(pesoPolloVivoTotalesEspecieFormateado + " Kg");
                $('#totalKgEspecies').text(pesoTotalesEspecieFormateado + " Kg");

                let cantidadVentaTotalFormateado = parseFloat(cantidadVentaTotal).toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
                let pesoVentaTotalFormateado = parseFloat(pesoVentaTotal).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });

                $('#tblCantidadVenta').text(cantidadVentaTotalFormateado);
                $('#tblPesoVenta').text(pesoVentaTotalFormateado);
                $('#tblPromedioVenta').text(promedioVentaTotal.toFixed(2));
                
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });

    }
    
    function fn_traerDatosDiasAnteriores(fecha){

        var cantidadVentaTotalAnterior = 0;
        var pesoVentaTotalAnterior = 0;
        var promedioVentaTotalAnterior = 0;

        var cantidadCompraTotalAnterior = 0;
        var pesoCompraTotalAnterior = 0;
        var promedioCompraTotalAnterior = 0;

        var cantidadMermaTotalAnterior = 0;
        var pesoMermaTotalAnterior = 0;
        var promedioMermaTotalAnterior = 0;

        var cantidadMermaTotalPorcentualAnterior = 0;
        var pesoMermaTotalPorcentualAnterior = 0;
        var promedioMermaTotalPorcentualAnterior = 0;

        $.ajax({
            url: '/fn_consulta_TraerDatosDiasAnteriores',
            method: 'GET',
            data:{
                fecha:fecha,
            },
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

                    cantidadVentaTotalAnterior = cantidadTotalesEspecie;
                    pesoVentaTotalAnterior = pesoTotalesEspecie;
                    if (pesoVentaTotalAnterior != 0 && cantidadVentaTotalAnterior != 0) {
                        promedioVentaTotalAnterior = pesoVentaTotalAnterior/cantidadVentaTotalAnterior;
                    }else{
                        promedioVentaTotalAnterior = 0; 
                    }
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }

                $.ajax({
                    url: '/fn_consulta_TraerDatosDiasAnterioresCompra',
                    method: 'GET',
                    data:{
                        fecha:fecha,
                    },
                    success: function(response) {
        
                        // Verificar si la respuesta es un arreglo de objetos
                        if (Array.isArray(response)) {
                            // Iterar sobre los objetos y mostrar sus propiedades
                            let totalCantidadGuia = parseInt(response[0].totalCantidadGuia);
                            let totalPesoGuia = parseFloat(response[0].totalPesoGuia);
                            cantidadCompraTotalAnterior = totalCantidadGuia.toFixed(2);
                            pesoCompraTotalAnterior = totalPesoGuia.toFixed(2);
        
                        } else {
                            console.log("La respuesta no es un arreglo de objetos.");
                        }

                        if (pesoCompraTotalAnterior != 0 && cantidadCompraTotalAnterior != 0){
                            promedioCompraTotalAnterior = pesoCompraTotalAnterior/cantidadCompraTotalAnterior;
                        }else{
                            promedioCompraTotalAnterior = 0
                        }
                        
                        let cantidadCompraTotalAnteriorFormateado = parseFloat(cantidadCompraTotalAnterior).toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
                        let pesoCompraTotalAnteriorFormateado = parseFloat(pesoCompraTotalAnterior).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
        
                        $('#tblCantidadCompraAnterior').text(cantidadCompraTotalAnteriorFormateado);
                        $('#tblPesoCompraAnterior').text(pesoCompraTotalAnteriorFormateado);
                        $('#tblPromedioCompraAnterior').text((promedioCompraTotalAnterior).toFixed(2));
        
                        cantidadMermaTotalAnterior = cantidadCompraTotalAnterior-cantidadVentaTotalAnterior;
                        pesoMermaTotalAnterior = pesoCompraTotalAnterior-pesoVentaTotalAnterior;
                        promedioMermaTotalAnterior = promedioCompraTotalAnterior-promedioVentaTotalAnterior;

                        let cantidadMermaTotalAnteriorFormateado = parseFloat(cantidadMermaTotalAnterior).toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
                        let pesoMermaTotalAnteriorFormateado = parseFloat(pesoMermaTotalAnterior).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
        
                        $('#tblCantidadMermaAnterior').text(cantidadMermaTotalAnteriorFormateado);
                        $('#tblPesoMermaAnterior').text(pesoMermaTotalAnteriorFormateado);
                        $('#tblPromedioMermaAnterior').text(promedioMermaTotalAnterior.toFixed(2));
        
                        if (cantidadVentaTotalAnterior != 0 && cantidadCompraTotalAnterior != 0) {
                            cantidadMermaTotalPorcentualAnterior = ((cantidadVentaTotalAnterior-cantidadCompraTotalAnterior)/cantidadCompraTotalAnterior)*100;
                        }
                        
                        if (pesoVentaTotalAnterior != 0 && pesoCompraTotalAnterior != 0) {
                            pesoMermaTotalPorcentualAnterior = ((pesoVentaTotalAnterior-pesoCompraTotalAnterior)/pesoCompraTotalAnterior)*100;
                        }
        
                        if (promedioVentaTotalAnterior != 0 && promedioCompraTotalAnterior != 0) {
                            promedioMermaTotalPorcentualAnterior = ((promedioVentaTotalAnterior-promedioCompraTotalAnterior)/promedioCompraTotalAnterior)*100;
                        }
        
                        $('#tblCantidadMermaPorAnterior').text(cantidadMermaTotalPorcentualAnterior.toFixed(2) + " %");
                        $('#tblPesoMermaPorAnterior').text(pesoMermaTotalPorcentualAnterior.toFixed(2) + " %");
                        $('#tblPromedioMermaPorAnterior').text(promedioMermaTotalPorcentualAnterior.toFixed(2) + " %");
                        
                    },
                    error: function(error) {
                        console.error("ERROR",error);
                    }
                });

                let cantidadPrimerEspecieFormateado = cantidadPrimerEspecie.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
                let cantidadSegundaEspecieFormateado = cantidadSegundaEspecie.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
                let cantidadTerceraEspecieFormateado = cantidadTerceraEspecie.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
                let cantidadCuartaEspecieFormateado = cantidadCuartaEspecie.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
                let cantidadTotalesEspecieFormateado = cantidadTotalesEspecie.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
                
                let pesoBeneficiadoPrimerEspecieFormateado = pesoBeneficiadoPrimerEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoBeneficiadoSegundaEspecieFormateado = pesoBeneficiadoSegundaEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoBeneficiadoTerceraEspecieFormateado = pesoBeneficiadoTerceraEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoBeneficiadoCuartaEspecieFormateado = pesoBeneficiadoCuartaEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoBeneficiadoTotalesEspecieFormateado = pesoBeneficiadoTotalesEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                
                let pesoPolloVivoPrimerEspecieFormateado = pesoPolloVivoPrimerEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoPolloVivoSegundaEspecieFormateado = pesoPolloVivoSegundaEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoPolloVivoTerceraEspecieFormateado = pesoPolloVivoTerceraEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoPolloVivoCuartaEspecieFormateado = pesoPolloVivoCuartaEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoPolloVivoTotalesEspecieFormateado = pesoPolloVivoTotalesEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                
                let pesoTotalPrimerEspecieFormateado = pesoTotalPrimerEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoTotalSegundaEspecieFormateado = pesoTotalSegundaEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoTotalTerceraEspecieFormateado = pesoTotalTerceraEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoTotalCuartaEspecieFormateado = pesoTotalCuartaEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
                let pesoTotalesEspecieFormateado = pesoTotalesEspecie.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });

                $('#totalUnidadesPrimerEspecieAnterior').text(cantidadPrimerEspecieFormateado + " " + (cantidadPrimerEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgBeneficiadoPrimerEspecieAnterior').text(pesoBeneficiadoPrimerEspecieFormateado + " Kg");
                $('#totalKgPolloVivoPrimerEspecieAnterior').text(pesoPolloVivoPrimerEspecieFormateado + " Kg");
                $('#totalKgPrimerEspecieAnterior').text(pesoTotalPrimerEspecieFormateado + " Kg");

                $('#totalUnidadesSegundaEspecieAnterior').text(cantidadSegundaEspecieFormateado + " " + (cantidadSegundaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgBeneficiadoSegundaEspecieAnterior').text(pesoBeneficiadoSegundaEspecieFormateado + " Kg");
                $('#totalKgPolloVivoSegundaEspecieAnterior').text(pesoPolloVivoSegundaEspecieFormateado + " Kg");
                $('#totalKgSegundaEspecieAnterior').text(pesoTotalSegundaEspecieFormateado + " Kg");

                $('#totalUnidadesTerceraEspecieAnterior').text(cantidadTerceraEspecieFormateado + " " + (cantidadTerceraEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgBeneficiadoTerceraEspecieAnterior').text(pesoBeneficiadoTerceraEspecieFormateado + " Kg");
                $('#totalKgPolloVivoTerceraEspecieAnterior').text(pesoPolloVivoTerceraEspecieFormateado + " Kg");
                $('#totalKgTerceraEspecieAnterior').text(pesoTotalTerceraEspecieFormateado + " Kg");

                $('#totalUnidadesCuartaEspecieAnterior').text(cantidadCuartaEspecieFormateado + " " + (cantidadCuartaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgBeneficiadoCuartaEspecieAnterior').text(pesoBeneficiadoCuartaEspecieFormateado + " Kg");
                $('#totalKgPolloVivoCuartaEspecieAnterior').text(pesoPolloVivoCuartaEspecieFormateado + " Kg");
                $('#totalKgCuartaEspecieAnterior').text(pesoTotalCuartaEspecieFormateado + " Kg");

                $('#totalUnidadesEspeciesAnterior').text(cantidadTotalesEspecieFormateado + " " + (cantidadTotalesEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgBeneficiadoEspeciesAnterior').text(pesoBeneficiadoTotalesEspecieFormateado + " Kg");
                $('#totalKgPolloVivoEspeciesAnterior').text(pesoPolloVivoTotalesEspecieFormateado + " Kg");
                $('#totalKgEspeciesAnterior').text(pesoTotalesEspecieFormateado + " Kg");

                let cantidadVentaTotalAnteriorFormateado = parseFloat(cantidadVentaTotalAnterior).toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
                let pesoVentaTotalAnteriorFormateado = parseFloat(pesoVentaTotalAnterior).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });

                $('#tblCantidadVentaAnterior').text(cantidadVentaTotalAnteriorFormateado);
                $('#tblPesoVentaAnterior').text(pesoVentaTotalAnteriorFormateado);
                $('#tblPromedioVentaAnterior').text(promedioVentaTotalAnterior.toFixed(2));
                
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });

    }

    $('.cerrarModalProduccionAnterior, .modal-content').on('click', function (e) {
        if (e.target === this) {
            $('#ModalProduccionAnterior').addClass('hidden');
            $('#ModalProduccionAnterior').removeClass('flex');
        }
    });

    $('#btnProduccionAnterior').on('click', function () {
        $('#ModalProduccionAnterior').addClass('flex');
        $('#ModalProduccionAnterior').removeClass('hidden');
    });

    $('#btnBuscarProduccionAnterior').on('click', function () {
        $('#ModalProduccionAnterior').addClass('hidden');
        $('#ModalProduccionAnterior').removeClass('flex');
        let fechaProduccionAnterior = $('#fechaProduccionAnterior').val();
        $('#fechaDeProduccion').text(fechaProduccionAnterior);
        fn_traerDatosDiasAnteriores(fechaProduccionAnterior);
        $('#contenedorGraficaActual').toggle('flex hidden');
        $('#contenedorGraficaAnterior').toggle('flex hidden');
        $('#btnRetrocesoProduccionAnterior').toggle('hidden');
        $('#btnProduccionAnterior').toggle('hidden');
    });

    $('#btnRetrocesoProduccionAnterior').on('click', function () {
        $('#fechaDeProduccion').text("Actual");
        $('#contenedorGraficaActual').toggle('flex hidden');
        $('#contenedorGraficaAnterior').toggle('flex hidden');
        $('#btnRetrocesoProduccionAnterior').toggle('hidden');
        $('#btnProduccionAnterior').toggle('hidden');
    });

    fn_TraerClientesAgregarSaldo();
    function fn_TraerClientesAgregarSaldo() {
        $.ajax({
            url: '/fn_consulta_TraerClientesAgregarSaldo',
            method: 'GET',
            success: function (response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
    
                    // Objeto para almacenar los resultados agrupados por codigoCli
                    let resultadosAgrupados = {};
                    let contador = 0;
    
                    // Iterar sobre los objetos y agrupar por codigoCli
                    response.forEach(function (obj) {
                        let codigoCli = obj.codigoCli;
    
                        if (!resultadosAgrupados[codigoCli]) {
                            resultadosAgrupados[codigoCli] = {
                                nombreCompleto: obj.nombreCompleto,
                                codigoCli: codigoCli,
                                deudaTotal: 0,
                                cantidadPagos: 0,
                                ventaDescuentos: 0,
                                limitEndeudamiento: 0
                            };
                        }
    
                        // Sumar las propiedades correspondientes
                        resultadosAgrupados[codigoCli].deudaTotal += parseFloat(obj.deudaTotal);
                        resultadosAgrupados[codigoCli].cantidadPagos += parseFloat(obj.cantidadPagos);
                        resultadosAgrupados[codigoCli].ventaDescuentos += parseFloat(obj.ventaDescuentos);
                        resultadosAgrupados[codigoCli].limitEndeudamiento += parseFloat(obj.limitEndeudamiento);
                    });
    
                    // Iterar sobre los resultados agrupados y mostrar en la tabla
                    Object.values(resultadosAgrupados).forEach(function (obj) {
                        let total = obj.deudaTotal - obj.cantidadPagos + obj.ventaDescuentos;
    
                        // Crear una nueva fila
                        if (total >= parseFloat(obj.limitEndeudamiento)) {
                            contador++;
                        }
                    });
                    if (contador > 0){
                        Swal.fire({
                            icon: 'warning',
                            title: 'Deudas Excesivas',
                            text: (contador === 1 ? 'Se encontró 1 deuda excesiva.' : 'Se encontrarón '+contador + ' deudas excesivas.'),
                            footer: '<a href="/agregar_saldo">Ir a revisar</a>'
                        });                        
                    }
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
    
            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    }

    function fn_TraerClientesAgregarSaldo(){
        $.ajax({
            url: '/fn_consulta_TraerClientesAgregarSaldo',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyAgregarSaldo = $('#bodyAgregarSaldo');
                    tbodyAgregarSaldo.empty();
                    let contador = 0;

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        let total = parseFloat(obj.deudaTotal) - parseFloat(obj.cantidadPagos) + parseFloat(obj.ventaDescuentos);
                        
                        if (total >= parseFloat(obj.limitEndeudamiento)) {
                            contador++;
                        }
                    });
                    if (contador > 0){
                        var rutaDeseada = '/agregar_saldo';
                        if ($.inArray(rutaDeseada, hrefSubMenus) !== -1) {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Deudas Excesivas',
                                text: (contador === 1 ? 'Se encontró 1 deuda excesiva.' : 'Se encontrarón '+contador + ' deudas excesivas.'),
                                footer: '<a href="/agregar_saldo">Ir a revisar</a>'
                            });                        
                        }
                    }
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