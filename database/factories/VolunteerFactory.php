<?php

namespace Database\Factories;

use App\Domain\Volunteer\Models\Volunteer;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Volunteer>
 */
class VolunteerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Volunteer::class;
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'phoneNumber' => $this->faker->unique()->phoneNumber,
            'study' => $this->faker->randomElement(['Engineering', 'Medicine', 'Law', 'Computer Science', 'Business']),
            'address' => $this->faker->address,
            'skills' => json_encode($this->faker->randomElements(
                ['communication', 'leadership', 'teamwork', 'problem-solving', 'creativity'],
                rand(1, 3)
            )),
            'email_verified_at' => now(),
            'password' => Hash::make('password'), // Or bcrypt('password')
            'qr_code_path' => null, // Optional: set to a path if needed
        ];
    }
}
