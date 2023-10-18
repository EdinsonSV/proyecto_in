@vite(['resources/js/pesadas.js'])
@extends('aside')
@section('titulo', 'Cambiar Pesadas')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-[0_0px_20px_0px_rgba(0,0,0,0.2)]">
        {{-- Inicia contenedor Pesada --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Cambiar Pesadas</h4>
        {{-- Tabla --}}
        <div id ="tblConsultarPesadas" class="relative overflow-auto rounded-lg mx-5 max-h-[500px] aside_scrollED">
            <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaConsultarPesadas">
                <thead id="headerConsultarPesadas" class="bg-blue-600 text-gray-50 sticky top-0">
                    <tr class="h-10">
                        <th class="px-4 font-medium hidden">ID</th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">Nombre</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">Cantidad</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">Peso</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">Hora</h5></th>
                    </tr>
                </thead>
                <tbody id="bodyConsultarPesadas">
                    <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="9" class="text-center">No hay datos</td></tr>
                </tbody>
            </table>
        </div>
        {{-- Termina contenedor Pesadas --}}
    </div>
</main>
@endsection