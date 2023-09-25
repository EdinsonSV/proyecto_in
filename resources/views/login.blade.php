<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="{{ asset('img/logousers.ico') }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <title>Login</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
    <section class="bg-gray-100 dark:bg-[#0D161C] min-h-screen flex items-center justify-center">
        <div class="bg-gray-100 dark:bg-[#111B22] flex rounded-2xl shadow-md max-w-3xl p-5 dark:shadow-gray-700">
            <div class="w-1/2">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">Iniciar Sesión</h1>
                <form class="space-y-4 md:space-y-6 px-10" action="/login" method="POST">
                    @csrf
                    <div>
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email o Usuario</label>
                        <input type="text" name="username" id="username" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required="" autocomplete="off">
                    </div>
                    <div class="relative">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" autocomplete="off">
                        <div class="flex items-center absolute top-0 right-3 translate-y-9">
                            <label for="" class="" id="passwordMosl"><i class="fa-regular fa-eye-slash text-gray-900 dark:text-white cursor-pointer" id="passwordMos"></i></label>
                            <label for="" class="hidden" id="passwordOcul"><i class="fa-regular fa-eye text-gray-900 dark:text-white cursor-pointer" id="passwordOcu"></i></label>
                        </div>
                    </div>
                    <div class="flex items-center justify-end">
                        <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 dark:text-gray-300">¿Olvidaste la contraseña?</a>
                    </div>
                    <button type="submit" class="bg-blue-600 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Ingresar</button>
                </form>
            </div>
            <div class="w-1/2 p-10">
                <img class="" src="{{ asset('img/loginCos.svg') }}" alt="">
            </div>
        </div>
    </section>
</body>
</html>
