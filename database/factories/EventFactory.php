<?php

namespace Database\Factories;

use App\Domain\Charity\Models\Charity;
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
            'charity_id' => 1,
            'title' => [
                'en' => $this->faker->sentence(3),
                'ar' => 'حدث ' . $this->faker->word(),
            ],
            'description' => [
                'en' => $this->faker->paragraph(),
                'ar' => 'الوصف ' . $this->faker->paragraph(),
            ],
            'location' => [
                'en' => $this->faker->city(),
                'ar' => 'المدينة ' . $this->faker->city(),
            ],
            'images' => [],
            'status' => 'upcoming',
            'capacity' => $this->faker->numberBetween(10, 200),
            'NumOfVolunteer' => 0,
        ];
    }
}
