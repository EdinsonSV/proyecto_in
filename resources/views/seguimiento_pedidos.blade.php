@vite(['resources/js/seguimiento_pedidos.js'])
@extends('aside')
@section('titulo', 'Seguimiento Pedidos')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Seguimiento Pedidos --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Seguimiento Pedidos</h4>
        <div class="flex justify-between items-center mb-5 flex-wrap gap-4">
            <div class="flex w-full lg:max-w-xs md:px-5">
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <i class='bx bxs-user-circle text-xl'></i>
                </span>
                <input class="lg:max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="filtrarClientePedidos" autocomplete="off" id="filtrarClientePedidos" placeholder="Ingrese Nombre de Cliente">
            </div>
            <div class="flex gap-2 w-full md:w-auto">
                <input type="date" class="outline-none w-full md:w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaBuscarPedidos">
                <button class="flex gap-2 justify-center items-center cursor-pointer uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-blue-700" type="submit" autocomplete="off" id="filtrarPedidosFecha"><i class='bx bx-search-alt text-lg'></i></button>
            </div>
        </div>
        <div class="relative overflow-auto max-h-[500px] aside_scrollED shadow-md rounded-lg md:mx-5 md:mb-5">
            <table class="border-separate border-spacing-0 w-full text-sm text-left text-gray-500 dark:text-gray-400" id="tablaPedidos">
                <thead class="text-xs text-gray-100 uppercase bg-blue-600 sticky top-0" id="headerPedidos">
                    <tr>
                        <th class="hidden">Id</th>
                        <th class="p-4 text-center whitespace-nowrap border-2 border-r-[1px]"></th>
                        <th class="p-4 text-center whitespace-nowrap border-2 border-x-[1px]" colspan="3">POLLO YUGO</th>
                        <th class="p-4 text-center whitespace-nowrap border-2 border-x-[1px]" colspan="3">POLLO PERLA</th>
                        <th class="p-4 text-center whitespace-nowrap border-2 border-x-[1px]" colspan="3">POLLO CHIMU</th>
                        <th class="p-4 text-center whitespace-nowrap border-2 border-x-[1px]" colspan="3">POLLO XX</th>
                        <th class="p-4 text-center whitespace-nowrap border-2 border-x-[1px]" colspan="3">TOTAL</th>
                        <th class="p-4 text-center border-2 border-l-[1px]"></th>
                    </tr>
                    <tr>
                        <th class="hidden">Id</th>
                        <th class="p-4 border-l-2 border-b-[1px] border-r-[1px]" data-column="nombres">
                            <h5 class="whitespace-nowrap flex items-center">Nombre de Cliente<button><svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/></svg></button></h5>
                        </th>
                        <th class="p-4 text-center border-b-[1px] border-x-[1px] whitespace-nowrap bg-white text-gray-900 dark:text-white dark:bg-gray-800">Pedido</th>
                        <th class="p-4 text-center border-b-[1px] border-x-[1px] whitespace-nowrap bg-green-500">Pesado</th>
                        <th class="p-4 text-center border-b-[1px] border-x-[1px] whitespace-nowrap bg-yellow-400 text-gray-900">Falta</th>
                        <th class="p-4 text-center border-b-[1px] border-x-[1px] whitespace-nowrap bg-white text-gray-900 dark:text-white dark:bg-gray-800">Pedido</th>
                        <th class="p-4 text-center border-b-[1px] border-x-[1px] whitespace-nowrap bg-green-500">Pesado</th>
                        <th class="p-4 text-center border-b-[1px] border-x-[1px] whitespace-nowrap bg-yellow-400 text-gray-900">Falta</th>
                        <th class="p-4 text-center border-b-[1px] border-x-[1px] whitespace-nowrap bg-white text-gray-900 dark:text-white dark:bg-gray-800">Pedido</th>
                        <th class="p-4 text-center border-b-[1px] border-x-[1px] whitespace-nowrap bg-green-500">Pesado</th>
                        <th class="p-4 text-center border-b-[1px] border-x-[1px] whitespace-nowrap bg-yellow-400 text-gray-900">Falta</th>
                        <th class="p-4 text-center border-b-[1px] border-x-[1px] whitespace-nowrap bg-white text-gray-900 dark:text-white dark:bg-gray-800">Pedido</th>
                        <th class="p-4 text-center border-b-[1px] border-x-[1px] whitespace-nowrap bg-green-500">Pesado</th>
                        <th class="p-4 text-center border-b-[1px] border-x-[1px] whitespace-nowrap bg-yellow-400 text-gray-900">Falta</th>
                        <th class="p-4 text-center border-b-[1px] border-x-[1px] whitespace-nowrap bg-white text-gray-900 dark:text-white dark:bg-gray-800">Pedido</th>
                        <th class="p-4 text-center border-b-[1px] border-x-[1px] whitespace-nowrap bg-green-500">Pesado</th>
                        <th class="p-4 text-center border-b-[1px] border-x-[1px] whitespace-nowrap bg-yellow-400 text-gray-900">Falta</th>
                        <th class="p-4 text-center border-b-[1px] border-r-2 border-l-[1px]">COMENTARIO</th>
                    </tr>
                </thead>
                <tbody id="bodyPedidos">
                    <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="17" class="text-center">No hay datos</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</main>

@endsection