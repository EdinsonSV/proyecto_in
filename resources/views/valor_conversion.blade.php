@vite(['resources/js/valor_conversion.js'])
@extends('aside')
<title>Registrar Clientes</title>
<link rel="icon" type="image/x-icon" href="{{ asset('img/logousers.ico') }}">
<main class="w-full md:w-[calc(100%-3.73rem)] ml-auto min-h-[calc(100%-120px)] mb-12 2xl:w-[calc(100%-256px)]">
    <div class="2xl:container mx-auto">
        <div class="h-16 border-b border-gray-300/40 dark:border-gray-700 flex items-center justify-between fixed  md:relative  top-0 w-full dark:bg-[#0D161C]">
            <div class="flex items-center">
                <h3 class="text-gray-900 uppercase dark:text-gray-300 font-semibold ml-7 lg:ml-12" id="mensaje_bienvenida">Buenos dias</h3>
                <span class="text-gray-900 dark:text-gray-300 font-semibold">&nbsp;{{auth()->user()->nombresUsu}}</span>
            </div>
            <div class="block md:hidden">
                <i id="toogle_bard" class="fa-solid fa-bars mr-8 text-gray-900 uppercase dark:text-gray-300 cursor-pointer text-lg"></i>
            </div>
        </div>
        <div class="mx-6 lg:mx-12 mt-[calc(1.865rem)] overflow-x-auto bg-white dark:bg-[#111B22]">
            <div class="flex-col rounded-lg border border-gray-300/40 dark:border-gray-700 shadow-lg shadow-slate-200 dark:shadow-slate-800 ">
                <div class="flex items-center justify-items-start p-5">
                    <h3 class="text-gray-900 font-bold text-xl dark:text-gray-300">Configurar valor de conversión</h3>
                </div>
                <div class="p-5 pt-0" id="DivValoresDeConversion">
                    <table class="text-gray-900 dark:text-gray-50 w-full select-none">
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