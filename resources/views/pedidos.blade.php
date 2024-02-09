@vite(['resources/js/pedidos.js'])
@extends('aside')
@section('titulo', 'Pedidos')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Pedidos --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Pedidos</h4>
        <div class="flex justify-between items-center gap-4 flex-col md:flex-row flex-wrap md:mx-5 mt-0 mb-5">
            <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-blue-700" type="submit" autocomplete="off" id="registrarPedidoCliente"><i class='bx bx-list-plus text-lg'></i><h5 class="min-w-max">Agregar Pedido</h5></button>
            <div class="flex gap-2">
                <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaBuscarPedidos">
                <button class="flex gap-2 justify-center items-center cursor-pointer uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-blue-700" type="submit" autocomplete="off"><i class='bx bx-search-alt text-lg'></i></button>
            </div>
        </div>
        <hr class="md:mx-5">
        <div class="flex w-full lg:max-w-xs md:px-5 my-5">
            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <i class='bx bxs-user-circle text-xl'></i>
            </span>
            <input class="lg:max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="filtrarClientePedidos" autocomplete="off" id="filtrarClientePedidos" placeholder="Ingrese Nombre de Cliente">
        </div>
        <div class="relative overflow-auto max-h-[500px] aside_scrollED shadow-md rounded-lg md:mx-5">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" id="tablaPedidos">
                <thead class="text-xs text-gray-100 uppercase bg-blue-600 sticky top-0" id="headerPedidos">
                    <tr>
                        <th class="hidden">Id</th>
                        <th class="p-4" data-column="nombres">
                            <h5 class="whitespace-nowrap flex items-center">Nombre de Cliente<button><svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/></svg></button></h5>
                        </th>
                        <th class="p-4 text-center whitespace-nowrap">POLLO YUGO</th>
                        <th class="p-4 text-center whitespace-nowrap">POLLO PERLA</th>
                        <th class="p-4 text-center whitespace-nowrap">POLLO CHIMU</th>
                        <th class="p-4 text-center whitespace-nowrap">POLLO XX</th>
                    </tr>
                </thead>
                <tbody id="bodyPedidos">
                    <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="6" class="text-center">No hay datos</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<div class="fixed inset-0 overflow-hidden z-[100] hidden" id="ModalAgregarPedido">
    <div class="flex justify-center items-center w-full min-h-screen h-full py-4 px-4 text-center">
        <!-- Fondo oscuro overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <!-- Contenido del modal -->
        <div class="absolute rounded-lg max-h-max inset-0 m-auto align-bottom bg-white dark:bg-slate-700 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
            <div class="p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Agregar Pedido</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <div class="flex justify-center items-center flex-col relative w-full h-full">
                            <div class="flex max-w-xs w-full mt-4">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <i class='bx bxs-user-circle text-xl'></i>
                                </span>
                                <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idRegistrarPedidoCliente" autocomplete="off" id="idRegistrarPedidoCliente" placeholder="Ingrese Nombre de Cliente">
                            </div>
        
                            <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                            <label id="selectedCodigoCliPedidos" class="hidden" val=""></label>
        
                            <!-- Contenedor para las sugerencias -->
                            <div id="contenedorClientesPedidos" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full m-auto bg-white dark:bg-gray-800 border rounded hidden outline-none">
                                <!-- Aquí se mostrarán las sugerencias -->
                            </div>
                        </div>
                        <div class="flex w-full justify-center items-center gap-2">
                            <input type="date" class="outline-none bg-gray-50 border max-w-xs border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="fechaAgregarPedido">
                        </div>
                        <div class="flex justify-center items-center flex-col relative w-full h-full">
                            <div class="flex max-w-xs w-full">
                                <span class="whitespace-nowrap w-40 justify-center inline-flex items-center text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-white dark:border-gray-600">
                                    POLLO YUGO
                                </span>
                                <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idRegistrarPrimerEspeciePedido" autocomplete="off" id="idRegistrarPrimerEspeciePedido" placeholder="Ingrese Cantidad">
                            </div>
                        </div>
                        <div class="flex justify-center items-center flex-col relative w-full h-full">
                            <div class="flex max-w-xs w-full">
                                <span class="whitespace-nowrap w-40 justify-center inline-flex items-center text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-white dark:border-gray-600">
                                    POLLO PERLA
                                </span>
                                <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idRegistrarPrimerEspeciePedido" autocomplete="off" id="idRegistrarPrimerEspeciePedido" placeholder="Ingrese Cantidad">
                            </div>
                        </div>
                        <div class="flex justify-center items-center flex-col relative w-full h-full">
                            <div class="flex max-w-xs w-full">
                                <span class="whitespace-nowrap w-40 justify-center inline-flex items-center text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-white dark:border-gray-600">
                                    POLLO CHIMU
                                </span>
                                <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idRegistrarPrimerEspeciePedido" autocomplete="off" id="idRegistrarPrimerEspeciePedido" placeholder="Ingrese Cantidad">
                            </div>
                        </div>
                        <div class="flex justify-center items-center flex-col relative w-full h-full">
                            <div class="flex max-w-xs w-full">
                                <span class="whitespace-nowrap w-40 justify-center inline-flex items-center text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-white dark:border-gray-600">
                                    POLLO XX
                                </span>
                                <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idRegistrarPrimerEspeciePedido" autocomplete="off" id="idRegistrarPrimerEspeciePedido" placeholder="Ingrese Cantidad">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="flex w-full justify-center items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnAgregarPedido">Registrar <i class='bx bx-plus-circle'></i></button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalAgregarPedido">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection