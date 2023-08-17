@extends('aside')
<main class="w-[calc(100%-3.73rem)] ml-auto h-[calc(100%-72px)]">
    <div class="2xl:container mx-auto">
        <div class="h-16 border-b border-gray-300/40 dark:border-gray-700 flex items-center">
            <h3 class="text-gray-700 dark:text-gray-300 font-semibold ml-[calc(3.73rem)]" id="mensaje_bienvenida">Buenos dias</h3>
            <span class="text-gray-700 dark:text-gray-300 font-semibold">&nbsp;{{auth()->user()->nombresUsu}}</span>
        </div>
        <div class="px-6 lg:px-12 mt-[calc(1.865rem)]">
            <div class="flex-col rounded-lg border border-gray-300/40 dark:border-gray-700 shadow-lg shadow-slate-200 dark:shadow-slate-800">
                <div class="flex items-center justify-items-start p-5">
                    <h3 class="text-gray-900 font-semibold text-xl dark:text-gray-300">Registrar Usuario</h3>
                </div>
                <form action="/register" method="POST" class="p-5 pt-0 grid grid-cols-3 gap-4 auto-cols-[minmax(0,_1fr)]">
                    @csrf
                    <div class="flex gap-4 items-center">
                        <label for="apellidoPaternoUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido Paterno</label>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="apellidoPaternoUsu" autocomplete="off">
                    </div>
                    <div class="flex gap-4 items-center">
                        <label for="apellidoMaternoUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido Materno</label>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="apellidoMaternoUsu" autocomplete="off">
                    </div>
                    <div class="flex gap-4 items-center">
                        <label for="nombresUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombres</label>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="nombresUsu" autocomplete="off">
                    </div>
                    <div class="flex gap-4 items-center">
                        <label for="dniUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">DNI</label>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="dniUsu" id="dniUsu" autocomplete="off">
                    </div>
                    <div class="flex gap-4 items-center">
                        <label for="celularUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Celular</label>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="celularUsu" autocomplete="off">
                    </div>
                    <div class="flex gap-4 items-center">
                        <label for="direccionUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Direccion</label>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="direccionUsu" autocomplete="off">
                    </div>
                    <div class="flex gap-4 items-center">
                        <label for="direccionUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de Usuario</label>
                        <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="tipoUsu">
                            <option value="3">Invitado</option>
                            <option value="2">Administrador</option>
                        </select>                          
                    </div>
                    <div class="flex gap-4 items-center">
                        <label for="sexoUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Sexo</label>
                        <div class="w-full flex gap-4 items-center justify-center">
                            <input class="uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="radio" name="sexoUsu" value="M" checked id="sexoUsuM">
                            <label class="uppercase text-gray-900 dark:text-gray-300" for="sexoUsuM">Masculino</label>
    
                            <input class="uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="radio" name="sexoUsu" value="F" id="sexoUsuF">
                            <label class="uppercase text-gray-900 dark:text-gray-300" for="sexoUsuF">Femenino</label>
                        </div>
                    </div>
                    <div class="flex gap-4 items-center">
                        <label for="email" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo Electronico</label>
                        <input class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="email" autocomplete="off">
                    </div>
                    <div class="flex gap-4 items-center">
                        <label for="username" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de Usuario</label>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="username" autocomplete="off">
                    </div>
                    <div class="flex gap-4 items-center">
                        <label for="password" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" name="password" autocomplete="off">
                    </div>
                    <div class="flex items-center justify-end">
                        <input class="cursor-pointer w-full uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit" value="Registrar" autocomplete="off">
                    </div>
                </form>
            </div>
        </div>
    </div>
</main>
@extends('footer')