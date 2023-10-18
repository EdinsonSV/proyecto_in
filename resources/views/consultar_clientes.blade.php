@vite(['resources/js/consultar_clientes.js'])
@extends('aside')
@section('titulo', 'Consultar Clientes')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-[0_0px_20px_0px_rgba(0,0,0,0.2)]">
        {{-- Inicia contenedor Registrar Clientes --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Consultar Clientes</h4>
        {{-- Tabla --}}
        <div class="flex justify-between items-center relative m-5 mt-0 flex-col gap-4 lg:flex-row">
            <div class="flex w-full lg:max-w-xs">
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <i class='bx bxs-user-circle text-xl'></i>
                </span>
                <input class="lg:max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="filtrarConsultarClientes" autocomplete="off" id="filtrarConsultarClientes" placeholder="Ingrese Nombre de Cliente">
            </div>
            <div class="flex flex-col md:flex-row md:items-center w-full lg:max-w-xs lg:h-10">
                <div class="h-10 text-sm flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-[#111B22] rounded-t-lg md:rounded-none md:rounded-l-lg">
                    <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max px-2">Seleccione Tipo :</h4>
                </div>
                <select class="w-full h-10 uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-b-lg md:rounded-none md:rounded-r-lg" name="tipoPolloConsultarClientes" id="tipoPolloConsultarClientes">
                </select>
            </div>
        </div>
        <div id ="tblConsultarClientes" class="relative overflow-auto m-5 rounded-lg max-h-[600px] aside_scrollED"> 
            <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaConsultarClientes">
                <thead id="headerConsultarClientes" class="bg-blue-600 text-gray-50 sticky top-0 text-sm">
                    <tr class="h-10">
                        <th class="px-4 hidden">ID</th>
                        <th class="px-4">Codigo</th>
                        <th class="px-4"><h5 class="min-w-max">Nombres y Apellidos</h5></th>
                        <th class="px-4"><h5 class="min-w-max">Documento</h5></th>
                        <th class="px-4"><h5 class="min-w-max">Nro Doc.</h5></th>
                        <th class="px-4"><h5 class="min-w-max">Telefono</h5></th>
                        <th class="px-4"><h5 class="min-w-max">Direccion</h5></th>
                        <th class="px-4"><h5 class="min-w-max">Zona</h5></th>
                        <th class="px-4"><h5 class="min-w-max">Estado</h5></th>
                    </tr>
                </thead>
                <tbody id="bodyConsultarClientes">
                    <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="9" class="text-center">No hay datos</td></tr>
                </tbody>
            </table>
        </div>
        {{-- Termina contenedor Consultar por Cliente --}}
    </div>
        {{-- Termina contenedor Consultar Clientes --}}
    </div>
    
</main>
@endsection