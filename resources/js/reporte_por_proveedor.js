import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const fechaHoy = new Date().toISOString().split('T')[0];

    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReportePorProveedor').val(fechaHoy);
    $('#fechaHastaReportePorProveedor').val(fechaHoy);

    fn_ConsultarProveedor()

    function fn_ConsultarProveedor() {
        $.ajax({
        url: '/fn_consulta_ConsultarProveedor',
            method: 'GET',
            success: function (response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyProveedor = $('#bodyReportePorProveedor');
                    tbodyProveedor.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        // Crear una nueva fila
                        let nuevaFila = $('<tr class="editReporteProveedor bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                        let promedio = parseFloat(obj.pesoGuia)/parseFloat(obj.cantidadGuia);
                        let totalAPagar = parseFloat(obj.precioGuia)*parseFloat(obj.pesoGuia);
                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idGuia));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.numGuia));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.nombreEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.cantidadGuia == 1 ? `${obj.cantidadGuia} Ud.` : `${obj.cantidadGuia} Uds.`));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.pesoGuia+" Kg."));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(promedio));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.precioGuia));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text("S/. "+totalAPagar));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white flex justify-center items-center gap-2">').append($('<button class="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-lg">').html("<i class='bx bxs-edit text-base'></i>")).append($('<button class="bg-red-600 hover:bg-red-700 p-2 rounded-lg">').html("<i class='bx bxs-trash text-base' ></i>"))
                        );
                        
                        // Agregar la nueva fila al tbody
                        tbodyProveedor.append(nuevaFila);
                    });
                    if (response.length == 0) {
                        tbodyProveedor.html(`<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
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