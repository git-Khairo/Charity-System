<?php

namespace App\Interfaces\Http\Requests\Beneficiary;

use Illuminate\Foundation\Http\FormRequest;

class BeneficiaryFeedbackRequest extends FormRequest
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
            'title'       => 'required|string|min:3|max:255',
            'description' => 'required|string|min:10',
            'rating'=>   'required|integer|min:1|max:5',
        ];
    }
}
