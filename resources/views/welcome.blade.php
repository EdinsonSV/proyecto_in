@vite(['resources/js/inicio.js'])
@extends('aside')
<link rel="icon" type="image/x-icon" href="{{ asset('img/logousers.ico') }}">
<main class="w-full md:w-[calc(100%-3.73rem)] ml-auto min-h-[calc(100%-120px)] mb-12 2xl:w-[calc(100%-256px)]">
    <div class="2xl:container mx-auto">
        <div class="h-16 border-b border-gray-300/40 dark:border-gray-700 flex items-center justify-between fixed  md:relative  top-0 w-full dark:bg-[#0D161C]">
            <div class="flex items-center">
                <h3 class="text-gray-900 uppercase dark:text-gray-300 font-semibold ml-7 lg:ml-12" id="mensaje_bienvenida">Buenos dias</h3>
                <span class="text-gray-900 dark:text-gray-300 font-semibold">&nbsp;{{auth()->user()->nombresUsu}}</span>
            </div>
            <div class="block md:hidden">
                <i id="toogle_bard" class="fa-solid fa-bars mr-8 text-gray-900 uppercase dark:text-gray-300 cursor-pointer text-lg"></i>
            </div>
        </div>
        <div class="mx-6 lg:mx-12 mt-[calc(1.865rem)] overflow-x-auto bg-white dark:bg-[#111B22]">
            <div class="flex-col rounded-lg border border-gray-300/40 dark:border-gray-700 shadow-lg shadow-slate-200 dark:shadow-slate-800 ">
                <div class="flex items-center justify-items-start p-5">
                    <h3 class="text-gray-900 font-bold text-xl dark:text-gray-300">Inicio</h3>
                </div>
                {{-- Inicia contenedor de Produccion Actual --}}
                <div class="px-5 pb-5">
                    <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 pb-5">Producción Actual</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-indigo-600 w-full rounded-lg py-5 flex flex-col items-center">
                            <h5 class="text-gray-100 font-bold text-3xl md:text-4xl">POLLO YUGO</h5>
                            <div class="flex row gap-4">
                                <div class="flex flex-col items-start">
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl">CANTIDAD&nbsp;&nbsp;:</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl">PESO NETO :</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl">PESO VIVO&nbsp;&nbsp;:</div>
                                </div>
                                <div class="flex flex-col items-start">
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl" id="totalUnidadesPrimerEspecie" >0 Uds.</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl" id="totalKgNetoPrimerEspecie" >0.0 Kg.</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl" id="totalKgVivoPrimerEspecie" >0.0 Kg.</div>
                                </div>
                            </div>
                            <div class="text-gray-100 w-full flex justify-center p-1">En linea
                                <span class="animacion_produccion_actual bg-gray-100"></span>
                            </div>
                        </div>
                        <div class="bg-blue-600 w-full rounded-lg py-5 flex flex-col items-center">
                            <h5 class="text-gray-100 font-bold text-3xl md:text-4xl">POLLO PERLA</h5>
                            <div class="flex row gap-4">
                                <div class="flex flex-col items-start">
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl">CANTIDAD&nbsp;&nbsp;:</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl">PESO NETO :</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl">PESO VIVO&nbsp;&nbsp;:</div>
                                </div>
                                <div class="flex flex-col items-start">
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl" id="totalUnidadesSegundaEspecie" >0 Uds.</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl" id="totalKgNetoSegundaEspecie" >0.0 Kg.</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl" id="totalKgVivoSegundaEspecie" >0.0 Kg.</div>
                                </div>
                            </div>
                            <div class="text-gray-100 w-full flex justify-center p-1">En linea
                                <span class="animacion_produccion_actual bg-gray-100"></span>
                            </div>
                        </div>
                        <div class="bg-emerald-600 w-full rounded-lg py-5 flex flex-col items-center">
                            <h5 class="text-gray-100 font-bold text-3xl md:text-4xl">POLLO CHIMU</h5>
                            <div class="flex row gap-4">
                                <div class="flex flex-col items-start">
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl">CANTIDAD&nbsp;&nbsp;:</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl">PESO NETO :</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl">PESO VIVO&nbsp;&nbsp;:</div>
                                </div>
                                <div class="flex flex-col items-start">
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl" id="totalUnidadesTerceraEspecie" >0 Uds.</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl" id="totalKgNetoTerceraEspecie" >0.0 Kg.</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl" id="totalKgVivoTerceraEspecie" >0.0 Kg.</div>
                                </div>
                            </div>
                            <div class="text-gray-100 w-full flex justify-center p-1">En linea
                                <span class="animacion_produccion_actual bg-gray-100"></span>
                            </div>
                        </div>
                        <div class="bg-yellow-500 w-full rounded-lg py-5 flex flex-col items-center">
                            <h5 class="text-gray-100 font-bold text-3xl md:text-4xl">POLLO XX</h5>
                            <div class="flex row gap-4">
                                <div class="flex flex-col items-start">
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl">CANTIDAD&nbsp;&nbsp;:</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl">PESO NETO :</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl">PESO VIVO&nbsp;&nbsp;:</div>
                                </div>
                                <div class="flex flex-col items-start">
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl" id="totalUnidadesCuartaEspecie" >0 Uds.</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl" id="totalKgNetoCuartaEspecie" >0.0 Kg.</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl" id="totalKgVivoCuartaEspecie" >0.0 Kg.</div>
                                </div>
                            </div>
                            <div class="text-gray-100 w-full flex justify-center p-1">En linea
                                <span class="animacion_produccion_actual bg-gray-100"></span>
                            </div>
                        </div>
                        <div class="bg-red-600 w-full md:col-span-2 rounded-lg py-5 flex flex-col items-center">
                            <h5 class="text-gray-100 font-bold text-3xl md:text-4xl">VENTA TOTAL</h5>
                            <div class="flex row gap-4">
                                <div class="flex flex-col items-start">
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl">CANTIDAD&nbsp;&nbsp;:</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl">PESO NETO :</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl">PESO VIVO&nbsp;&nbsp;:</div>
                                </div>
                                <div class="flex flex-col items-start">
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl" id="totalUnidadesEspecies" >0 Uds.</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl" id="totalKgNetoEspecies" >0.0 Kg.</div>
                                    <div class="text-gray-100 font-semibold text-xl md:text-2xl" id="totalKgVivoEspecies" >0.0 Kg.</div>
                                </div>
                            </div>
                            <div class="text-gray-100 w-full flex justify-center p-1">En linea
                                <span class="animacion_produccion_actual bg-gray-100"></span>
                            </div>
                        </div>
                    </div>
                </div>
                {{-- Termina contenedor de Produccion Actual --}}
                {{-- Inicia contenedor de Grafica Actual --}}
                <div class="px-5 pb-5">
                    <div class="">

                    </div>
                    {{-- Inicia contenedor de Tabla Grafica Actual --}}
                    <div class="overflow-x-auto div_table">
                        <table class="tabla_reporte_inicio table-auto text-gray-500 dark:text-gray-300 w-full rounded border-collapse border border-gray-900 dark:border-gray-300">
                            <thead class="bg-blue-600">
                                <tr>
                                    <th class="text-gray-100 border border-gray-500 dark:border-gray-100 py-2 md:text-xl text-left px-2">#</th>
                                    <th class="text-gray-100 border border-gray-500 dark:border-gray-100 py-2 md:text-xl text-left px-2">Cantidad</th>
                                    <th class="text-gray-100 border border-gray-500 dark:border-gray-100 py-2 md:text-xl text-left px-2">Peso</th>
                                    <th class="text-gray-100 border border-gray-500 dark:border-gray-100 py-2 md:text-xl text-left px-2">Promedio</th>
                                </tr>
                            </thead>
                            <tbody class="">
                                <tr>
                                    <td class=" text-gray-100 border border-gray-500 dark:border-gray-100 p-2 md:text-lg font-medium bg-red-600">Compra</td>
                                    <td class=" border border-gray-500 dark:border-gray-100 p-2 md:text-lg font-medium text-gray-900 dark:text-gray-100">0</td>
                                    <td class=" border border-gray-500 dark:border-gray-100 p-2 md:text-lg font-medium text-gray-900 dark:text-gray-100">0</td>
                                    <td class=" border border-gray-500 dark:border-gray-100 p-2 md:text-lg font-medium text-gray-900 dark:text-gray-100">0</td>
                                </tr>
                                <tr>
                                    <td class=" text-gray-100 border border-gray-500 dark:border-gray-100 p-2 md:text-lg font-medium bg-emerald-600">Venta</td>
                                    <td class=" border border-gray-500 dark:border-gray-100 p-2 md:text-lg font-medium text-gray-900 dark:text-gray-100">0</td>
                                    <td class=" border border-gray-500 dark:border-gray-100 p-2 md:text-lg font-medium text-gray-900 dark:text-gray-100">0</td>
                                    <td class=" border border-gray-500 dark:border-gray-100 p-2 md:text-lg font-medium text-gray-900 dark:text-gray-100">0</td>
                                </tr>
                                <tr>
                                    <td class=" text-gray-100 border border-gray-500 dark:border-gray-100 p-2 md:text-lg font-medium bg-orange-600">Merma</td>
                                    <td class=" border border-gray-500 dark:border-gray-100 p-2 md:text-lg font-medium text-gray-900 dark:text-gray-100">0</td>
                                    <td class=" border border-gray-500 dark:border-gray-100 p-2 md:text-lg font-medium text-gray-900 dark:text-gray-100">0</td>
                                    <td class=" border border-gray-500 dark:border-gray-100 p-2 md:text-lg font-medium text-gray-900 dark:text-gray-100">0</td>
                                </tr>
                                <tr>
                                    <td class=" text-gray-100 border border-gray-500 dark:border-gray-100 p-2 md:text-lg font-medium bg-yellow-600">Merma %</td>
                                    <td class=" border border-gray-500 dark:border-gray-100 p-2 md:text-lg font-medium text-gray-900 dark:text-gray-100">0 %</td>
                                    <td class=" border border-gray-500 dark:border-gray-100 p-2 md:text-lg font-medium text-gray-900 dark:text-gray-100">0 %</td>
                                    <td class=" border border-gray-500 dark:border-gray-100 p-2 md:text-lg font-medium text-gray-900 dark:text-gray-100">0 %</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {{-- Termina contenedor de Tabla Grafica Actual --}}
                </div>
                {{-- Termina contenedor de Grafica Actual --}}
            </div>
        </div>
    </div>
</main>
@extends('footer')
{{-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="{{ asset('js/inicio.js') }}" type="module"></script> --}}