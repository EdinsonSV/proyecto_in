@extends('aside')
<title>Registrar Clientes</title>
<link rel="icon" type="image/x-icon" href="{{ asset('img/logousers.ico') }}">
<main class="w-full md:w-[calc(100%-3.73rem)] ml-auto min-h-[calc(100%-120px)] mb-12 2xl:w-[calc(100%-224px)]">
    <div class="2xl:container mx-auto">
        <div class="h-16 border-b border-gray-300/40 dark:border-gray-700 flex items-center justify-between fixed  md:relative  top-0 w-full dark:bg-gray-900">
            <div class="flex items-center">
                <h3 class="text-gray-700 uppercase dark:text-gray-300 font-semibold ml-7 lg:ml-12" id="mensaje_bienvenida">Buenos dias</h3>
                <span class="text-gray-700 dark:text-gray-300 font-semibold">&nbsp;{{auth()->user()->nombresUsu}}</span>
            </div>
            <div class="block md:hidden">
                <i id="toogle_bard" class="fa-solid fa-bars mr-8 text-gray-700 uppercase dark:text-gray-300 cursor-pointer text-lg"></i>
            </div>
        </div>
        <div class="mx-6 lg:mx-12 mt-[calc(1.865rem)] overflow-x-auto bg-white dark:bg-slate-900">
            <div class="flex-col rounded-lg border border-gray-300/40 dark:border-gray-700 shadow-lg shadow-slate-200 dark:shadow-slate-800 ">
                <div class="flex items-center justify-items-start p-5">
                    <h3 class="text-gray-900 font-bold text-xl dark:text-gray-300">Registrar Cliente</h3>
                </div>
                <div class="p-5 pt-0 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4" id="registroClientes">
                    <div class="flex flex-col md:flex-row md:items-center">
                        <div class="sm:text-sm md:h-[calc(47px)] flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-900 h-full rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max px-2">Seleccione Tipo :</h4>
                        </div>
                        <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" id="tipoPollo">
                            <option value="0" disabled selected>Seleccione tipo</option>
                            <option value="1">POLLO VIVO</option>
                            <option value="2">POLLO BENEFICIADO</option>
                        </select>
                    </div>
                    <div class="flex flex-col md:flex-row md:items-center">
                        <div class="sm:text-sm md:h-[calc(47px)] flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-900 h-full rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max px-2">Codigo :</h4>
                        </div>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg h-full" type="text" name="codigoUsuario" autocomplete="off" id="codigoUsuario" value="0">
                    </div>
                    <div class="flex flex-col md:flex-row md:items-center">
                        <div class="sm:text-sm md:h-[calc(47px)] flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-900 h-full rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max px-2">Seleccione Zona :</h4>
                        </div>
                        <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" id="zonaPollo">
                            <option value="0" disabled selected>Seleccione zona</option>
                            <option value="1">CASS</option>
                            <option value="2">MERCADO DE PIURA</option>
                            <option value="3">MERCADO DE CASTILLA</option>
                            <option value="4">MERCADO DE CAPULLANAS</option>
                        </select>
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="dniUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Nombres</label>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="nombresUsuario" autocomplete="off" id="nombresUsuario">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="celularUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Apellido Paterno</label>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="apellidoPaternoUsuario" autocomplete="off" id="apellidoPaternoUsuario">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="direccionUsu" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Apellido Materno</label>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="apellidoMaternoUsuario" autocomplete="off" id="apellidoMaternoUsuario">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg" name="tipoDocumento" id="tipoDocumento">
                            <option value="0" disabled selected>Seleccione Tipo de Documento</option>
                            <option value="1">DNI</option>
                            <option value="2">PASAPORTE</option>
                        </select>                         
                    </div>
                    <div class="flex flex-col md:flex-row md:items-center">
                        <div class="sm:text-sm md:h-[calc(47px)] flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-900 h-full rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max px-2">N° de Documento :</h4>
                        </div>
                        <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg h-full" type="text" name="documentoUsuario" autocomplete="off" id="documentoUsuario" value="0">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="email" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Correo Electronico</label>
                        <input class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="correoUsuario" autocomplete="off" id="correoUsuario">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="email" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Numero Celular</label>
                        <input class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="contactoUsuario" autocomplete="off" id="contactoUsuario">
                    </div>
                    <div class="flex flex-col md:flex-row gap-x-4 md:items-center">
                        <label for="email" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Dirección</label>
                        <input class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="direccionUsuario" autocomplete="off" id="direccionUsuario">
                    </div>
                </div>
                <div class="flex p-5 pt-0 justify-between">
                    <div>
                        
                    </div>
                    <div class="flex items-center">
                        <input class="cursor-pointer w-56 uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit" value="Registrar" autocomplete="off" id="registrar_usuario_submit">
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
@extends('footer')