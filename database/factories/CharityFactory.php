<?php

namespace Database\Factories;

use App\Domain\Admins\Models\Admin;
use App\Domain\Charity\Models\Charity;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Charity>
 */
class CharityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
     protected $model = Charity::class;
    public function definition(): array
    {
        return [
            'admin_id' => 1,
            'category_id' => 1,
            'name' => [
                'en' => $this->faker->company(),
                'ar' => 'مؤسسة ' . $this->faker->company(),
            ],
            'address' => [
                'en' => $this->faker->address(),
                'ar' => 'العنوان ' . $this->faker->streetAddress(),
            ],
            'description' => [
                'en' => $this->faker->paragraph(),
                'ar' => 'الوصف ' . $this->faker->paragraph(),
            ],
            'images' => [],
            'phonenumber' => $this->faker->phoneNumber(),
            'email' => $this->faker->companyEmail(),
        ];
    }
}
