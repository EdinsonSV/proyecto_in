import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 
                    'resources/js/app.js',
                    'resources/js/consultar_clientes.js',
                    'resources/js/consultar_usuarios.js',
                    'resources/js/inicio.js',
                    'resources/js/pesadas.js',
                    'resources/js/precios.js',
                    'resources/js/register.js',
                    'resources/js/registrar_clientes.js',
                    'resources/js/reporte_de_pagos_cuenta_cliente.js',
                    'resources/js/reporte_de_pagos.js',
                    'resources/js/reporte_por_cliente.js',
                    'resources/js/reporte_por_proveedor.js',
                    'resources/js/valor_conversion.js',
                    'resources/js/zonas.js',
                    'resources/js/agregar_saldo.js',
                    'resources/js/reporte_acumulado.js'],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            '$': 'jQuery'
        },
    },
});
