@vite(['resources/js/reporte_por_cliente.js'])
@extends('aside')
<title>Reporte por Cliente</title>
<link rel="icon" type="image/x-icon" href="{{ asset('img/logousers.ico') }}">
<main class="w-full md:w-[calc(100%-3.73rem)] ml-auto min-h-[calc(100%-120px)] mb-12 2xl:w-[calc(100%-256px)]">
    <div class="2xl:container mx-auto">
        <div
            class="h-16 border-b border-gray-300/40 dark:border-gray-700 flex items-center justify-between fixed  md:relative  top-0 w-full dark:bg-[#0D161C]">
            <div class="flex items-center">
                <h3 class="text-gray-900 uppercase dark:text-gray-300 font-semibold ml-7 lg:ml-12"
                    id="mensaje_bienvenida">Buenos dias</h3>
                <span
                    class="text-gray-900 dark:text-gray-300 font-semibold">&nbsp;{{ auth()->user()->nombresUsu }}</span>
            </div>
            <div class="block md:hidden">
                <i id="toogle_bard"
                    class="fa-solid fa-bars mr-8 text-gray-900 uppercase dark:text-gray-300 cursor-pointer text-lg"></i>
            </div>
        </div>
        <div class="mx-6 lg:mx-12 mt-[calc(1.865rem)] overflow-x-auto bg-white dark:bg-[#111B22]">
            <div
                class="flex-col rounded-lg border border-gray-300/40 dark:border-gray-700 shadow-lg shadow-slate-200 dark:shadow-slate-800 ">
                <div class="flex items-center justify-items-start p-5">
                    <h3 class="text-gray-900 font-semibold text-xl dark:text-gray-300">Reporte por Cliente</h3>
                </div>
                <div class="overflow-x-auto m-5 mt-0" id="DivReportePorCliente">
                    <div class="flex flex-col gap-5">
                        <div class="flex justify-center items-start flex-col relative">
                            <label for="idClientePorReporte" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                            <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idClientePorReporte" autocomplete="off" id="idClientePorReporte">
                        
                            <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                            <label id="selectedIdCliente" class="hidden"></label>
                            <label id="selectedCodigoCli" class="hidden"></label>
                        
                            <!-- Contenedor para las sugerencias -->
                            <div id="contenedorClientes" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-50 top-full left-0 bg-gray-800 border rounded hidden outline-none">
                                <!-- Aquí se mostrarán las sugerencias -->
                            </div>
                        </div>                        
                        <div class="flex gap-x-24 w-full flex-col md:flex-row">
                            <div class="flex flex-col justify-center">
                                <label for="fechaDesdeReportePorCliente" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                                <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeReportePorCliente">
                            </div>
                            <div class="flex flex-col justify-center">
                                <label for="fechaHastaReportePorCliente" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                                <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaReportePorCliente">
                            </div>
                        </div>
                        <div class="flex justify-between w-full">
                            <button class="text-base py-2 px-5 bg-blue-500 text-gray-50 rounded-lg"><i class='bx bx-search-alt' id="btnBuscarReportePorCliente"></i> Buscar</button>
                            <button class="text-base py-2 px-5 bg-blue-500 text-gray-50 rounded-lg"><i class="fa-regular fa-file-excel" id="btnExportarExcelReportePorCliente"></i> Exportar a Excel</button>
                        </div>
                    </div>
                    {{-- Tabla --}}
                    <table class="text-gray-900 dark:text-gray-50 w-full select-none mt-5" id="tablaReportePorCliente">
                        <thead id="headerReportePorCliente">
                            <tr class="h-10 bg-blue-500 text-gray-50">
                                <th class="hidden">Id</th>
                                <th class="px-4 font-medium text-sm border border-gray-400">DIA</th>
                                <th class="px-4 font-medium text-sm border border-gray-400"><h5 class="min-w-max">HORA</h5></th>
                                <th class="px-4 font-medium text-sm border border-gray-400"><h5 class="min-w-max">PRESENTACIÓN</h5></th>
                                <th class="px-4 font-medium text-sm border border-gray-400"><h5 class="min-w-max">CANTIDAD</h5></th>
                                <th class="px-4 font-medium text-sm border border-gray-400"><h5 class="min-w-max">PESO REGISTRADO (Kg.)</h5></th>
                                <th class="px-4 font-medium text-sm border border-gray-400"><h5 class="min-w-max">PROMEDIO</h5></th>
                            </tr>
                        </thead>
                        <tbody id="bodyReportePorCliente">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</main>
@extends('footer')