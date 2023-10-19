@vite(['resources/js/valor_conversion.js'])
@extends('aside')
@section('titulo', 'Valor de Conversión')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Valor de Conversión --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Valor de Conversión</h4>
        <div class="overflow-x-auto md:mx-5 mt-0 md:mb-5" id="DivValoresDeConversion">
            <div class="flex justify-between items-center relative w-full mb-5">
                <div class="flex max-w-xs w-full">
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <i class='bx bxs-user-circle text-xl'></i>
                    </span>
                    <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="filtrarValorDeConversion" autocomplete="off" id="filtrarValorDeConversion" placeholder="Ingrese Nombre de Cliente">
                </div>
            </div>
            <div class="relative overflow-x-auto shadow-md rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" id="tablaValorDeConversion">
                    <thead class="text-xs text-gray-100 uppercase bg-blue-600">
                        <tr>
                            <th class="hidden">Id</th>
                            <th class="p-4">
                                Nombre de Cliente
                            </th>
                            <th class="p-4 text-center">
                                Valor de Conversión
                            </th>
                        </tr>
                    </thead>
                    <tbody id="valoresDeConversiones">

                    </tbody>
                </table>
            </div>
        </div>
        {{-- Termina contenedor Valor de Conversión --}}
    </div>
</main>
@endsection

<div class="fixed hidden top-0 left-0 z-[100] justify-center items-center w-screen h-screen bg-gray-900 bg-opacity-75 transition-opacity cerrarModalValorDeConversion" id="ModalValorDeConversion">
    <div class="modal-content max-w-lg w-full mx-4">
        <div class="transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 shadow-xl transition-all">
            <div class=" p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Valor de Conversión</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <label for="nuevoValorDeConversion" id="idClienteValorDeConversion" class="hidden"></label>
                        <p class="text-sm text-gray-300">Nombre del cliente: <span id="nombreClienteValorDeConversion"></span></p>
                        <input class="p-2 rounded-lg text-base outline-none border-none text-center" type="text" id="nuevoValorDeConversion" autocomplete="off">
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnActualizarValorDeConversion">Actualizar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalValorDeConversion" id="cerrarModalValorDeConversionbtn">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>