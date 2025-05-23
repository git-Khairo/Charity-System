<?php

namespace App\Interfaces\Http\Requests\Volunteer;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreVolunteerRequest extends FormRequest
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
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'confirmed', // requires a matching 'password_confirmation' field
                Password::min(8)
                    ->letters()
                    ->numbers()
                    , // ensures the password hasn't been leaked
            ],
            'phoneNumber' => 'required|unique:volunteers',
            'address' => 'required|string',
            'study'=>'required|string',
            'skills' => 'required|array',
            'skills.*' => 'string',

        ];
    }
}
