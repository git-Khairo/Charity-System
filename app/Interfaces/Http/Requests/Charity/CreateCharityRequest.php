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
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'required|string|min:8',
            'phonenumber' => 'required|string',
            'category' => 'required|in:Health,Education,Food,Shelter,Disaster Relief',
            'name_translations.en' => 'required|string|max:255',
            'name_translations.ar' => 'required|string|max:255',
            'address.en' => 'required|string|max:500',
            'address.ar' => 'required|string|max:500',
            'description.en' => 'required|string',
            'description.ar' => 'required|string',
            'images' => 'file|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
}
