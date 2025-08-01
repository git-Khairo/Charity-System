<?php

namespace App\Interfaces\Http\Requests\Volunteer;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateVolunteerRequest extends FormRequest
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
        $id = $this->route('id') ?? $this->input('id'); // Get volunteer id from route or input

        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['sometimes', 'required', 'email', "unique:users,email,$id"],
            'password' => [
                'sometimes', // validate password only if present
                'confirmed', // must have matching password_confirmation
                Password::min(8)->letters()->numbers(),
            ],
            'phoneNumber' => ['sometimes', 'required', 'string', "unique:volunteers,phoneNumber,$id"],
            'address' => ['sometimes', 'required', 'string'],
            'study' => ['sometimes', 'required', 'string'],
            'skills' => ['sometimes', 'required', 'array'],
            'skills.*' => ['sometimes', 'string'],
        ];
    }
}
