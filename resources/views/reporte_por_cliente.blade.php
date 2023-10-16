@vite(['resources/js/reporte_por_cliente.js'])
@extends('aside')
@section('titulo', 'Reporte por Cliente')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-[0_0px_20px_0px_rgba(0,0,0,0.2)]">
        {{-- Inicia contenedor Reporte por Cliente --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Reporte por Cliente</h4>
        <div class="overflow-x-auto m-5 mt-0 relative" id="DivReportePorCliente">
            <div class="flex flex-col gap-5">
                <div class="flex justify-center items-start flex-col relative">
                    <label for="idClientePorReporte" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                    <div class="flex max-w-xs w-full">
                        <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                            </svg>
                        </span>
                        <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idClientePorReporte" autocomplete="off" id="idClientePorReporte" placeholder="Ingrese Nombre de Cliente">
                    </div>

                    <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                    <label id="selectedIdCliente" class="hidden" val=""></label>
                    <label id="selectedCodigoCli" class="hidden" val=""></label>

                    <!-- Contenedor para las sugerencias -->
                    <div id="contenedorClientes" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-50 top-full left-0 bg-gray-800 border rounded hidden outline-none">
                        <!-- Aquí se mostrarán las sugerencias -->
                    </div>
                </div>
                <div class="flex gap-x-24 gap-4 w-full flex-col md:flex-row">
                    <div class="flex flex-col justify-center">
                        <label for="fechaDesdeReportePorCliente" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeReportePorCliente">
                    </div>
                    <div class="flex flex-col justify-center">
                        <label for="fechaHastaReportePorCliente" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaReportePorCliente">
                    </div>
                </div>
                <div class="flex gap-2 justify-between w-full flex-col md:flex-row">
                    <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg" id="btnBuscarReportePorCliente"><i class='bx bx-search-alt'></i> Buscar</button>
                    <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg" id="btnExportarExcelReportePorCliente"><i class="fa-regular fa-file-excel"></i> Exportar a Excel</button>
                </div>
            </div>
        </div>
        {{-- Tabla --}}
        <div class="relative overflow-auto rounded-lg mx-5 max-h-[500px] aside_scrollED">
            <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaReportePorCliente">
                <thead id="headerReportePorCliente" class="bg-blue-600 text-gray-50 sticky top-0">
                    <tr class="h-10">
                        <th class="hidden">Id</th>
                        <th class="px-4 font-medium">DIA</th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">HORA</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">PRESENTACIÓN</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">CANTIDAD</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">PESO REGISTRADO (Kg.)</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">PROMEDIO</h5></th>
                    </tr>
                </thead>
                <tbody id="bodyReportePorCliente">
                    <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="7" class="text-center">No hay datos</td></tr>
                </tbody>
            </table>
        </div>
        {{-- Termina contenedor Reporte por Cliente --}}
    </div>
</main>
@endsection