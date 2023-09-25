@vite(['resources/js/valor_conversion.js'])
@extends('aside')
<title>Registrar Clientes</title>
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
                    <h3 class="text-gray-900 font-bold text-xl dark:text-gray-300">Configurar valor de conversión</h3>
                </div>
                <div class="p-5 pt-0" id="DivValoresDeConversion">
                    <table class="text-gray-900 dark:text-gray-50 w-full select-none" id="tablaValorConversion">
                        <thead>
                            <tr class="h-10 bg-blue-500 text-gray-50">
                                <th class="hidden">Id</th>
                                <th class="px-4 font-medium text-sm border border-gray-400">Nombre de Cliente</th>
                                <th class="px-4 font-medium text-sm border border-gray-400">Valor de Conversión</th>
                            </tr>
                        </thead>
                        <tbody id="valoresDeConversiones">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</main>
@extends('footer')

<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <div
                class=" transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div class="flex flex-col">
                        <div class="flex items-start justify-between border-b rounded-t dark:border-gray-600 p-2">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Valor de Conversión</h3>
                        </div>
                        <div class="mt-2">
                            <p class="text-sm text-gray-500">Are you sure you want to deactivate your account? All
                                of your data will be permanently removed. This action cannot be undone.</p>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button"
                        class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
                    <button type="button"
                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</div>
