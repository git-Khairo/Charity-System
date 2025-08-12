<?php

namespace App\Interfaces\Http\Requests\Charity;

use Illuminate\Foundation\Http\FormRequest;

class CreateCharityRequest extends FormRequest
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
            'admin_id' => 'required|exists:admins,id',
            'category_id' => 'required|exists:categories,id',

            // translations are arrays with locale keys
            'name.en' => 'required|string|max:255',
            'name.ar' => 'required|string|max:255',

            'address.en' => 'required|string|max:500',
            'address.ar' => 'required|string|max:500',

            'description.en' => 'required|string',
            'description.ar' => 'required|string',

            'images' => 'required|array',
            'images.*' => 'string',
            'phonenumber' => 'required|string',
            'email' => 'required|email',
        ];
    }
}
