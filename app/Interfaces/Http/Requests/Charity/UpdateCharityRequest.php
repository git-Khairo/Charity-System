<?php

namespace App\Interfaces\Http\Requests\Charity;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCharityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
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
            'category_id' => 'required|exists:category,id',
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'description' => 'required|string',
            'images' => 'required|array',
            'images.*' => 'string|url',
            'phonenumber' => 'required|string|max:20',
            'email' => 'required|email|max:255',
        ];
    }
}
