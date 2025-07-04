<?php

namespace App\Interfaces\Http\Requests\Admins;

use Illuminate\Foundation\Http\FormRequest;

class RegisterAdminRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'        => 'required|string|max:255',
            'email'       => 'required|email|unique:beneficiaries,email',
            'password'    => 'required|string|min:8|confirmed',
            'phoneNumber' => 'required|string|unique:beneficiaries,phonenumber',
        ];
    }
}
