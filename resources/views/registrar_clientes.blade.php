@vite(['resources/js/registrar_clientes.js'])
@extends('aside')
@section('titulo', 'Registrar Clientes')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-[0_0px_20px_0px_rgba(0,0,0,0.2)]">
        {{-- Inicia contenedor Registrar Clientes --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Producción Actual</h4>
        <div class="p-5 pt-0 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4" id="registroClientes">
                    <div class="flex flex-col md:flex-row md:items-center md:h-12">
                        <div class="text-sm h-12 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-[#111B22] rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max px-2">Seleccione Tipo :</h4>
                        </div>
                        <select class="validarCampo w-full h-12 uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg md:rounded-l-none" name="tipoPollo" id="tipoPollo">
                        </select>
                    </div>
                    <div class="flex md:flex-row md:items-center md:h-12">
                        <div class="text-sm h-12 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-[#111B22] rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max px-2">Codigo :</h4>
                        </div>
                        <input disabled class="validarCampo w-full h-12 uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="codigoCli" autocomplete="off" id="codigoCli" value="">
                    </div>
                    <div class="flex flex-col md:flex-row md:items-center md:h-12">
                        <div class="text-sm h-12 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-[#111B22] rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max px-2">Seleccione Zona :</h4>
                        </div>
                        <select class="validarCampo w-full uppercase h-12 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" name="zonaPollo" id="zonaPollo">
                        </select>
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <select class="validarCampo w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg" name="tipoDocumentoCli" id="tipoDocumentoCli">
                        </select>                         
                    </div>
                    <div class="flex md:flex-row md:items-center">
                        <div class="text-sm md:h-[calc(47px)] flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-[#111B22] h-full rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max px-2">N° de Documento :</h4>
                        </div>
                        <input class="validarCampo w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg h-full" type="text" name="documentoCli" autocomplete="off" id="documentoCli" value="" disabled >
                        <button class="hidden items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-[#111B22] h-full rounded-r-lg w-20" id="especialBuscarPorDNI"><i class="bx bx-search-alt text-gray-900 dark:text-gray-300 font-medium text-xl" ></i></button>
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="nombresCli" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Nombres</label>
                        <input class="validarCampo w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="nombresCli" autocomplete="off" id="nombresCli">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="apellidoPaternoCli" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Apellido Paterno</label>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="apellidoPaternoCli" autocomplete="off" id="apellidoPaternoCli">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="apellidoMaternoCli" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Apellido Materno</label>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="apellidoMaternoCli" autocomplete="off" id="apellidoMaternoCli">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="contactoCli" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Numero Celular</label>
                        <input class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="contactoCli" autocomplete="off" id="contactoCli">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="direccionCli" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Dirección</label>
                        <input class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="direccionCli" autocomplete="off" id="direccionCli">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="comentarioCli" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Comentario</label>
                        <textarea class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="comentarioCli" autocomplete="off" id="comentarioCli"></textarea>
                    </div>
                </div>
                <div class="flex p-5 pt-0 justify-between">
                    <div>
                        
                    </div>
                    <div class="flex items-center">
                        <input class="cursor-pointer w-56 uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit" value="Registrar" autocomplete="off" id="registrar_usuario_submit">
                    </div>
                </div>
        {{-- Termina contenedor Registrar Clientes --}}
    </div>
</main>
@endsection