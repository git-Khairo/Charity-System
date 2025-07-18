<?php

namespace App\Interfaces\Http\Requests\Admins;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;
use Carbon\Carbon;

class DonationFinancialReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Adjust authorization logic if needed
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'start' => ['required', 'regex:/^\d{4}-(0?[1-9]|1[0-2])$/'],
            'end' => ['required', 'regex:/^\d{4}-(0?[1-9]|1[0-2])$/'],
            'charity_id'=>'required'
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function ($validator) {
            try {
                [$startYear, $startMonth] = explode('-', $this->input('start'));
                [$endYear, $endMonth] = explode('-', $this->input('end'));

                $startDate = Carbon::createFromDate($startYear, $startMonth)->startOfMonth();
                $endDate = Carbon::createFromDate($endYear, $endMonth)->endOfMonth();

                if ($startDate->gt($endDate)) {
                    $validator->errors()->add('start', 'The start date must be before or equal to the end date.');
                }
            } catch (\Exception $e) {
                $validator->errors()->add('start', 'Invalid start or end date.');
            }
        });
    }
}
