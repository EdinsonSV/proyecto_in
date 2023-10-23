@vite(['resources/js/reporte_por_proveedor.js'])
@extends('aside')
@section('titulo', 'Reporte por Proveedor')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-gray-100 dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Reporte por Proveedor --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Reporte por Proveedor</h4>
        <div class="overflow-x-auto md:mx-5 mt-0 mb-5 relative" id="DivReportePorProveedor">
            <div class="flex flex-col gap-5">
                <div class="flex gap-x-24 gap-4 w-full flex-col md:flex-row">
                    <div class="flex flex-col justify-center">
                        <label for="fechaDesdeReportePorProveedor" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeReportePorProveedor">
                    </div>
                    <div class="flex flex-col justify-center">
                        <label for="fechaHastaReportePorProveedor" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaReportePorProveedor">
                    </div>
                </div>
                <div class="flex gap-4 justify-between w-full flex-col md:flex-row">
                    <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg" id="btnBuscarReportePorProveedor"><i class='bx bx-search-alt'></i> Buscar</button>
                    <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg" id="btnExportarExcelReportePorProveedor"><i class="bx bxs-plus-circle"></i> Agregar Guias</button>
                </div>
            </div>
        </div>
        {{-- Tabla --}}
        <div class="relative overflow-auto rounded-lg md:mx-5 md:mb-5 max-h-[500px] aside_scrollED">
            <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaReportePorProveedor">
                <thead id="headerReportePorProveedor" class="bg-blue-600 text-gray-50 sticky top-0">
                    <tr class="h-10">
                        <th class="hidden">Id</th>
                        <th class="px-4 font-medium">N° GUIA</th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">ESPECIE</th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">CANTIDAD</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">PESO (Kg.)</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">PROMEDIO</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">PRECIO</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">TOTAL (S/.)</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">OPCIONES</h5></th>
                    </tr>
                </thead>
                <tbody id="bodyReportePorProveedor">
                    <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="7" class="text-center">No hay datos</td></tr>
                </tbody>
            </table>
        </div>
        {{-- Termina contenedor Reporte por Proveedor --}}
    </div>
</main>
@endsection