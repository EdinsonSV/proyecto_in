@vite(['resources/js/reporte_de_pagos.js'])
@vite(['resources/js/reporte_de_pagos_cuenta_cliente.js'])
@extends('aside')
@section('titulo', 'Reporte de Pagos')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Reporte de Pagos --}}
        <div class="flex justify-between items-center">
            <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Reporte de Pagos</h4>
            <button class="bg-blue-500 p-1 rounded-full hidden" id="btnRetrocesoCuentaDelCliente"><i class='bx bx-arrow-back text-white'></i></button>
            <button class="bg-blue-500 p-1 rounded-full hidden" id="btnRetrocesoCuentaDelClienteDescuento"><i class='bx bx-arrow-back text-white'></i></button>
        </div>
        <div id="primerContenedorReporteDePagos" class="">
            <div class="flex justify-between items-center gap-4 flex-col md:flex-row flex-wrap md:mx-5 mt-0 mb-5">
                <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-green-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-green-600" type="submit" autocomplete="off" id="registrar_agregarPago_submit"><i class='bx bx-dollar-circle text-lg'></i><h5 class="min-w-max">Agregar Pago</h5></button>
                @if (auth()->user()->tipoUsu == 'Administrador')
                <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-red-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-red-600" type="submit" autocomplete="off" id="registrar_agregarDescuento_submit"><i class='bx bxs-discount text-lg'></i><h5 class="min-w-max">Agregar Descuento</h5></button>
                <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-orange-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-orange-600" type="submit" autocomplete="off" id="descuento_FiltrarPorCliente_submit"><i class='bx bxs-file-find text-lg'></i><h5 class="min-w-max">Consultar Descuentos</h5></button>
                @endif
                <button class="w-full md:w-56 flex gap-2 justify-center items-center cursor-pointer uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-blue-700" type="submit" autocomplete="off" id="registrar_FiltrarPorCliente_submit"><i class='bx bxs-user-detail text-lg'></i><h5 class="min-w-max">Estado de Cuenta</h5></button>
            </div>
            <div class="flex justify-start md:items-end gap-x-14 gap-y-4 flex-col md:flex-row flex-wrap md:m-5 mt-0 mb-5">
                <div class="flex gap-x-14 gap-y-4 flex-col md:flex-row">
                    <div class="flex flex-col justify-center">
                        <label for="fechaDesdeReporteDePagos" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeReporteDePagos">
                    </div>
                    <div class="flex flex-col justify-center">
                        <label for="fechaHastaReporteDePagos" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaReporteDePagos">
                    </div>
                </div>
                <button class="flex gap-2 justify-center items-center cursor-pointer uppercase bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-blue-700" type="submit" autocomplete="off" id="filtrar_pagos_submit"><i class='bx bx-search-alt text-lg' ></i> Buscar</button>
            </div>
            <div class="md:m-5 mt-0">
                <div class="flex w-full justify-end">
                    <select class="mb-5 w-full md:w-56 uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="filtroFormaDePago" id="filtroFormaDePago">
                        <option value="Todos">Todos</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Transferencia">Transferencia</option>
                        <option value="Saldo">Saldo</option>
                    </select>  
                </div>
                <div class="relative overflow-auto max-h-[500px] aside_scrollED rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-100 uppercase bg-blue-600 sticky top-0">
                            <tr>
                                <th class="hidden">Id</th>
                                <th class="p-4 whitespace-nowrap">Nombre de Cliente</th>
                                <th class="p-4 text-center whitespace-nowrap">Monto</th>
                                <th class="p-4 text-center whitespace-nowrap">Forma Pago</th>
                                <th class="p-4 text-center whitespace-nowrap">Codigo</th>
                                <th class="p-4 text-center whitespace-nowrap">Pago a cuenta de fecha</th>
                                <th class="p-4 text-center whitespace-nowrap">Observaciones</th>
                            </tr>
                        </thead>
                        <tbody id="bodyReporteDePagos">
                            <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="6" class="text-center">No hay datos</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div id="segundoContenedorReporteDePagos" class="hidden">
            <div class="overflow-x-auto md:mx-5 mt-0 mb-5 relative">
                <div class="flex flex-col gap-5">
                    <div class="flex justify-between items-center w-full flex-wrap gap-4">
                        <div class="flex justify-between items-center relative md:max-w-xs w-full gap-4">
                            <div class="flex flex-col max-w-xs w-full">
                                <label for="idCuentaDelCliente" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                                <div class="flex max-w-xs w-full">
                                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                        <i class='bx bxs-user-circle text-xl'></i>
                                    </span>
                                    <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idCuentaDelCliente" autocomplete="off" id="idCuentaDelCliente" placeholder="Ingrese Nombre de Cliente">
                                </div>
            
                                <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                                <label id="selectedCodigoCliCuentaDelCliente" class="hidden" val=""></label>
            
                                <!-- Contenedor para las sugerencias -->
                                <div id="contenedorClientesCuentaDelCliente" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full left-0 bg-white dark:bg-gray-800 border rounded hidden outline-none">
                                    <!-- Aquí se mostrarán las sugerencias -->
                                </div>
                            </div>
                        </div>
                        @if (auth()->user()->tipoUsu == 'Administrador')
                            <button class="text-base py-2 px-5 bg-blue-600 md:max-w-xs w-full hover:bg-blue-700 text-gray-50 rounded-lg md:w-auto" id="btnCambiarPrecioPesadas"><i class='bx bx-dollar'></i> Cambiar Precios</button>
                        @endif
                    </div>
                    <div class="flex gap-x-24 gap-4 w-full flex-col md:flex-row">
                        <div class="flex flex-col justify-center">
                            <label for="fechaDesdeCuentaDelCliente" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeCuentaDelCliente">
                        </div>
                        <div class="flex flex-col justify-center">
                            <label for="fechaHastaCuentaDelCliente" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaCuentaDelCliente">
                        </div>
                        <div class=" flex items-end">
                            <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg w-full md:w-auto" id="btnBuscarCuentaDelCliente"><i class='bx bx-search-alt'></i> Buscar</button>
                        </div>
                    </div>
                    <div class="flex items-center justify-end py-1 rounded-xl px-1">
                        <input id="minimizarPrecios" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </div>
                </div>
            </div>
            {{-- Tabla --}}
            <div class="relative overflow-auto rounded-lg md:mx-5 md:mb-5 max-h-[500px] aside_scrollED">
                <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaCuentaDelCliente">
                    <thead id="headerCuentaDelCliente" class="bg-blue-600 text-gray-50 sticky top-0">
                        <tr class="h-10">
                            <th class="px-4 font-medium whitespace-nowrap">DIA</th>
                            <th class="px-4 font-medium whitespace-nowrap">PRESENTACIÓN</th>
                            <th class="px-4 font-medium whitespace-nowrap">CANTIDAD</th>
                            <th class="px-4 font-medium whitespace-nowrap">PESO</th>
                            <th class="px-4 font-medium whitespace-nowrap">TOTAL</th>
                            <th class="px-4 font-medium whitespace-nowrap">PRECIO</th>
                        </tr>
                    </thead>
                    <tbody id="bodyCuentaDelCliente">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="7" class="text-center">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        {{-- Termina contenedor Reporte de Pagos --}}
        {{-- Tercer Contenedor Descuentos --}}
        <div id="tercerContenedorReporteDeDescuentos" class="hidden">
            <div class="overflow-x-auto md:mx-5 mt-0 mb-5 relative">
                <div class="flex flex-col gap-5">
                    <div class="flex gap-x-24 gap-4 w-full flex-col md:flex-row">
                        <div class="flex flex-col justify-center">
                            <label for="fechaDesdeCuentaDelClienteDescuentos" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeCuentaDelClienteDescuentos">
                        </div>
                        <div class="flex flex-col justify-center">
                            <label for="fechaHastaCuentaDelClienteDescuentos" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaCuentaDelClienteDescuentos">
                        </div>
                        <div class=" flex items-end">
                            <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg w-full md:w-auto" id="btnBuscarCuentaDelClienteDescuentos"><i class='bx bx-search-alt'></i> Buscar</button>
                        </div>
                    </div>
                </div>
            </div>
            {{-- Tabla --}}
            <div class="relative overflow-auto rounded-lg md:mx-5 md:mb-5 max-h-[500px] aside_scrollED">
                <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaCuentaDelClienteDescuentos">
                    <thead id="headerCuentaDelClienteDescuentos" class="bg-blue-600 text-gray-50 sticky top-0">
                        <tr class="h-10">
                            <th class="hidden">ID</th>
                            <th class="px-4 font-medium whitespace-nowrap">CLIENTE</th>
                            <th class="px-4 font-medium whitespace-nowrap">Kg.</th>
                            <th class="px-4 font-medium whitespace-nowrap">ESPECIE</th>
                            <th class="px-4 font-medium whitespace-nowrap">PRECIO</th>
                            <th class="px-4 font-medium whitespace-nowrap">DIA</th>
                        </tr>
                    </thead>
                    <tbody id="bodyCuentaDelClienteDescuentos">
                        <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="6" class="text-center">No hay datos</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        {{-- Termina contenedor Descuentos --}}    
    </div>
