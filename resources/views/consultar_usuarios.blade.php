@vite(['resources/js/consultar_usuarios.js'])
@extends('aside')
@section('titulo', 'Consultar Usuarios')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-gray-100 dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Registrar Clientes --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Consultar Usuarios</h4>
        {{-- Termina contenedor Registrar Clientes --}}
    </div>
</main>
@endsection