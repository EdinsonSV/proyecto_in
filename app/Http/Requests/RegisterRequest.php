<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'apellidoPaternoUsu' => 'required',
            'apellidoMaternoUsu' => 'required',
            'dniUsu' => 'required',
            'celularUsu' => 'required',
            'direccionUsu' => 'required',
            'nombresUsu' => 'required|string',
            'tipoUsu' => 'required|string',
            'sexoUsu' => 'required|string',
            'rutaPerfilUsu' => 'required|string',
            'email' => 'required|unique:users,email',
            'username' => 'required|unique:users,username',
            'password' => 'required|min:8',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'apellidoPaternoUsu' => strtoupper($this->input('apellidoPaternoUsu')),
            'apellidoMaternoUsu' => strtoupper($this->input('apellidoMaternoUsu')),
            'nombresUsu' => strtoupper($this->input('nombresUsu')),
            'direccionUsu' => strtoupper($this->input('direccionUsu')),
        ]);
    }
}
