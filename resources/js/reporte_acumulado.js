import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const fechaHoy = new Date().toISOString().split('T')[0];

    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReporteAcumulado').val(fechaHoy);
    $('#fechaHastaReporteAcumulado').val(fechaHoy);

    fn_TraerReporteAcumulado(fechaHoy,fechaHoy);

    fn_declarar_especies();

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

    $('#filtrarReporteAcumuladoDesdeHasta').on('click', function () {
        let fechaDesde = $('#fechaDesdeReporteAcumulado').val();
        let fechaHasta = $('#fechaHastaReporteAcumulado').val();
        fn_TraerReporteAcumulado(fechaDesde,fechaHasta);

    });

    function fn_TraerReporteAcumulado(fechaDesde, fechaHasta) {
        $.ajax({
            url: '/fn_consulta_TraerReporteAcumulado',
            method: 'GET',
            data: {
                fechaDesde: fechaDesde,
                fechaHasta: fechaHasta,
            },
            success: function (response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyReporteAcumulado = $('#bodyReporteAcumulado');
                    tbodyReporteAcumulado.empty();

                    let fechasUnicas = new Set();
                    let sinRepetidos = response.filter((valorActual) => {
                        let fechaInicioString = JSON.stringify(valorActual.fechaRegistroPes);
                        if (!fechasUnicas.has(fechaInicioString)) {
                            fechasUnicas.add(fechaInicioString);
                            return true;
                        }
                        return false;
                    });

                    let nuevaFila = "";

                    let totalPesoPrimerEspecie = 0.00;
                    let totalPesoSegundaEspecie = 0.00;
                    let totalPesoTerceraEspecie = 0.00;
                    let totalPesoCuartaEspecie = 0.00;

                    // Iterar sobre los objetos y mostrar sus propiedades
                    sinRepetidos.forEach(function(item) {

                        let diaPesoPrimerEspecie = 0.00;
                        let diaPesoSegundaEspecie = 0.00;
                        let diaPesoTerceraEspecie = 0.00;
                        let diaPesoCuartaEspecie = 0.00;

                        response.forEach(function (obj) {

                            if (item.fechaRegistroPes === obj.fechaRegistroPes) {

                                let idEspecie = parseInt(obj.idEspecie)
                                let cantidadPes = parseInt(obj.cantidadPes)
                                let pesoNetoPes = parseFloat(obj.pesoNetoPes)
                                let valorConversion = parseFloat(obj.valorConversion)
                                let idGrupo = parseInt(obj.idGrupo)

                                if (idEspecie == 1) {
                                    console.log("Ingreso");
                                    if (idGrupo == 1){
                                        diaPesoPrimerEspecie += pesoNetoPes
                                        totalPesoPrimerEspecie += pesoNetoPes
                                    }else if (idGrupo == 2){
                                        diaPesoPrimerEspecie += pesoNetoPes/valorConversion
                                        totalPesoPrimerEspecie += pesoNetoPes/valorConversion
                                    }
                                }else if (idEspecie == 2) {
                                    if (idGrupo == 1){
                                        diaPesoSegundaEspecie += pesoNetoPes
                                        totalPesoSegundaEspecie += pesoNetoPes
                                    }else if (idGrupo == 2){
                                        diaPesoSegundaEspecie += pesoNetoPes/valorConversion
                                        totalPesoSegundaEspecie += pesoNetoPes/valorConversion
                                    }
                                }else if (idEspecie == 3) {
                                    if (idGrupo == 1){
                                        diaPesoTerceraEspecie += pesoNetoPes
                                        totalPesoTerceraEspecie += pesoNetoPes
                                    }else if (idGrupo == 2){
                                        diaPesoTerceraEspecie += pesoNetoPes/valorConversion
                                        totalPesoTerceraEspecie += pesoNetoPes/valorConversion
                                    }
                                }else if (idEspecie == 4) {
                                    if (idGrupo == 1){
                                        diaPesoCuartaEspecie += pesoNetoPes
                                        totalPesoCuartaEspecie += pesoNetoPes
                                    }else if (idGrupo == 2){
                                        diaPesoCuartaEspecie += pesoNetoPes/valorConversion
                                        totalPesoCuartaEspecie += pesoNetoPes/valorConversion
                                    }
                                }
                            }
                        });

                        nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(item.fechaRegistroPes));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoPrimerEspecie).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoSegundaEspecie).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoTerceraEspecie).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoCuartaEspecie).toFixed(2)));
                        
                        // Agregar la nueva fila al tbody
                        tbodyReporteAcumulado.append(nuevaFila);
                    });

                    nuevaFila = $('<tr class="bg-white dark:bg-gray-800 h-0.5">');
                    nuevaFila.append($('<td class="dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                    nuevaFila.append($('<td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="4">').text(""));
                    tbodyReporteAcumulado.append(nuevaFila);
                    nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text("Totales :"));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoPrimerEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoSegundaEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoTerceraEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoCuartaEspecie).toFixed(2)));
                    tbodyReporteAcumulado.append(nuevaFila);
                        
                    if (response.length == 0) {
                        tbodyReporteAcumulado.html(`<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
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

});