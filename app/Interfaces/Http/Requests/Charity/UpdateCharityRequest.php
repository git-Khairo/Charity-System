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
            'admin_id' => 'exists:admins,id',
            'category_id' => 'exists:category,id',
            'name' => 'string|max:255',
            'address' => 'string|max:255',
            'description' => 'string',
            'images' => 'array',
            'images.*' => 'string|url',
            'phonenumber' => 'string|max:20',
            'email' => 'email|max:255',
        ];
    }
}
