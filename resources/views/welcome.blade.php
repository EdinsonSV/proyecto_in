@extends('aside')
<main class="w-[calc(100%-3.73rem)] ml-auto h-[calc(100%-72px)]">
    <div class="2xl:container mx-auto">
        <div class="h-16 border-b border-gray-300/40 dark:border-gray-700 flex items-center">
            <h3 class="text-gray-700 dark:text-gray-300 font-semibold ml-[calc(3.73rem)]" id="mensaje_bienvenida">Buenos dias</h3>
            <span class="text-gray-700 dark:text-gray-300 font-semibold">&nbsp;{{auth()->user()->nombresUsu}}</span>
        </div>
        <div class="px-6 lg:px-12 mt-[calc(1.865rem)]">
            <div class="flex justify-center items-center rounded-lg border border-gray-300/40 dark:border-gray-700 shadow-lg shadow-slate-200 dark:shadow-slate-800">
                <span class="text-gray-500 dark:text-gray-200">Content</span>
            </div>
        </div>
    </div>
</main>
@extends('footer')