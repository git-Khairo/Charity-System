<?php

namespace App\Interfaces\Http\Requests\Events;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
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
            'charity_id' => 'required|exists:charities,id',

            'title.en' => 'required|string|max:255',
            'title.ar' => 'required|string|max:255',

            'description.en' => 'required|string',
            'description.ar' => 'required|string',

            'date' => 'required|string',

            'location.en' => 'required|string|max:255',
            'location.ar' => 'required|string|max:255',

            'images' => 'required|array',
            'images.*' => 'string',

            'status' => 'required|string',
            'capacity' => 'required|integer|min:1',
            'NumOfVolunteer' => 'required|integer|min:0',
        ];
    }
}
