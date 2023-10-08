@vite(['resources/js/register.js'])
@extends('aside')
@section('titulo', 'Registrar Usuario')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-[0_0px_20px_0px_rgba(0,0,0,0.2)]">
        {{-- Inicia contenedor Registrar Usuario --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Registrar Usuario</h4>
        <form action="/register" method="POST" class="p-5 pt-0 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4" id="registroForm">
                    @csrf
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="apellidoPaternoUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Apellido Paterno</label>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="apellidoPaternoUsu" autocomplete="off" id="apellidoPaternoUsu">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="apellidoMaternoUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Apellido Materno</label>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="apellidoMaternoUsu" autocomplete="off" id="apellidoMaternoUsu">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="nombresUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Nombres</label>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="nombresUsu" autocomplete="off" id="nombresUsu">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="dniUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">DNI</label>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="dniUsu" autocomplete="off" id="dniUsu">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="celularUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Celular</label>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="celularUsu" autocomplete="off" id="celularUsu">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="direccionUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Direccion</label>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="direccionUsu" autocomplete="off" id="direccionUsu">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="direccionUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Tipo de Usuario</label>
                        <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="tipoUsu" id="tipoUsu">
                            <option value="Invitado">Invitado</option>
                            <option value="Administrador">Administrador</option>
                        </select>                          
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="sexoUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Sexo</label>
                        <div class="w-full flex gap-4 items-center justify-center flex-wrap md:flex-nowrap">
                            <input class="uppercase hidden outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="radio" name="sexoUsu" value="M" checked id="sexoUsuM">
                            <label class="w-full text-center cursor-pointer uppercase p-2.5 text-gray-900 dark:text-gray-300 border bg-sky-600 font-semibold" for="sexoUsuM" id="sexoUsuMR">Masculino</label>
    
                            <input class="uppercase hidden outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="radio" name="sexoUsu" value="F" id="sexoUsuF">
                            <label class="w-full text-center cursor-pointer uppercase p-2.5 text-gray-900 dark:text-gray-300 border font-semibold" for="sexoUsuF" id="sexoUsuFR">Femenino</label>
                        </div>
                        <input class="hidden" type="text" value="img/hombre.png" name="rutaPerfilUsu" id="rutaPerfilUsu">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="email" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Correo Electronico</label>
                        <input class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" name="email" autocomplete="off" id="email">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="username" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Nombre de Usuario</label>
                        <input class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="username" autocomplete="new-username" id="username">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center relative">
                        <label for="password" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Contraseña</label>
                        <input class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" name="password" autocomplete="new-password" id="password">
                        <div class="flex items-center absolute top-0 right-3 translate-y-10 md:translate-y-3 xl:translate-y-6">
                            <label for="" class="" id="passwordMosl"><i class="fa-regular fa-eye-slash text-gray-900 dark:text-white cursor-pointer" id="passwordMos"></i></label>
                            <label for="" class="hidden" id="passwordOcul"><i class="fa-regular fa-eye text-gray-900 dark:text-white cursor-pointer" id="passwordOcu"></i></label>
                        </div>
                    </div>
                    <div class="flex items-center justify-end">
                        <input class="cursor-pointer w-full uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit" value="Registrar" autocomplete="off">
                    </div>
                </form>
        {{-- Termina contenedor Registrar Usuario --}}
    </div>
</main>
@endsection