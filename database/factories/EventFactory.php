<?php

namespace Database\Factories;

use App\Domain\Events\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Event::class;
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph,
            'location' => $this->faker->city,
            'status' => $this->faker->randomElement(['upcoming', 'completed']),
            'capacity' => $this->faker->numberBetween(20, 100),
            'NumOfVolunteer' => 0,
        ];
    }
}
