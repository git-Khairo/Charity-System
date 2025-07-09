<?php

namespace App\Interfaces\Http\Requests\Admins;

use Illuminate\Foundation\Http\FormRequest;

class AcceptBeneficiaryRequest extends FormRequest
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
            'charity_id' => 'required',
            'beneficiary_id' => 'required',
            'request_id' => 'required',
            'status' => 'in:Accepted,Rejected'
        ];
    }
}
