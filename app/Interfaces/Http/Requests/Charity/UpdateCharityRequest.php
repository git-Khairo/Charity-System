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
            'admin_id' => 'sometimes|exists:admins,id',
            'category_id' => 'sometimes|exists:category,id',
            'name' => 'sometimes|string|max:255',
            'address' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'images' => 'sometimes|array',
            'images.*' => 'string|url',
            'phonenumber' => 'sometimes|string|max:20',
            'email' => 'sometimes|email|max:255',
        ];
    }
}
