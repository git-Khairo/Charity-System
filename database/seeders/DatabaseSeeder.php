<?php

namespace Database\Seeders;

use App\Domain\Admins\Models\Admin;
use App\Domain\Charity\Models\Charity;
use App\Domain\Events\Models\Event;
use App\Domain\volunteer\Models\Volunteer;
use App\Domain\Volunteer\Models\Volunteer_feddback;
use App\Models\User;
use Database\Factories\CategoryFactory;
use Faker\Factory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Admin::factory()->create();
        Volunteer::factory()->count(10)->create();
        $categories = ['Health', 'Education', 'Food', 'Shelter', 'Disaster Relief'];
        foreach ($categories as $name) {
            DB::table('category')->insert([
                'name' => $name,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        Charity::factory()->count(1)->create();
        Event::factory()->count(5)->create();
    }
}