</main>

{{-- Modal Agregar Pago --}}

<div class="fixed hidden top-0 left-0 z-[100] justify-center items-center w-screen h-screen bg-gray-900 bg-opacity-75 transition-opacity cerrarModalAgregarPagoCliente" id="ModalAgregarPagoCliente">
    <div class="modal-content max-w-lg w-full mx-4">
        <div class="transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 shadow-xl transition-all">
            <div class="p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Agregar Pago</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4" id="divAgregarPagoCliente">
                        <div class="flex justify-center items-start flex-col relative w-full h-full">
                            <label for="idAgregarPagoCliente" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                            <div class="flex max-w-xs w-full">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <i class='bx bxs-user-circle text-xl'></i>
                                </span>
                                <input class="validarCampo max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idAgregarPagoCliente" autocomplete="off" id="idAgregarPagoCliente" placeholder="Ingrese Nombre de Cliente">
                            </div>
        
                            <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                            <label id="selectedCodigoCliAgregarPagoCliente" class="hidden" val=""></label>
        
                            <!-- Contenedor para las sugerencias -->
                            <div id="contenedorClientesAgregarPagoCliente" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full left-0 bg-white dark:bg-gray-800 border rounded hidden outline-none">
                                <!-- Aquí se mostrarán las sugerencias -->
                            </div>
                        </div>
                        <h2 class="text-base font-medium text-gray-900 dark:text-white text-start w-full">Deuda Total : S/ <span id="deudaTotal">0.00</span></h2>
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="fechaAgregarPago" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Fecha :</h5>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="fechaAgregarPago">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">S/</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorAgregarPagoCliente" autocomplete="off" id="valorAgregarPagoCliente" value="" placeholder="Ingrese Monto">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">F. de Pago</h4>
                            </div>
                            <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="formaDePago" id="formaDePago">
                                <option value="Efectivo">Efectivo</option>
                                <option value="Transferencia">Transferencia</option>
                            </select>                          
                        </div>
                        <div class="hidden w-full h-10" id="divCodTrans">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Cod. Trans.</h4>
                            </div>
                            <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="codAgregarPagoCliente" autocomplete="off" id="codAgregarPagoCliente" value="">
                        </div>
                        <div class="flex flex-col w-full">
                            <label for="comentarioAgregarPagoCliente" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Comentario :</label>
                            <textarea class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="comentarioAgregarPagoCliente" autocomplete="off" id="comentarioAgregarPagoCliente"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnAgregarPagoCliente">Registrar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalAgregarPagoCliente" id="cerrarModalAgregarPagoClientebtn">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Termina Modal Agregar Pago --}}

