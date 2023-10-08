@vite(['resources/js/valor_conversion.js'])
@extends('aside')
@section('titulo', 'Valor de Conversión')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-[0_0px_20px_0px_rgba(0,0,0,0.2)]">
        {{-- Inicia contenedor Valor de Conversión --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Producción Actual</h4>
        <div class="overflow-x-auto m-5 mt-0" id="DivValoresDeConversion">
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
        {{-- Termina contenedor Valor de Conversión --}}
    </div>
</main>
@endsection

<div class="fixed hidden top-0 left-0 z-20 justify-center items-center w-screen h-screen bg-gray-800 bg-opacity-75 transition-opacity cerrarModalValorDeConversion" id="ModalValorDeConversion">
    <div class="modal-content max-w-lg w-full mx-4">
        <div class="transform overflow-hidden rounded-lg bg-white dark:bg-slate-900 shadow-xl transition-all">
            <div class=" p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-600 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Valor de Conversión</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <label for="nuevoValorDeConversion" id="idClienteValorDeConversion" class="hidden"></label>
                        <p class="text-sm text-gray-400">Nombre del cliente: <span id="nombreClienteValorDeConversion"></span></p>
                        <input class="p-2 rounded-lg text-base outline-none border-none text-center" type="text" id="nuevoValorDeConversion" autocomplete="off">
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4 sm:px-6">
                <div class="border-t dark:border-gray-600 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto" id="btnActualizarValorDeConversion">Actualizar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalValorDeConversion" id="cerrarModalValorDeConversionbtn">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>