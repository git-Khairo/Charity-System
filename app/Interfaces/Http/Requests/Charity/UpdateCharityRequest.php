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

            // translations are arrays with locale keys
            'name.en' => 'sometimes|string|max:255',
            'name.ar' => 'sometimes|string|max:255',

            'address.en' => 'sometimes|string|max:500',
            'address.ar' => 'sometimes|string|max:500',

            'description.en' => 'sometimes|string',
            'description.ar' => 'sometimes|string',

            'images' => 'sometimes|array',
            'images.*' => 'string',

        ];
    }
}
