<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="{{ asset('img/logousers.ico') }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <title>Bienvenido</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>

<body class="bg-gray-50 dark:bg-gray-900 pt-16 md:pt-0">
    <div id="preloader_sistema" class="fixed top-0 left-0 h-screen w-full flex items-center justify-center z-50 bg-gray-300 dark:bg-gray-900 overflow-hidden">
        <div class="lds-ellipsis">
            <div class="bg-gray-900 dark:bg-white"></div>
            <div class="bg-gray-900 dark:bg-white"></div>
            <div class="bg-gray-900 dark:bg-white"></div>
            <div class="bg-gray-900 dark:bg-white"></div>
        </div>
    </div>
    <aside id="aside_bard" class="compact-nav fixed group overflow-hidden w-full -left-full md:left-0 top-0 z-10 h-screen md:w-[calc(3.73rem)] border-r border-gray-300/40 bg-white dark:bg-gray-900 dark:border-gray-700 md:hover:w-56 hover:shadow-xl block 2xl:w-56 2xl:shadow-xl">
        <div class="h-full flex flex-col justify-between">
            <div>
                <div class="h-16 border-b border-gray-300/40 dark:border-gray-700 flex items-center justify-between">
                    <a href="/home" class="block w-max px-2.5">
                        <svg class="h-10" viewBox="0 0 130 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M21.0906 4.26462L20.9421 4.17909C18.3863 2.70639 15.2373 2.70639 12.6814 4.17909L6.88388 7.51967C4.32802 8.99237 2.75355 11.714 2.75355 14.6594V21.3406C2.75355 24.286 4.32802 27.0077 6.88388 28.4803L12.6814 31.8208C15.2373 33.2935 18.3863 33.2935 20.9421 31.8208L26.7396 28.4803C29.2954 27.0077 30.8699 24.286 30.8699 21.3406V14.6594C30.8699 12.4919 30.0173 10.4455 28.5483 8.92892C29.2683 8.31513 29.7967 7.48406 30.0315 6.53741C32.2932 8.596 33.6235 11.5332 33.6235 14.6594V21.3406C33.6235 25.2677 31.5242 28.8966 28.1164 30.8602L22.3189 34.2008C18.911 36.1645 14.7125 36.1645 11.3046 34.2008L5.5071 30.8602C2.09929 28.8966 0 25.2677 0 21.3406V14.6594C0 10.7322 2.09929 7.10335 5.5071 5.13975L11.3046 1.79917C14.7125 -0.164422 18.911 -0.164422 22.3189 1.79917L22.5517 1.93334C21.8496 2.53491 21.3307 3.34367 21.0906 4.26462Z"
                                fill="#0EC8FE" />
                            <path
                                d="M8.68903 18.0687C8.68903 13.6293 12.295 10.0305 16.7432 10.0305C21.1913 10.0305 24.7974 13.6293 24.7974 18.0687C24.7974 22.5081 21.1913 26.1069 16.7432 26.1069C12.295 26.1069 8.68903 22.5081 8.68903 18.0687Z"
                                fill="#0EC8FE" />
                            <path
                                d="M28.6518 5.29007C28.6518 3.58263 27.2649 2.19847 25.554 2.19847C23.8432 2.19847 22.4563 3.58263 22.4563 5.29007C22.4563 6.99752 23.8432 8.38168 25.554 8.38168C27.2649 8.38168 28.6518 6.99752 28.6518 5.29007Z"
                                fill="#0EC8FE" />
                            <path
                                d="M50.8387 15.3096V23.411C50.8387 23.9753 50.97 24.3884 51.2325 24.6504C51.5152 24.8922 51.9795 25.0131 52.6258 25.0131H54.5946V28.5802H51.9292C48.355 28.5802 46.568 26.8471 46.568 23.3808V15.3096H44.5689V11.8333H46.568V7.69191H50.8387V11.8333H54.5946V15.3096H50.8387ZM56.5542 20.1463C56.5542 18.4534 56.8873 16.952 57.5537 15.6421C58.2402 14.3323 59.159 13.3246 60.31 12.6192C61.4811 11.9139 62.7835 11.5612 64.2173 11.5612C65.4692 11.5612 66.5596 11.8131 67.4885 12.317C68.4375 12.8208 69.1947 13.4556 69.7602 14.2214V11.8333H74.0309V28.5802H69.7602V26.1316C69.215 26.9176 68.4578 27.5726 67.4885 28.0965C66.5394 28.6004 65.4389 28.8522 64.187 28.8522C62.7735 28.8522 61.4811 28.4895 60.31 27.764C59.159 27.0385 58.2402 26.0207 57.5537 24.7108C56.8873 23.3808 56.5542 21.8593 56.5542 20.1463ZM69.7602 20.2067C69.7602 19.1789 69.5582 18.3023 69.1544 17.5768C68.7505 16.8311 68.2053 16.2669 67.5188 15.884C66.8322 15.481 66.0952 15.2794 65.3077 15.2794C64.5202 15.2794 63.7932 15.4708 63.1269 15.8537C62.4605 16.2367 61.9153 16.8009 61.4913 17.5466C61.0873 18.2721 60.8855 19.1387 60.8855 20.1463C60.8855 21.1539 61.0873 22.0407 61.4913 22.8064C61.9153 23.5521 62.4605 24.1265 63.1269 24.5295C63.8133 24.9325 64.5403 25.134 65.3077 25.134C66.0952 25.134 66.8322 24.9426 67.5188 24.5597C68.2053 24.1567 68.7505 23.5924 69.1544 22.8669C69.5582 22.1212 69.7602 21.2345 69.7602 20.2067ZM80.323 9.83817C79.5759 9.83817 78.9499 9.60641 78.445 9.14291C77.9604 8.65924 77.7181 8.06473 77.7181 7.35939C77.7181 6.65405 77.9604 6.06962 78.445 5.60611C78.9499 5.12245 79.5759 4.88062 80.323 4.88062C81.0701 4.88062 81.686 5.12245 82.1706 5.60611C82.6754 6.06962 82.9278 6.65405 82.9278 7.35939C82.9278 8.06473 82.6754 8.65924 82.1706 9.14291C81.686 9.60641 81.0701 9.83817 80.323 9.83817ZM82.4129 11.8333V28.5802H78.1724V11.8333H82.4129ZM90.843 6.21069V28.5802H86.6026V6.21069H90.843ZM110.874 11.8333V28.5802H106.603V26.4641C106.058 27.1896 105.341 27.764 104.452 28.1872C103.584 28.5902 102.635 28.7918 101.605 28.7918C100.293 28.7918 99.1318 28.5197 98.122 27.9756C97.1125 27.4113 96.3149 26.5951 95.7292 25.527C95.1639 24.4388 94.8811 23.149 94.8811 21.6577V11.8333H99.1216V21.0531C99.1216 22.3832 99.4548 23.411 100.121 24.1365C100.787 24.8418 101.696 25.1945 102.847 25.1945C104.018 25.1945 104.937 24.8418 105.603 24.1365C106.27 23.411 106.603 22.3832 106.603 21.0531V11.8333H110.874ZM121.479 28.8522C120.106 28.8522 118.874 28.6104 117.784 28.1267C116.693 27.6229 115.825 26.9478 115.179 26.1014C114.553 25.255 114.21 24.3179 114.149 23.2901H118.42C118.501 23.9349 118.813 24.469 119.359 24.8922C119.924 25.3154 120.621 25.527 121.449 25.527C122.256 25.527 122.882 25.3659 123.327 25.0434C123.791 24.7209 124.023 24.3078 124.023 23.804C124.023 23.2599 123.741 22.8568 123.175 22.5948C122.63 22.3127 121.752 22.0104 120.54 21.6879C119.288 21.3857 118.258 21.0733 117.45 20.7508C116.663 20.4284 115.976 19.9347 115.391 19.2696C114.826 18.6046 114.543 17.7077 114.543 16.5792C114.543 15.6522 114.805 14.8058 115.33 14.04C115.875 13.2742 116.643 12.6696 117.632 12.2263C118.642 11.7829 119.823 11.5612 121.176 11.5612C123.175 11.5612 124.77 12.065 125.962 13.0727C127.153 14.0602 127.809 15.4003 127.93 17.0931H123.872C123.811 16.4281 123.529 15.9042 123.024 15.5212C122.539 15.1182 121.883 14.9166 121.055 14.9166C120.288 14.9166 119.692 15.0578 119.268 15.3399C118.864 15.6219 118.662 16.0149 118.662 16.5188C118.662 17.0831 118.945 17.5163 119.51 17.8186C120.076 18.1007 120.954 18.393 122.145 18.6953C123.357 18.9976 124.356 19.3099 125.144 19.6324C125.931 19.9549 126.608 20.4586 127.173 21.1438C127.759 21.8089 128.062 22.6955 128.082 23.804C128.082 24.7713 127.809 25.6379 127.264 26.4037C126.739 27.1694 125.972 27.774 124.962 28.2174C123.973 28.6406 122.812 28.8522 121.479 28.8522Z"
                                fill="#BBC5C9" />
                        </svg>
                    </a>
                    <div class="block md:hidden">
                        <i id="toogle_bard2" class="fa-solid fa-xmark mr-8 text-gray-700 uppercase dark:text-gray-100 cursor-pointer text-lg"></i>
                    </div>
                </div>
                <div class="mt-6">
                    <ul class="px-1 -ml-px space-y-4 font-medium tracking-wide">
                        <li class="w-max space-y-4 group-hover:w-full 2xl:w-full">
                            <a href="" class="block py-3 w-[52px] rounded-full bg-sky-500 group-hover:w-full 2xl:w-full">
                                <div class="w-max flex items-center px-3 gap-4">
                                    <span id="TextDas" class="text-white px-2.5 text-lg">Dashboard</span>
                                </div>
                            </a>
                        </li>
                        <li class="w-max">
                            <a href="">
                                <div class="flex items-center gap-4 px-4 py-3">
                                    <i
                                        class="fa-regular fa-folder-open h-6 w-6 text-gray-700 dark:text-gray-100 text-xl"></i>
                                    <span class="text-gray-600 dark:text-gray-100">Categories</span>
                                </div>
                            </a>
                        </li>
                        <li class="w-max space-y-4 group-hover:w-full 2xl:w-full">
                            <a href="" class="block py-3 w-[52px] rounded-full bg-sky-500 group-hover:w-full 2xl:w-full">
                                <div class="w-max flex items-center px-3 gap-4">
                                    <svg class="h-7 w-7" fill-white viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                                            class="fill-current text-cyan-400 dark:fill-slate-600"></path>
                                        <path
                                            d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                                            class="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                                        <path
                                            d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                                            class="fill-current group-hover:text-sky-300"></path>
                                    </svg>
                                    <span class="text-white px-2.5 text-lg">Contabilidad</span>
                                </div>
                            </a>
                        </li>
                        <li class="w-max">
                            <a href="">
                                <div class="flex items-center gap-4 px-4 py-3">
                                    <i class="fa-regular fa-file h-6 w-6 text-gray-700 dark:text-gray-100 text-xl"></i>
                                    <span class="text-gray-600 dark:text-gray-100">Archives</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="py-4 px-2 border-t border-gray-300/40 dark:border-gray-700">
                <a href="">
                    <div class="w-max flex items-center gap-4">
                        <img class="w-10 h-10 rounded-full"
                            src="{{ asset(auth()->user()->rutaPerfilUsu) }}"
                            alt="">
                        <div>
                            <h6 class="text-gray-600 dark:text-gray-200 font-medium">{{auth()->user()->nombresUsu}}&nbsp;{{auth()->user()->apellidoPaternoUsu}}</h6>
                            <span class="-mt-0.5 mr-2 text-xs text-gray-500">{{auth()->user()->tipoUsu}}</span><a href="/logout"><i class="fa-solid fa-door-open text-xs dark:text-gray-100"></i></a>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </aside>
</body>
</html>
