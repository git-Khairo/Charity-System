<?php

namespace App\Interfaces\Http\Requests\Beneficiary;

use Illuminate\Foundation\Http\FormRequest;

class RegisterBeneficiaryRequest extends FormRequest
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
            'email'       => 'required|email',
            'password'    => 'required|string|min:8|confirmed',
            'phonenumber' => 'required|string',
            'address'     => 'required|string|max:255',
            'details'     => 'required|string',
            'familyMember' => 'required|integer',
            'needs' => 'required|string'
        ];
    }
}
