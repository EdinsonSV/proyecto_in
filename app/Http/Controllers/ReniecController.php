<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ReniecController extends Controller
{
    public function consultarDNI(Request $request)
    {
        $dni = $request->input('idValorConversion');

        $token = 'apis-token-5655.fxs5X4aCw3K1MfjGA8jDKpUeVs1WAbC-';

        $response = Http::withHeaders([
            'Referer' => 'https://apis.net.pe/consulta-dni-api',
            'Authorization' => 'Bearer ' . $token
        ])->get('https://api.apis.net.pe/v2/reniec/dni?numero=' . $dni);

        if ($response->successful()) {
            // La consulta fue exitosa
            $persona = json_decode($response->body());

            // Retornar la persona
            return response()->json($persona);
        } else {
            // La consulta falló
            return response()->json([
                'error' => $response->getStatusCode()
            ], $response->getStatusCode());
        }
    }
}
