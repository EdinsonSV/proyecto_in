<!DOCTYPE html>
<html lang="es" class="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="{{ asset('img/logousers.ico') }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <title>Bienvenido</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link href='{{ asset("css/alertify.css") }}' rel='stylesheet'>
</head>

<body class="bg-gray-50 dark:bg-[#0D161C] pt-16 md:pt-0">
    <div id="preloader_sistema" class="fixed top-0 left-0 h-screen w-full flex items-center justify-center z-50 bg-gray-50 dark:bg-neutral-900 overflow-hidden">
        <div class="lds-ellipsis">
            <div class="bg-gray-900 dark:bg-white"></div>
            <div class="bg-gray-900 dark:bg-white"></div>
            <div class="bg-gray-900 dark:bg-white"></div>
            <div class="bg-gray-900 dark:bg-white"></div>
        </div>
    </div>
    <aside id="aside_bard" class="duration-300 fixed group overflow-hidden w-full -left-full md:left-0 top-0 z-10 h-screen md:w-[calc(3.73rem)] border-r border-gray-300/40 bg-gray-50 dark:bg-[#0D161C] dark:border-gray-700 md:hover:w-64 hover:shadow-xl block 2xl:w-64 2xl:shadow-xl">
        <div class="h-full flex flex-col justify-between">
            <div class="h-16 border-b border-gray-300/40 dark:border-gray-700 flex items-center justify-between">
                <a href="/home" class="block w-max px-2.5">
                </a>
                <div class="block md:hidden">
                    <i id="toogle_bard2" class="fa-solid fa-xmark mr-8 text-gray-900 uppercase dark:text-gray-100 cursor-pointer text-lg"></i>
                </div>
            </div>
            <div class="hidden" id="usuarioRegistroCli" data-id="{{ auth()->user()->id }}"></div>

            <div class="overflow-y-scroll h-[calc(72%)] aside_scrollED overflow-x-hidden">
                @foreach ($menusAgrupados as $menu)
                @if (!empty($menu['nombreMenu']))
                    <h2 class="w-max min-w-max pl-4 text-gray-600 dark:text-gray-100 h-4 flex items-center text-xs font-semibold">{{ $menu['nombreMenu'] }}</h2>
                @endif
                <ul class="-ml-px space-y-4 font-medium tracking-wide border-1 border-slate-100 border-x-slate-700 py-8 px-1">
                    @foreach ($menu['submenus'] as $submenu)
                    <li>
                        <a href="{{ $submenu['hrefSubMenu'] }}">
                            <div class="flex items-center gap-4 px-4">
                                <i class="{{ $submenu['iconHtml'] }} h-6 w-6 text-gray-700 dark:text-gray-400 text-xl"></i>
                                <p class="text-gray-600 dark:text-gray-400 font-normal overflow-hidden whitespace-nowrap text-ellipsis">{{ $submenu['nombreSubMenu'] }}</p>
                            </div>
                        </a>
                    </li>
                    @endforeach
                </ul>
                @endforeach
            </div>      
            <div class="flex flex-col gap-5">
                <div class="modo_oscuro w-full flex justify-between px-4 pt-4 border-t border-gray-300/40 dark:border-gray-700">
                    <div class="info h-10 flex items-center w-36 text-gray-700 dark:text-gray-400 gap-4 overflow-hidden">
                        <i class='bx bx-moon h-6 w-6 text-2xl' ></i>
                        <span class="texto_oculto font-normal text-sm">Modo Oscuro</span>
                    </div>
                    <div id="swith_modo_oscuro" class="w-14 h-10 flex items-center justify-center cursor-pointer">
                        <div class="base_swith w-9 h-5 rounded-full bg-slate-700 relative flex items-center">
                            <div class="circulo_swith duration-300 w-4 h-4 rounded-full bg-gray-100 absolute left-0.5"></div>
                        </div>
                    </div>
                </div>
                <div class="py-4 px-2 border-t border-gray-300/40 dark:border-gray-700">
                    <div class="w-max flex items-center gap-4 justify-between">
                        <div class="flex gap-2">
                            <img class="w-10 h-10 rounded-full"
                                src="{{ asset(auth()->user()->rutaPerfilUsu) }}"
                                alt="" id="paraPrueba">
                            <div>
                                <h6 class="text-gray-600 dark:text-gray-200 font-medium">{{auth()->user()->nombresUsu}}&nbsp;{{auth()->user()->apellidoPaternoUsu}}</h6>
                                <span class="-mt-0.5 mr-2 text-xs text-gray-500">{{auth()->user()->tipoUsu}}</span>
                            </div>
                        </div>
                        <div>
                            <a class="w-full" href="/logout"><i class="bx bx-door-open text-3xl dark:text-gray-100"></i></a>
                        </div>
                    </div>
                </div>
            </div>      
        </div>
    </aside>
    <!-- <aside id="barra_lateral" class="barra_lateral min_barra_lateral flex flex-col justify-between w-64 h-screen duration-300 p-4 bg-gray-50 dark:bg-[#0D161C] fixed md:left-0 top-0 z-10 border-r border-gray-300/40 dark:border-gray-700 shadow-xl overflow-hidden xl:w-64">
        <div class="h-16 w-full flex items-center gap-4">
            <i class='bx bxl-meta cursor-pointer text-3xl text-gray-700 dark:text-gray-100 ico_logo'></i>
            <span class="texto_oculto oculto opacity-100 duration-300 text-2xl text-gray-700 dark:text-gray-100">BALINSA</span>
        </div>
        <nav class="h-full overflow-y-auto overflow-x-hidden aside_scrollED aside_scrollEDMin   ">
            @foreach ($menusAgrupados as $menu)
            @if (!empty($menu['nombreMenu']))
                <h2 class="w-max min-w-max text-gray-600 dark:text-gray-100 h-4 flex items-center text-xs font-semibold">{{ $menu['nombreMenu'] }}</h2>
            @endif
            <ul class="space-y-4 font-medium tracking-wide border-1 border-slate-100 border-x-slate-700 py-8">
                @foreach ($menu['submenus'] as $submenu)
                <li>
                    <a href="{{ $submenu['hrefSubMenu'] }}">
                        <div class="flex items-center gap-4 px-2">
                            <i class="{{ $submenu['iconHtml'] }} h-6 w-6 text-gray-700 dark:text-gray-400 text-xl"></i>
                            <span class="texto_oculto oculto text-gray-600 dark:text-gray-400 font-normal overflow-hidden whitespace-nowrap">{{ $submenu['nombreSubMenu'] }}</span>
                        </div>
                    </a>
                </li>
                @endforeach
            </ul>
            @endforeach
        </nav>
        <div>
            <div class="modo_oscuro w-full flex justify-between">
                <div class="info h-10 flex items-center w-36 text-gray-700 dark:text-gray-400 gap-4 overflow-hidden">
                    <i class='bx bx-moon h-6 w-6 text-2xl' ></i>
                    <span class="texto_oculto font-normal text-sm">Modo Oscuro</span>
                </div>
                <div id="swith_modo_oscuro" class="w-14 h-10 flex items-center justify-center cursor-pointer">
                    <div class="base_swith w-9 h-5 rounded-full bg-slate-700 relative flex items-center">
                        <div class="circulo_swith duration-300 w-4 h-4 rounded-full bg-gray-100 absolute left-0.5"></div>
                    </div>
                </div>
            </div>
            <div class="usuario w-full flex gap-4">
                <img class="w-10 h-10 rounded-full" src="{{ asset(auth()->user()->rutaPerfilUsu) }}"alt="">
                <div class="info_usuario flex items-center justify-between overflow-hidden">
                    <div class="nombre_email flex flex-col w-full">
                        <span class="text-gray-600 dark:text-gray-200 text-base font-medium">{{auth()->user()->nombresUsu}}&nbsp;{{auth()->user()->apellidoPaternoUsu}}</span>
                        <span class="text-gray-600 dark:text-gray-200 text-xs ">{{auth()->user()->tipoUsu}}</span>
                    </div>
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>
        </div>
    </aside> -->
    <script src="{{ asset('js/alertify.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>
</html>
