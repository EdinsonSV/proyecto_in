@vite(['resources/js/pesadas.js'])
@extends('aside')
@section('titulo', 'Pesadas')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Pesada --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Pesadas</h4>
        {{-- Tabla --}}
        <div class="flex flex-col gap-4 md:mx-5 my-0">
            <div class="flex gap-x-24 gap-4 w-full flex-col md:flex-row flex-wrap">
                <div class="flex flex-col justify-center">
                    <label for="fechaDesdePesadas" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                    <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdePesadas">
                </div>
                <div class="flex flex-col justify-center">
                    <label for="fechaHastaPesadas" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                    <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaPesadas">
                </div>
                <div class="flex items-end md:justify-end">
                    <button class="cursor-pointer w-full uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center items-center gap-2" type="submit" autocomplete="off" id="filtrarPesadasDesdeHasta"><i class='bx bx-search-alt text-lg' ></i>Buscar</button>
                </div>
            </div>
            <hr>
            <div class="flex w-full flex-col md:flex-row gap-x-24 gap-4">
                <div class="flex justify-center items-start flex-col relative w-full">
                    <label for="filtroNombrePesadas" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                    <div class="flex w-full md:max-w-xs">
                        <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <i class='bx bxs-user-circle text-xl'></i>
                        </span>
                        <input class="w-full md:max-w-xs uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="filtroNombrePesadas" autocomplete="off" id="filtroNombrePesadas" placeholder="Ingrese Nombre de Cliente">
                    </div>
                </div>
                <div class="flex justify-center items-start flex-col relative w-full">
                    <label for="filtroCantidadPesadas" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cantidad :</label>
                    <div class="flex w-full md:max-w-xs">
                        <input class="w-full md:max-w-xs uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="filtroCantidadPesadas" autocomplete="off" id="filtroCantidadPesadas" placeholder="Ingrese Cantidad">
                    </div>
                </div>
            </div>
            @if (auth()->user()->tipoUsu == 'Administrador')
                <div class="flex items-center justify-end py-1 rounded-xl">
                    <input id="filtrarPesadasEliminadas" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="filtrarPesadasEliminadas" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Eliminados</label>
                </div>
            @endif
        </div>
        <div id ="tblConsultarPesadas" class="relative rounded-lg overflow-auto max-h-[500px] aside_scrollED md:m-5 mt-5">
            <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaConsultarPesadas">
                <thead id="headerConsultarPesadas" class="bg-blue-600 text-gray-50 sticky top-0 text-xs uppercase">
                    <tr class="h-10">
                        <th class="px-4 hidden">ID</th>
                        <th class="px-4" data-column="nombres"><h5 class="min-w-max flex items-center">Nombre de Cliente<button><svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></button></h5></th>
                        <th class="px-4"><h5 class="min-w-max">Especie</h5></th>
                        <th class="px-4"><h5 class="min-w-max">Cantidad</h5></th>
                        <th class="px-4"><h5 class="min-w-max">Peso</h5></th>
                        <th class="px-4"><h5 class="min-w-max">Hora</h5></th>
                        <th class="px-4"><h5 class="min-w-max">Fecha</h5></th>
                        @if (auth()->user()->tipoUsu == 'Administrador')
                            <th class="px-4"><h5 class="min-w-max">Precio</h5></th>
                            <th class="px-4"><h5 class="min-w-max">Val. de Conv.</h5></th>
                        @endif
                    </tr>
                </thead>
                <tbody id="bodyConsultarPesadas">
                    <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>
                </tbody>
            </table>
        </div>
        {{-- Termina contenedor Pesadas --}}
    </div>
</main>
@endsection