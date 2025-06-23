<?php

namespace App\Interfaces\Http\Requests\Beneficiary;

use Illuminate\Foundation\Http\FormRequest;

class LoginBeneficiaryRequest extends FormRequest
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
            'email'    => 'required|email|exists:beneficiaries,email',
            'password' => 'required|string',
        ];
    }
}
