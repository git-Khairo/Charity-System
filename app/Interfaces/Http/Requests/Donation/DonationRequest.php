<?php

namespace App\Interfaces\Http\Requests\Donation;

use Illuminate\Foundation\Http\FormRequest;

class DonationRequest extends FormRequest
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
            'name'           => 'required|string|max:255',
            'email'          => 'required|email|max:255',
            'phonenumber'    => 'required|string|max:20',
            'address'        => 'required|string|max:255',
            'amount'         => 'required|numeric|min:1',
            'image'          => 'nullable|image|max:2048', // Optional image upload
        ];
    }
}