{{-- Modal Editar Pago --}}

<div class="fixed hidden top-0 left-0 z-[100] justify-center items-center w-screen h-screen bg-gray-900 bg-opacity-75 transition-opacity cerrarModalAgregarPagoClienteEditar" id="ModalAgregarPagoClienteEditar">
    <div class="modal-content max-w-lg w-full mx-4">
        <div class="transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 shadow-xl transition-all">
            <div class="p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Editar Pago</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4" id="divAgregarPagoClienteEditar">
                        <div class="flex justify-center items-start flex-col relative w-full h-full">
                            <label for="idAgregarPagoClienteEditar" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                            <label id="idReporteDePago" class="hidden mb-2 text-base font-medium text-gray-900 dark:text-white"></label>
                            <div class="flex max-w-xs w-full">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <i class='bx bxs-user-circle text-xl'></i>
                                </span>
                                <input class="validarCampo max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idAgregarPagoClienteEditar" autocomplete="off" id="idAgregarPagoClienteEditar" placeholder="Ingrese Nombre de Cliente">
                            </div>
        
                            <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                            <label id="selectedCodigoCliAgregarPagoClienteEditar" class="hidden" val=""></label>
        
                            <!-- Contenedor para las sugerencias -->
                            <div id="contenedorClientesAgregarPagoClienteEditar" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full left-0 bg-white dark:bg-gray-800 border rounded hidden outline-none">
                                <!-- Aquí se mostrarán las sugerencias -->
                            </div>
                        </div>
                        <h2 class="text-base font-medium text-gray-900 dark:text-white text-start w-full">Deuda Total : S/ <span id="deudaTotalEditar">0.00</span></h2>
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="fechaAgregarPagoEditar" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Fecha :</h5>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="fechaAgregarPagoEditar">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">S/</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorAgregarPagoClienteEditar" autocomplete="off" id="valorAgregarPagoClienteEditar" value="" placeholder="Ingrese Monto">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">F. de Pago</h4>
                            </div>
                            <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="formaDePagoEditar" id="formaDePagoEditar">
                                <option value="Efectivo">Efectivo</option>
                                <option value="Transferencia">Transferencia</option>
                            </select>                          
                        </div>
                        <div class="hidden w-full h-10" id="divCodTransEditar">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Cod. Trans.</h4>
                            </div>
                            <input class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="codAgregarPagoClienteEditar" autocomplete="off" id="codAgregarPagoClienteEditar" value="">
                        </div>
                        <div class="flex flex-col w-full">
                            <label for="comentarioAgregarPagoClienteEditar" class="mb-2 text-sm font-medium text-gray-900 dark:text-white md:w-24">Comentario :</label>
                            <textarea class="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="comentarioAgregarPagoClienteEditar" autocomplete="off" id="comentarioAgregarPagoClienteEditar"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnAgregarPagoClienteEditar">Actualizar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalAgregarPagoClienteEditar" id="cerrarModalAgregarPagoClienteEditarbtn">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Termina Modal Editar Pago --}}

