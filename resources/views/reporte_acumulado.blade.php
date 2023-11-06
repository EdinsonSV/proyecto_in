@vite(['resources/js/reporte_acumulado.js'])
@extends('aside')
@section('titulo', 'Reporte Acumulado')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Reporte Acumulado --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Reporte Acumulado</h4>
        <div class="flex flex-col gap-4 md:mx-5 my-0">
            <div class="flex gap-x-24 gap-4 w-full flex-col md:flex-row flex-wrap">
                <div class="flex flex-col justify-center">
                    <label for="fechaDesdeReporteAcumulado" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                    <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeReporteAcumulado">
                </div>
                <div class="flex flex-col justify-center">
                    <label for="fechaHastaReporteAcumulado" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                    <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaReporteAcumulado">
                </div>
                <div class="flex items-end md:justify-end">
                    <button class="cursor-pointer w-full uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center items-center gap-2" type="submit" autocomplete="off" id="filtrarReporteAcumuladoDesdeHasta"><i class='bx bx-search-alt text-lg' ></i>Buscar</button>
                </div>
            </div>
        </div>
        <div class="relative rounded-lg overflow-auto max-h-[500px] aside_scrollED md:m-5 mt-5">
            <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaReporteAcumulado">
                <thead id="headerReporteAcumulado" class="bg-blue-600 text-gray-50 sticky top-0 text-xs uppercase">
                    <tr class="h-10">
                        <th class="px-4 whitespace-nowrap">Fecha</th>
                        <th class="px-4 whitespace-nowrap">POLLO YUGO</th>
                        <th class="px-4 whitespace-nowrap">POLLO PERLA</th>
                        <th class="px-4 whitespace-nowrap">POLLO CHIMU</th>
                        <th class="px-4 whitespace-nowrap">POLLO XX</th>
                    </tr>
                </thead>
                <tbody id="bodyReporteAcumulado">
                    <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="5" class="text-center">No hay datos</td></tr>
                </tbody>
            </table>
        </div>
        {{-- Termina contenedor Reporte Acumulado --}}
    </div>
</main>
@endsection