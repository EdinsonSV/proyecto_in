@vite(['resources/js/reporte_de_pagos.js'])
@extends('aside')
@section('titulo', 'Reporte de Pagos')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-[0_0px_20px_0px_rgba(0,0,0,0.2)]">
        {{-- Inicia contenedor Reporte de Pagos --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Reporte de Pagos</h4>
        <div class="flex justify-between items-center gap-4 flex-col md:flex-row flex-wrap">
            <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600" type="submit" autocomplete="off" id="registrar_agregarPago_submit"><i class='bx bx-dollar-circle text-lg'></i><h5 class="min-w-max">Agregar Pago</h5></button>
            <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-red-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-red-600" type="submit" autocomplete="off" id="registrar_agregarDescuento_submit"><i class='bx bxs-discount text-lg'></i><h5 class="min-w-max">Agregar Descuento</h5></button>
            <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-blue-700" type="submit" autocomplete="off" id="registrar_FiltrarPorCliente_submit"><i class='bx bxs-user-detail text-lg'></i><h5 class="min-w-max">Filtrar por Cliente</h5></button>
        </div>
        <div class="flex justify-start md:items-end mt-5 gap-x-14 gap-y-4 flex-col md:flex-row flex-wrap">
            <div class="flex gap-x-14 gap-y-4 flex-col md:flex-row">
                <div class="flex flex-col justify-center">
                    <label for="fechaDesdeReporteDePagos" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                    <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeReporteDePagos">
                </div>
                <div class="flex flex-col justify-center">
                    <label for="fechaHastaReporteDePagos" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                    <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaReporteDePagos">
                </div>
            </div>
            <button class="flex gap-2 justify-center items-center cursor-pointer uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-blue-700" type="submit" autocomplete="off" id="filtrar_pagos_submit"><i class='bx bx-search-alt text-lg' ></i> Buscar</button>
        </div>
        {{-- Termina contenedor Reporte de Pagos --}}  
    </div>
</main>
@endsection