@vite(['resources/js/precios.js'])
@extends('aside')
<title>Precios</title>
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
                    <h3 class="text-gray-900 font-semibold text-xl dark:text-gray-300">Configuración de precios por cliente</h3>
                </div>
                <div class="overflow-x-auto m-5 mt-0" id="DivPreciosXPresentacion">
                    <table class="text-gray-900 dark:text-gray-50 w-full select-none" id="tablaPreciosXPresentacion">
                        <thead id="headerPreciosXPresentacion">
                            <tr class="h-10 bg-blue-500 text-gray-50">
                                <th class="hidden">Id</th>
                                <th class="px-4 font-medium text-sm border border-gray-400">Cliente</th>
                                <th class="px-4 font-medium text-sm border border-gray-400">POLLO YUGO</th>
                                <th class="px-4 font-medium text-sm border border-gray-400">POLLO PERLA</th>
                                <th class="px-4 font-medium text-sm border border-gray-400">POLLO CHIMU</th>
                                <th class="px-4 font-medium text-sm border border-gray-400">POLLO XX</th>
                            </tr>
                        </thead>
                        <tbody id="bodyPreciosXPresentacion">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</main>
@extends('footer')

<div class="fixed hidden top-0 left-0 z-20 justify-center items-center w-screen h-screen bg-gray-800 bg-opacity-75 transition-opacity cerrarModalPreciosXPresentacion" id="ModalPreciosXPresentacion">
    <div class="modal-content max-w-lg w-full mx-4">
        <div class="transform overflow-hidden rounded-lg bg-white dark:bg-slate-900 shadow-xl transition-all">
            <div class=" p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-600 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Precio por Presentación</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <label for="nuevoValorPrecioXPresentacion" id="idClientePrecioXPresentacion" class="hidden"></label>
                        <label id="idEspeciePrecioXActualizar" class="hidden"></label>
                        <p class="text-sm text-gray-900 dark:text-gray-400">Nombre del cliente: <span id="nombrePrecioXPresentacion"></span></p>
                        <p class="text-sm text-gray-900 dark:text-gray-400">Presentación: <span id="nombrePresentacionModal"></span></p>
                        <input class="p-2 rounded-lg text-base outline-none text-center border-slate-600 border-2 border-solid" type="text" id="nuevoValorPrecioXPresentacion" autocomplete="off" placeholder="Ingrese precio">
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4 sm:px-6">
                <div class="border-t dark:border-gray-600 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto" id="btnActualizarPreciosXPresentacion">Actualizar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalPreciosXPresentacion" id="cerrarModalPreciosXPresentacionbtn">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>