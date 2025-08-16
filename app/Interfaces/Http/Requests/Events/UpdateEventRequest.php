<?php

namespace App\Interfaces\Http\Requests\Events;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
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

            'title.en' => 'sometimes|string|max:255',
            'title.ar' => 'sometimes|string|max:255',


            'description.en' => 'sometimes|string',
            'description.ar' => 'sometimes|string',

            'date' => 'sometimes|string',

            'location.en' => 'sometimes|string|max:255',
            'location.ar' => 'sometimes|string|max:255',

            'images' => 'sometimes|array',
            'images.*' => 'string',

            'status' => 'sometimes|string|max:50',
            'capacity' => 'sometimes|integer|min:0',
        ];
    }
}
