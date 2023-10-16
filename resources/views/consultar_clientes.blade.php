@vite(['resources/js/consultar_clientes.js'])
@extends('aside')
@section('titulo', 'Consultar Clientes')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-[0_0px_20px_0px_rgba(0,0,0,0.2)]">
        {{-- Inicia contenedor Registrar Clientes --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Consultar Clientes</h4>
        {{-- Tabla --}}
        <div id ="tblConsultarClientes" class="relative overflow-auto rounded-lg mx-5 max-h-[500px] aside_scrollED">
            <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaConsultarClientes">
                <thead id="headerConsultarClientes" class="bg-blue-600 text-gray-50 sticky top-0">
                    <tr class="h-10">
                        <th class="px-4 font-medium hidden">ID</th>
                        <th class="px-4 font-medium">Codigo</th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">Nombres y Apellidos</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">Documento</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">Nro Doc.</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">Telefono</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">Direccion</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">Zona</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">Estado</h5></th>
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