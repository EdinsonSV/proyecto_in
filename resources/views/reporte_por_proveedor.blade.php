@vite(['resources/js/reporte_por_proveedor.js'])
@extends('aside')
@section('titulo', 'Reporte por Proveedor')
@section('contenido')
<main class="p-6 min-h-[calc(100%-160px)]">
    <div class="px-5 pb-5 bg-gray-100 dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor Reporte por Proveedor --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Reporte por Proveedor</h4>
        <div class="overflow-x-auto md:mx-5 mt-0 mb-5 relative" id="DivReportePorProveedor">
            <div class="flex flex-col gap-5">
                <div class="flex gap-x-24 gap-4 w-full flex-col md:flex-row">
                    <div class="flex flex-col justify-center">
                        <label for="fechaDesdeReportePorProveedor" class="text-base text-gray-900 dark:text-gray-50">Desde :</label>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaDesdeReportePorProveedor">
                    </div>
                    <div class="flex flex-col justify-center">
                        <label for="fechaHastaReportePorProveedor" class="text-base text-gray-900 dark:text-gray-50">Hasta :</label>
                        <input type="date" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaHastaReportePorProveedor">
                    </div>
                </div>
                <div class="flex gap-4 justify-between w-full flex-col md:flex-row">
                    <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg" id="btnBuscarReportePorProveedor"><i class='bx bx-search-alt'></i> Buscar</button>
                    <button class="text-base py-2 px-5 bg-blue-600 hover:bg-blue-700 text-gray-50 rounded-lg" id="btnAgregarGuiasReportePorProveedor"><i class='bx bxs-file-plus'></i> Agregar Guias</button>
                </div>
            </div>
        </div>
        {{-- Tabla --}}
        <div class="relative overflow-auto rounded-lg md:mx-5 md:mb-5 max-h-[500px] aside_scrollED">
            <table class="border-collapse w-full text-gray-500 dark:text-gray-400 select-none relative text-sm" id="tablaReportePorProveedor">
                <thead id="headerReportePorProveedor" class="bg-blue-600 text-gray-50 sticky top-0">
                    <tr class="h-10">
                        <th class="hidden">Id</th>
                        <th class="px-4 font-medium">N° GUIA</th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">ESPECIE</th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">CANTIDAD</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">PESO</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">PROMEDIO</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">PRECIO</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">TOTAL</h5></th>
                        <th class="px-4 font-medium"><h5 class="min-w-max">OPCIONES</h5></th>
                    </tr>
                </thead>
                <tbody id="bodyReportePorProveedor">
                    <tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>
                </tbody>
            </table>
        </div>
        {{-- Termina contenedor Reporte por Proveedor --}}
    </div>
</main>
@endsection

<div class="fixed hidden top-0 left-0 z-[100] justify-center items-center w-screen h-screen bg-gray-900 bg-opacity-75 transition-opacity cerrarModalRegistrarGuias" id="ModalRegistrarGuias">
    <div class="modal-content max-w-lg w-full mx-4">
        <div class="transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 shadow-xl transition-all">
            <div class=" p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">¡Registrar Guia!</h3>
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">N° de Guia</h4>
                        </div>
                        <input class="h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorNumeroGuiaAgregarGuia" placeholder="0" autocomplete="off" id="valorNumeroGuiaAgregarGuia" value="">
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Fecha</h4>
                        </div>
                        <input type="date" class="w-full outline-none bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaRegistrarGuia">
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <select class="w-full uppercase h-10 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg" name="idProveedorAgregarGuia" id="idProveedorAgregarGuia">
                        </select>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <select class="w-full uppercase h-10 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg" name="idEspecieAgregarGuia" id="idEspecieAgregarGuia" disabled>
                        </select>
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Cantidad</h4>
                        </div>
                        <input class="h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorCantidadAgregarGuia" placeholder="0" autocomplete="off" id="valorCantidadAgregarGuia" value="">
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Peso Kg.</h4>
                        </div>
                        <input class="validarSoloNumerosDosDecimales h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorPesoAgregarGuia" placeholder="0.00" autocomplete="off" id="valorPesoAgregarGuia" value="">
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Precio S/.</h4>
                        </div>
                        <input class="validarSoloNumerosDosDecimales h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorPrecioAgregarGuia" placeholder="0.00" autocomplete="off" id="valorPrecioAgregarGuia" value="">
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnGuardarRegistrarGuias">Guardar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalRegistrarGuias" id="btncerrarModalRegistrarGuias">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="fixed hidden top-0 left-0 z-[100] justify-center items-center w-screen h-screen bg-gray-900 bg-opacity-75 transition-opacity cerrarModalRegistrarGuiasEditar" id="ModalRegistrarGuiasEditar">
    <div class="modal-content max-w-lg w-full mx-4">
        <div class="transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 shadow-xl transition-all">
            <div class=" p-4">
                <div class="flex flex-col">
                    <div class="border-b rounded-t dark:border-gray-500 p-2 flex justify-center">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">¡Registrar Guia!</h3>
                    </div>
                    <label id="idGuiaEditar" class="hidden"></label>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">N° de Guia</h4>
                        </div>
                        <input class="h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorNumeroGuiaAgregarGuiaEditar" placeholder="0" autocomplete="off" id="valorNumeroGuiaAgregarGuiaEditar" value="">
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Fecha</h4>
                        </div>
                        <input type="date" class="w-full outline-none bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="fechaRegistrarGuiaEditar">
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <select class="w-full uppercase h-10 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg" name="idProveedorAgregarGuiaEditar" id="idProveedorAgregarGuiaEditar">
                        </select>
                    </div>
                    <div class="mt-4 flex justify-center items-center flex-col gap-4">
                        <select class="w-full uppercase h-10 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg" name="idEspecieAgregarGuiaEditar" id="idEspecieAgregarGuiaEditar" disabled>
                        </select>
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Cantidad</h4>
                        </div>
                        <input class="h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorCantidadAgregarGuiaEditar" placeholder="0" autocomplete="off" id="valorCantidadAgregarGuiaEditar" value="">
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Peso Kg.</h4>
                        </div>
                        <input class="validarSoloNumerosDosDecimales h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorPesoAgregarGuiaEditar" placeholder="0.00" autocomplete="off" id="valorPesoAgregarGuiaEditar" value="">
                    </div>
                    <div class="mt-4 flex justify-center items-center h-10">
                        <div class="text-sm px-3 flex h-full items-center justify-center text-center border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-600 rounded-l-lg">
                            <h4 class="font-medium text-gray-900 dark:text-gray-300 min-w-max">Precio S/.</h4>
                        </div>
                        <input class="validarSoloNumerosDosDecimales h-10 w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-lg" type="text" name="valorPrecioAgregarGuiaEditar" placeholder="0.00" autocomplete="off" id="valorPrecioAgregarGuiaEditar" value="">
                    </div>
                </div>
            </div>
            <div class="px-4 pb-4">
                <div class="border-t dark:border-gray-500 w-full sm:flex sm:flex-row-reverse pt-4">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" id="btnGuardarRegistrarGuiasEditar">Actualizar</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 hover:bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto cerrarModalRegistrarGuiasEditar" id="btncerrarModalRegistrarGuiasEditar">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</div>