{{-- Modal Agregar Descuento --}}

<div class="fixed hidden top-0 left-0 z-[100] justify-center items-center w-screen h-screen bg-gray-900 bg-opacity-75 transition-opacity cerrarModalAgregarDescuentoCliente" id="ModalAgregarDescuentoCliente">
    <div class="modal-content max-w-lg w-full mx-4">
        <div class="transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 shadow-xl transition-all">
            <div class="p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Agregar Descuento</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4" id="divAgregarDescuentoCliente">
                        <div class="flex justify-center items-start flex-col relative w-full h-full">
                            <label for="idAgregarDescuentoCliente" class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                            <div class="flex max-w-xs w-full">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <i class='bx bxs-user-circle text-xl'></i>
                                </span>
                                <input class="validarCampo max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idAgregarDescuentoCliente" autocomplete="off" id="idAgregarDescuentoCliente" placeholder="Ingrese Nombre de Cliente">
                            </div>
        
                            <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                            <label id="selectedCodigoCliAgregarDescuentoCliente" class="hidden" val=""></label>
        
                            <!-- Contenedor para las sugerencias -->
                            <div id="contenedorClientesAgregarDescuentoCliente" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full left-0 bg-white dark:bg-gray-800 border rounded hidden outline-none">
                                <!-- Aquí se mostrarán las sugerencias -->
                            </div>
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="fechaAgregarDescuento" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Fecha :</h5>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="fechaAgregarDescuento">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Presentación</h4>
                            </div>
                            <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="presentacionAgregarDescuentoCliente" id="presentacionAgregarDescuentoCliente">

                            </select>                          
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Descuento Kg.</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorAgregarDescuentoCliente" placeholder="0.0" autocomplete="off" id="valorAgregarDescuentoCliente" value="">
                        </div>
                    </div>
                    <input type="text" id="precioPrimerEspecieDescuento" class="hidden" value="0.00">
                    <input type="text" id="precioSegundaEspecieDescuento" class="hidden" value="0.00">
                    <input type="text" id="precioTerceraEspecieDescuento" class="hidden" value="0.00">
                    <input type="text" id="precioCuartaEspecieDescuento" class="hidden" value="0.00">
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnAgregarDescuentoCliente">Registrar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalAgregarDescuentoCliente" id="cerrarModalAgregarDescuentoClientebtn">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Termina Modal Agregar Descuento --}}
{{-- Modal Editar Descuento --}}

