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
                    <div class="flex flex-col gap-4">
                        <div class="flex justify-center items-start flex-col">
                            <label for="idClientePorReporte" class="mb-2 text-lg font-medium text-gray-900 dark:text-white">Cliente :</label>
                            <input class="w-56 uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idClientePorReporte" autocomplete="off" id="idClientePorReporte">
                        </div>
                        <div class="flex gap-4 w-full">
                            <div class="flex flex-col justify-center">
                                <label for="fechaDesdeReportePorCliente" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                                <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeReportePorCliente">
                            </div>
                            <div class="flex flex-col justify-center">
                                <label for="fechaHastaReportePorCliente" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                                <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaReportePorCliente">
                            </div>
                        </div>
                        <div>
                            <button class="text-base py-2 px-5 bg-blue-500 text-gray-50 rounded-lg"><i class='bx bx-search-alt' id="btnBuscarReportePorCliente"></i> Buscar</button>
                            <button class="text-base py-2 px-5 bg-blue-500 text-gray-50 rounded-lg"><i class="fa-regular fa-file-excel" id="btnExportarExcelReportePorCliente"></i> Exportar a Excel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
@extends('footer')