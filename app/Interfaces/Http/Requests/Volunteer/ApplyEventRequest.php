<?php

namespace App\Interfaces\Http\Requests\Volunteer;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class ApplyEventRequest extends FormRequest
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
            'status' => 'required',
            'national_number'=>'required',
            'gender' => 'required',
            'why_charity' => 'required',
            'availability_for_volunteering' => 'required',
            'preferred_time' => 'required',

        ];
    }
}