<div class="fixed hidden top-0 left-0 z-[100] justify-center items-center w-screen h-screen bg-gray-900 bg-opacity-75 transition-opacity cerrarModalEditarDescuento" id="ModalEditarDescuentoClienteEditar">
    <div class="modal-content max-w-lg w-full mx-4">
        <div class="transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 shadow-xl transition-all">
            <div class="p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Editar Descuento</h3>
                    </div>
                    <label class="hidden" type="text" value="" id="valorEditarDescuentoCliente"></label>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4" id="divEditarDescuentoCliente">
                        <div class="flex justify-center items-start flex-col relative w-full h-full">
                            <label class="mb-2 text-base font-medium text-gray-900 dark:text-white">Cliente :</label>
                            <div class="flex max-w-xs w-full">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <i class='bx bxs-user-circle text-xl'></i>
                                </span>
                                <label class="hidden" value="" id="idEditarNombreDeClienteDescuento"></label>
                                <input disabled="" class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idEditarNombreDescuentoCliente" autocomplete="off" id="idEditarNombreDescuentoCliente" placeholder="Ingrese Nombre de Cliente">
                            </div>
                        </div>
                        <div class="flex w-full justify-start items-center gap-2">
                            <h5 for="fechaPagoEditarDescuento" class="text-base text-gray-900 dark:text-gray-50 min-w-max">Fecha :</h5>
                            <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" id="fechaPagoEditarDescuento">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Presentación</h4>
                            </div>
                            <select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="editarPresentacionDescuentoCliente" id="editarPresentacionDescuentoCliente">

                            </select>                          
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Descuento Kg.</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorClienteEditarDescuento" autocomplete="off" id="valorClienteEditarDescuento" value="" placeholder="0.0">
                        </div>
                        <div class="flex w-full h-10">
                            <div class="text-sm px-3 flex items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                                <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Precio S/.</h4>
                            </div>
                            <input class="validarCampo validarSoloNumerosDosDecimales w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorPrecioEditarDescuento" autocomplete="off" id="valorPrecioEditarDescuento" value="" placeholder="0.0">
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnEditarDescuentoClienteEditar">Actualizar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalEditarDescuento" id="cerrarModalEditarDescuentobtn">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="fixed hidden top-0 left-0 z-[100] justify-center items-center w-screen h-screen bg-gray-900 bg-opacity-75 transition-opacity cerrarModalCambiarPrecioPesada" id="ModalCambiarPrecioPesada">
    <div class="modal-content max-w-lg w-full mx-4">
        <div class="transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 shadow-xl transition-all">
            <div class="p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Cambiar Precio Pesadas</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <div class="flex justify-center items-center flex-col relative w-full h-full">
                            <div class="flex max-w-xs w-full mt-4">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <i class='bx bxs-user-circle text-xl'></i>
                                </span>
                                <input class="max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="idCambiarPrecioPesadaCliente" autocomplete="off" id="idCambiarPrecioPesadaCliente" placeholder="Ingrese Nombre de Cliente">
                            </div>
        
                            <!-- Etiquetas ocultas para almacenar los datos seleccionados -->
                            <label id="selectedCodigoCliCambiarPrecioPesada" class="hidden" val=""></label>
        
                            <!-- Contenedor para las sugerencias -->
                            <div id="contenedorClientesCambiarPrecioPesada" class="max-w-xs w-full overflow-hidden overflow-y-auto absolute max-h-40 z-10 text-gray-900 dark:text-gray-50 top-full m-auto bg-white dark:bg-gray-800 border rounded hidden outline-none">
                                <!-- Aquí se mostrarán las sugerencias -->
                            </div>
                        </div>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full md:w-80" id="fechaCambiarPrecioPesada">
                        <select class="h-10 w-full md:w-80 uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="especiesCambioPrecioPesadas" id="especiesCambioPrecioPesadas">
                        </select> 
                        <div class="flex max-w-xs w-full">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <b>S/</b>
                            </span>
                            <input class="validarSoloNumerosDosDecimales max-w-xs w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="nuevoPrecioCambiarPesadas" autocomplete="off" id="nuevoPrecioCambiarPesadas" placeholder="Ingrese Nuevo Precio">
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="flex w-full justify-center items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnCambiarPrecioPesada">Cambiar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalCambiarPrecioPesada" id="cerrarModalCambiarPrecioPesadabtn">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Termina Modal Editar Descuento --}}

@endsection
