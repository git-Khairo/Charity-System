<?php

namespace App\Interfaces\Http\Requests\Beneficiary;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBeneficiaryRequest extends FormRequest
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
            'name'        => 'sometimes|required|string|max:255',
            'email'       => 'sometimes|required|email|unique:beneficiaries,email,',
            'password'    => 'sometimes|nullable|string|min:8|confirmed',
            'phonenumber' => 'sometimes|required|string|unique:beneficiaries,phonenumber,',
            'address'     => 'sometimes|required|string|max:255',
            'details'     => 'sometimes|required|string|min:10',
        ];
    }
}
