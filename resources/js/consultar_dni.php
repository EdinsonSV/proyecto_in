<?php

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;

function consultarDNI($dni) {
    // Obtener el token de API
    $token = 'apis-token-5655.fxs5X4aCw3K1MfjGA8jDKpUeVs1WAbC-';

    // Enviar la solicitud a la API del DNI
    $response = Http::withHeaders([
        'Referer' => 'https://apis.net.pe/consulta-dni-api',
        'Authorization' => 'Bearer ' . $token
    ])->get('https://api.apis.net.pe/v2/reniec/dni?numero=' . $dni);

    // Si la solicitud es exitosa, devolver la respuesta
    if ($response->successful()) {
        return $response->json();
    } else {
        // La consulta falló
        return null;
    }
}
?>