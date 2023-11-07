@vite(['resources/js/inicio.js'])
@extends('aside')
@section('titulo', 'Bienvenido')
@section('contenido')
<main class="p-6">
    <div class="px-5 pb-5 bg-white dark:bg-gray-900 rounded-xl drop-shadow-md">
        {{-- Inicia contenedor de Produccion Actual --}}
        <h4 class="text-gray-900 font-semibold text-ml dark:text-gray-300 py-5">Producción Actual</h4>
        <div class="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:mx-5">
            <div class="bg-indigo-600 w-full rounded-lg py-5 flex flex-col items-center">
                <h5 class="text-white font-bold text-3xl md:text-4xl">POLLO YUGO</h5>
                <div class="flex row">
                    <div class="flex flex-col items-start">
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">BENEFICIADO<span>:</span></div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">POLLO VIVO<span>:</span></div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full px-2">
                            <div class="grid grid-rows-2 grid-cols-2">
                                <div class="col-span-2">PESO TOTAL</div>
                                <div class="text-center col-span-2">VIVO</div>
                            </div>
                            <div class="h-full flex justify-center items-center"><span>:</span></div>
                        </div>
                    </div>
                    <div class="flex flex-col items-start">
                        <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesPrimerEspecie">0 Uds.</div>
                        <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgBeneficiadoPrimerEspecie">0.00 Kg.</div>
                        <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgPolloVivoPrimerEspecie">0.00 Kg.</div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full">
                            <div class="grid grid-rows-2 grid-cols-2">
                                <div></div>
                                <div>&nbsp;</div>
                            </div>
                            <div class="h-full flex justify-center items-center" id="totalKgPrimerEspecie">0.00 Kg.</div>
                        </div>
                    </div>
                </div>
                <div class="text-white w-full flex justify-center p-1">En linea
                    <span class="animacion_produccion_actual bg-gray-100"></span>
                </div>
            </div>
            <div class="bg-blue-600 w-full rounded-lg py-5 flex flex-col items-center">
                <h5 class="text-white font-bold text-3xl md:text-4xl">POLLO PERLA</h5>
                <div class="flex row">
                    <div class="flex flex-col items-start">
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">BENEFICIADO<span>:</span></div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">POLLO VIVO<span>:</span></div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full px-2">
                            <div class="grid grid-rows-2 grid-cols-2">
                                <div class="col-span-2">PESO TOTAL</div>
                                <div class="text-center col-span-2">VIVO</div>
                            </div>
                            <div class="h-full flex justify-center items-center"><span>:</span></div>
                        </div>
                    </div>
                    <div class="flex flex-col items-start">
                        <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesSegundaEspecie">0 Uds.</div>
                        <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgBeneficiadoSegundaEspecie">0.00 Kg.</div>
                        <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgPolloVivoSegundaEspecie">0.00 Kg.</div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full pr-2">
                            <div class="grid grid-rows-2 grid-cols-2">
                                <div></div>
                                <div>&nbsp;</div>
                            </div>
                            <div class="h-full flex justify-center items-center" id="totalKgSegundaEspecie">0.00 Kg.</div>
                        </div>
                    </div>
                </div>
                <div class="text-white w-full flex justify-center p-1">En linea
                    <span class="animacion_produccion_actual bg-gray-100"></span>
                </div>
            </div>
            <div class="bg-emerald-600 w-full rounded-lg py-5 flex flex-col items-center">
                <h5 class="text-white font-bold text-3xl md:text-4xl">POLLO CHIMU</h5>
                <div class="flex row">
                    <div class="flex flex-col items-start">
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">BENEFICIADO<span>:</span></div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">POLLO VIVO<span>:</span></div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full px-2">
                            <div class="grid grid-rows-2 grid-cols-2">
                                <div class="col-span-2">PESO TOTAL</div>
                                <div class="text-center col-span-2">VIVO</div>
                            </div>
                            <div class="h-full flex justify-center items-center"><span>:</span></div>
                        </div>
                    </div>
                    <div class="flex flex-col items-start">
                        <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesTerceraEspecie">0 Uds.</div>
                        <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgBeneficiadoTerceraEspecie">0.00 Kg.</div>
                        <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgPolloVivoTerceraEspecie">0.00 Kg.</div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full pr-2">
                            <div class="grid grid-rows-2 grid-cols-2">
                                <div></div>
                                <div>&nbsp;</div>
                            </div>
                            <div class="h-full flex justify-center items-center" id="totalKgTerceraEspecie">0.00 Kg.</div>
                        </div>
                    </div>
                </div>
                <div class="text-white w-full flex justify-center p-1">En linea
                    <span class="animacion_produccion_actual bg-gray-100"></span>
                </div>
            </div>
            <div class="bg-yellow-400 w-full rounded-lg py-5 flex flex-col items-center">
                <h5 class="text-white font-bold text-3xl md:text-4xl">POLLO XX</h5>
                <div class="flex row">
                    <div class="flex flex-col items-start">
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">BENEFICIADO<span>:</span></div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">POLLO VIVO<span>:</span></div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full px-2">
                            <div class="grid grid-rows-2 grid-cols-2">
                                <div class="col-span-2">PESO TOTAL</div>
                                <div class="text-center col-span-2">VIVO</div>
                            </div>
                            <div class="h-full flex justify-center items-center"><span>:</span></div>
                        </div>
                    </div>
                    <div class="flex flex-col items-start">
                        <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesCuartaEspecie">0 Uds.</div>
                        <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgBeneficiadoCuartaEspecie">0.00 Kg.</div>
                        <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgPolloVivoCuartaEspecie">0.00 Kg.</div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full pr-2">
                            <div class="grid grid-rows-2 grid-cols-2">
                                <div></div>
                                <div>&nbsp;</div>
                            </div>
                            <div class="h-full flex justify-center items-center" id="totalKgCuartaEspecie">0.00 Kg.</div>
                        </div>
                    </div>
                </div>
                <div class="text-white w-full flex justify-center p-1">En linea
                    <span class="animacion_produccion_actual bg-gray-100"></span>
                </div>
            </div>
            <div class="bg-red-600 w-full md:col-span-2 rounded-lg py-5 flex flex-col items-center">
                <h5 class="text-white font-bold text-3xl md:text-4xl">VENTA TOTAL</h5>
                <div class="flex row">
                    <div class="flex flex-col items-start">
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">CANTIDAD<span>:</span></div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">BENEFICIADO<span>:</span></div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full whitespace-nowrap px-2 gap-2">POLLO VIVO<span>:</span></div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full px-2">
                            <div class="grid grid-rows-2 grid-cols-2">
                                <div class="col-span-2">PESO TOTAL</div>
                                <div class="text-center col-span-2">VIVO</div>
                            </div>
                            <div class="h-full flex justify-center items-center"><span>:</span></div>
                        </div>
                    </div>
                    <div class="flex flex-col items-start">
                        <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalUnidadesEspecies">0 Uds.</div>
                        <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgBeneficiadoEspecies">0.00 Kg.</div>
                        <div class="text-white font-semibold text-xl md:text-2xl px-2" id="totalKgPolloVivoEspecies">0.00 Kg.</div>
                        <div class="text-white font-semibold text-xl md:text-2xl flex justify-between w-full pr-2">
                            <div class="grid grid-rows-2 grid-cols-2">
                                <div></div>
                                <div>&nbsp;</div>
                            </div>
                            <div class="h-full flex justify-center items-center" id="totalKgEspecies">0.00 Kg.</div>
                        </div>
                    </div>
                </div>
                <div class="text-white w-full flex justify-center p-1">En linea
                    <span class="animacion_produccion_actual bg-gray-100"></span>
                </div>
            </div>
        </div>
        {{-- Termina contenedor de Produccion Actual --}}
        {{-- Inicia contenedor de Grafica Actual --}}
        <div class="md:m-5 mt-10">
            <div class="">

            </div>
            {{-- Inicia contenedor de Tabla Grafica Actual --}}
            <div class="overflow-x-auto div_table rounded-lg">
                <table class="tabla_reporte_inicio table-auto text-gray-500 dark:text-gray-300 w-full border-collapse">
                    <thead class="bg-blue-600">
                        <tr>
                            <th class="text-white border-r-[1px] border-b-1 border-gray-300 dark:border-gray-400 py-2 md:text-md text-left px-2">#</th>
                            <th class="text-white border-r-[1px] border-b-1 border-gray-300 dark:border-gray-400 py-2 md:text-md text-left px-2">Cantidad</th>
                            <th class="text-white border-r-[1px] border-b-1 border-gray-300 dark:border-gray-400 py-2 md:text-md text-left px-2">Peso</th>
                            <th class="text-white py-2 md:text-md text-left px-2">Promedio</th>
                        </tr>
                    </thead>
                    <tbody class="">
                        <tr>
                            <td class="text-white border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-lg font-medium bg-red-600 whitespace-nowrap">Compra</td>
                            <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white" id="tblCantidadCompra">0</td>
                            <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white" id="tblPesoCompra">0</td>
                            <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white" id="tblPromedioCompra">0</td>
                        </tr>
                        <tr>
                            <td class="text-white border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-lg font-medium bg-emerald-600 whitespace-nowrap">Venta</td>
                            <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white" id="tblCantidadVenta">0</td>
                            <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white" id="tblPesoVenta">0</td>
                            <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white" id="tblPromedioVenta">0</td>
                        </tr>
                        <tr>
                            <td class="text-white border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-lg font-medium bg-orange-600 whitespace-nowrap">Merma</td>
                            <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white" id="tblCantidadMerma">0</td>
                            <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white" id="tblPesoMerma">0</td>
                            <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white" id="tblPromedioMerma">0</td>
                        </tr>
                        <tr>
                            <td class="text-white border-r-[1px] border-gray-300 dark:border-gray-400 p-2 text-lg font-medium bg-yellow-400 whitespace-nowrap">Merma %</td>
                            <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white" id="tblCantidadMermaPor">0 %</td>
                            <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white" id="tblPesoMermaPor">0 %</td>
                            <td class="border-r-[1px] border-b-[1px] border-gray-300 dark:border-gray-400 p-2 text-md font-medium text-gray-900 dark:text-white" id="tblPromedioMermaPor">0 %</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {{-- Termina contenedor de Tabla Grafica Actual --}}
        </div>
        {{-- Termina contenedor de Grafica Actual --}}
    </div>
</main>
@endsection