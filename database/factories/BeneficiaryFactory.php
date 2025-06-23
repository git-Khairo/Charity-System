<?php

namespace Database\Factories;

use App\Domain\Beneficiary\Models\Beneficiary;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Beneficiary>
 */
class BeneficiaryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Beneficiary::class;
    public function definition(): array
    {
         return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('password'),
            'phoneNumber' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'details' => $this->faker->paragraph(),
        ];
    }
}
