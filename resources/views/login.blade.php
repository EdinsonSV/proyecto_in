<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="{{ asset('img/logousers.ico') }}">
    @vite('resources/css/app.css')
    <title>Login</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
    <section class="bg-gray-100 dark:bg-gray-900"> <!-- bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 -->
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div class="h-32 w-32 mx-auto bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                        <img class="h-28 w-28" src="{{ asset('img/logouser.png') }}" alt="">
                    </div>
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                        Iniciar Sesión
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="/login" method="POST">
                        @csrf
                        <div>
                            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email o Usuario</label>
                            <input type="text" name="username" id="username" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required="" autocomplete="off">
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" autocomplete="off">
                        </div>
                        <div class="flex items-center justify-end">
                            <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 dark:text-gray-300">¿Olvidaste la contraseña?</a>
                        </div>
                        <button type="submit" class="bg-blue-600 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Ingresar</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</body>
</html>
