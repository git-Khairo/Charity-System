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
            'charity_id' => 'required|exists:charities,id',
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string|max:1000',
            'location' => 'sometimes|required|string|max:255',
            'status' => 'sometimes|required|string|in:active,inactive,pending', // adjust as needed
            'capacity' => 'sometimes|required|integer|min:1',
            'NumOfVolunteer' => 'sometimes|integer|'
        ];
    }
}
